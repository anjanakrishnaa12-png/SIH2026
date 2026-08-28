/* starter scaffold retained for reference
const sidebarWidths = [74, 58, 82, 66, 71, 54];
const articleWidths = [100, 97, 94, 98, 86];

export default function Home() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-[#fbfaf8] text-zinc-900">
      <header
        aria-hidden="true"
        className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center border-b border-stone-200 bg-white/95 px-6 sm:px-14"
      >
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-full bg-stone-100" />
          <span className="h-3.5 w-28 rounded-full bg-stone-100" />
        </div>
        <span className="hidden h-9 w-[min(30vw,420px)] rounded-xl bg-stone-100 sm:block" />
        <div className="flex items-center justify-end gap-3">
          <span className="hidden h-9 w-9 rounded-full bg-stone-100 sm:block" />
          <span className="h-9 w-24 rounded-xl bg-stone-100" />
        </div>
      </header>

      <div
        aria-hidden="true"
        className="grid h-[calc(100%-76px)] grid-cols-[180px_minmax(0,1fr)_260px] gap-10 px-6 pb-24 pt-10 opacity-55 max-lg:grid-cols-[150px_minmax(0,1fr)] max-sm:grid-cols-1 sm:px-14"
      >
        <aside className="hidden border-r border-stone-200 pr-7 sm:block">
          <div className="mb-6 h-2.5 w-16 rounded-full bg-stone-200" />
          <div className="space-y-4">
            {sidebarWidths.map((width) => (
              <div key={width} className="flex items-center gap-3">
                <span className="h-4 w-4 rounded bg-stone-200" />
                <span
                  className="h-2.5 rounded-full bg-stone-200"
                  style={{ width: `${width}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mb-6 mt-9 h-2.5 w-24 rounded-full bg-stone-200" />
          <div className="space-y-4">
            {sidebarWidths.slice(0, 3).map((width) => (
              <span
                key={width}
                className="block h-2.5 rounded-full bg-stone-200"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        </aside>

        <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <div className="space-y-3">
            <div className="h-2.5 w-28 rounded-full bg-stone-200" />
            <div className="h-7 w-4/5 rounded-lg bg-stone-200" />
            <div className="h-7 w-3/5 rounded-lg bg-stone-200" />
          </div>
          <div className="min-h-[240px] flex-1 rounded-2xl bg-stone-200" />
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-full bg-stone-200" />
            <span className="h-2.5 w-28 rounded-full bg-stone-200" />
          </div>
          <div className="space-y-2">
            {articleWidths.map((width) => (
              <span
                key={width}
                className="block h-2.5 rounded-full bg-stone-200"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        </article>

        <aside className="space-y-5 max-lg:hidden">
          {[0, 1].map((card) => (
            <div
              key={card}
              className="space-y-4 rounded-2xl border border-stone-200 bg-white/70 p-6"
            >
              <span className="block h-10 w-10 rounded-full bg-stone-200" />
              <span className="block h-3 w-3/5 rounded-full bg-stone-200" />
              <span className="block h-2.5 w-full rounded-full bg-stone-200" />
              <span className="block h-2.5 w-4/5 rounded-full bg-stone-200" />
              <span className="block h-8 w-24 rounded-lg bg-stone-200" />
            </div>
          ))}
        </aside>
      </div>

      <section
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="absolute left-1/2 top-[clamp(96px,13vh,122px)] w-[min(620px,calc(100%-40px))] -translate-x-1/2 rounded-[18px] border border-stone-200 bg-white/95 px-5 py-5 shadow-[0_18px_50px_rgb(24_24_27/9%)] backdrop-blur-sm"
      >
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.09em] text-stone-500">
          Building your site
        </p>
        <h1 className="text-xl font-semibold tracking-tight">
          Your site is taking shape
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Your first version will appear here automatically when it’s ready.
        </p>
      </section>
    </main>
  );
}
*/

'use client';

import { useEffect, useMemo, useState } from 'react';

type View = 'overview' | 'sources' | 'onboarding' | 'events' | 'drift';
type Event = { time:string; source:string; class:string; severity:string; actor:string; target:string; outcome:string };

const sourceRows = [
  ['edge-fw-prod-01','Palo Alto','Syslog','active','842','12 sec ago','172.18.4.21'],
  ['northstar-vpn','Cisco ASA','Syslog','active','316','8 sec ago','10.42.8.14'],
  ['falcon-ids-east','CrowdStrike','JSON','active','274','19 sec ago','10.42.11.9'],
  ['gateway-proxy','Zscaler','LEEF','active','189','31 sec ago','10.42.5.31'],
  ['plant-ot-fw','Fortinet','CEF','degraded','76','2 min ago','192.168.88.1'],
  ['branch-mum-03','SonicWall','CSV','onboarding','—','Awaiting sample','—'],
  ['okta-access','Okta','JSON','active','131','14 sec ago','10.42.9.28'],
  ['waf-public','Cloudflare','JSON','active','458','11 sec ago','10.42.2.17'],
  ['legacy-ids-lab','Snort','Syslog','onboarding','—','Awaiting approval','10.42.77.6'],
  ['partner-sftp','Check Point','XML','active','54','48 sec ago','172.18.9.7'],
];
const events: Event[] = [
  {time:'16:42:18.901',source:'edge-fw-prod-01',class:'Network Activity',severity:'High',actor:'185.220.101.42',target:'10.42.8.19:443',outcome:'Blocked'},
  {time:'16:42:13.220',source:'falcon-ids-east',class:'Detection Finding',severity:'Critical',actor:'svc-backup',target:'dc-02.corp',outcome:'Alerted'},
  {time:'16:42:09.715',source:'northstar-vpn',class:'Authentication',severity:'Medium',actor:'j.fernandes',target:'vpn-gateway',outcome:'Success'},
  {time:'16:41:57.804',source:'waf-public',class:'Network Activity',severity:'High',actor:'45.155.205.61',target:'api.ulpf.dev',outcome:'Blocked'},
  {time:'16:41:43.491',source:'gateway-proxy',class:'HTTP Activity',severity:'Low',actor:'a.kapoor',target:'github.com',outcome:'Allowed'},
  {time:'16:41:20.404',source:'okta-access',class:'Authentication',severity:'Medium',actor:'m.singh',target:'admin-console',outcome:'MFA denied'},
  {time:'16:41:01.061',source:'plant-ot-fw',class:'Network Activity',severity:'High',actor:'192.168.88.45',target:'plc-07:502',outcome:'Blocked'},
  {time:'16:40:46.398',source:'partner-sftp',class:'File Activity',severity:'Low',actor:'partner_sync',target:'sftp-dropbox',outcome:'Allowed'},
  {time:'16:40:22.103',source:'edge-fw-prod-01',class:'Network Activity',severity:'Informational',actor:'10.42.10.17',target:'10.42.2.4:53',outcome:'Allowed'},
  {time:'16:39:58.849',source:'falcon-ids-east',class:'Detection Finding',severity:'High',actor:'r.chen',target:'workstation-229',outcome:'Alerted'},
];
const rules = [
  {id:'R-1029',title:'FortiGate Traffic v7.4',fmt:'CEF',source:'plant-ot-fw',confidence:91,provenance:'SLM-generated',raw:'date=2026-08-28 time=16:40:58 devname=PLANT-FW type=traffic srcip=192.168.88.45 dstip=10.42.2.19 dstport=502 action=deny',json:'{\n  "class_uid": 4001,\n  "activity_name": "Traffic Deny",\n  "src_endpoint": { "ip": "192.168.88.45" },\n  "dst_endpoint": { "ip": "10.42.2.19", "port": 502 },\n  "disposition": "Block"\n}'},
  {id:'R-1028',title:'SonicWall Event Log',fmt:'CSV',source:'branch-mum-03',confidence:84,provenance:'SLM-generated',raw:'2026-08-28,16:27:14,BR-MUM-03,IPS,172.16.23.91,10.42.18.22,ET SCAN Nmap Scripting Engine,drop',json:'{\n  "class_uid": 2004,\n  "finding_info": { "title": "ET SCAN Nmap Scripting Engine" },\n  "src_endpoint": { "ip": "172.16.23.91" },\n  "dst_endpoint": { "ip": "10.42.18.22" },\n  "disposition": "Block"\n}'},
  {id:'R-1027',title:'Snort Fast Alert',fmt:'Syslog',source:'legacy-ids-lab',confidence:88,provenance:'Human-edited',raw:'Aug 28 16:12:03 lab-ids snort[2553]: [1:2024219:5] ET TROJAN Suspicious User-Agent [Classification: Malware] [Priority: 1] {TCP} 10.9.2.12:51204 -> 10.42.7.22:80',json:'{\n  "class_uid": 2004,\n  "severity": "Critical",\n  "finding_info": { "title": "ET TROJAN Suspicious User-Agent" },\n  "src_endpoint": { "ip": "10.9.2.12", "port": 51204 },\n  "dst_endpoint": { "ip": "10.42.7.22", "port": 80 }\n}'},
  {id:'R-1026',title:'Check Point Audit Trail',fmt:'XML',source:'partner-sftp',confidence:96,provenance:'SLM-generated',raw:'<log time="16:02:11" product="VPN-1" action="accept" src="10.80.4.17" dst="172.18.9.7" service="ssh"/>',json:'{\n  "class_uid": 4001,\n  "activity_name": "Traffic Allow",\n  "src_endpoint": { "ip": "10.80.4.17" },\n  "dst_endpoint": { "ip": "172.18.9.7" },\n  "service": { "name": "ssh" }\n}'},
  {id:'R-1025',title:'Cloudflare WAF Event',fmt:'JSON',source:'waf-public',confidence:98,provenance:'Human-authored',raw:'{"RayID":"8b72f2113b09319a","Action":"block","ClientIP":"45.155.205.61","RuleID":"949110","Host":"api.ulpf.dev"}',json:'{\n  "class_uid": 4001,\n  "activity_name": "WAF Block",\n  "metadata": { "uid": "8b72f2113b09319a" },\n  "src_endpoint": { "ip": "45.155.205.61" },\n  "dst_endpoint": { "hostname": "api.ulpf.dev" },\n  "disposition": "Block"\n}'},
];
const deployed = [
  ['R-0082','Palo Alto Threat v11.1','edge-fw-prod-01',99,'stable','All field extraction rates within baseline'],
  ['R-0147','Cisco ASA Auth v9.18','northstar-vpn',97,'stable','No schema or parsing variance observed'],
  ['R-0198','CrowdStrike EDR JSON','falcon-ids-east',95,'stable','Minor optional-field variance accepted'],
  ['R-0236','Zscaler Web Proxy LEEF','gateway-proxy',89,'watch','URI extraction variance increased 7%'],
  ['R-0314','FortiGate Traffic v7.2','plant-ot-fw',61,'degrading','Field extraction rate dropped 40% after vendor firmware update'],
  ['R-0341','SonicWall CSV v7','branch-mum-03',0,'quarantined','Unexpected delimiter and column count detected'],
  ['R-0390','Okta System Log','okta-access',98,'stable','Stable against current baseline'],
  ['R-0412','Cloudflare Firewall Events','waf-public',94,'stable','One optional field renamed by vendor'],
  ['R-0479','Snort Fast Alert 2.1','legacy-ids-lab',78,'watch','Signature metadata extraction trending down'],
  ['R-0520','Check Point XML Audit','partner-sftp',92,'stable','Stable against current baseline'],
];
function Badge({children,tone='blue'}:{children:React.ReactNode;tone?:string}){return <span className={`badge ${tone}`}>{children}</span>}
function Status({value}:{value:string}){let t=value==='active'||value==='stable'||value==='Success'||value==='Allowed'?'good':value==='degraded'||value==='quarantined'||value==='Blocked'?'bad':'warn';return <span className={`status ${t}`}><i/>{value}</span>}
function Spark({score}:{score:number}){return <div className="spark">{Array.from({length:14},(_,i)=><i key={i} style={{height:`${Math.max(15,Math.min(95,score+(i*11)%18-9))}%`}}/>)}</div>}
function Bars(){return <div className="bars">{[38,45,34,52,47,61,56,74,69,82,68,78,66,87,73,91,84,76,95,88,104,93,111,99].map((n,i)=><i key={i} className={i>18?'new':''} style={{height:`${n}%`}}/>)}</div>}

export default function Home(){
 const [view,setView]=useState<View>('overview'),[eps,setEps]=useState(2340),[modal,setModal]=useState(false),[rule,setRule]=useState(0),[event,setEvent]=useState(0),[search,setSearch]=useState(''),[toast,setToast]=useState(''),[auto,setAuto]=useState(true),[ruleAction,setRuleAction]=useState<Record<string,string>>({});
 useEffect(()=>{const id=setInterval(()=>setEps(v=>Math.max(2210,Math.min(2465,v+Math.round((Math.random()-.46)*54)))),1800);return()=>clearInterval(id)},[]);
 useEffect(()=>{if(toast){const id=setTimeout(()=>setToast(''),2500);return()=>clearTimeout(id)}},[toast]);
 const filtered=useMemo(()=>events.filter(e=>Object.values(e).join(' ').toLowerCase().includes(search.toLowerCase())),[search]);
 const titles:Record<View,[string,string]>={overview:['Security telemetry, normalized.','Monitor ingestion health, rule quality, and schema coverage in one place.'],sources:['Log sources','Connected perimeter telemetry and ingestion status.'],onboarding:['Onboarding queue','Review AI-generated normalization rules before they reach production.'],events:['Normalized event browser','Search the canonical OCSF event stream and trace every record to its origin.'],drift:['Rule drift monitor','Track parser quality over time and intervene before coverage is lost.']};
 const act=(a:string)=>{setRuleAction(s=>({...s,[rules[rule].id]:a}));setToast(`${rules[rule].id} ${a.toLowerCase()} — queue updated`)};
 return <main className="shell"><aside className="side"><div className="brand"><b>U</b><strong>ULPF</strong></div><p className="workspace">OPERATIONS</p>{([['overview','◫','Overview'],['sources','▣','Log Sources'],['onboarding','◈','Onboarding Queue'],['events','⌁','Event Browser'],['drift','⌇','Drift Monitor']] as [View,string,string][]).map(([id,ic,label])=><button key={id} onClick={()=>setView(id)} className={`nav ${view===id?'sel':''}`}><i>{ic}</i><span>{label}</span>{id==='onboarding'&&<em>5</em>}{id==='drift'&&<em>3</em>}</button>)}<footer><div><i/> AIR-GAPPED MODE</div><p>OCSF v1.4.0<br/>Policy pack: prod-east</p></footer></aside><section className="content"><header><div><p className="eyebrow">UNIVERSAL LOG PRE-PROCESSING FRAMEWORK</p><h1>{titles[view][0]}</h1><p className="sub">{titles[view][1]}</p></div><div className="profile"><button onClick={()=>setToast('All systems nominal')}>◌<b>3</b></button><span>KA</span><div><strong>K. Anand</strong><small>Security engineer</small></div></div></header><div className="main">{view==='overview'&&<Overview eps={eps} go={setView}/>} {view==='sources'&&<Sources add={()=>setModal(true)} note={setToast}/>} {view==='onboarding'&&<Onboarding idx={rule} setIdx={setRule} state={ruleAction} act={act}/>} {view==='events'&&<Events search={search} setSearch={setSearch} list={filtered} chosen={event} setChosen={setEvent}/>} {view==='drift'&&<Drift auto={auto} setAuto={setAuto} note={setToast}/>}</div></section>{modal&&<Modal close={()=>setModal(false)} note={setToast}/>} {toast&&<div className="toast">✓ {toast}</div>}</main>
}
function Overview({eps,go}:{eps:number;go:(v:View)=>void}){return <><div className="kpis">{[['Events / second',eps.toLocaleString(),'+12.8% vs 1h ago','blue'],['Active sources','8 / 10','2 onboarding','green'],['Rules pending review','05','Median confidence 91%','amber'],['Drift / quarantine','2 / 1','Requires attention','red']].map(x=><article className="kpi" key={x[0]}><p>{x[0]}</p><strong>{x[1]}</strong><small className={x[3]}>↗ {x[2]}</small></article>)}</div><div className="grid"><section className="card chart"><div className="cardhead"><div><h2>Event throughput</h2><p>Normalized events over the last 24 hours</p></div><Badge>LIVE</Badge></div><div className="plot"><aside>2.8k<br/>2.1k<br/>1.4k<br/>700</aside><div><Bars/></div></div><div className="labels"><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>Now</span></div><small className="legend">■ Current: <b>{eps.toLocaleString()} EPS</b>　▣ Baseline: 2,212 EPS</small></section><section className="card volume"><div className="cardhead"><div><h2>Volume by source type</h2><p>Last 24 hours · 48.6M events</p></div><button className="tiny">24h⌄</button></div><div className="doughnut"><div><b>48.6M</b><span>events</span></div></div><div className="legendlist">{[['Firewall','38%'],['IDS / EDR','24%'],['VPN','17%'],['Proxy / WAF','14%'],['Other','7%']].map((x,i)=><p key={x[0]}><i className={'dot d'+i}/>{x[0]}<b>{x[1]}</b></p>)}</div></section><section className="card alerts"><div className="cardhead"><div><h2>Recent control-plane alerts</h2><p>Parser health and ingestion changes</p></div><button className="link" onClick={()=>go('drift')}>View monitor →</button></div>{[['DRIFT','FortiGate Traffic v7.2 extraction rate decreased 40%','4 min ago','warn'],['ONBOARD','New SonicWall source is ready for parser review','18 min ago','blue'],['QUARANTINED','SonicWall CSV v7 reverted to R-0328','36 min ago','bad'],['HEALTHY','Cloudflare WAF rule accepted optional field change','1 hr ago','good']].map(x=><div className="alert" key={x[1]}><Badge tone={x[3]}>{x[0]}</Badge><p>{x[1]}<small>{x[2]}</small></p><b>›</b></div>)}</section><section className="card coverage"><div className="cardhead"><div><h2>OCSF class coverage</h2><p>Current normalized stream</p></div><Badge tone="good">98.6%</Badge></div>{[['Network Activity',91],['Authentication',76],['Detection Finding',68],['HTTP Activity',49],['File Activity',31]].map(x=><div className="cover" key={x[0]}><span>{x[0]}</span><i><b style={{width:x[1]+'%'}}/></i><strong>{x[1]}%</strong></div>)}</section></div></>}
function Sources({add,note}:{add:()=>void;note:(s:string)=>void}){return <><div className="tools"><div className="search">⌕<input placeholder="Search source, vendor, format…"/></div><button className="tiny">All statuses⌄</button><button className="primary" onClick={add}>+ Add new source</button></div><section className="card tablecard"><div className="tablemeta"><span><b>10</b> connected sources</span><span>Last sync: just now</span></div><table><thead><tr><th>Source</th><th>Vendor</th><th>Format</th><th>Status</th><th>Events/sec</th><th>Last seen</th><th>Collector</th><th/></tr></thead><tbody>{sourceRows.map(x=><tr key={x[0]}><td><strong>{x[0]}</strong><small>{x[6]}</small></td><td>{x[1]}</td><td><code>{x[2]}</code></td><td><Status value={x[3]}/></td><td>{x[4]}</td><td className="muted">{x[5]}</td><td><code>col-east-02</code></td><td><button className="dots" onClick={()=>note(x[0]+' configuration opened')}>•••</button></td></tr>)}</tbody></table></section></>}
function Onboarding({idx,setIdx,state,act}:{idx:number;setIdx:(i:number)=>void;state:Record<string,string>;act:(s:string)=>void}){let r=rules[idx],s=state[r.id]||'Pending';let mappings=[['srcip','192.168.88.45','src_endpoint.ip','Direct'],['dstip','10.42.2.19','dst_endpoint.ip','Direct'],['action','deny / block','disposition','Enum map'],['type','traffic','class_uid','Class resolve']];return <div className="onboard"><aside className="queue"><div>REVIEW QUEUE <Badge tone="warn">5 PENDING</Badge></div>{rules.map((x,i)=><button onClick={()=>setIdx(i)} className={i===idx?'picked':''} key={x.id}><p><code>{x.id}</code><Badge tone={x.confidence>90?'good':'warn'}>{x.confidence}%</Badge></p><strong>{x.title}</strong><small>{x.source} · {x.fmt}</small></button>)}</aside><section><div className="rulehead"><div><p><code>{r.id}</code> · <Badge tone={s==='Approved'?'good':s==='Rejected'?'bad':'warn'}>{s.toUpperCase()}</Badge></p><h2>{r.title}</h2><small>Proposed for <b>{r.source}</b> · {r.fmt}</small></div><div><button className="secondary" onClick={()=>act('Edited')}>Edit mapping</button><button className="reject" onClick={()=>act('Rejected')}>Reject</button><button className="primary" onClick={()=>act('Approved')}>Approve rule</button></div></div><div className="confidence"><div><small>MODEL CONFIDENCE</small><b>{r.confidence}%</b><i><em style={{width:r.confidence+'%'}}/></i></div><div><small>RULE PROVENANCE</small><Badge>✦ {r.provenance}</Badge></div><div><small>TARGET TAXONOMY</small><b>OCSF 1.4.0</b></div></div><div className="rawnorm"><Log title="RAW SAMPLE" badge={r.fmt} content={r.raw}/><Log title="NORMALIZED OUTPUT" badge="OCSF" content={r.json} normal/></div><section className="card diff"><div className="cardhead"><div><h2>Field mapping review</h2><p>Traceable transformation from original event to OCSF record</p></div><button className="tiny">Expand all</button></div><div className="diffhead"><span>RAW FIELD</span><span>EXTRACTED VALUE</span><span>OCSF DESTINATION</span><span>TRANSFORM</span></div>{mappings.map(x=><div className="diffrow" key={x[0]}><code>{x[0]}</code><code>{x[1]}</code><code className="field">{x[2]}</code><Badge tone={x[3]==='Direct'?'good':'blue'}>{x[3]}</Badge></div>)}</section></section></div>}
function Log({title,badge,content,normal}:{title:string;badge:string;content:string;normal?:boolean}){return <section className={normal?'normal':'raw'}><div><span>{title}</span><Badge tone={normal?'blue':'slate'}>{badge}</Badge></div><pre>{content}</pre></section>}
function Events({search,setSearch,list,chosen,setChosen}:{search:string;setSearch:(s:string)=>void;list:Event[];chosen:number;setChosen:(n:number)=>void}){let e=list[chosen]||list[0];return <><div className="tools"><div className="search wide">⌕<input value={search} onChange={x=>{setSearch(x.target.value);setChosen(0)}} placeholder="Search actor, IP, event class, source, target…"/></div><button className="tiny">Severity⌄</button><button className="tiny">Class⌄</button><button className="tiny">Last 24h⌄</button></div><div className="eventlayout"><section className="card tablecard"><div className="tablemeta"><span><b>{list.length}</b> normalized events</span><span>OCSF canonical view</span></div><table className="eventtable"><thead><tr><th>Timestamp</th><th>Source</th><th>Event class</th><th>Severity</th><th>Actor</th><th>Target</th><th>Disposition</th></tr></thead><tbody>{list.map((x,i)=><tr className={i===chosen?'chosen':''} onClick={()=>setChosen(i)} key={x.time}><td><code>{x.time}</code></td><td><strong>{x.source}</strong></td><td>{x.class}</td><td><Badge tone={x.severity==='Critical'||x.severity==='High'?'bad':x.severity==='Medium'?'warn':'blue'}>{x.severity}</Badge></td><td><code>{x.actor}</code></td><td><code>{x.target}</code></td><td><Status value={x.outcome}/></td></tr>)}</tbody></table></section>{e&&<Trace event={e}/>}</div></>}
function Trace({event}:{event:Event}){let raw=`<134>Aug 28 ${event.time} PA-EDGE-01 1,2026/08/28,${event.time},001801000024,THREAT,url,0,${event.actor},${event.target},block-url,tcp,${event.outcome.toLowerCase()}`;let json=`{\n  "time": "2026-08-28T${event.time}Z",\n  "class_uid": ${event.class==='Detection Finding'?2004:4001},\n  "class_name": "${event.class}",\n  "severity": "${event.severity}",\n  "src_endpoint": { "ip": "${event.actor}" },\n  "dst_endpoint": { "hostname": "${event.target}" },\n  "disposition": "${event.outcome}"\n}`;return <aside className="trace"><p><Badge>TRACE ID · EVT-8B72F211</Badge></p><h2>Raw ↔ normalized</h2><small>Linked transformation record</small><div className="verified">● Original event retained · SHA-256 verified</div><Log title="ORIGINAL RAW LOG" badge="Syslog" content={raw}/><div className="connector">↓ ── <b>ULPF R-0082</b> ── ↓</div><Log title="OCSF NORMALIZED" badge="v1.4.0" content={json} normal/></aside>}
function Drift({auto,setAuto,note}:{auto:boolean;setAuto:(x:boolean)=>void;note:(s:string)=>void}){return <><div className="driftcards"><section className="card"><p>Fleet parser health</p><strong>93.2<small>%</small></strong><i className="health"><b/></i><small>↑ 1.4% over 7 days</small></section><section className="card"><p>Automatic response policy</p><div className="toggle"><button className={auto?'on':''} onClick={()=>setAuto(true)}>Auto-quarantine</button><button className={!auto?'on':''} onClick={()=>setAuto(false)}>Revert previous</button></div><small>{auto?'Degraded rules are isolated after 3 consecutive failures.':'Degraded rules revert to the latest healthy version.'}</small></section><section className="card"><p>Last policy action</p><strong className="red">R-0341 quarantined</strong><small>36 minutes ago · SonicWall CSV v7</small></section></div><section className="card tablecard"><div className="cardhead pad"><div><h2>Deployed parsing rules</h2><p>30-day quality signal, latest observation, and automated action</p></div><button className="tiny" onClick={()=>note('Drift baselines recalculated')}>↻ Recalculate baselines</button></div><table><thead><tr><th>Rule</th><th>Source</th><th>Health</th><th>30d trend</th><th>State</th><th>Reason / action</th><th/></tr></thead><tbody>{deployed.map(x=><tr key={x[0]}><td><code>{x[0]}</code><strong>{x[1]}</strong></td><td>{x[2]}</td><td><b className={x[4]}>{x[3]}%</b></td><td><Spark score={x[3] as number}/></td><td><Status value={x[4]}/></td><td className="reason">{x[5]}</td><td><button className="dots" onClick={()=>note(x[0]+' history opened')}>•••</button></td></tr>)}</tbody></table></section></>}
function Modal({close,note}:{close:()=>void;note:(s:string)=>void}){const [step,setStep]=useState(1),[format,setFormat]=useState('Syslog');return <div className="modalwrap"><section className="modal"><button className="x" onClick={close}>×</button><p className="eyebrow">NEW INGESTION SOURCE</p><h2>Add a perimeter device</h2><p>ULPF will profile a raw sample locally and draft a normalization rule for review.</p><div className="steps"><b className="on">1. Source</b><i/><b className={step>1?'on':''}>2. Sample</b><i/><b className={step>2?'on':''}>3. Review</b></div>{step===1&&<div className="form"><label>Source name<input defaultValue="branch-del-01"/></label><label>Vendor<select defaultValue="SonicWall"><option>SonicWall</option><option>Palo Alto</option><option>Fortinet</option></select></label><label className="full">Log format<div className="formats">{['Syslog','CEF','LEEF','JSON','XML','CSV'].map(f=><button className={format===f?'selected':''} onClick={()=>setFormat(f)} key={f}>{f}</button>)}</div></label><label className="full">Collector endpoint<input defaultValue="col-east-02 / UDP 514"/></label></div>}{step===2&&<><label className="drop">⇧<b>Drop a raw log sample here</b><small>or paste a representative event below · never leaves this air-gapped workspace</small></label><textarea defaultValue="Aug 28 16:48:12 BRANCH-DEL-01 event=connection src=10.24.9.5 dst=10.42.2.19 action=allow"/></>}{step===3&&<div className="ready"><b>✓</b><h3>Sample profiled successfully</h3><p>Format confidence: <em>96%</em> · 12 fields detected · OCSF class candidate: Network Activity</p><code>src → src_endpoint.ip　 dst → dst_endpoint.ip　 action → disposition</code></div>}<div className="modalactions"><button className="secondary" onClick={step===1?close:()=>setStep(step-1)}>{step===1?'Cancel':'Back'}</button><button className="primary" onClick={()=>step<3?setStep(step+1):(close(),note('Source submitted to onboarding queue'))}>{step===3?'Send to review queue':'Continue'}</button></div></section></div>}
