/* ============================================================
   INDO-PACIFIC TERMINAL — fetcher (runs in GitHub Actions)
   Node 20+. No dependencies. Fetches native RSS directly
   (no CORS server-side), falls back to Google News per source,
   classifies by axis/sub-tag/theater, writes data.json.
   ============================================================ */
import { writeFileSync } from 'node:fs';
import { SOURCES, THEATERS, AXES, THEATER_ORDER, COUNTRY_TAGS } from './registry.mjs';

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';
const WINDOW_DAYS = 7, PER_SOURCE = 20, TOTAL_CAP = 1500, CONCURRENCY = 10, TIMEOUT = 20000;

const gnewsSite = d => `https://news.google.com/rss/search?q=${encodeURIComponent('site:'+d+' when:'+WINDOW_DAYS+'d')}&hl=en-US&gl=US&ceid=US:en`;

async function get(url){
  const r = await fetch(url,{signal:AbortSignal.timeout(TIMEOUT),headers:{'user-agent':UA,'accept':'application/rss+xml,application/xml,text/xml,*/*'},redirect:'follow'});
  if(!r.ok) throw new Error('http '+r.status);
  return await r.text();
}

/* ---- tiny dependency-free RSS/Atom parsing ---- */
const ENT = {'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&apos;':"'",'&nbsp;':' '};
function decode(s){ return (s||'').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&[a-z]+;/gi,m=>ENT[m]??m); }
function unCdata(s){ return (s||'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1'); }
function stripTags(s){ return decode(unCdata(s||'').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim(); }
function tag(block,name){
  const m = block.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+name+'>','i'));
  return m ? m[1] : '';
}
function atomLink(block){
  const m = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>(?:<\/link>)?/i);
  return m ? decode(m[1]) : '';
}
function parseFeed(xml){
  let blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
  if(!blocks.length) blocks = xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  return blocks.map(b=>{
    let link = stripTags(tag(b,'link'));
    if(!link) link = atomLink(b);
    return {
      title: stripTags(tag(b,'title')),
      link,
      desc: stripTags(tag(b,'description')||tag(b,'summary')||tag(b,'content')||tag(b,'content:encoded')).slice(0,320),
      date: stripTags(tag(b,'pubDate')||tag(b,'published')||tag(b,'updated')||tag(b,'dc:date')),
    };
  }).filter(a=>a.title && a.link);
}
function cleanTitle(t){ return t.replace(/\s+-\s+[^-]+$/,'').trim() || t; }
function parseDate(s){ if(!s) return null; let d = new Date(s); if(isNaN(d)) d = new Date(s.replace(' ','T')); return isNaN(d) ? null : d; }

/* ---- classification ---- */
function hits(text, kws){ const t=' '+text.toLowerCase()+' '; return kws.filter(k=>t.includes(k)); }
function classify(text){
  let axis=null, sub=null, matched=[], best=0;
  const perAxis = {};
  for(const ax in AXES){
    let axHits=[];
    for(const s in AXES[ax]){
      const h = hits(text, AXES[ax][s]);
      axHits = axHits.concat(h);
      if(h.length > best){ best=h.length; axis=ax; sub=s; matched=h; }
    }
    perAxis[ax] = axHits.length;
  }
  const nexus = perAxis.Conflict>0 && perAxis.Climate>0;
  return {axis, sub, nexus, matched};
}
function theaterOf(text, home){
  let best=null, n=0, all=[];
  for(const th of THEATER_ORDER){
    const h = hits(text, THEATERS[th]);
    if(h.length){ all.push(th); if(h.length>n){ n=h.length; best=th; } }
  }
  return {theater: best || home[0] || null, matchedTheater: !!best, all: all.length?all:(home[0]?[home[0]]:[])};
}

/* ---- per-source fetch ---- */
async function fetchSource(s){
  const t0 = Date.now();
  let raw=[], method='';
  if(s.feed){ try{ raw = parseFeed(await get(s.feed)); if(raw.length) method='native'; }catch(e){} }
  if(!raw.length){ try{ raw = parseFeed(await get(gnewsSite(s.domain))); if(raw.length) method='gnews'; }catch(e){} }
  const now = Date.now(), horizon = now - WINDOW_DAYS*864e5;
  let items = raw.map(a=>{
    const title = cleanTitle(a.title);
    const date = parseDate(a.date);
    const text = title+' '+a.desc;
    const cls = classify(text);
    const th = theaterOf(text, s.home);
    return { title, link:a.link, desc:a.desc, date: date?date.toISOString():null,
      src:s.code, tier:s.tier, theater:th.theater, theaters:th.all, matchedTheater:th.matchedTheater,
      axis:cls.axis, sub:cls.sub, nexus:cls.nexus, hits:cls.matched.slice(0,8) };
  })
  .filter(a=>!a.date || Date.parse(a.date)>=horizon)
  .filter(a=>!s.gate || a.matchedTheater)       // gated tiers must name the region
  .slice(0, PER_SOURCE);
  return { items, diag:{code:s.code,name:s.name,country:s.country,tier:s.tier,method:method||'—',status:items.length?'ok':(method?'empty':'fail'),count:items.length,ms:Date.now()-t0} };
}

async function pool(tasks, limit){
  const out=new Array(tasks.length); let i=0;
  await Promise.all(Array.from({length:Math.min(limit,tasks.length)},async()=>{
    while(i<tasks.length){ const idx=i++; out[idx]=await tasks[idx](); }
  }));
  return out;
}

/* ---- main ---- */
const results = await pool(SOURCES.map(s=>()=>fetchSource(s)), CONCURRENCY);
const seen = new Set(); const items = [];
for(const r of results) for(const a of r.items){
  const k = a.title.toLowerCase().slice(0,80);
  if(seen.has(k)) continue; seen.add(k); items.push(a);
}
items.sort((x,y)=>(Date.parse(y.date)||0)-(Date.parse(x.date)||0));
const data = {
  generated_at: new Date().toISOString(),
  window_days: WINDOW_DAYS,
  sources: results.map(r=>r.diag),
  source_meta: Object.fromEntries(SOURCES.map(s=>[s.code,{name:s.name,country:s.country,tier:s.tier,owner:s.owner,lean:s.lean}])),
  country_tags: COUNTRY_TAGS,
  items: items.slice(0,TOTAL_CAP),
};
writeFileSync('data.json', JSON.stringify(data));
const live = data.sources.filter(d=>d.status==='ok').length;
console.log(`data.json written: ${data.items.length} items, ${live}/${data.sources.length} sources live`);
