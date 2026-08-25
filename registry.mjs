/* ============================================================
   INDO-PACIFIC TERMINAL — source registry & classifiers
   Shared by fetch.mjs (GitHub Actions) and, later, the desktop app.
   Frame: Arabian Sea → Tasman Sea (W–E), South China Sea → Timor Sea (N–S)
   ============================================================ */

export const TIERS = { INT:'International', REG:'Regional', LOC:'Local', SPEC:'Specialist', ALERT:'Alerts' };

/* owner: priv pub state ind exile igo | lean kept as metadata only (tooltip), not surfaced in UI */
const S = (code,name,country,tier,owner,lean,home,feed,domain,gate)=>(
  {code,name,country,tier,owner:owner||'priv',lean:lean||'',home:home||[],feed:feed||null,domain,gate:!!gate});

export const THEATER_ORDER = ['Arabian Sea','Bay of Bengal','Malacca–Andaman','South China Sea','Archipelagic–Timor','Coral–Tasman'];

export const SOURCES = [
/* ---- INTERNATIONAL WIRES ---- */
S('REUT','Reuters','—','INT','priv','C',[],null,'reuters.com'),
S('AP','Associated Press','—','INT','priv','C',[],null,'apnews.com'),
S('BBC','BBC World','—','INT','pub','C',[],'https://feeds.bbci.co.uk/news/world/rss.xml','bbc.com'),
S('ALJZ','Al Jazeera','—','INT','state','LL',[],'https://www.aljazeera.com/xml/rss/all.xml','aljazeera.com'),
S('GUAR','The Guardian','—','INT','priv','LL',[],'https://www.theguardian.com/world/rss','theguardian.com'),
S('F24','France 24','—','INT','pub','C',[],'https://www.france24.com/en/rss','france24.com'),
S('DW','Deutsche Welle','—','INT','pub','C',[],'https://rss.dw.com/rdf/rss-en-world','dw.com'),
S('UN','UN News','—','INT','igo','C',[],'https://news.un.org/feed/subscribe/en/news/all/rss.xml','news.un.org'),
S('NHK','NHK World','—','INT','pub','C',[],null,'nhk.or.jp'),

/* ---- REGIONAL DESKS (gated: must name the region) ---- */
S('NIKK','Nikkei Asia','—','REG','priv','C',[],'https://asia.nikkei.com/rss/feed/nar','asia.nikkei.com',true),
S('NATL','The National (UAE)','—','REG','priv','C',['Arabian Sea'],'https://www.thenationalnews.com/rss','thenationalnews.com',true),
S('ARAB','Arab News','—','REG','priv','C',['Arabian Sea'],'https://www.arabnews.com/rss.xml','arabnews.com',true),

/* ---- SPECIALIST (maritime/defence trade press; gated) ---- */
S('NAVN','Naval News','—','SPEC','priv','',[],'https://www.navalnews.com/feed/','navalnews.com',true),
S('USNI','USNI News','—','SPEC','ind','',[],'https://news.usni.org/feed','news.usni.org',true),

/* ---- ALERTS (event feeds; gated to region) ---- */
S('GDAC','GDACS Alerts','—','ALERT','igo','',[],'https://www.gdacs.org/xml/rss.xml','gdacs.org',true),
S('RWEB','ReliefWeb Updates','—','ALERT','igo','',[],'https://reliefweb.int/updates/rss.xml','reliefweb.int',true),

/* ---- ARABIAN SEA ---- */
S('DAWN','Dawn','Pakistan','LOC','priv','LL',['Arabian Sea'],'https://www.dawn.com/feeds/home','dawn.com'),
S('ETRB','Express Tribune','Pakistan','LOC','priv','C',['Arabian Sea'],'https://tribune.com.pk/feed','tribune.com.pk'),
S('TNI','The News Intl','Pakistan','LOC','priv','C',['Arabian Sea'],'https://www.thenews.com.pk/rss/1/1','thenews.com.pk'),
S('GEO','Geo News','Pakistan','LOC','priv','C',['Arabian Sea'],'https://www.geo.tv/rss/','geo.tv'),
S('ARY','ARY News','Pakistan','LOC','priv','LR',['Arabian Sea'],'https://arynews.tv/feed/','arynews.tv'),
S('BREC','Business Recorder','Pakistan','LOC','priv','C',['Arabian Sea'],null,'brecorder.com'),
S('HIND','The Hindu','India','LOC','priv','C',['Bay of Bengal'],'https://www.thehindu.com/news/national/feeder/default.rss','thehindu.com'),
S('TOI','Times of India','India','LOC','priv','LR',['Bay of Bengal'],'https://timesofindia.indiatimes.com/rssfeedstopstories.cms','timesofindia.indiatimes.com'),
S('HT','Hindustan Times','India','LOC','priv','C',['Bay of Bengal'],'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml','hindustantimes.com'),
S('IE','Indian Express','India','LOC','priv','C',['Bay of Bengal'],'https://indianexpress.com/feed/','indianexpress.com'),
S('NDTV','NDTV','India','LOC','priv','LR',['Bay of Bengal'],'https://feeds.feedburner.com/ndtvnews-top-stories','ndtv.com'),
S('PRNT','The Print','India','LOC','priv','C',['Bay of Bengal'],'https://theprint.in/feed/','theprint.in'),
S('WIRE','The Wire','India','LOC','ind','L',['Bay of Bengal'],'https://thewire.in/rss/','thewire.in'),
S('SCRL','Scroll.in','India','LOC','ind','L',['Bay of Bengal'],'https://scroll.in/feed','scroll.in'),
S('TOOM','Times of Oman','Oman','LOC','priv','',['Arabian Sea'],'https://timesofoman.com/feed','timesofoman.com'),
S('OOBS','Oman Observer','Oman','LOC','state','',['Arabian Sea'],'https://www.omanobserver.om/feed','omanobserver.om'),
S('TEHT','Tehran Times','Iran','LOC','state','',['Arabian Sea'],'https://www.tehrantimes.com/rss','tehrantimes.com'),
S('IRNA','IRNA','Iran','LOC','state','',['Arabian Sea'],'https://en.irna.ir/rss','irna.ir'),
S('PRTV','Press TV','Iran','LOC','state','',['Arabian Sea'],null,'presstv.ir'),
S('IRIN','Iran International','Iran','LOC','exile','',['Arabian Sea'],null,'iranintl.com'),
S('IRWR','IranWire','Iran','LOC','exile','',['Arabian Sea'],null,'iranwire.com'),

/* ---- BAY OF BENGAL ---- */
S('DSTA','The Daily Star','Bangladesh','LOC','priv','LL',['Bay of Bengal'],'https://www.thedailystar.net/rss.xml','thedailystar.net'),
S('DHTR','Dhaka Tribune','Bangladesh','LOC','priv','',['Bay of Bengal'],'https://www.dhakatribune.com/feed','dhakatribune.com'),
S('BD24','bdnews24','Bangladesh','LOC','priv','',['Bay of Bengal'],null,'bdnews24.com'),
S('NAGE','New Age','Bangladesh','LOC','priv','',['Bay of Bengal'],'https://www.newagebd.net/feed','newagebd.net'),
S('TBS','The Business Standard','Bangladesh','LOC','priv','',['Bay of Bengal'],null,'tbsnews.net'),
S('DMIR','Daily Mirror','Sri Lanka','LOC','priv','LL',['Bay of Bengal'],null,'dailymirror.lk'),
S('ADAD','Ada Derana','Sri Lanka','LOC','priv','',['Bay of Bengal'],'https://www.adaderana.lk/rss.php','adaderana.lk'),
S('NWSF','News First','Sri Lanka','LOC','priv','',['Bay of Bengal'],'https://www.newsfirst.lk/feed/','newsfirst.lk'),
S('MORN','The Morning','Sri Lanka','LOC','priv','',['Bay of Bengal'],null,'themorning.lk'),
S('ECON','EconomyNext','Sri Lanka','LOC','priv','',['Bay of Bengal'],'https://economynext.com/feed','economynext.com'),
S('DFT','Daily FT','Sri Lanka','LOC','priv','',['Bay of Bengal'],null,'ft.lk'),
S('IRRA','The Irrawaddy','Myanmar','LOC','exile','LL',['Bay of Bengal'],'https://www.irrawaddy.com/feed','irrawaddy.com'),
S('MNOW','Myanmar Now','Myanmar','LOC','exile','',['Bay of Bengal'],'https://myanmar-now.org/en/feed/','myanmar-now.org'),
S('FRON','Frontier Myanmar','Myanmar','LOC','ind','',['Bay of Bengal'],'https://www.frontiermyanmar.net/en/feed/','frontiermyanmar.net'),
S('MIZZ','Mizzima','Myanmar','LOC','exile','',['Bay of Bengal'],'https://mizzima.com/feed','mizzima.com'),
S('DVB','DVB English','Myanmar','LOC','exile','',['Bay of Bengal'],'https://english.dvb.no/feed','english.dvb.no'),
S('GNLM','Global New Light','Myanmar','LOC','state','',['Bay of Bengal'],'https://www.gnlm.com.mm/feed/','gnlm.com.mm'),

/* ---- MALACCA–ANDAMAN ---- */
S('BKKP','Bangkok Post','Thailand','LOC','priv','LR',['Malacca–Andaman'],'https://www.bangkokpost.com/rss/data/topstories.xml','bangkokpost.com'),
S('NATH','The Nation Thailand','Thailand','LOC','priv','LL',['Malacca–Andaman'],null,'nationthailand.com'),
S('KHAO','Khaosod English','Thailand','LOC','priv','LL',['Malacca–Andaman'],null,'khaosodenglish.com'),
S('TPBS','Thai PBS World','Thailand','LOC','pub','',['Malacca–Andaman'],'https://www.thaipbsworld.com/feed/','thaipbsworld.com'),
S('PRAC','Prachatai English','Thailand','LOC','ind','L',['Malacca–Andaman'],'https://prachataienglish.com/feed','prachataienglish.com'),
S('STAR','The Star','Malaysia','LOC','priv','C',['Malacca–Andaman'],'https://www.thestar.com.my/rss/News','thestar.com.my'),
S('MMAI','Malay Mail','Malaysia','LOC','priv','C',['Malacca–Andaman'],'https://www.malaymail.com/feed/rss/malaysia','malaymail.com'),
S('NST','New Straits Times','Malaysia','LOC','priv','C',['Malacca–Andaman'],null,'nst.com.my'),
S('FMT','Free Malaysia Today','Malaysia','LOC','priv','LR',['Malacca–Andaman'],'https://www.freemalaysiatoday.com/feed/','freemalaysiatoday.com'),
S('MKIN','Malaysiakini','Malaysia','LOC','ind','LL',['Malacca–Andaman'],'https://www.malaysiakini.com/rss/en/news.rss','malaysiakini.com'),
S('BERN','Bernama','Malaysia','LOC','state','',['Malacca–Andaman'],null,'bernama.com'),
S('ST','Straits Times','Singapore','LOC','pub','LR',['Malacca–Andaman'],null,'straitstimes.com'),
S('CNA','CNA','Singapore','LOC','pub','C',['Malacca–Andaman'],'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=10416','channelnewsasia.com'),
S('BT','Business Times SG','Singapore','LOC','pub','',['Malacca–Andaman'],null,'businesstimes.com.sg'),
S('MOTH','Mothership','Singapore','LOC','priv','',['Malacca–Andaman'],'https://mothership.sg/feed/','mothership.sg'),

/* ---- SOUTH CHINA SEA ---- */
S('SCMP','South China Morning Post','China','LOC','priv','C',['South China Sea'],'https://www.scmp.com/rss/91/feed','scmp.com'),
S('GLBT','Global Times','China','LOC','state','L',['South China Sea'],'https://www.globaltimes.cn/rss/outbrain.xml','globaltimes.cn'),
S('CHDY','China Daily','China','LOC','state','LL',['South China Sea'],'https://www.chinadaily.com.cn/rss/world_rss.xml','chinadaily.com.cn'),
S('XINH','Xinhua','China','LOC','state','L',['South China Sea'],null,'english.news.cn'),
S('CGTN','CGTN','China','LOC','state','L',['South China Sea'],'https://www.cgtn.com/subscribe/rss/section/world.do','cgtn.com'),
S('CAIX','Caixin Global','China','LOC','priv','C',['South China Sea'],'https://www.caixinglobal.com/rss/feed.xml','caixinglobal.com'),
S('6TON','Sixth Tone','China','LOC','state','C',['South China Sea'],'https://www.sixthtone.com/rss','sixthtone.com'),
S('TPEI','Taipei Times','Taiwan','LOC','priv','LL',['South China Sea'],'https://www.taipeitimes.com/xml/index.rss','taipeitimes.com'),
S('FTWN','Focus Taiwan','Taiwan','LOC','pub','LL',['South China Sea'],'https://focustaiwan.tw/rss/all.xml','focustaiwan.tw'),
S('TWNN','Taiwan News','Taiwan','LOC','priv','LL',['South China Sea'],null,'taiwannews.com.tw'),
S('TWPL','TaiwanPlus','Taiwan','LOC','pub','',['South China Sea'],null,'taiwanplus.com'),
S('VNEX','VnExpress Intl','Vietnam','LOC','priv','',['South China Sea'],'https://e.vnexpress.net/rss/news.rss','e.vnexpress.net'),
S('TUOI','Tuoi Tre News','Vietnam','LOC','state','',['South China Sea'],null,'tuoitrenews.vn'),
S('VNNT','VietnamNet','Vietnam','LOC','state','',['South China Sea'],null,'vietnamnet.vn'),
S('VNNS','Vietnam News','Vietnam','LOC','state','',['South China Sea'],null,'vietnamnews.vn'),
S('VPLS','VietnamPlus','Vietnam','LOC','state','',['South China Sea'],null,'en.vietnamplus.vn'),
S('NHND','Nhan Dan','Vietnam','LOC','state','',['South China Sea'],null,'en.nhandan.vn'),
S('VIR','Investment Review','Vietnam','LOC','state','',['South China Sea'],'https://vir.com.vn/rss/home.rss','vir.com.vn'),
S('HANO','Hanoi Times','Vietnam','LOC','state','',['South China Sea'],null,'hanoitimes.vn'),
S('VNBF','Vietnam Briefing','Vietnam','LOC','ind','',['South China Sea'],'https://www.vietnam-briefing.com/news/feed','vietnam-briefing.com'),
S('INQ','Inquirer','Philippines','LOC','priv','LL',['South China Sea'],'https://www.inquirer.net/fullfeed','inquirer.net'),
S('RAPP','Rappler','Philippines','LOC','ind','LL',['South China Sea'],'https://www.rappler.com/feed/','rappler.com'),
S('GMA','GMA News','Philippines','LOC','priv','C',['South China Sea'],'https://data.gmanetwork.com/gno/rss/news/feed.xml','gmanetwork.com'),
S('ABS','ABS-CBN','Philippines','LOC','priv','C',['South China Sea'],null,'news.abs-cbn.com'),
S('PSTA','Philippine Star','Philippines','LOC','priv','LL',['South China Sea'],'https://www.philstar.com/rss/headlines','philstar.com'),
S('MB','Manila Bulletin','Philippines','LOC','priv','C',['South China Sea'],'https://mb.com.ph/feed','mb.com.ph'),
S('MNLT','Manila Times','Philippines','LOC','priv','LR',['South China Sea'],'https://www.manilatimes.net/feed','manilatimes.net'),
S('BWLD','BusinessWorld','Philippines','LOC','priv','C',['South China Sea'],'https://www.bworldonline.com/feed/','bworldonline.com'),
S('PNA','PH News Agency','Philippines','LOC','state','C',['South China Sea'],null,'pna.gov.ph'),
S('SUN','SunStar','Philippines','LOC','priv','C',['South China Sea'],null,'sunstar.com.ph'),

/* ---- ARCHIPELAGIC–TIMOR ---- */
S('JKPT','Jakarta Post','Indonesia','LOC','priv','LL',['Archipelagic–Timor'],'https://www.thejakartapost.com/rss/news.xml','thejakartapost.com'),
S('JKGL','Jakarta Globe','Indonesia','LOC','priv','C',['Archipelagic–Timor'],'https://jakartaglobe.id/feed','jakartaglobe.id'),
S('TMPO','Tempo English','Indonesia','LOC','ind','C',['Archipelagic–Timor'],'https://en.tempo.co/rss/feed.rss','en.tempo.co'),
S('ANTR','Antara News','Indonesia','LOC','state','C',['Archipelagic–Timor'],'https://en.antaranews.com/rss/news.xml','en.antaranews.com'),
S('TATO','Tatoli','Timor-Leste','LOC','state','',['Archipelagic–Timor'],null,'tatoli.tl'),

/* ---- CORAL–TASMAN ---- */
S('ABC','ABC News','Australia','LOC','pub','LL',['Coral–Tasman'],'https://www.abc.net.au/news/feed/51120/rss.xml','abc.net.au'),
S('SMH','Sydney Morning Herald','Australia','LOC','priv','LL',['Coral–Tasman'],'https://www.smh.com.au/rss/feed.xml','smh.com.au'),
S('AGE','The Age','Australia','LOC','priv','LL',['Coral–Tasman'],'https://www.theage.com.au/rss/feed.xml','theage.com.au'),
S('AUST','The Australian','Australia','LOC','priv','LR',['Coral–Tasman'],null,'theaustralian.com.au'),
S('NCOM','news.com.au','Australia','LOC','priv','LR',['Coral–Tasman'],null,'news.com.au'),
S('GAU','Guardian Australia','Australia','LOC','priv','LL',['Coral–Tasman'],'https://www.theguardian.com/australia-news/rss','theguardian.com'),
S('SKY','Sky News Australia','Australia','LOC','priv','R',['Coral–Tasman'],null,'skynews.com.au'),
S('SBS','SBS News','Australia','LOC','pub','LL',['Coral–Tasman'],'https://www.sbs.com.au/news/topic/latest/feed','sbs.com.au'),
S('AFR','Financial Review','Australia','LOC','priv','C',['Coral–Tasman'],null,'afr.com'),
S('9NWS','9News','Australia','LOC','priv','C',['Coral–Tasman'],null,'9news.com.au'),
S('RNZ','RNZ','New Zealand','LOC','pub','C',['Coral–Tasman'],'https://www.rnz.co.nz/rss/national.xml','rnz.co.nz'),
S('NZH','NZ Herald','New Zealand','LOC','priv','C',['Coral–Tasman'],null,'nzherald.co.nz'),
S('1NWS','1News','New Zealand','LOC','pub','LL',['Coral–Tasman'],null,'1news.co.nz'),
S('STUF','Stuff','New Zealand','LOC','priv','LL',['Coral–Tasman'],null,'stuff.co.nz'),
S('NWRM','Newsroom','New Zealand','LOC','ind','',['Coral–Tasman'],null,'newsroom.co.nz'),
];

/* ---- theater tagging (content first, source home as fallback) ---- */
export const THEATERS = {
'Arabian Sea':['arabian sea','gulf of oman','strait of hormuz','hormuz','gwadar','karachi','makran','chabahar','balochistan','baluchistan','oman','yemen','houthi','socotra','muscat','iran','pakistan','gulf of aden'],
'Bay of Bengal':['bay of bengal','bangladesh','sri lanka','myanmar','burma','maldives','chittagong','chattogram','colombo','dhaka','rohingya',"cox's bazar",'sittwe','kyaukphyu','trincomalee','andaman islands','nicobar','rakhine','yangon','naypyidaw','male'],
'Malacca–Andaman':['strait of malacca','malacca','andaman sea','singapore strait','thailand','malaysia','singapore','phuket','penang','kra canal','kra isthmus','sumatra','johor','aceh','kuala lumpur','bangkok'],
'South China Sea':['south china sea','west philippine sea','spratly','paracel','scarborough','second thomas','ayungin','natuna','taiwan strait','taiwan','philippines','vietnam','hainan','luzon','palawan','gulf of tonkin','nine-dash','china coast guard','manila','hanoi','taipei','pla navy','reed bank','subi reef','mischief reef'],
'Archipelagic–Timor':['java sea','banda sea','timor sea','timor-leste','east timor','arafura','sulawesi','maluku','flores','bali','java','papua','west papua','makassar','lombok','sunda strait','jakarta','darwin','indonesia','dili'],
'Coral–Tasman':['tasman sea','coral sea','australia','new zealand','papua new guinea','solomon islands','vanuatu','fiji','canberra','sydney','auckland','wellington','queensland','melbourne','southwest pacific','pacific islands forum','torres strait'],
};

/* ---- axes & sub-tags (compound-phrase discipline for conflict) ---- */
export const AXES = {
Conflict: {
 kinetic:['air strike','airstrike','air raid','missile strike','missile attack','drone strike','drone attack','artillery','shelling','rocket attack','bombing','suicide bombing','killed in','death toll','casualties','offensive','invasion','ambush','gunmen','open fire','crossfire','explosion kill'],
 maritime:['coast guard','boarding','rammed','ramming','water cannon','fonop','freedom of navigation','maritime militia','incursion','intrusion','naval standoff','blockade','seized vessel','detained fishermen','harass','dangerous maneuver','collision at sea','gray-zone','grey-zone','eez violation','unsafe intercept'],
 posture:['militar','navy','navies','warship','frigate','destroyer','armed forces','air force','military exercise','joint drills','wargame','war game','troop deployment','troops deployed','carrier strike group','naval deployment','basing agreement','missile test','live-fire','mobilization','defence pact','defense pact','arms deal','arms sale','military aid','fighter jets','submarine deal','garrison'],
 insurgency:['insurgent','insurgency','militant','militants','armed group','rebel','rebels','terror attack','terrorist','extremist','ied','junta','coup','armed clash','ceasefire','crackdown','ethnic armed'],
},
Climate: {
 extreme:['cyclone','typhoon','hurricane','flood','flooding','flash flood','heatwave','heat wave','drought','landslide','wildfire','bushfire','storm surge','monsoon','torrential rain','el niño','la niña','extreme heat','record temperature','record rainfall'],
 slowonset:['sea level','sea-level','coastal erosion','glacier','glacial melt','salinity','saltwater intrusion','coral bleaching','ocean warming','marine heatwave','water scarcity','desertification','crop failure','sinking island','subsidence','groundwater depletion'],
 humanitarian:['displaced','displacement','evacuat','relief camp','humanitarian crisis','food insecurity','food crisis','famine','climate refugee','climate migration','disaster death','missing after','stranded'],
 response:['disaster response','disaster relief','hadr','humanitarian assistance','relief operation','rescue operation','emergency declared','state of emergency','early warning','disaster preparedness','climate adaptation','resilience fund','loss and damage'],
},
};

export const AXIS_META = {
Conflict:{color:'#B0473A',subs:{kinetic:'Kinetic',maritime:'Maritime / gray-zone',posture:'Posture & exercises',insurgency:'Insurgency & internal'}},
Climate:{color:'#2E7D6B',subs:{extreme:'Extreme weather',slowonset:'Slow-onset',humanitarian:'Displacement & humanitarian',response:'Response & adaptation'}},
};

export const COUNTRY_TAGS = ['Pakistan','India','Oman','Yemen','Iran','Maldives','Bangladesh','Sri Lanka','Myanmar','Thailand','Malaysia','Singapore','Brunei','China','Taiwan','Vietnam','Philippines','Indonesia','Timor-Leste','Papua New Guinea','Australia','New Zealand'];
