/* Bugsale · cabeçalho, menu e páginas de artigos (dados em js/data.js) */
(function(){
const R = window.MQ_ROOT || "";   /* prefixo até a raiz do site ("" na raiz, "../../" nos artigos) */
/* modo claro/escuro: o padrão é o automático (segue o navegador; se não der para saber, claro).
   Quem clica no sol/lua fixa o modo; escolher o mesmo modo do navegador volta para o automático.
   A escolha fica em três lugares, porque nem todo navegador (ou o iframe da prévia) mantém o localStorage */
const temaSistema = () => { try{ return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }catch(e){ return "light"; } };
const temaManual = () => document.documentElement.dataset.temaManual === "1";
function salvaTema(t){
  const auto = !t;
  document.documentElement.dataset.temaManual = auto ? "" : "1";
  try{ auto ? localStorage.removeItem("bs-theme") : localStorage.setItem("bs-theme", t); }catch(e){}
  try{ window.name = (String(window.name).replace(/;?bs-theme=\w+/g,"") + (auto ? "" : ";bs-theme=" + t)).replace(/^;/,""); }catch(e){}
  try{ const u = new URL(location.href); u.searchParams.set("tema", auto ? "auto" : t); history.replaceState(history.state, "", u.pathname + u.search + u.hash); }catch(e){}
}
/* no automático, acompanha a troca de modo do sistema na hora */
try{ matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ()=>{ if(!temaManual()) document.documentElement.dataset.theme = temaSistema(); }); }catch(e){}
function comTema(href){
  try{ const u = new URL(href, location.href); if(u.origin !== location.origin || /^(mailto|tel|javascript):/i.test(href)) return null;
    u.searchParams.set("tema", temaManual() ? (document.documentElement.dataset.theme || "light") : "auto");
    return href.split("?")[0].split("#")[0] + "?" + u.searchParams.toString() + (u.hash||""); }catch(e){ return null; }
}
const LOGO = `<svg class="bug" viewBox="0 0 10.889 8.889" aria-hidden="true"><g fill="#D4AF5A"><rect x="1" y="0" width="0.889" height="0.889"/><rect x="9" y="0" width="0.889" height="0.889"/><rect x="2" y="1" width="0.889" height="0.889"/><rect x="4" y="1" width="0.889" height="0.889"/><rect x="5" y="1" width="0.889" height="0.889"/><rect x="6" y="1" width="0.889" height="0.889"/><rect x="8" y="1" width="0.889" height="0.889"/><rect x="4" y="2" width="0.889" height="0.889"/><rect x="5" y="2" width="0.889" height="0.889"/><rect x="6" y="2" width="0.889" height="0.889"/><rect x="0" y="3" width="0.889" height="0.889"/><rect x="2" y="3" width="0.889" height="0.889"/><rect x="3" y="3" width="0.889" height="0.889"/><rect x="4" y="3" width="0.889" height="0.889"/><rect x="5" y="3" width="0.889" height="0.889"/><rect x="6" y="3" width="0.889" height="0.889"/><rect x="7" y="3" width="0.889" height="0.889"/><rect x="8" y="3" width="0.889" height="0.889"/><rect x="10" y="3" width="0.889" height="0.889"/><rect x="1" y="4" width="0.889" height="0.889"/><rect x="2" y="4" width="0.889" height="0.889"/><rect x="3" y="4" width="0.889" height="0.889"/><rect x="4" y="4" width="0.889" height="0.889"/><rect x="6" y="4" width="0.889" height="0.889"/><rect x="7" y="4" width="0.889" height="0.889"/><rect x="8" y="4" width="0.889" height="0.889"/><rect x="9" y="4" width="0.889" height="0.889"/><rect x="0" y="5" width="0.889" height="0.889"/><rect x="2" y="5" width="0.889" height="0.889"/><rect x="3" y="5" width="0.889" height="0.889"/><rect x="4" y="5" width="0.889" height="0.889"/><rect x="6" y="5" width="0.889" height="0.889"/><rect x="7" y="5" width="0.889" height="0.889"/><rect x="8" y="5" width="0.889" height="0.889"/><rect x="10" y="5" width="0.889" height="0.889"/><rect x="1" y="6" width="0.889" height="0.889"/><rect x="2" y="6" width="0.889" height="0.889"/><rect x="3" y="6" width="0.889" height="0.889"/><rect x="4" y="6" width="0.889" height="0.889"/><rect x="6" y="6" width="0.889" height="0.889"/><rect x="7" y="6" width="0.889" height="0.889"/><rect x="8" y="6" width="0.889" height="0.889"/><rect x="9" y="6" width="0.889" height="0.889"/><rect x="0" y="7" width="0.889" height="0.889"/><rect x="2" y="7" width="0.889" height="0.889"/><rect x="3" y="7" width="0.889" height="0.889"/><rect x="4" y="7" width="0.889" height="0.889"/><rect x="6" y="7" width="0.889" height="0.889"/><rect x="7" y="7" width="0.889" height="0.889"/><rect x="8" y="7" width="0.889" height="0.889"/><rect x="10" y="7" width="0.889" height="0.889"/><rect x="3" y="8" width="0.889" height="0.889"/><rect x="4" y="8" width="0.889" height="0.889"/><rect x="6" y="8" width="0.889" height="0.889"/><rect x="7" y="8" width="0.889" height="0.889"/></g></svg>`;
const LOGO_SQ = `<svg viewBox="-0.5 -1.5 12 12" aria-hidden="true" shape-rendering="crispEdges"><g fill="#D4AF5A"><rect x="1" y="0" width="1" height="1"/><rect x="9" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="4" y="1" width="1" height="1"/><rect x="5" y="1" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="8" y="1" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="0" y="3" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="4" y="3" width="1" height="1"/><rect x="5" y="3" width="1" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="7" y="3" width="1" height="1"/><rect x="8" y="3" width="1" height="1"/><rect x="10" y="3" width="1" height="1"/><rect x="1" y="4" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="4" width="1" height="1"/><rect x="4" y="4" width="1" height="1"/><rect x="6" y="4" width="1" height="1"/><rect x="7" y="4" width="1" height="1"/><rect x="8" y="4" width="1" height="1"/><rect x="9" y="4" width="1" height="1"/><rect x="0" y="5" width="1" height="1"/><rect x="2" y="5" width="1" height="1"/><rect x="3" y="5" width="1" height="1"/><rect x="4" y="5" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="7" y="5" width="1" height="1"/><rect x="8" y="5" width="1" height="1"/><rect x="10" y="5" width="1" height="1"/><rect x="1" y="6" width="1" height="1"/><rect x="2" y="6" width="1" height="1"/><rect x="3" y="6" width="1" height="1"/><rect x="4" y="6" width="1" height="1"/><rect x="6" y="6" width="1" height="1"/><rect x="7" y="6" width="1" height="1"/><rect x="8" y="6" width="1" height="1"/><rect x="9" y="6" width="1" height="1"/><rect x="0" y="7" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="3" y="7" width="1" height="1"/><rect x="4" y="7" width="1" height="1"/><rect x="6" y="7" width="1" height="1"/><rect x="7" y="7" width="1" height="1"/><rect x="8" y="7" width="1" height="1"/><rect x="10" y="7" width="1" height="1"/><rect x="3" y="8" width="1" height="1"/><rect x="4" y="8" width="1" height="1"/><rect x="6" y="8" width="1" height="1"/><rect x="7" y="8" width="1" height="1"/></g></svg>`;
window.MQ_LOGO = LOGO;
/* logo final: bug de pixel + "bugsale" em Space Grotesk 700 convertido em desenho (não depende da fonte carregar) */
const LOCKUP = `<svg class="lockup" viewBox="0 0 768 160" role="img" aria-label="Bugsale"><g class="bs-bug" fill="#D4AF5A"><rect x="18" y="0" width="16" height="16"/><rect x="162" y="0" width="16" height="16"/><rect x="36" y="18" width="16" height="16"/><rect x="72" y="18" width="16" height="16"/><rect x="90" y="18" width="16" height="16"/><rect x="108" y="18" width="16" height="16"/><rect x="144" y="18" width="16" height="16"/><rect x="72" y="36" width="16" height="16"/><rect x="90" y="36" width="16" height="16"/><rect x="108" y="36" width="16" height="16"/><rect x="0" y="54" width="16" height="16"/><rect x="36" y="54" width="16" height="16"/><rect x="54" y="54" width="16" height="16"/><rect x="72" y="54" width="16" height="16"/><rect x="90" y="54" width="16" height="16"/><rect x="108" y="54" width="16" height="16"/><rect x="126" y="54" width="16" height="16"/><rect x="144" y="54" width="16" height="16"/><rect x="180" y="54" width="16" height="16"/><rect x="18" y="72" width="16" height="16"/><rect x="36" y="72" width="16" height="16"/><rect x="54" y="72" width="16" height="16"/><rect x="72" y="72" width="16" height="16"/><rect x="108" y="72" width="16" height="16"/><rect x="126" y="72" width="16" height="16"/><rect x="144" y="72" width="16" height="16"/><rect x="162" y="72" width="16" height="16"/><rect x="0" y="90" width="16" height="16"/><rect x="36" y="90" width="16" height="16"/><rect x="54" y="90" width="16" height="16"/><rect x="72" y="90" width="16" height="16"/><rect x="108" y="90" width="16" height="16"/><rect x="126" y="90" width="16" height="16"/><rect x="144" y="90" width="16" height="16"/><rect x="180" y="90" width="16" height="16"/><rect x="18" y="108" width="16" height="16"/><rect x="36" y="108" width="16" height="16"/><rect x="54" y="108" width="16" height="16"/><rect x="72" y="108" width="16" height="16"/><rect x="108" y="108" width="16" height="16"/><rect x="126" y="108" width="16" height="16"/><rect x="144" y="108" width="16" height="16"/><rect x="162" y="108" width="16" height="16"/><rect x="0" y="126" width="16" height="16"/><rect x="36" y="126" width="16" height="16"/><rect x="54" y="126" width="16" height="16"/><rect x="72" y="126" width="16" height="16"/><rect x="108" y="126" width="16" height="16"/><rect x="126" y="126" width="16" height="16"/><rect x="144" y="126" width="16" height="16"/><rect x="180" y="126" width="16" height="16"/><rect x="54" y="144" width="16" height="16"/><rect x="72" y="144" width="16" height="16"/><rect x="108" y="144" width="16" height="16"/><rect x="126" y="144" width="16" height="16"/></g><g class="bs-word" fill="#F4F4F1" transform="translate(228 0)"><path d="M55.199999999999996 129.0Q45.15 129.0 39.75 125.55Q34.35 122.1 31.799999999999997 117.89999999999999H29.099999999999998V126.89999999999999H10.5V21.89999999999999H29.4V61.05H32.1Q33.75 58.349999999999994 36.525 55.949999999999996Q39.3 53.55 43.875 51.974999999999994Q48.449999999999996 50.39999999999999 55.199999999999996 50.39999999999999Q64.2 50.39999999999999 71.85 54.824999999999996Q79.5 59.25 84.15 67.8Q88.8 76.35 88.8 88.5V90.89999999999999Q88.8 103.05 84.15 111.6Q79.5 120.14999999999999 71.85 124.57499999999999Q64.2 129.0 55.199999999999996 129.0ZM49.5 112.5Q58.199999999999996 112.5 64.05 106.875Q69.89999999999999 101.25 69.89999999999999 90.44999999999999V88.94999999999999Q69.89999999999999 78.14999999999999 64.125 72.52499999999999Q58.349999999999994 66.89999999999999 49.5 66.89999999999999Q40.8 66.89999999999999 34.949999999999996 72.52499999999999Q29.099999999999998 78.14999999999999 29.099999999999998 88.94999999999999V90.44999999999999Q29.099999999999998 101.25 34.949999999999996 106.875Q40.8 112.5 49.5 112.5Z M128.55 128.1Q119.85 128.1 113.32499999999999 124.125Q106.8 120.14999999999999 103.2 113.1Q99.60000000000001 106.05 99.60000000000001 96.89999999999999V52.5H118.5V95.39999999999999Q118.5 103.8 122.625 108.0Q126.75 112.19999999999999 134.4 112.19999999999999Q143.1 112.19999999999999 147.89999999999998 106.42499999999998Q152.7 100.64999999999999 152.7 90.29999999999998V52.5H171.6V126.89999999999999H153.0V117.14999999999999H150.3Q148.5 120.89999999999999 143.55 124.5Q138.6 128.1 128.55 128.1Z M183.0 90.0V87.6Q183.0 75.89999999999999 187.64999999999998 67.57499999999999Q192.29999999999998 59.25 200.02499999999998 54.824999999999996Q207.75 50.39999999999999 216.89999999999998 50.39999999999999Q227.1 50.39999999999999 232.35 53.99999999999999Q237.6 57.599999999999994 240.0 61.5H242.7V52.5H261.3V140.1Q261.3 147.75 256.8 152.325Q252.3 156.89999999999998 244.8 156.89999999999998H195.0V140.39999999999998H238.2Q242.39999999999998 140.39999999999998 242.39999999999998 135.89999999999998V116.55H239.7Q238.2 118.94999999999999 235.5 121.42499999999998Q232.79999999999998 123.89999999999999 228.29999999999998 125.54999999999998Q223.79999999999998 127.19999999999999 216.89999999999998 127.19999999999999Q207.75 127.19999999999999 200.02499999999998 122.77499999999999Q192.29999999999998 118.35 187.64999999999998 110.02499999999999Q183.0 101.69999999999999 183.0 90.0ZM222.29999999999998 110.69999999999999Q231.0 110.69999999999999 236.85 105.14999999999999Q242.7 99.6 242.7 89.54999999999998V88.04999999999998Q242.7 77.85 236.92499999999998 72.375Q231.14999999999998 66.89999999999999 222.29999999999998 66.89999999999999Q213.6 66.89999999999999 207.75 72.375Q201.9 77.85 201.9 88.04999999999998V89.54999999999998Q201.9 99.6 207.75 105.14999999999999Q213.6 110.69999999999999 222.29999999999998 110.69999999999999Z M307.2 129.0Q292.65000000000003 129.0 283.35 122.69999999999999Q274.05 116.39999999999999 272.1 104.69999999999999L289.5 100.19999999999999Q290.55 105.44999999999999 293.025 108.44999999999999Q295.5 111.44999999999999 299.175 112.725Q302.85 113.99999999999999 307.2 113.99999999999999Q313.8 113.99999999999999 316.95000000000005 111.67499999999998Q320.1 109.35 320.1 105.89999999999999Q320.1 102.44999999999999 317.1 100.57499999999999Q314.1 98.69999999999999 307.5 97.5L303.3 96.75Q295.5 95.25 289.05 92.625Q282.6 90.0 278.70000000000005 85.35Q274.8 80.69999999999999 274.8 73.35Q274.8 62.25 282.9 56.324999999999996Q291.0 50.39999999999999 304.2 50.39999999999999Q316.65000000000003 50.39999999999999 324.9 55.949999999999996Q333.15 61.5 335.7 70.5L318.15000000000003 75.89999999999999Q316.95 70.19999999999999 313.275 67.79999999999998Q309.6 65.39999999999999 304.2 65.39999999999999Q298.8 65.39999999999999 295.95000000000005 67.27499999999999Q293.1 69.14999999999999 293.1 72.44999999999999Q293.1 76.04999999999998 296.1 77.77499999999999Q299.1 79.5 304.2 80.39999999999999L308.40000000000003 81.14999999999999Q316.8 82.64999999999999 323.625 85.125Q330.45 87.6 334.42499999999995 92.175Q338.4 96.75 338.4 104.55Q338.4 116.24999999999999 329.92499999999995 122.625Q321.45 129.0 307.2 129.0Z M372.0 129.0Q364.04999999999995 129.0 357.75 126.225Q351.45 123.44999999999999 347.775 118.125Q344.09999999999997 112.8 344.09999999999997 105.14999999999999Q344.09999999999997 97.5 347.775 92.32499999999999Q351.45 87.14999999999999 357.975 84.52499999999999Q364.5 81.89999999999999 372.9 81.89999999999999H393.29999999999995V77.69999999999999Q393.29999999999995 72.44999999999999 390.0 69.07499999999999Q386.7 65.69999999999999 379.5 65.69999999999999Q372.45 65.69999999999999 369.0 68.92499999999998Q365.54999999999995 72.14999999999999 364.5 77.25L347.09999999999997 71.39999999999999Q348.9 65.69999999999999 352.875 60.974999999999994Q356.84999999999997 56.25 363.525 53.324999999999996Q370.2 50.39999999999999 379.79999999999995 50.39999999999999Q394.5 50.39999999999999 403.04999999999995 57.74999999999999Q411.59999999999997 65.1 411.59999999999997 79.04999999999998V106.8Q411.59999999999997 111.3 415.79999999999995 111.3H421.79999999999995V126.89999999999999H409.2Q403.65 126.89999999999999 400.04999999999995 124.19999999999999Q396.45 121.49999999999999 396.45 116.99999999999999V116.85H393.59999999999997Q393.0 118.64999999999999 390.9 121.57499999999999Q388.79999999999995 124.49999999999999 384.29999999999995 126.75Q379.79999999999995 129.0 372.0 129.0ZM375.29999999999995 113.69999999999999Q383.25 113.69999999999999 388.275 109.27499999999999Q393.29999999999995 104.85 393.29999999999995 97.5V96.0H374.25Q369.0 96.0 366.0 98.25Q363.0 100.5 363.0 104.55Q363.0 108.6 366.15 111.14999999999999Q369.29999999999995 113.69999999999999 375.29999999999995 113.69999999999999Z M429.59999999999997 126.89999999999999V21.89999999999999H448.49999999999994V126.89999999999999Z M497.3999999999999 129.0Q486.29999999999995 129.0 477.82499999999993 124.275Q469.34999999999997 119.55 464.62499999999994 110.925Q459.8999999999999 102.3 459.8999999999999 90.6V88.79999999999998Q459.8999999999999 77.1 464.54999999999995 68.475Q469.19999999999993 59.849999999999994 477.5999999999999 55.12499999999999Q485.99999999999994 50.39999999999999 497.09999999999997 50.39999999999999Q508.04999999999995 50.39999999999999 516.15 55.27499999999999Q524.25 60.14999999999999 528.75 68.77499999999999Q533.25 77.39999999999999 533.25 88.79999999999998V95.25H479.09999999999997Q479.3999999999999 102.89999999999999 484.79999999999995 107.69999999999999Q490.19999999999993 112.5 497.99999999999994 112.5Q505.94999999999993 112.5 509.69999999999993 109.05Q513.4499999999999 105.6 515.4 101.39999999999999L530.8499999999999 109.5Q528.75 113.39999999999999 524.775 117.975Q520.8 122.55 514.1999999999999 125.775Q507.59999999999997 129.0 497.3999999999999 129.0ZM479.24999999999994 81.14999999999999H514.05Q513.4499999999999 74.69999999999999 508.87499999999994 70.79999999999998Q504.29999999999995 66.89999999999999 496.94999999999993 66.89999999999999Q489.29999999999995 66.89999999999999 484.79999999999995 70.79999999999998Q480.29999999999995 74.69999999999999 479.24999999999994 81.14999999999999Z"/></g></svg>`;

const MENU = [
  [R+"index.html","Início","home"],
  [R+"samsung.html","Samsung","Samsung"],
  [R+"iphone.html","iPhone","Apple"],
  [R+"motorola.html","Motorola","Motorola"],
  [R+"ranking.html","Ranking","ranking"],
  [R+"index.html#celular-ideal","Celular ideal","game"],
  [R+"comparador.html","Comparador de preços","comparador"]
];
/* só na prévia do Claude (artifact): página com os artigos agendados. Nunca vai para o GitHub. */
if(window.MQ_DATA && MQ_DATA.preview) MENU.push([R+"agendados.html","Agendados","agendados"]);
/* game "Celular ideal": por enquanto só na prévia do artifact (ainda não lançado no site) */
const GAME_ON = !!(window.MQ_DATA && MQ_DATA.preview);
if(!GAME_ON) MENU.splice(MENU.findIndex(m=>m[2]==="game"),1);
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
const brl = n => "R$ " + Math.round(n).toLocaleString("pt-BR");
const MESES = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
const dataBR = iso => { const [y,m,d] = iso.slice(0,10).split("-"); return `${+d} ${MESES[+m-1]} ${y}`; };
/* "2026-11-17T21:05" -> "17/11 às 21h05"; só a data -> "17/11" */
const dataHora = iso => { if(!iso) return ""; const [d,t] = iso.split("T"); const [y,m,dd] = d.split("-"); const dm = `${dd}/${m}`;
  if(!t) return dm; const [h,mi] = t.split(":"); return `${dm} às ${+h}h${mi!=="00"?mi:""}`; };
/* quando um artigo bloqueado será lançado: "amanhã", "hoje" ou "em 20/11" */
function quandoLanca(pub){
  const agora = new Date(), alvo = new Date(pub + ":00-03:00");
  const dia = x => x.toLocaleDateString("pt-BR",{timeZone:"America/Sao_Paulo"});
  if(alvo < agora && dia(alvo)!==dia(agora)) return "em breve";
  if(dia(alvo)===dia(agora)) return "hoje";
  if(dia(alvo)===dia(new Date(agora.getTime()+864e5))) return "amanhã";
  const [y,m,d] = pub.slice(0,10).split("-"); return `em ${d}/${m}`;
}

/* ---------- ícones e "salvos" ---------- */
const ICO = {
  brands:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18h3"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  rank:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21V11M12 21V4M16 21v-7M4 21h16"/></svg>',
  cmp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="16" rx="2"/><rect x="14" y="4" width="7" height="16" rx="2"/></svg>',
  save:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z"/></svg>',
  share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>'
};
const SAVED_KEY = "bs-saved";
const getSaved = () => { try{ return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); }catch(e){ return []; } };
const isSaved = id => getSaved().includes(id);
function toggleSaved(id){
  let s = getSaved();
  s = s.includes(id) ? s.filter(x=>x!==id) : [id, ...s];
  try{ localStorage.setItem(SAVED_KEY, JSON.stringify(s)); }catch(e){}
  document.querySelectorAll(`[data-save="${id}"]`).forEach(b=>{ b.setAttribute("aria-pressed", s.includes(id)); b.setAttribute("aria-label", s.includes(id) ? "Remover dos salvos" : "Salvar para ler depois"); });
  const badge = document.querySelector(".dock .count"); if(badge){ badge.textContent = s.length || ""; badge.hidden = !s.length; }
  toast(s.includes(id) ? "Salvo para ler depois" : "Removido dos salvos");
  return s.includes(id);
}
const saveBtn = id => `<button type="button" class="ibtn save" data-save="${id}" aria-pressed="${isSaved(id)}" aria-label="${isSaved(id)?"Remover dos salvos":"Salvar para ler depois"}">${ICO.save}</button>`;
const shareBtn = (url, title) => `<button type="button" class="ibtn share" data-share="${esc(url)}" data-title="${esc(title)}" aria-label="Compartilhar">${ICO.share}</button>`;
function toast(msg){
  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className = "toast"; t.setAttribute("role","status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove("on"), 1800);
}
document.addEventListener("click", async e=>{
  const sv = e.target.closest("[data-save]");
  if(sv){ e.preventDefault(); e.stopPropagation(); toggleSaved(sv.dataset.save); return; }
  const sh = e.target.closest("[data-share]");
  if(sh){
    e.preventDefault(); e.stopPropagation();
    const url = new URL(sh.dataset.share, location.href).href;
    if(navigator.share){ try{ await navigator.share({title: sh.dataset.title, url}); }catch(err){} }
    else { try{ await navigator.clipboard.writeText(url); toast("Link copiado"); }catch(err){ toast("Não deu para copiar o link"); } }
  }
}, true);

/* entrada suave dos cards quando aparecem na tela */
function reveal(root){
  if(!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const els = (root||document).querySelectorAll(".card, .row, .pod, .rank-row, .box, .hero, .cover");
  const io = new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } }), {rootMargin:"0px 0px -40px 0px"});
  els.forEach(el=>{ el.classList.add("rv"); io.observe(el); });
}

/* ---------- cabeçalho ---------- */
const ICO_LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
const ICO_SOL = '<svg class="i-sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const ICO_LUA = '<svg class="i-lua" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
/* "Modelos mais buscados": 2 topos de linha, 2 intermediários, 2 de entrada. Revisar de tempos em tempos. */
const MAIS_BUSCADOS = ["iphone-17","galaxy-s26-ultra","moto-g-max","galaxy-a57","galaxy-a17-5g","galaxy-a07"];
const modeloURL = p => `${R}${BRAND_PAGE[p.marca] || "index.html"}?modelo=${p.id}`;
const semAcento = t => String(t).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();

function header(current){
  const el = document.getElementById("site-header");
  if(!el) return;
  el.className = "hdr";
  const home = current === "home";
  document.documentElement.classList.toggle("home", home);
  const v2 = ["home","artigo","Samsung","Apple","Motorola","ranking","comparador"].includes(current) || /[?&]v2\b/.test(location.search);   /* visual novo: início, artigos e marcas; ranking e comparador ainda no visual antigo */
  document.documentElement.classList.toggle("v2", v2);
  const links = MENU.filter(([,,k])=>k!=="home");
  el.innerHTML = `<div class="hdr-bar">
      <a class="hdr-brand" href="${R}index.html" aria-label="Bugsale, página inicial">${LOCKUP}</a>
      <nav class="hdr-nav" aria-label="Seções">${links.map(([href,label,key])=>`<a href="${href}" class="${key===current?"on":""}${key==="comparador"?" cta":""}">${key==="comparador"?"Comparador":label}${key==="comparador"?'<span class="m-novo">novo</span>':""}</a>`).join("")}</nav>
      <div class="hdr-tools">
        <button type="button" class="hdr-ico hdr-lupa" aria-label="Buscar modelo" aria-expanded="false" aria-controls="busca">${ICO_LUPA}</button>
        <button type="button" class="hdr-ico hdr-tema" aria-label="Alternar modo claro e escuro">${ICO_SOL}${ICO_LUA}</button>
        <button type="button" class="hdr-ico hdr-menu" aria-label="Abrir menu" aria-expanded="false" aria-controls="menuM"><span></span><span></span><span></span></button>
      </div>
    </div>
    <nav class="menu-m" id="menuM" aria-label="Menu" hidden>${links.map(([href,label,key])=>`<a href="${href}" class="${key===current?"on":""}">${key==="comparador"?"Comparador":label}${key==="comparador"?'<span class="m-novo">novo</span>':""}<span aria-hidden="true">→</span></a>`).join("")}</nav>
    <div class="busca" id="busca" hidden>
      <div class="busca-in">
        <label class="busca-campo">${ICO_LUPA}<input type="search" placeholder="Buscar modelo de celular" aria-label="Buscar modelo de celular" autocomplete="off"><button type="button" class="busca-limpa" aria-label="Limpar" hidden>×</button></label>
        <div class="busca-res"></div>
      </div>
    </div>
    <div class="busca-fundo" hidden></div>`;
  /* modo claro / escuro */
  el.querySelector(".hdr-tema").addEventListener("click", ()=>{
    const t = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = t;
    salvaTema(t === temaSistema() ? null : t);   /* igual ao navegador = volta para o automático */
  });
  /* o modo escolhido segue a pessoa de página em página (também onde o navegador não guarda a escolha) */

  document.addEventListener("click", e=>{ const a = e.target.closest && e.target.closest("a[href]"); if(a){ const h = comTema(a.getAttribute("href")); if(h) a.setAttribute("href", h); } }, true);
  /* menu sanduíche (celular) */
  const bMenu = el.querySelector(".hdr-menu"), menuM = el.querySelector(".menu-m");
  const abreMenu = on => { menuM.hidden = !on; bMenu.setAttribute("aria-expanded", on); bMenu.setAttribute("aria-label", on ? "Fechar menu" : "Abrir menu"); document.documentElement.classList.toggle("menu-on", on); };
  bMenu.addEventListener("click", e=>{ e.stopPropagation(); if(!painel.hidden) abre(false); abreMenu(menuM.hidden); });
  document.addEventListener("click", e=>{ if(!menuM.hidden && !menuM.contains(e.target)) abreMenu(false); });
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !menuM.hidden){ abreMenu(false); bMenu.focus(); } });
  /* busca */
  const lupa = el.querySelector(".hdr-lupa"), painel = el.querySelector(".busca"), fundo = el.querySelector(".busca-fundo");
  const input = painel.querySelector("input"), res = painel.querySelector(".busca-res"), limpa = painel.querySelector(".busca-limpa");
  const item = p => `<a href="${modeloURL(p)}"><span aria-hidden="true">→</span>${esc(p.full)}</a>`;
  const desenha = () => {
    const q = semAcento(input.value.trim());
    limpa.hidden = !q;
    if(!q){ res.innerHTML = `<p class="busca-t">Modelos mais buscados</p>${MAIS_BUSCADOS.map(P).filter(Boolean).map(item).join("")}`; return; }
    const achou = Object.values(MQ_DATA.phones).filter(p=>semAcento(p.full).includes(q)).slice(0,8);
    res.innerHTML = achou.length ? `<p class="busca-t">Modelos</p>${achou.map(item).join("")}` : `<p class="busca-t">Nenhum modelo encontrado para “${esc(input.value)}”.</p>`;
  };
  const abre = on => { painel.hidden = !on; fundo.hidden = !on; lupa.setAttribute("aria-expanded", on); document.documentElement.classList.toggle("busca-on", on); if(on){ desenha(); setTimeout(()=>input.focus(), 30); } };
  lupa.addEventListener("click", ()=>{ abreMenu(false); abre(painel.hidden); });
  fundo.addEventListener("click", ()=>abre(false));
  input.addEventListener("input", desenha);
  limpa.addEventListener("click", ()=>{ input.value=""; desenha(); input.focus(); });
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !painel.hidden){ abre(false); lupa.focus(); } });
  /* barra inferior do celular (sem mudanças) */
  if(!v2 && !document.querySelector(".dock")){
    const isBrand = ["Samsung","Apple","Motorola"].includes(current);
    const brands = MENU.filter(([,,k])=>["Samsung","Apple","Motorola"].includes(k));
    const dock = document.createElement("nav");
    dock.className = "dock"; dock.setAttribute("aria-label","Menu");
    dock.innerHTML = `
      <a href="${R}index.html" class="${current==="home"?"on":""}">${ICO.home}<span>Início</span></a>
      <button type="button" class="dock-brands${isBrand?" on":""}" aria-expanded="false" aria-controls="dock-sheet">${ICO.brands}<span>Marcas</span></button>
      <a href="${R}ranking.html" class="${current==="ranking"?"on":""}">${ICO.rank}<span>Ranking</span></a>
      <a href="${R}comparador.html" class="${current==="comparador"?"on":""}">${ICO.cmp}<span>Comparar</span></a>
      <div class="dock-sheet" id="dock-sheet" hidden>${brands.map(([h,l,k])=>`<a href="${h}" class="${k===current?"on":""}">${l}<span aria-hidden="true">→</span></a>`).join("")}</div>`;
    document.body.appendChild(dock);
    const bb = dock.querySelector(".dock-brands"), sheet = dock.querySelector(".dock-sheet");
    const setSheet = open => { sheet.hidden = !open; bb.setAttribute("aria-expanded", open); dock.classList.toggle("sheet-open", open); };
    bb.addEventListener("click", e=>{ e.stopPropagation(); setSheet(sheet.hidden); });
    document.addEventListener("click", e=>{ if(!sheet.hidden && !dock.contains(e.target)) setSheet(false); });
    document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !sheet.hidden){ setSheet(false); bb.focus(); } });
  }
  gameInicia();
}

function footer(){
  const el = document.getElementById("site-footer");
  if(!el) return;
  el.className = "ftr";
  el.innerHTML = `<div class="ftr-in">
      <div class="ftr-cols">
        <div><a class="hdr-brand" href="${R}index.html" aria-label="Bugsale, página inicial">${LOCKUP}</a>
          <p>Reviews, comparativos e o preço justo de celulares e produtos para casa. O preço que parece bug, checado com histórico.</p></div>
        <div><h5>Seções</h5>${MENU.filter(([,,k])=>k!=="home").map(([h,l])=>`<a href="${h}">${l}</a>`).join("")}</div>
        <div><h5>Bugsale</h5><a href="${R}sobre.html">Sobre e como avaliamos</a><a href="${R}privacidade.html">Política de privacidade</a></div>
        <div><h5>Redes sociais</h5><a href="https://www.instagram.com/bugsale.br/" target="_blank" rel="noopener">Instagram</a></div>
      </div>
    </div>
    <div class="ftr-fine">Preços médios e fichas técnicas atualizados semanalmente a partir de Oficina da Net, Tecnoblog, Buscapé e GSMArena. Preços mudam todo dia. Fotos: divulgação das marcas.</div>`;
}
const GRUPO = "https://chat.whatsapp.com/Bvj5qZL97Ui5iRBZTvxvzY";

/* ---------- artigos ---------- */
const P = id => MQ_DATA.phones[id];
function offBadge(p){
  if(!p.precoN) return "";
  const pct = Math.round((1 - p.atualN/p.precoN)*100);
  return pct > 0 ? `<span class="off${pct>=40?" hot":""}">-${pct}%</span>` : "";
}
const artURL = a => `${R}artigos/${a.id || a.phone}/${window.MQ_DIRINDEX || ""}`;
function readLink(a){ return `<a class="btn primary" href="${artURL(a)}">Leia o artigo →</a>`; }
const byline = a => `<span class="avatar">${LOGO_SQ}</span> Equipe Bugsale · <time datetime="${a.data}">${dataBR(a.data)}</time>`;
/* o celular do artigo, com a capa própria do artigo no lugar da foto quando houver */
const PA = (a, inteira) => !a.capa ? P(a.phone) : Object.assign({}, P(a.phone), {capa:true, foto: inteira || !a.capa.card ? a.capa : Object.assign({}, a.capa, {src:a.capa.card, sm:a.capa.cardSm})});
const kicker = a => `<span class="kicker">${esc(a.cat)} · <span class="brandtag">${esc(P(a.phone).marcaMenu)}</span></span>`;

function heroHTML(a){
  const p = PA(a);
  const bg = p.foto ? `<img src="${R}${p.foto.sm}" alt="" aria-hidden="true" style="object-position:${p.foto.pos}">` : "";
  return `<article class="hero feature v3 ${vcls(p)}">
    <div class="hero-bg" aria-hidden="true">${bg}</div>
    <a class="feature-link" href="${artURL(a)}" aria-label="${esc(a.titulo)}"></a>
    <div class="art ${vcls(p)}">${visual(p)}${p.foto ? "" : `<span class="watermark">${brl(p.atualN).replace("R$ ","")}</span>`}</div>
    <div class="hero-blur" aria-hidden="true"></div>
    <div class="hero-top" aria-hidden="true"></div>
    <div class="feature-body">
      ${kicker(a)}
      <h1><a href="${artURL(a)}">${esc(a.titulo)}</a></h1>
      <p class="dek">${esc(a.dek)}</p>
      <div class="actions"><a class="btn primary" href="${artURL(a)}">Ler artigo →</a><a class="btn scroll-btn" href="#mais">Role para ver mais <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></a></div>
    </div>
  </article>`;
}
/* 3 melhores ofertas da última pesquisa, cada uma com seu link de afiliado (dados em data/celulares.json > ofertas) */
function ofertaHTML(p){
  const o = p.ofertas || {lista:[]};
  const lista = (o.lista || []).slice().sort((x,y)=>x.preco-y.preco);   /* sempre do menor para o maior preço */
  const slots = [0,1,2].map(i=>{
    const x = lista[i];
    if(!x) return `<div class="of-slot vazio"><span class="of-loja">Oferta ${i+1}</span><b class="of-preco">—</b><span class="btn of-btn" aria-disabled="true">Em breve</span></div>`;
    return `<a class="of-slot${i===0?" melhor":""}" href="${esc(x.url)}" target="_blank" rel="sponsored nofollow noopener">
      ${i===0?`<span class="of-tag">Menor preço</span>`:""}
      <span class="of-loja">${esc(x.loja)}</span><b class="of-preco">${brl(x.preco)}</b>
      <span class="btn of-btn${i===0?" primary":""}">Ver oferta ↗</span></a>`;
  }).join("");
  const meta = lista.length ? `Pesquisa em ${o.pesquisa ? dataHora(o.pesquisa) : "—"}` : `Preço médio de referência ≈ ${brl(p.atualN)} · a pesquisa de ofertas sai em breve`;
  return `<section class="ofertas" aria-label="Melhores ofertas">
    <div class="of-head"><span class="of-label">Melhores ofertas encontradas</span><span class="of-meta">${meta}</span></div>
    <div class="of-grid">${slots}</div>
    <small class="of-nota">${lista.length ? "Preços sujeitos a mudança nas lojas." : ""}</small>
  </section>`;
}
/* visual do artigo: foto oficial de uso quando existe; senão, o aparelho num "estúdio" com a cara da Bugsale */
function visual(p, sm){
  if(p.foto) return `<img class="ph" src="${R}${sm ? p.foto.sm : p.foto.src}" alt="${esc(p.capa ? "Montagem de comparativo com o " + p.full : p.full + " em uso")}" style="object-position:${p.foto.pos}" loading="lazy">`;
  return `<span class="ghost">${esc(p.nome)}</span><span class="floor"></span><img class="cut" src="${R}${p.cut}" alt="${esc(p.full)}" width="160" height="212" loading="lazy">`;
}
const vcls = p => p.foto ? "is-photo" : "is-studio";
/* camada de fundo desfocada: a própria imagem do artigo, que emenda a imagem com o texto */
const blurBG = p => `<span class="bs-bg" aria-hidden="true">${p.foto ? `<img src="${R}${p.foto.sm}" alt="" loading="lazy" style="object-position:${p.foto.pos}">` : `<img class="c" src="${R}${p.cut}" alt="" loading="lazy">`}</span>`;
function cardHTML(a){
  const p = PA(a);
  return `<a class="card blurred ${vcls(p)}" href="${artURL(a)}">${blurBG(p)}
    <div class="thumb ${vcls(p)}">${visual(p, true)}${p.foto ? "" : `<span class="watermark">${brl(p.atualN).replace("R$ ","")}</span>`}<span class="chip glass">≈ ${brl(p.atualN)} ${offBadge(p)}</span></div>
    <span class="card-blur" aria-hidden="true"></span>
    <div class="card-body">
      ${kicker(a)}
      <h3>${esc(a.titulo)}</h3>
      <span class="read-chip">Ler artigo ${ICO.arrow}</span>
    </div>
  </a>`;
}
/* card de artigo agendado (lançamento): preto e branco, sem link; o toque faz o chip da data brilhar */
function lockedCardHTML(a){
  const p = PA(a), q = quandoLanca(a.pub);
  const prev = (MQ_DATA.preview && !a.chamada) ? `<a class="prev-link" href="${artURL(a)}">Abrir prévia (só no preview)</a>` : "";
  return `<div class="card blurred locked ${vcls(p)}" role="group" aria-label="${esc(a.titulo)}: será lançado ${q}" tabindex="0">${blurBG(p)}
    <div class="thumb ${vcls(p)}">${visual(p, true)}${prev}</div>
    <span class="card-blur" aria-hidden="true"></span>
    <div class="card-body">
      ${kicker(a)}
      <h3>${esc(a.titulo)}</h3>
      <span class="read-chip lock-chip">Será lançado ${q}</span>
    </div>
  </div>`;
}
function rowHTML(a){
  const p = PA(a);
  return `<a class="row blurred tl ${vcls(p)}" href="${artURL(a)}">${blurBG(p)}
    <div class="thumb ${vcls(p)}">${visual(p, true)}</div>
    <div class="row-txt"><h3>${esc(a.titulo)}</h3><p class="meta">${esc(a.dek)}</p></div>
    <span class="more">Leia mais →</span>
  </a>`;
}

const BRAND_PAGE = {Samsung:"samsung.html", Apple:"iphone.html", Motorola:"motorola.html"};
function dropsHTML(list, n=5){
  const top = list.map(id=>[id,P(id)]).filter(([,p])=>p.precoN)
    .map(([id,p])=>({id, p, pct:Math.round((1-p.atualN/p.precoN)*100)}))
    .sort((a,b)=>b.pct-a.pct).slice(0,n);
  const item = ({id,p,pct}) => {
    const pg = BRAND_PAGE[p.marca];
    const inner = `<span class="dr-img"><img src="${R}${p.cut}" alt="" loading="lazy"></span><div><b>${esc(p.full)}</b><span>≈ ${brl(p.atualN)} · lançou a ${brl(p.precoN)}</span></div><span class="off${pct>=40?" hot":""}">-${pct}%</span>`;
    return `<li>${pg ? `<a href="${R}${pg}${window.MQ_DIRINDEX?"":""}?modelo=${id}">${inner}</a>` : `<div class="dr-nolink">${inner}</div>`}</li>`;
  };
  return `<div class="box drops-box"><h4>Maiores quedas de preço</h4><ol class="drops${n>5?" two":""}">${top.map(item).join("")}</ol></div>`;
}
const communityHTML = `<div class="box community"><h4>Promoções todo dia</h4><p>Entre na comunidade da Bugsale no WhatsApp e receba só as ofertas que passaram no nosso filtro de preço.</p><a class="btn" href="https://chat.whatsapp.com/Bvj5qZL97Ui5iRBZTvxvzY" target="_blank" rel="noopener">Entre no grupo de ofertas de celulares</a></div>`;

/* página: lista de artigos (home = todas as marcas; página de marca = só aquela) */
const porData = (a,b) => (b.pub||b.data).localeCompare(a.pub||a.data);
const publicados = () => MQ_DATA.articles.filter(a=>!a.locked);

/* ================= tela inicial (visual novo, minimalista, claro e escuro) ================= */
const PERFIL_CURTO = {
  "razr-70-ultra":"Para quem quer um dobrável de bolso com tela externa útil.",
  "galaxy-s26-ultra":"Para quem fotografa muito e quer zoom de verdade.",
  "iphone-16":"Para quem vem de um iPhone antigo e quer gastar menos.",
  "moto-g86":"Para quem quer resistência e bateria para o dia todo.",
  "galaxy-a57":"Para quem quer um Samsung bonito com anos de atualização.",
  "iphone-17":"Para quem quer tela de 120 Hz e um iPhone para muitos anos.",
  "galaxy-s26":"Para quem quer um topo de linha compacto e duradouro.",
  "moto-g-max":"Para quem quer câmera de 200 MP gastando pouco.",
  "poco-x8-pro":"Para quem joga e quer bateria enorme sem pagar preço de topo."
};
const tag2 = a => `<span class="tg"><span>${esc(a.cat)}</span><b>${esc(P(a.phone).marcaMenu)}</b></span>`;
function img2(p, grande){
  if(p.foto) return `<img src="${R}${grande ? p.foto.src : p.foto.sm}" alt="${esc(p.capa ? "Montagem de comparativo com o " + p.full : p.full + " em uso")}" style="object-position:${p.foto.pos}" loading="lazy">`;
  return `<span class="studio"><img src="${R}${p.cut}" alt="${esc(p.full)}" loading="lazy"></span>`;
}
const prevOK = a => !!(MQ_DATA.preview && a.locked && !a.chamada);
function bloqueado2(a){ if(prevOK(a)) return " prevok"; return a.locked ? ` locked" role="group" tabindex="0" aria-label="${esc(a.titulo)}: será lançado ${quandoLanca(a.pub)}` : ""; }
function chip2(a){ if(prevOK(a)) return `<span class="chip2 chip-prev">Prévia · sai ${quandoLanca(a.pub)}</span>`; return a.locked ? `<span class="chip2">Será lançado ${quandoLanca(a.pub)}</span>` : ""; }
function heroHTML2(a){
  const p = PA(a);
  return `<a class="h-hero" href="${artURL(a)}"><span class="h-img">${img2(p, true)}</span>
    <span class="h-txt">${tag2(a)}<span class="h-tit">${esc(a.titulo)}</span><span class="h-dek">${esc(a.dek)}</span></span></a>`;
}
function ladoHTML2(a){
  const p = PA(a), abre = !a.locked || prevOK(a), tagN = abre ? "a" : "div", href = abre ? ` href="${artURL(a)}"` : "";
  const prev = "";
  return `<${tagN} class="h-lado${bloqueado2(a)}"${href}><span class="h-img">${img2(p)}${prev}</span>
    <span class="h-txt">${tag2(a)}<span class="h-tit">${esc(a.titulo)}</span>${chip2(a)}</span></${tagN}>`;
}
function recenteHTML2(a){
  const p = PA(a), abre = !a.locked || prevOK(a), tagN = abre ? "a" : "div", href = abre ? ` href="${artURL(a)}"` : "";
  const prev = "";
  return `<${tagN} class="h-card${bloqueado2(a)}"${href}><span class="h-img">${img2(p)}${prev}</span>
    ${tag2(a)}<span class="h-tit">${esc(a.titulo)}</span><span class="h-dek">${esc(a.dek)}</span>${chip2(a)}</${tagN}>`;
}
/* ofertas escolhidas a dedo para a home (celular, loja); se faltar alguma, completa com as melhores automáticas */
const OFERTAS_HOME = [["razr-70-ultra","Magalu"],["iphone-17","Amazon"],["moto-g-max","Amazon"]];
function melhoresOfertas(n){
  const C = Object.values(MQ_DATA.phones).filter(p=>p.ofertas && p.ofertas.lista && p.ofertas.lista.length);
  const fixas = OFERTAS_HOME.map(([id,loja])=>{ const p = MQ_DATA.phones[id] || C.find(x=>x.id===id); const o = p && p.ofertas && (p.ofertas.lista||[]).find(x=>x.loja===loja); return o ? {p, o} : null; }).filter(Boolean).slice(0,n);
  if(fixas.length >= n) return fixas;
  const bomDe = p => { const a = MQ_DATA.articles.find(x=>x.phone===p.id && x.alvo); return (a && a.alvo.bom) || alvoAuto(p).bom; };
  return C.map(p=>{ const o = p.ofertas.lista.slice().sort((x,y)=>x.preco-y.preco)[0]; return {p, o, r:o.preco/bomDe(p)}; })
          .filter(x=>!fixas.some(f=>f.p.id===x.p.id)).sort((x,y)=>x.r-y.r).slice(0,n-fixas.length).reduce((a,x)=>a.concat(x), fixas);
}
/* card vertical de oferta (estilo loja): foto, loja, selo de queda desde o lançamento, preço e botão */
function ofertaCard2({p}){
  /* sempre a loja com o menor preço do dia */
  const o = (p.ofertas.lista||[]).slice().sort((x,y)=>x.preco-y.preco)[0];
  const cid = (p.catImg||"").replace(/^.*\/|\.webp$/g,""), c = CAT().find(x=>x.id===cid);
  const lanc = (c && lancPreco(c)) || p.precoN || null, queda = lanc && lanc > o.preco ? Math.round((1 - o.preco/lanc)*100) : 0;
  return `<a class="o3" href="${esc(o.url)}" target="_blank" rel="sponsored nofollow noopener">
    <span class="o3-img">${p.catImg ? `<img src="${R}${p.catImg}" alt="" loading="lazy">` : img2(p)}<span class="o3-loja">${esc(o.loja)}</span>${queda>=10 ? `<span class="o3-off" title="Em relação ao preço de lançamento">−${queda}%</span>` : ""}</span>
    <span class="o3-txt"><b>${esc(p.full)}</b><small class="o3-pq">${esc(PERFIL_CURTO[p.id] || "")}</small>
      <span class="o3-preco">${brl(o.preco)}</span>
      <small class="o3-ref">${lanc ? `Lançado a ${brl(lanc)}` : "&nbsp;"}</small></span>
    <span class="o3-btn">Ver na ${esc(o.loja)} ↗</span></a>`;
}
function ofertaLinha2({p,o}){
  return `<div class="o2"><span class="o2-img">${img2(p)}</span>
    <div class="o2-txt"><b>${esc(p.full)}</b><span>${esc(PERFIL_CURTO[p.id] || "")}</span><small>${brl(o.preco)} na ${esc(o.loja)}</small></div>
    <a class="o2-btn" href="${esc(o.url)}" target="_blank" rel="sponsored nofollow noopener">Ver oferta</a></div>`;
}
function renderHome(){
  const main = document.getElementById("content");
  const arts = publicados().sort(porData);
  const teasers = MQ_DATA.articles.filter(a=>a.locked && a.teaser).sort((a,b)=>a.pub.localeCompare(b.pub));
  const [first, ...rest] = arts;
  const fila = rest.concat(teasers);              /* publicados mais novos primeiro, depois os que serão lançados */
  const lado = fila.slice(0,3), recentes = fila.slice(3,7);
  const ofs = melhoresOfertas(6);
  main.classList.add("h2");
  main.innerHTML = `
    <a class="h-cmp" href="${R}comparador.html" aria-label="Abrir o comparador de celulares">
      <span class="h-cmp-txt"><span class="h-cmp-k">Comparador Bugsale</span><b>Em dúvida entre dois celulares?</b><span class="h-cmp-d">Coloque lado a lado ficha, preço de hoje e quanto tempo cada um recebe atualização.</span><span class="h-cmp-m">Compare lado a lado os modelos que você está de olho.</span><span class="h-cmp-btn">Comparar agora →</span></span><span class="h-cmp-seta" aria-hidden="true">→</span>
      <span class="h-cmp-art" aria-hidden="true">${(()=>{ const a=P("galaxy-s26-ultra"), b=P("iphone-17"); return `<img class="c1" src="${R}img/s26u-t.webp" alt=""><span class="vs">VS</span><img class="c2" src="${R}img/ip17-t.webp" alt="">`; })()}</span></a>
    <section class="h-top" aria-label="Destaques">${first ? heroHTML2(first) : ""}<div class="h-lados">${lado.map(ladoHTML2).join("")}</div></section>
    ${recentes.length ? `<h2 class="h-sec">Mais recentes</h2><div class="h-grid">${recentes.map(recenteHTML2).join("")}</div>` : ""}
    <h2 class="h-sec">Melhores ofertas</h2>
    <section class="h-ofertas o3-grade"><div class="o3-lista">${ofs.map(ofertaCard2).join("")}</div>
      ${(()=>{ const d = ofs.map(x=>x.p.ofertas.pesquisa).filter(Boolean).sort().pop(); return `<small class="o2-nota">Preços pesquisados${d ? ` em ${dataHora(d)}` : ""}.</small>`; })()}
    </section>`;
  main.querySelectorAll(".locked").forEach(c=>{
    const go = ()=>{ const ch = c.querySelector(".chip2"); if(!ch) return; ch.classList.remove("shine"); void ch.offsetWidth; ch.classList.add("shine"); };
    c.addEventListener("click", e=>{ if(!e.target.closest(".prev2")) go(); });
    c.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); go(); } });
  });
}

function grupoHTML2(largo){
  return `<a class="grupo2${largo?" largo":""}" href="${GRUPO}" target="_blank" rel="noopener"><span class="grupo2-img"><img src="${R}img/grupo-ofertas.webp" alt="Celulares de várias marcas lado a lado" loading="lazy"></span>
    <span class="grupo2-txt"><span class="grupo2-logo">${LOCKUP}</span><b>Entre no nosso grupo de ofertas de celulares</b><span>Ofertas diárias, conferidas com o histórico de preço. Só promoção que vale o seu Pix.</span><span class="grupo2-btn">Entrar no grupo</span></span></a>`;
}
function renderBrand2(brand){
  const main = document.getElementById("content");
  const modelo = new URLSearchParams(location.search).get("modelo");
  const label = brand==="Apple" ? "iPhone" : brand, pg = BRAND_PAGE[brand];
  const ids = Object.keys(MQ_DATA.phones).filter(id=>P(id).marca===brand);
  let arts = publicados().filter(a => P(a.phone).marca === brand || (a.vs && P(a.vs).marca === brand)).sort(porData);
  if(modelo){
    arts = arts.filter(a => a.phone===modelo || a.vs===modelo);
    if(MQ_DATA.preview) arts = arts.concat(MQ_DATA.articles.filter(a => prevOK(a) && (a.phone===modelo || a.vs===modelo)));
  }
  const keep = /[?&]v2\b/.test(location.search) ? "&v2" : "";
  const modelos = `<div class="b-modelos">${ids.map(id=>{ const p=P(id); return `<a class="b-mod${id===modelo?" on":""}" href="${R}${pg}?modelo=${id}${keep}"><span class="b-mod-img"><img src="${R}${p.catImg||p.cut}" alt="" loading="lazy"></span><span>${esc(p.nome)}</span></a>`; }).join("")}</div>`;
  const [first, ...rest] = arts;
  let corpo = "";
  if(!arts.length){
    corpo = `<div class="b-vazio"><span>Ainda não temos conteúdo sobre o ${esc(P(modelo).nome)}. Veja a ficha e o preço no comparador.</span><button class="o2-btn" type="button" data-compare="${modelo}">Comparar o ${esc(P(modelo).nome)}</button></div>`;
  } else {
    corpo = `<section class="h-top" aria-label="Destaques">${heroHTML2(first)}<div class="h-lados">${rest.slice(0,3).map(ladoHTML2).join("")}</div></section>
      ${rest.length > 3 ? `<h2 class="h-sec">Mais recentes</h2><div class="h-grid">${rest.slice(3,7).map(recenteHTML2).join("")}</div>` : ""}`;
  }
  main.classList.add("h2");
  main.innerHTML = `<h1 class="b-tit">${esc(label)}${modelo ? ` <a class="b-limpa" href="${R}${pg}${keep?"?v2":""}">ver todos</a>` : ""}</h1>${modelos}${corpo}`;
}

function renderArticles(brand){
  if(!brand) return renderHome();
  if(document.documentElement.classList.contains("v2")) return renderBrand2(brand);
  const main = document.getElementById("content");
  const modelo = new URLSearchParams(location.search).get("modelo");
  let arts = publicados().filter(a => !brand || P(a.phone).marca === brand || (a.vs && P(a.vs).marca === brand)).sort(porData);
  if(brand && modelo) arts = arts.filter(a => a.phone===modelo || a.vs===modelo);
  const teasers = brand ? [] : MQ_DATA.articles.filter(a=>a.locked && a.teaser).sort((a,b)=>a.pub.localeCompare(b.pub));
  const fila = (!brand && MQ_DATA.preview) ? MQ_DATA.articles.filter(a=>a.locked && !a.teaser).sort((a,b)=>a.pub.localeCompare(b.pub)) : [];
  const [first, ...rest] = arts;
  const recent = rest.slice(0,4), older = rest.slice(4, 9); /* linha do tempo: no máximo os 5 últimos */
  let html = "";
  if(brand){
    const label = brand==="Apple" ? "iPhone" : brand;
    const ids = Object.keys(MQ_DATA.phones).filter(id=>P(id).marca===brand);
    const pg = R + BRAND_PAGE[brand] + (window.MQ_DIRINDEX ? "" : "");
    html += `<header class="brand-head"><div><span class="kicker">Celulares</span><h1>${label}</h1></div></header>
      <div class="models" style="margin-top:16px"><a href="${pg}" class="${modelo?"":"on"}">Todos</a>${ids.map(id=>`<a href="${pg}?modelo=${id}" class="${id===modelo?"on":""}">${esc(P(id).nome)}</a>`).join("")}</div>`;
    if(modelo && P(modelo)){
      if(!arts.length) html += `<div class="model-bar"><span>Ainda não temos conteúdo sobre o ${esc(P(modelo).nome)}. Veja a ficha e o preço no comparador.</span><button class="btn" type="button" data-compare="${modelo}">${ICO.cmp} Comparar o ${esc(P(modelo).nome)}</button></div>`;
    }
  }
  const cardArts = recent.concat(teasers);
  const cards = cardArts.map(a => a.locked ? lockedCardHTML(a) : cardHTML(a));
  /* computador: destaque + os 3 próximos em mosaico; no celular o mosaico some e tudo vai para "Mais recentes" */
  const lateral = !brand ? cards.slice(0,3) : [];
  if(first) html += lateral.length ? `<section class="mosaic">${heroHTML(first)}<div class="mosaic-side">${lateral.join("")}</div></section>` : heroHTML(first);
  if(cards.length) html += `<div class="section-title" id="mais"><h2>Mais recentes</h2></div><div class="grid4 swipe${lateral.length?" has-side":""}">${cards.map((c,i)=> i<lateral.length ? c.replace('class="card ','class="card in-side ') : c).join("")}</div>`;
  const allIds = Object.keys(MQ_DATA.phones);
  if(older.length){
    html += `<div class="section-title"><h2>Linha do tempo</h2></div>
      <div class="split"><div class="timeline">${older.map(rowHTML).join("")}</div>
      <aside class="side">${dropsHTML(allIds)}</aside></div>`;
  } else if(!brand || !modelo){
    html += dropsHTML(allIds, 10);
  }
  if(!brand) html += communityHTML.replace('class="box community"','class="box community wide"');
  if(fila.length) html += `<div class="section-title"><h2>Fila agendada <small>(só aparece no preview)</small></h2></div><div class="fila-prev">${fila.map(a=>`<a href="${artURL(a)}"><b>${dataHora(a.pub)}</b> ${esc(a.titulo)}</a>`).join("")}</div>`;
  main.innerHTML = html;
  reveal(main);
  /* toque no card bloqueado: o chip da data brilha */
  main.querySelectorAll(".card.locked").forEach(c=>{
    const fire = e => { if(e.target.closest(".prev-link")) return; const ch = c.querySelector(".lock-chip"); ch.classList.remove("shine"); void ch.offsetWidth; ch.classList.add("shine"); };
    c.addEventListener("click", fire);
    c.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); fire(e); } });
  });
}


/* ---------- página de artigo (article.html#id-do-celular) ---------- */
function para(s){ return `<p>${s}</p>`; }

/* ---------- artigo: ofertas, gráfico de preço, personas ---------- */
const ICO_WA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.6 8.4c.3-.6 1-.7 1.3-.2l.6 1.1c.2.4.1.8-.2 1.1l-.4.4c.4.9 1.1 1.6 2 2l.4-.4c.3-.3.7-.4 1.1-.2l1.1.6c.5.3.4 1-.2 1.3-.9.5-2 .5-3.2-.2-1.4-.8-2.5-1.9-3.3-3.3-.6-1.1-.7-2.3-.2-3.2z" fill="currentColor" stroke="none"/></svg>';
const ICO_LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

/* versão curta das ofertas, para o fim do artigo: só os botões com o nome da loja */
function ofertaMiniHTML(p, titulo, cls){
  const lista = ((p.ofertas && p.ofertas.lista) || []).slice().sort((x,y)=>x.preco-y.preco);   /* do menor para o maior preço */
  const btns = [0,1,2].map(i=>{
    const x = lista[i];
    const comPreco = cls==="om-topo";   /* no topo: loja | preço + seta. No fim do artigo: só a loja | seta */
    return x ? `<a class="om-btn${i===0?" melhor":""}" href="${esc(x.url)}" target="_blank" rel="sponsored nofollow noopener"><span class="om-loja">${esc(x.loja)}</span><span class="om-dir">${comPreco?`<b>${brl(x.preco)}</b>`:""}<i aria-hidden="true">↗</i></span></a>`
             : `<span class="om-btn vazio" aria-disabled="true"><span class="om-loja">Oferta ${i+1}</span><span class="om-dir"><b>em breve</b></span></span>`;
  }).join("");
  return `<section class="ofertas-mini${cls?" "+cls:""}" aria-label="Onde comprar"><div class="om-head"><b>${titulo||`Onde comprar o ${esc(p.nome)}`}</b><span>${lista.length?`Pesquisa em ${p.ofertas.pesquisa?dataHora(p.ofertas.pesquisa):"—"}`:"Links das lojas em breve"}</span></div><div class="om-row">${btns}</div></section>`;
}

/* histórico de preço: cada ponto é uma pesquisa datada (p.historico = [{data:"2026-04-29", preco:12999}, ...]).
   Sem histórico, mostra só lançamento → hoje, sem inventar pontos no meio. */
function precoChartHTML(p){
  const s = p.specs;
  const rotData = iso => { const [y,m] = iso.split("-"); return `${MESES[+m-1]}/${y.slice(2)}`; };
  let pts = (p.historico||[]).slice().sort((x,y)=>x.data.localeCompare(y.data)).map(h=>({rot:rotData(h.data), v:h.preco, d:h.data}));
  const lanc = (s.lancamento||"").replace(/\s*\(.*\)/,"").toLowerCase().replace("/20","/");
  const parcial = pts.length < 2;
  if(!pts.length){
    if(!p.precoN) return "";
    pts = [{rot:lanc || "lançamento", v:p.precoN},{rot:"hoje", v:p.atualN}];
  } else if(p.precoN){
    pts.unshift({rot:lanc || "lançamento", v:p.precoN});   /* o lançamento abre a linha; as pesquisas semanais completam */
  }
  const W=640,H=230,pl=16,pr=16,pt=34,pb=36, n=pts.length;
  const vals = pts.map(x=>x.v), vmax=Math.max(...vals), vmin=Math.min(...vals);
  const max = vmax*1.08, min = vmin - (vmax-vmin)*0.25 - vmax*0.04;
  const X = i => pl + (n===1?0:i*(W-pl-pr)/(n-1));
  const Y = v => pt + (max-v)/(max-min)*(H-pt-pb);
  const line = pts.map((x,i)=>`${i?"L":"M"}${X(i).toFixed(1)} ${Y(x.v).toFixed(1)}`).join(" ");
  const area = `${line} L${X(n-1).toFixed(1)} ${H-pb} L${X(0).toFixed(1)} ${H-pb} Z`;
  const iMin = vals.indexOf(vmin), iMax = vals.indexOf(vmax);
  const show = new Set([0, n-1, iMin, iMax]);
  const step = Math.max(1, Math.ceil(n/7));            /* rótulos do eixo sem amontoar */
  const dots = pts.map((x,i)=>{
    const last=i===n-1, anchor = i===0?"start":last?"end":"middle";
    const lab = show.has(i) ? `<text x="${X(i)}" y="${Y(x.v)-(i===iMin&&!last&&i!==0?-22:14)}" text-anchor="${anchor}" class="pv${i===iMin&&n>2?" low":""}${i===iMax&&n>2&&i!==0?" high":""}">${brl(x.v)}</text>` : "";
    const ax = (i%step===0 || last) ? `<text x="${X(i)}" y="${H-12}" text-anchor="${anchor}" class="pl">${esc(last && !x.d ? "hoje" : x.rot)}</text>` : "";
    return `<circle cx="${X(i)}" cy="${Y(x.v)}" r="${last?6:n>12?2.5:4}" class="${last?"pt-now":"pt"}"/>${lab}${ax}`;
  }).join("");
  const queda = p.precoN ? Math.round((1-p.atualN/p.precoN)*100) : null;
  return `<figure class="preco-chart">
    <figcaption><b>Do lançamento até hoje</b>${queda>0?`<span class="off">-${queda}%</span>`:""}</figcaption>
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Preço do ${esc(p.full)}: ${pts.map(x=>`${x.rot} ${brl(x.v)}`).join(", ")}">
      <defs><linearGradient id="pc-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D4AF5A" stop-opacity=".35"/><stop offset="1" stop-color="#D4AF5A" stop-opacity="0"/></linearGradient></defs>
      <line x1="${pl}" x2="${W-pr}" y1="${H-pb}" y2="${H-pb}" class="axis"/>
      <path d="${area}" fill="url(#pc-g)"/><path d="${line}" class="ln"/>${dots}
    </svg>
    <small>${parcial?"O histórico completo, com cada subida e queda desde o lançamento, ainda está sendo levantado. Por enquanto o gráfico liga o preço de lançamento ao preço médio de hoje.":(p.historicoFonte?`Valores aproximados: os pontos mensais são o menor preço do dia registrado no ${esc(p.historicoFonte)} (sem Amazon), e o último é a média das três ofertas que pesquisamos. Em destaque, o maior e o menor preço do período.`:"Cada ponto é o preço médio das ofertas numa pesquisa. Em destaque, o maior e o menor preço do período.")}</small>
  </figure>`;
}

/* régua de preço (artigos com campo "alvo"): ótimo / bom / caro */
/* régua automática quando o artigo não define uma: parte do menor preço já visto */
const r50 = v => Math.round(v/50)*50;
function alvoAuto(p){
  const m = p.specs.minimoN || p.atualN;
  const ar = String(p.specs.armaz||""), n = (ar.match(/\d+/)||[""])[0], un = (ar.match(/GB|TB/i)||["GB"])[0].toUpperCase();
  const v = n ? `${n} ${un}` : "";
  return {versao: v || "de entrada", otimo: r50(m*1.05), bom: r50(m*1.15), caro: r50(m*1.30), auto:true};
}
/* título: "na Black Friday" até 27/11/2026 (horário de Brasília); depois, "hoje" */
const FIM_BF = new Date("2026-11-28T00:00:00-03:00");
function alvoHTML(a, p){
  const t = a.alvo || alvoAuto(p);
  const menor = p.ofertas && p.ofertas.lista && p.ofertas.lista.slice().sort((x,y)=>x.preco-y.preco)[0];
  const hoje = menor ? menor.preco : p.atualN;
  const faixa = hoje <= t.otimo ? "otimo" : hoje <= t.bom ? "bom" : hoje >= t.caro ? "caro" : "ok";
  const nomeFaixa = {otimo:"oferta de verdade", bom:"bom preço", ok:"preço normal", caro:"caro"}[faixa];
  const titulo = new Date() < FIM_BF ? "Quanto vale pagar na Black Friday" : "Quanto vale pagar hoje";
  return `<div class="alvo">
    <div class="al-head"><b>${titulo}</b><span>Versão de ${esc(t.versao)}, à vista</span></div>
    <div class="al-faixas">
      <div class="al otimo"><span>Oferta de verdade</span><b>até ${brl(t.otimo)}</b></div>
      <div class="al bom"><span>Bom preço</span><b>até ${brl(t.bom)}</b></div>
      <div class="al caro"><span>Espere</span><b>acima de ${brl(t.caro)}</b></div>
    </div>
    <p class="al-hoje">${menor?`Menor preço hoje: <b>${brl(hoje)}</b> (${esc(menor.loja)})`:`Preço médio hoje: <b>≈ ${brl(hoje)}</b>`} · <span class="al-tag ${faixa}">${nomeFaixa}</span></p>
    ${t.auto?`<small class="al-nota">Faixas calculadas a partir do menor preço já registrado (${brl(p.specs.minimoN||p.atualN)}).</small>`:""}
  </div>`;
}
/* personas: para quem cada tipo de aparelho faz sentido */
const PERSONAS = {
  entrada:     {nome:"O prático", ico:"M12 2v4M5 7l2.5 2.5M19 7l-2.5 2.5M4 14h3M17 14h3M8 20h8M9 16a3 3 0 0 1 6 0", txt:"Usa o celular para o essencial: WhatsApp, banco, redes e as fotos do dia a dia. Quer algo que funcione sem dar trabalho e sem pesar no bolso.", tags:["Conversas e redes","Apps de banco","Gastar pouco"], nao:"quem joga jogos pesados ou quer foto boa à noite."},
  intermediario:{nome:"O equilibrado", ico:"M12 3v18M5 7h14M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z", txt:"Quer um pouco de tudo sem pagar preço de topo de linha: tela boa, bateria para o dia inteiro e suporte longo. Costuma trocar de celular a cada 3 ou 4 anos.", tags:["Custo-benefício","Bateria de um dia","Suporte longo"], nao:"quem quer o processador mais rápido ou zoom de verdade."},
  topo:        {nome:"O sem limites", ico:"M13 2 4 14h7l-1 8 9-12h-7z", txt:"Usa o celular para trabalhar e se divertir ao mesmo tempo. Quer o melhor processador, a câmera mais completa e não quer pensar em trocar tão cedo.", tags:["Desempenho máximo","Câmera completa","Produtividade"], nao:"quem usa só o básico: o preço não se paga."},
  camera:      {nome:"O criador de conteúdo", ico:"M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", txt:"Fotografa tudo, grava stories e vídeos e edita no próprio celular. Câmera, zoom e estabilização pesam mais do que qualquer outra coisa na hora da compra.", tags:["Fotos e vídeos","Redes sociais","Zoom e detalhes"], nao:"quem quase não usa a câmera."},
  tela:        {nome:"O maratonista de tela", ico:"M3 5h18v12H3zM8 21h8M12 17v4", txt:"Passa horas vendo séries e vídeos ou jogando. Quer tela grande e brilhante e bateria que aguente a maratona.", tags:["Séries e vídeos","Jogos","Tela grande"], nao:"quem prefere celular pequeno e leve."},
  bateria:     {nome:"O que vive longe da tomada", ico:"M6 7h11v10H6zM17 10h2v4h-2M9 10l-1 2h3l-1 2", txt:"Passa o dia na rua, trabalha pelo celular e não quer ficar procurando carregador. Bateria grande e carga rápida são prioridade.", tags:["Bateria de sobra","Carga rápida","Uso intenso"], nao:"quem só usa em casa, perto da tomada."},
  dobravel:    {nome:"O explorador", ico:"M7 3h10v8H7zM7 13h10v8H7zM5 12h14", txt:"Gosta de testar o que é novo e de chamar atenção. Quer um celular que dobre e caiba em qualquer bolso, e que sempre vire assunto.", tags:["Design diferente","Cabe no bolso","Novidade"], nao:"quem é desastrado ou quer o melhor custo-benefício."},
  ecossistema: {nome:"O fã do ecossistema Apple", ico:"M12 7c1.5-2.5 4-2.5 4-2.5s.5 2.5-2 4M8 8c2 0 3 1 4 1s2-1 4-1c1.5 0 3 1 3.5 2.5-1.5 1-2.5 2.3-2.5 4 0 2 1.2 3.4 2.5 4-1 2-2.5 3.5-4 3.5-1 0-1.8-.6-3-.6s-2 .6-3 .6C6 21.5 4 17 4 13.5 4 10.2 6 8 8 8z", txt:"Já tem Mac, iPad, AirPods ou Apple Watch e quer que tudo converse. Valoriza revenda alta e anos de atualização.", tags:["Integração Apple","Revenda alta","Suporte longo"], nao:"quem quer muito hardware pelo menor preço."},
  gamer:       {nome:"O gamer", ico:"M6 9h12a4 4 0 0 1 3.9 4.8l-.6 3a2.5 2.5 0 0 1-4.3 1.2L15 16H9l-2 2a2.5 2.5 0 0 1-4.3-1.2l-.6-3A4 4 0 0 1 6 9zM8 12v3M6.5 13.5h3M16 12.5h.01M18 14.5h.01", txt:"Joga todo dia e não aceita travada. Quer processador forte, tela de alta taxa de atualização e bateria para longas partidas.", tags:["Jogos pesados","Tela rápida","Desempenho por real"], nao:"quem prioriza câmera ou atualizações longas."},
  compacto:    {nome:"O minimalista exigente", ico:"M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2", txt:"Quer um topo de linha que caiba numa mão e não pese no bolso, sem abrir mão de desempenho e câmera boa.", tags:["Usa com uma mão","Desempenho alto","Câmera boa"], nao:"quem passa o dia vendo vídeo e quer tela grande."},
  estilo:      {nome:"O estiloso", ico:"M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z", txt:"Escolhe o celular também pelo visual: quer um aparelho fino, leve e bonito na mão, com tela e câmera boas para o dia a dia.", tags:["Fino e leve","Acabamento","Boa câmera"], nao:"quem quer a maior bateria possível."}
};
const PERFIL = {"galaxy-a07":["entrada"],"galaxy-a17-5g":["entrada","intermediario"],"galaxy-a57":["intermediario"],"galaxy-s26":["compacto","topo"],"galaxy-s26-ultra":["topo","camera"],"iphone-15":["ecossistema"],"iphone-16":["ecossistema","intermediario"],"iphone-17":["ecossistema","camera"],"moto-g86":["intermediario","bateria"],"moto-g-max":["camera","tela"],"edge-70":["estilo"],"edge-70-pro":["bateria","camera"],"razr-70-ultra":["dobravel","topo"],"poco-x8-pro":["gamer","bateria"],"poco-x8-pro-max":["gamer","tela"],"redmi-note-17-pro":["bateria","tela"]};
function personaCard(k, i, o){
  const x = PERSONAS[k];
  return `<div class="persona${i===0?" principal":""}"${o!=null?` style="--o:${o}"`:""}>
    <span class="pe-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${x.ico}"/></svg></span>
    <span class="pe-label">${i===0?"Perfil principal":"Também combina com"}</span>
    <b class="pe-nome">${x.nome}</b><p>${x.txt}</p>
    <ul class="pe-tags">${x.tags.map(t=>`<li>${t}</li>`).join("")}</ul>
    <p class="pe-nao"><span>Não é para</span> ${x.nao}</p></div>`;
}
function personasHTML(id){
  const ks = PERFIL[id] || ["intermediario"];
  return `<div class="personas">${ks.map((k,i)=>personaCard(k,i)).join("")}</div>`;
}
function galeriaHTML(p){
  const g = (p.galeria||[])[0];
  return g ? `<figure class="post-img"><img src="${R}${g.src}" alt="${esc(g.legenda||p.full)}" loading="lazy"><figcaption>${esc(g.legenda||"")}${g.credito?` ${esc(g.credito)}.`:""}</figcaption></figure>` : "";
}


/* ---------- texto do artigo: técnico + dia a dia ---------- */
const PERF = {"galaxy-s26":"top","galaxy-s26-ultra":"top","iphone-16":"top","iphone-17":"top","razr-70-ultra":"top","poco-x8-pro-max":"top",
  "iphone-15":"alto","edge-70-pro":"alto","poco-x8-pro":"alto","edge-70":"alto","galaxy-a57":"alto",
  "moto-g86":"medio","galaxy-a17-5g":"medio","galaxy-a07":"entrada","moto-g-max":"entrada"};
const CAM = {"galaxy-s26-ultra":"top","galaxy-s26":"top","iphone-17":"top","iphone-16":"top",
  "edge-70-pro":"boa","galaxy-a57":"boa","iphone-15":"boa","edge-70":"boa","razr-70-ultra":"boa","moto-g-max":"200mp",
  "galaxy-a07":"basica","galaxy-a17-5g":"basica","moto-g86":"basica","poco-x8-pro":"basica","poco-x8-pro-max":"basica"};
function textoOferece(id, p){
  const s = p.specs, apple = p.marca==="Apple";
  const pol = parseFloat(String(s.tela).replace(",", ".")) || 0;
  const mp = (String(s.camTras).match(/\d+\s*MP/)||[""])[0];
  const out = [];
  /* tela */
  let t = /LCD/i.test(s.tela) && /720/.test(s.tela)
    ? `A tela é LCD com resolução HD. Para WhatsApp, banco e vídeos no YouTube ela funciona bem, mas o texto fica menos nítido e as cores, menos vivas que numa tela AMOLED.`
    : s.taxaN >= 120 ? `A tela de ${esc(s.taxa)} deixa a rolagem do Instagram e do TikTok bem lisinha, e as cores saltam aos olhos.`
    : s.taxaN >= 90 ? `A tela de 90 Hz já é mais fluida que a de celulares antigos, mas não tão lisinha quanto as de 120 Hz.`
    : `As cores e o brilho da tela são ótimos, mas ela é de 60 Hz: quem vem de um Android com 120 Hz vai notar a rolagem menos suave.`;
  t += pol >= 6.7 ? ` Com ${String(pol).replace(".", ",")} polegadas, é ótima para ver série no ônibus ou deitado no sofá.` : pol && pol <= 6.3 ? ` Com ${String(pol).replace(".", ",")} polegadas, cabe em qualquer bolso e dá para usar com uma mão só.` : "";
  if(s.telaExt) t += ` Fechado, a tela externa de ${esc(s.telaExt)} já resolve responder mensagem, olhar o mapa ou trocar a música sem abrir o celular.`;
  if(s.pesoN >= 200) t += ` É pesadinho (${esc(s.peso)}): no bolso da calça, dá para sentir.`; else if(s.pesoN && s.pesoN <= 172) t += ` E é leve (${esc(s.peso)}): quase não se sente no bolso.`;
  out.push(["Tela", t]);
  /* desempenho */
  const chip = esc(s.chip.replace(/\s*\(.*\)/,""));
  out.push(["Desempenho", {
    top: `O ${chip} está entre os processadores mais rápidos do ano. Jogos pesados rodam com os gráficos no máximo, editar vídeo no celular é tranquilo e ele deve continuar rápido por muitos anos.`,
    alto: `O ${chip} dá conta de tudo do dia a dia sem engasgar: redes sociais, banco, vários apps abertos ao mesmo tempo. Jogos pesados também rodam, só que com os gráficos em qualidade média.`,
    medio: `O ${chip} segura bem redes sociais, banco, vídeos e jogos leves, como Free Fire. Jogos mais pesados até abrem, mas com a qualidade gráfica reduzida.`,
    entrada: `O ${chip} é um processador de entrada. WhatsApp, banco, YouTube e redes sociais rodam bem, mas ter muitos apps abertos ou jogar títulos pesados deixa tudo mais lento.`
  }[PERF[id]||"medio"]]);
  /* câmeras */
  const zoom = s.zoom ? ` O zoom óptico de ${esc(s.zoom.replace(/\s*ópticos?/,""))} aproxima o palco do show ou o filho jogando bola do outro lado da quadra sem perder nitidez.` : "";
  out.push(["Câmeras", {
    top: `As câmeras estão entre as melhores do ano: fotos bonitas à noite, com gente se mexendo e com cara de profissional.${zoom} Para quem cria conteúdo, ${esc(s.video ? "ele filma " + s.video.replace(/^Até /, "em até ") : "os vídeos saem ótimos")}.`,
    boa: `Para fotografar a família, o pet e o prato do restaurante, a câmera principal${mp?` de ${mp}`:""} dá conta do recado com sobra.${/ultrawide/i.test(s.camTras)?" A ultrawide ajuda a caber todo mundo na foto do grupo.":""}${zoom} Em lugares escuros ou com movimento rápido, ela perde para os topos de linha.`,
    "200mp": `Os ${mp} da câmera principal rendem fotos cheias de detalhe durante o dia, boas para cortar e postar. À noite, o processador mais simples pesa e as fotos perdem qualidade.`,
    basica: `A câmera principal${mp?` de ${mp}`:""} faz boas fotos com luz boa: família, pet, paisagem e selfie no passeio. À noite ou com gente se mexendo, as fotos perdem detalhe, então não é o celular para quem quer fotografia mais profissional.`
  }[CAM[id]||"basica"]]);
  /* bateria */
  let b = apple ? `Em números, a bateria parece pequena (${esc(s.bateria)}), mas o iPhone gasta pouca energia: em uso normal, ele chega ao fim do dia.`
    : s.bateriaN >= 6000 ? `Com ${esc(s.bateria)}, dá para passar o dia todo na rua com GPS e música ligados, e quem usa pouco consegue chegar ao segundo dia sem carregar.`
    : s.bateriaN >= 4800 ? `A bateria de ${esc(s.bateria)} aguenta um dia inteiro de uso normal: WhatsApp, redes, fotos e um pouco de vídeo.`
    : `A bateria de ${esc(s.bateria)} é menor que a média. Em uso leve ela dura o dia, mas quem passa horas no TikTok ou no GPS pode precisar de uma recarga no fim da tarde.`;
  if(s.cargaN >= 65) b += ` E a carga de ${s.cargaN} W é das rápidas: o tempo de um banho na tomada já devolve boa parte da bateria.`;
  else if(s.cargaN >= 30) b += ` A carga de ${s.cargaN} W é razoável: dá para deixar carregando enquanto se arruma para sair.`;
  else if(s.cargaN) b += ` A carga de ${s.cargaN} W é lenta, então o melhor é carregar durante a noite.`;
  out.push(["Bateria", b]);
  /* resistência */
  const r = String(s.resist);
  let re = /IP69/.test(r) ? `Tem proteção ${esc(r.replace(/\s*\+\s*MIL.*/,""))}: aguenta chuva, mergulho na piscina e até jato de água quente. É ideal para quem usa o celular na beira da piscina, na praia ou trabalhando na rua (depois do mar, vale passar uma água doce).`
    : /IP68/.test(r) ? `Com proteção IP68, aguenta chuva forte e um mergulho na piscina sem drama.`
    : /IP48/.test(r) ? `A proteção IP48 aguenta chuva e até um mergulho rápido em água doce, mas não protege contra areia e poeira: cuidado na praia.`
    : /IP5/.test(r) ? `A proteção ${esc(r)} segura respingos e uma chuva leve, mas ele não é à prova d'água: nada de levar para a piscina.` : "";
  if(/MIL-STD/.test(r)) re += ` Ele também passou pelos testes do padrão militar MIL-STD-810H, que simulam quedas e tombos do dia a dia.`;
  if(re) out.push(["Resistência", re]);
  return out.map(([k,v])=>`<p><b>${k}.</b> ${v}</p>`).join("");
}
function textoUpd(p){
  const s = p.specs;
  if(p.marca==="Apple") return " Na prática, quem gosta de ficar muitos anos com o mesmo celular costuma ser bem atendido pelo iPhone.";
  const anos = s.updOSN || s.updSegN || 0, seg = s.updSegN || 0;
  if(!anos) return "";
  return anos >= 6 ? ` Na prática, se você é do tipo que fica 5 ou 6 anos com o mesmo celular, ele acompanha o tempo todo.`
    : anos >= 4 ? ` Na prática, dá para usar com tranquilidade por uns 4 anos.`
    : seg >= 4 ? ` Na prática, as novidades do Android param de chegar em ${anos} ou ${anos+1} anos, mas ele segue protegido contra golpes e vírus por ${seg} anos.`
    : ` Na prática, é um celular para usar 2 ou 3 anos: depois disso, ele fica sem os recursos e as proteções mais recentes.`;
}

function notaFontes(p){
  const h = (p.historico||[]).slice().sort((x,y)=>y.data.localeCompare(x.data))[0];
  const of = p.ofertas && p.ofertas.pesquisa;
  return [h ? `Preço médio de ${dataHora(h.data)}.` : "", of ? `Ofertas pesquisadas em ${dataHora(of)}.` : "",
    "Fichas e preços a partir de Oficina da Net, Tecnoblog, Buscapé, Zoom e GSMArena. Preços mudam todo dia."].filter(Boolean).join(" ");
}

/* ---------- comparativo: dois aparelhos lado a lado ---------- */
const MES_IDX = {jan:0,fev:1,mar:2,abr:3,mai:4,jun:5,jul:6,ago:7,set:8,out:9,nov:10,dez:11};
function lancISO(s){ const m = String(s.lancamento||"").toLowerCase().match(/([a-zç]{3})\w*\/(\d{4})/); return m && MES_IDX[m[1]]!=null ? `${m[2]}-${String(MES_IDX[m[1]]+1).padStart(2,"0")}-15` : null; }
function seriePreco(p){
  const pts = (p.historico||[]).map(h=>({d:h.data, v:h.preco}));
  const l = lancISO(p.specs); if(l && p.precoN) pts.push({d:l, v:p.precoN});
  if(!pts.length || pts.every(x=>x.d < new Date().toISOString().slice(0,10).slice(0,8))) pts.push({d:new Date().toISOString().slice(0,10), v:p.atualN});
  return pts.sort((x,y)=>x.d.localeCompare(y.d));
}
function fichaCmpHTML(p, q){
  const L = [["Preço médio hoje",x=>`≈ ${brl(x.atualN)}`],["Preço de lançamento",x=>x.precoN?brl(x.precoN):"—"],["Lançamento",x=>x.specs.lancamento],["Tela",x=>x.specs.tela],["Taxa de atualização",x=>x.specs.taxa],["Processador",x=>x.specs.chip],["Memória RAM",x=>x.specs.ram],["Armazenamento",x=>x.specs.armaz],["Câmeras traseiras",x=>x.specs.camTras],["Câmera frontal",x=>x.specs.camFrontal],["Vídeo",x=>x.specs.video],["Bateria",x=>x.specs.bateria],["Carregamento",x=>x.specs.carga],["Resistência",x=>x.specs.resist],["Peso",x=>x.specs.peso],["Sistema",x=>x.specs.sistema],["Atualizações",x=>x.specs.updResumo]];
  const rows = L.map(([k,fn])=>{ const a=fn(p)||"—", b=fn(q)||"—"; return `<tr><th><span>${k}</span></th><td>${esc(a)}</td><td>${esc(b)}</td></tr>`; }).join("");
  return `<div class="ficha ficha-cmp"><h3>Ficha técnica lado a lado</h3><div class="fc-wrap"><table style="--n:2"><colgroup><col class="fc-c0"><col><col></colgroup><thead><tr><th></th><th>${esc(p.nome)}</th><th>${esc(q.nome)}</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
}
function precoChart2HTML(p, q){
  const MESES = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  const hoje = new Date().toISOString().slice(0,10), ano = hoje.slice(0,4), ini = ano+"-01-01";
  const t = d => new Date(d+"T12:00:00").getTime();
  /* série do ano: o último preço antes de janeiro vira o ponto de 1º de janeiro */
  const doAno = S => { const antes = S.filter(x=>x.d < ini).pop(), dentro = S.filter(x=>x.d >= ini && x.d <= hoje);
    return (antes ? [{d:ini, v:antes.v}] : []).concat(dentro); };
  const A = doAno(seriePreco(p)), Bq = doAno(seriePreco(q));
  if(!A.length || !Bq.length) return "";
  const all = A.concat(Bq), t0 = t(ini), t1 = t(hoje);
  const vmax = Math.max(...all.map(x=>x.v)), vmin = Math.min(...all.map(x=>x.v));
  const W=720,H=300,pl=56,pr=112,pt=32,pb=40, folga=(vmax-vmin)*.18||200, max=vmax+folga, min=Math.max(0,vmin-folga);
  const X = d => pl + (t(d)-t0)/(t1-t0)*(W-pl-pr), Y = v => pt + (max-v)/(max-min)*(H-pt-pb);
  const line = S => S.map((x,i)=>`${i?"L":"M"}${X(x.d).toFixed(1)} ${Y(x.v).toFixed(1)}`).join(" ");
  const mesAtual = +hoje.slice(5,7);
  const meses = MESES.slice(0, mesAtual).map((m,i)=>{ const d = `${ano}-${String(i+1).padStart(2,"0")}-01`, x = X(d);
    return `<line x1="${x}" x2="${x}" y1="${pt}" y2="${H-pb}" class="cg"/><text x="${x}" y="${H-pb+20}" text-anchor="${i===0?"start":"middle"}" class="pl">${m}</text>`; }).join("");
  const ticks = [vmin, (vmin+vmax)/2, vmax].map(v=>`<line x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}" class="cg h"/><text x="${pl-8}" y="${Y(v)+4}" text-anchor="end" class="pl">${brl(Math.round(v/10)*10).replace("R$ ","")}</text>`).join("");
  const marca = (S, c) => {
    const ult = S[S.length-1], mx = S.reduce((a,b)=>b.v>a.v?b:a), mn = S.reduce((a,b)=>b.v<a.v?b:a);
    const lab = (x, txt, dy, cls) => { const px = X(x.d), anc = px > W-pr-80 ? "end" : px < pl+60 ? "start" : "middle";
      return `<text x="${px}" y="${Y(x.v)+dy}" text-anchor="${anc}" class="pv ${c} ${cls}">${txt}</text>`; };
    let o = S.map((x,i)=>`<circle cx="${X(x.d)}" cy="${Y(x.v)}" r="${i===S.length-1?5:3}" class="${c}"/>`).join("");
    if(mx !== ult) o += `<circle cx="${X(mx.d)}" cy="${Y(mx.v)}" r="6" class="${c} anel"/>` + lab(mx, `▲ ${brl(mx.v)}`, -12, "mx");
    if(mn !== ult && mn !== mx) o += `<circle cx="${X(mn.d)}" cy="${Y(mn.v)}" r="6" class="${c} anel"/>` + lab(mn, `▼ ${brl(mn.v)}`, 22, "mn");
    /* "hoje" fica à direita do último ponto, fora da área das linhas; se os dois finais estiverem perto, afasta um do outro */
    const outro = c==="c1" ? Bq[Bq.length-1] : A[A.length-1], perto = outro && Math.abs(Y(outro.v)-Y(ult.v)) < 32;
    const dy = perto ? (ult.v >= outro.v ? -10 : 18) : 5;
    o += `<text x="${X(ult.d)+12}" y="${Y(ult.v)+dy}" text-anchor="start" class="pv ${c} at"><tspan class="hj">hoje</tspan> ${brl(ult.v)}</text>`;
    return o; };
  return `<figure class="preco-chart cmp2 ano">
    <figcaption><b>Preço em ${ano}</b><span class="lg"><i class="l1"></i>${esc(p.nome)}<i class="l2"></i>${esc(q.nome)}</span></figcaption>
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Preço do ${esc(p.nome)} e do ${esc(q.nome)} de janeiro de ${ano} até hoje">
      ${ticks}${meses}<line x1="${pl}" x2="${W-pr}" y1="${H-pb}" y2="${H-pb}" class="axis"/>
      <path d="${line(A)}" class="ln l1"/><path d="${line(Bq)}" class="ln l2"/>${marca(A,"c1")}${marca(Bq,"c2")}
    </svg>
    <small>▲ maior preço no ano · ▼ menor preço no ano · hoje = preço médio da última pesquisa. Valores aproximados das nossas pesquisas de preço.</small>
  </figure>`;
}
function personasCmpHTML(p, q){
  /* grade em linhas: os cards de mesma linha ficam com a mesma altura; no celular, --o reagrupa por aparelho */
  const A = PERFIL[p.id] || ["intermediario"], B = PERFIL[q.id] || ["intermediario"], n = Math.max(A.length, B.length);
  let h = `<h3 class="pe-h" style="--o:0">${esc(p.nome)}</h3><h3 class="pe-h" style="--o:10">${esc(q.nome)}</h3>`;
  for(let i=0;i<n;i++) h += (A[i] ? personaCard(A[i], i, 1+i) : `<div class="pe-vazio" aria-hidden="true"></div>`) + (B[i] ? personaCard(B[i], i, 11+i) : `<div class="pe-vazio" aria-hidden="true"></div>`);
  return `<div class="pe-cmp2">${h}</div>`;
}

function renderArticle(){
  const main = document.getElementById("content");
  const id = window.MQ_ARTICLE || location.hash.replace("#","");
  const a = MQ_DATA.articles.find(x=>x.id===id) || publicados().find(x=>x.phone===id) || publicados().sort(porData)[0];
  const p = P(a.phone), pc = PA(a, true), s = p.specs, B = MQ_DATA.bodies[a.id] || {}, S = B.secoes || {};
  const b = [S.abertura || B.abertura, S.para_quem || B.para_quem, S.veredito || B.veredito];
  const TIPO = {review:"Review", comparativo:"Comparativo", vale:"Vale a pena?", ocasiao:a.cat, novidade:"Novidade", lista:a.cat, noticia:"Notícia"};
  document.title = `${a.titulo} · Bugsale`;
  const pct = p.precoN ? Math.round((1 - p.atualN/p.precoN)*100) : null;
  const brandPage0 = ({Samsung:"samsung.html",Apple:"iphone.html",Motorola:"motorola.html"}[p.marca]);
  const brandPage = brandPage0 ? R+brandPage0 : null;
  const oferece = `O ${esc(p.full)} tem tela ${esc(s.tela)} de ${esc(s.taxa)}${s.telaExt?`, além de uma tela externa ${esc(s.telaExt)}`:""}. O processador é o ${esc(s.chip)}${s.ram?`, com ${esc(s.ram)} de RAM`:""} e ${esc(s.armaz)} de armazenamento. Atrás, são ${esc(s.camTras)}${s.zoom?`, com zoom ${esc(s.zoom)}`:""}. Na frente, a câmera é de ${esc(s.camFrontal)}. A bateria tem ${esc(s.bateria)}, com carregamento de ${esc(s.carga)}, e a resistência é ${esc(s.resist)}.`;
  const preco = `${p.precoN?`Ele chegou ao Brasil por ${brl(p.precoN)}.`:"Ele não tem preço oficial de lançamento no Brasil."} Hoje, a média das ofertas está em cerca de <b>${brl(p.atualN)}</b>${pct>0?`, ${pct}% abaixo do lançamento`:""}. O menor preço que já vimos foi ${brl(s.minimoN)}.`;
  let upd = `Ele sai de fábrica com ${esc(s.sistema)}. `;
  if(p.marca==="Apple") upd += "A Apple não divulga um prazo oficial, mas historicamente os iPhones recebem de 5 a 7 anos de atualizações do iOS.";
  else {
    const os = s.updOSN ? (p.marca==="Xiaomi" ? `${s.updOSN} anos de atualizações do sistema` : `${s.updOSN} atualizações do Android`) : null;
    const seg = s.updSegN ? `${s.updSegN} anos de atualizações de segurança` : null;
    upd += os && seg ? `A ${p.marca} promete ${os} e ${seg}.` : os ? `A ${p.marca} promete ${os} e não informa por quanto tempo envia atualizações de segurança.` : seg ? `A ${p.marca} promete ${seg}, mas não diz quantas versões do sistema ele vai receber.` : `A ${p.marca} não divulgou a política de atualizações.`;
  }
  const ficha = [["Preço médio hoje",`≈ ${brl(p.atualN)}`,offBadge(p)],["Preço de lançamento",p.precoN?brl(p.precoN):null],["Lançamento",s.lancamento],["Tela",s.tela],["Taxa de atualização",s.taxa],["Tela externa",s.telaExt],["Processador",s.chip],["Memória RAM",s.ram],["Armazenamento",s.armaz],["Câmeras traseiras",s.camTras],["Zoom óptico",s.zoom],["Câmera frontal",s.camFrontal],["Vídeo",s.video],["Bateria",s.bateria],["Carregamento",s.carga],["Resistência",s.resist],["Peso",s.peso],["Espessura",s.espessura],["Sistema",s.sistema],["Atualizações",s.updResumo || "Não divulgado"]]
    .filter(r=>r[1]).map(r=>`<tr${r[2]!==undefined?' class="destaque"':""}><th>${r[0]}</th><td>${esc(r[1])}${r[2]?" "+r[2]:""}</td></tr>`).join("");
  const cmp = (a.tipo==="comparativo" && a.vs && P(a.vs)) ? P(a.vs) : null;
  const ind = cmp ? P(a.indicado || a.phone) : p, outro = cmp ? (ind===p ? cmp : p) : null;
  const ondeComprar = cmp ? `${ofertaMiniHTML(ind, `Onde comprar o ${esc(ind.nome)}, nossa indicação`)}${outro.ofertas && outro.ofertas.lista && outro.ofertas.lista.length ? `<details class="om-outro"><summary>Ver as ofertas do ${esc(outro.nome)}</summary>${ofertaMiniHTML(outro)}</details>` : ""}` : ofertaMiniHTML(p);
  const related = publicados().filter(x=>x.id!==a.id).sort((x,y)=>(P(y.phone).marca===p.marca)-(P(x.phone).marca===p.marca) || porData(x,y)).slice(0,4);
  const shareText = encodeURIComponent(`${a.titulo} · Bugsale`);
  if(a.tipo==="lista" || a.tipo==="noticia"){
    /* matéria livre: guia com vários celulares (lista) ou notícia da semana; texto em S.blocos */
    const inl = t => esc(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
    const pars = x => (Array.isArray(x)?x:[x]).filter(Boolean).map(t=>`<p>${inl(t)}</p>`).join("");
    const itemHTML = (it, i) => {
      let q = P(it.id);
      if(!q){ /* celular só do catálogo (sem página própria): foto, nome e preço médio do catálogo */
        const c = CAT().find(x=>x.id===it.id); if(!c) return "";
        q = {id:c.id, full:`${c.marca==="Apple"?"":c.marca+" "}${c.nome}`, catImg:c.img, atualN:c.preco, precoN:null, ofertas:null, soCat:true};
      }
      const ofs = (q.ofertas && q.ofertas.lista || []).filter(o=>o.preco).sort((x,y)=>x.preco-y.preco), o = ofs[0];
      const hoje = o ? o.preco : q.atualN, art = publicados().find(x=>x.phone===q.id && x.id!==a.id);
      return `<section class="mt-item${it.alerta?" mt-alerta":""}">
        <div class="mt-item-img">${q.catImg ? `<img src="${R}${q.catImg}" alt="${esc(q.full)}" loading="lazy">` : img2(q)}</div>
        <div class="mt-item-txt">
          <span class="mt-faixa">${it.faixa ? esc(it.faixa) : String(i+1).padStart(2,"0")}</span>
          <h3>${esc(it.titulo || q.full)}</h3>
          ${pars(it.texto)}
          ${it.alt ? `<p class="mt-alt"><b>${it.altRot ? esc(it.altRot) : "Alternativa"}:</b> ${inl(it.alt)}</p>` : ""}
          <div class="mt-preco"><span><small>${o ? `menor preço hoje · ${esc(o.loja)}` : q.soCat ? "preço médio nas lojas" : "preço médio hoje"}</small><b>${brl(hoje)}</b></span>${it.alvo ? `<span><small>bom preço</small><b class="mt-ok">até ${brl(it.alvo)}</b></span>` : ""}${q.precoN ? `<span><small>lançamento</small><s>${brl(q.precoN)}</s></span>` : ""}</div>
          <div class="mt-acoes">${o ? `<a class="btn primary" href="${esc(o.url)}" target="_blank" rel="sponsored nofollow noopener">Ver oferta ${o.loja==="Mercado Livre"?"no":"na"} ${esc(o.loja)} →</a>` : ""}${art ? `<a class="btn" href="${artURL(art)}">Ler a análise</a>` : q.soCat ? `<a class="btn" href="${R}comparador.html">Ver no comparador</a>` : `<button class="btn" type="button" data-compare="${q.id}">Abrir no comparador</button>`}</div>
        </div></section>`;
    };
    const blocoHTML = (k, i) => k.h ? `<h2>${esc(k.h)}</h2>` : k.p ? pars(k.p) : k.item ? itemHTML(k.item, i) : k.lista ? `<ul>${k.lista.map(t=>`<li>${inl(t)}</li>`).join("")}</ul>`
      : k.destaque ? `<aside class="mt-dest"><span class="kicker">${esc(k.destaque[0])}</span><p>${inl(k.destaque[1])}</p></aside>`
      : k.tabela ? `<div class="ficha mt-tab"><h3>${esc(k.tabela.titulo||"")}</h3><div class="fc-wrap"><table><thead><tr>${k.tabela.cols.map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${k.tabela.linhas.map(r=>`<tr>${r.map((x,j)=>j?`<td>${inl(x)}</td>`:`<th>${inl(x)}</th>`).join("")}</tr>`).join("")}</tbody></table></div></div>` : "";
    let n = 0; const corpo = (S.blocos||[]).map(k=>blocoHTML(k, k.item ? n++ : 0)).join("");
    const kick = a.tipo==="noticia" ? "Notícia" : (a.cat || "Guia");
    main.innerHTML = `
  <article class="post post-mt post-${a.tipo}">
    <nav class="crumb" aria-label="Você está em"><a href="${R}index.html">Início</a> / ${esc(kick)}</nav>
    <div class="post-head">
      <span class="kicker">${esc(kick)}</span>
      <h1>${esc(a.titulo)}</h1>
      <p class="dek">${esc(a.dek)}</p>
      <div class="author">
        <div class="meta"><span class="avatar">${LOGO_SQ}</span><span class="who"><b>Equipe Bugsale</b><span class="sep" aria-hidden="true">·</span><time datetime="${a.data}">${dataBR(a.data)}</time></span></div>
        <div class="share"><a class="ico-btn wa" href="https://wa.me/?text=${shareText}%20${encodeURIComponent(location.href)}" target="_blank" rel="noopener" aria-label="Compartilhar no WhatsApp" title="Compartilhar no WhatsApp">${ICO_WA}</a><button type="button" class="ico-btn" id="copyLink" aria-label="Copiar link" title="Copiar link">${ICO_LINK}</button></div>
      </div>
    </div>
    ${a.capa ? `<figure class="cover"><div class="art ${vcls(pc)}">${visual(pc)}</div><figcaption>${esc(a.capa.credito)}.</figcaption></figure>` : ""}
    <div class="post-body">
      ${b[0] ? `<p class="lede">${inl(b[0])}</p>` : ""}
      ${corpo}
      ${b[2] ? `<blockquote class="verdict"><span class="kicker">${a.tipo==="noticia" ? "O que muda para você" : "Resumo Bugsale"}</span><p>${inl(b[2])}</p></blockquote>` : ""}
      <div class="cta-compare"><div><b>Ainda em dúvida?</b><span>Coloque dois ou três modelos lado a lado no comparador.</span></div><a class="btn primary" href="${R}comparador.html">Abrir o comparador →</a></div>
      <p class="note">${S.fontes ? "Fontes: " + S.fontes.map(f=>`<a href="${f[1]}" target="_blank" rel="noopener">${esc(f[0])}</a>`).join(", ") + ". " : ""}${a.tipo==="noticia" ? `Informações reunidas em ${dataBR(a.data)}.` : `Preços conferidos em ${dataBR(a.data)}; mudam ao longo do dia, então confira na loja antes de fechar a compra.`}</p>
    </div>
  </article>
  <div class="section-title"><h2>Leia também</h2><a href="${R}index.html">Ver todos →</a></div>
  <div class="h-grid">${related.slice(0,4).map(recenteHTML2).join("")}</div>`;
  } else
  if(a.tipo==="novidade"){
    const T = S.tabela || {cols:[], linhas:[]};
    const tab = `<div class="ficha ficha-cmp ficha-nov"><h3>${esc(T.titulo || "Ficha técnica")}</h3><div class="fc-wrap"><table style="--n:${T.cols.length}"><colgroup><col class="fc-c0">${T.cols.map(()=>"<col>").join("")}</colgroup><thead><tr><th></th>${T.cols.map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${T.linhas.map(l=>`<tr><th><span>${esc(l[0])}</span></th>${l.slice(1).map(v=>`<td>${esc(v||"—")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${T.nota?`<small class="fc-nota">${esc(T.nota)}</small>`:""}</div>`;
    const par = x => (Array.isArray(x)?x:[x]).filter(Boolean).map(t=>`<p>${esc(t)}</p>`).join("");
    main.innerHTML = `
  <article class="post post-nov">
    <nav class="crumb" aria-label="Você está em"><a href="${R}index.html">Início</a> / ${brandPage?`<a href="${brandPage}">${esc(p.marcaMenu)}</a>`:esc(p.marcaMenu)}</nav>
    <div class="post-head">
      <span class="kicker">Novidade · <span class="brandtag">${esc(p.marcaMenu)}</span></span>
      <h1>${esc(a.titulo)}</h1>
      <p class="dek">${esc(a.dek)}</p>
      <div class="author">
        <div class="meta"><span class="avatar">${LOGO_SQ}</span><span class="who"><b>Equipe Bugsale</b><span class="sep" aria-hidden="true">·</span><time datetime="${a.data}">${dataBR(a.data)}</time></span></div>
        <div class="share"><a class="ico-btn wa" href="https://wa.me/?text=${shareText}%20${encodeURIComponent(location.href)}" target="_blank" rel="noopener" aria-label="Compartilhar no WhatsApp" title="Compartilhar no WhatsApp">${ICO_WA}</a><button type="button" class="ico-btn" id="copyLink" aria-label="Copiar link" title="Copiar link">${ICO_LINK}</button></div>
      </div>
    </div>
    ${p.ofertas && p.ofertas.lista && p.ofertas.lista.length ? ofertaMiniHTML(p, "Melhores ofertas encontradas", "om-topo") : `<section class="ofertas-mini om-topo om-nada" aria-label="Onde comprar"><div class="om-head"><b>Melhores ofertas encontradas</b></div><p class="om-nada-t">Nenhum link de oferta deste produto foi encontrado.</p></section>`}
    <figure class="cover"><div class="art ${vcls(pc)}">${visual(pc)}</div><figcaption>${esc(pc.foto ? pc.foto.credito : "")}.</figcaption></figure>
    <div class="post-body">
      <p class="lede">${esc(b[0])}</p>
      <h2>O que já se sabe</h2>${par(S.oferece)}
      ${tab}
      <h2>Quanto deve custar</h2>${par(S.preco)}
      <h2>Contra quem ele briga</h2>${par(S.concorrentes)}
      <h2>Para quem ele faz sentido</h2>${par(b[1])}
      <blockquote class="verdict"><span class="kicker">O que esperar</span><p>${esc(b[2])}</p></blockquote>
      <div class="tags"><a href="${brandPage||R+"index.html"}">${esc(p.marcaMenu)}</a><span>${esc(a.cat)}</span><span>Dobráveis</span></div>
      <p class="note">${S.fontes ? "Fontes: " + S.fontes.map(f=>`<a href="${f[1]}" target="_blank" rel="noopener">${esc(f[0])}</a>`).join(", ") + ". " : ""}Informações reunidas em ${dataBR(a.data)}. Especificações e preço ainda não confirmados pela fabricante.</p>
    </div>
  </article>
  <div class="section-title"><h2>Leia também</h2><a href="${R}index.html">Ver todos →</a></div>
  <div class="h-grid">${related.slice(0,4).map(recenteHTML2).join("")}</div>`;
  } else
  main.innerHTML = `
  <article class="post">
    <nav class="crumb" aria-label="Você está em"><a href="${R}index.html">Início</a> / ${brandPage?`<a href="${brandPage}">${esc(p.marcaMenu)}</a>`:esc(p.marcaMenu)}</nav>
    <div class="post-head">
      <span class="kicker">${esc(TIPO[a.tipo]||a.cat)} · <span class="brandtag">${esc(p.marcaMenu)}</span></span>
      <h1>${esc(a.titulo)}</h1>
      <p class="dek">${esc(a.dek)}</p>
      <div class="head-ofertas">${ofertaHTML(p)}</div>
      <div class="author">
        <div class="meta"><span class="avatar">${LOGO_SQ}</span><span class="who"><b>Equipe Bugsale</b><span class="sep" aria-hidden="true">·</span><time datetime="${a.data}">${dataBR(a.data)}</time></span></div>
        <div class="share"><a class="ico-btn wa" href="https://wa.me/?text=${shareText}%20${encodeURIComponent(location.href)}" target="_blank" rel="noopener" aria-label="Compartilhar no WhatsApp" title="Compartilhar no WhatsApp">${ICO_WA}</a><button type="button" class="ico-btn" id="copyLink" aria-label="Copiar link" title="Copiar link">${ICO_LINK}</button></div>
      </div>
      <figure class="cover cover-side" aria-hidden="true"><div class="art ${vcls(pc)}">${visual(pc)}${pc.foto ? "" : `<span class="watermark">${brl(p.atualN).replace("R$ ","")}</span>`}</div></figure>
    </div>
    ${ofertaMiniHTML(ind, cmp ? `Melhores ofertas do ${esc(ind.nome)}` : "Melhores ofertas encontradas", "om-topo")}
    <figure class="cover">
      <div class="art ${vcls(pc)}">${visual(pc)}${pc.foto ? "" : `<span class="watermark">${brl(p.atualN).replace("R$ ","")}</span>`}</div>
        <figcaption>${pc.capa ? `${esc(pc.foto.credito)}.` : p.foto ? `${esc(p.full)} no dia a dia. ${esc(p.foto.credito)}.` : `${esc(p.full)}. Imagem do aparelho: divulgação (via GSMArena).`}</figcaption>
    </figure>
    <div class="post-body">
      <p class="lede">${esc(b[0])}</p>
      <h2>O que ele oferece</h2>${S.oferece ? S.oferece.map(x=>Array.isArray(x) ? `<p><b>${esc(x[0])}.</b> ${esc(x[1])}</p>` : `<p>${esc(x)}</p>`).join("") : textoOferece(a.phone, p)}
      ${cmp ? fichaCmpHTML(p, cmp) : `<div class="ficha"><h3>Ficha técnica</h3><table>${ficha}</table></div>`}
      <h2>Quanto custa hoje</h2>${para(S.preco ? esc(S.preco) : preco)}
      ${cmp ? precoChart2HTML(p, cmp) : precoChartHTML(p)}
      ${cmp ? `<div class="alvo-cmp">${alvoHTML(a, p).replace("<b>", `<b>${esc(p.nome)} · `)}${alvoHTML({alvo:a.alvoVs}, cmp).replace("<b>", `<b>${esc(cmp.nome)} · `)}</div>` : alvoHTML(a, p)}
      <h2>Atualizações</h2>${para(S.atualizacoes ? esc(S.atualizacoes) : upd + textoUpd(p))}
      ${galeriaHTML(p)}
      <h2>Para quem vale</h2>${para(esc(b[1]))}
      ${cmp ? personasCmpHTML(p, cmp) : personasHTML(a.phone)}
      <blockquote class="verdict"><span class="kicker">Veredito Bugsale</span><p>${esc(b[2])}</p></blockquote>
      ${ondeComprar}
      <div class="cta-compare"><div><b>Compare com outros celulares</b><span>Coloque o ${esc(p.nome)} lado a lado com outro modelo.</span></div><button class="btn primary" type="button" data-compare="${a.phone}">Abrir no comparador →</button></div>
      <div class="tags"><a href="${brandPage||R+"index.html"}">${esc(p.marcaMenu)}</a><span>${esc(a.cat)}</span><span>Celulares</span></div>
      <p class="note">${notaFontes(p)}</p>
    </div>
  </article>
  <div class="section-title"><h2>Leia também</h2><a href="${R}index.html">Ver todos →</a></div>
  ${document.documentElement.classList.contains("v2") ? `<div class="h-grid">${related.slice(0,4).map(recenteHTML2).join("")}</div>` : `<div class="grid4 swipe">${related.map(cardHTML).join("")}</div>`}`;
  reveal(main);
  /* ficha lado a lado: coluna dos itens estreita; as dos aparelhos dividem o resto igualmente */
  const ajustaFicha = () => main.querySelectorAll(".ficha-cmp table").forEach(t=>{
    /* rótulos agora são pequenos e em caixa alta: coluna fixa e estreita, o resto fica para os aparelhos */
    const c0 = t.querySelector(".fc-c0"); if(c0) c0.style.width = "136px";
  });
  ajustaFicha(); addEventListener("resize", ajustaFicha);
  const cp = document.getElementById("copyLink");
  const canShare = !!navigator.share && window.matchMedia("(pointer:coarse)").matches;
  if(canShare){ cp.setAttribute("aria-label","Compartilhar"); cp.title = "Compartilhar"; }
  cp.addEventListener("click", async ()=>{
    if(canShare){ try{ await navigator.share({title:a.titulo, text:a.dek, url:location.href}); }catch(e){} return; }
    try{ await navigator.clipboard.writeText(location.href); toast("Link copiado"); cp.classList.add("ok"); setTimeout(()=>cp.classList.remove("ok"),1600); }catch(e){ toast("Não deu para copiar o link"); }
  });
}



/* ---------- ranking de custo-benefício ---------- */
/* Metade 1: nota da crítica = média agregada de reviews (Notebookcheck "Average Score"). */
const NBC = "https://www.notebookcheck.net/";
const CRITICA = {
  "galaxy-a07":      [69.67, 3,   "Samsung-Galaxy-A07.1169741.0.html"],
  "galaxy-a17-5g":   [73.28, 37,  "Samsung-Galaxy-A17-5G.1136906.0.html"],
  "galaxy-a57":      [78.1,  75,  "Samsung-Galaxy-A57.1262288.0.html"],
  "galaxy-s26":      [82.17, 68,  "Samsung-Galaxy-S26.1243976.0.html"],
  "galaxy-s26-ultra":[88.96, 114, "Samsung-Galaxy-S26-Ultra.1244015.0.html"],
  "iphone-15":       [83.79, 74,  "Apple-iPhone-15.755495.0.html"],
  "iphone-16":       [86,    72,  "Apple-iPhone-16.891591.0.html"],
  "iphone-17":       [89.88, 77,  "Apple-iPhone-17.1134180.0.html"],
  "moto-g86":        [79.76, 25,  "Motorola-Moto-G86.1074931.0.html"],
  "moto-g-max":      [74.6,  1,   "Motorola-Moto-G87-Reviews-and-Specs.1318625.0.html", "Nota do Moto G87, versão global do Moto G Max"],
  "edge-70":         [81.97, 67,  "Motorola-Edge-70.1179499.0.html"],
  "edge-70-pro":     [82.56, 20,  "Motorola-Edge-70-Pro.1307318.0.html"],
  "razr-70-ultra":   [77.93, 37,  "Motorola-Razr-70-Ultra.1309415.0.html"],
  "poco-x8-pro":     [85.1,  29,  "Xiaomi-Poco-X8-Pro.1256160.0.html"],
  "poco-x8-pro-max": [85.04, 41,  "Xiaomi-Poco-X8-Pro-Max.1245768.0.html"]
};
/* Metade 2: laboratório + ficha. Desempenho = Geekbench 6 multi-core (resultados típicos publicados). */
const GEEKBENCH = {
  "galaxy-a07":1970, "galaxy-a17-5g":2090, "galaxy-a57":4500, "galaxy-s26":10700, "galaxy-s26-ultra":10900,
  "iphone-15":6500, "iphone-16":8360, "iphone-17":9400, "moto-g86":3000, "moto-g-max":2100,
  "edge-70":4180, "edge-70-pro":6560, "razr-70-ultra":8500, "poco-x8-pro":6480, "poco-x8-pro-max":8470
};
const GB_MAX = Math.max(...Object.values(GEEKBENCH));
const PESOS = [["desempenho","Desempenho",25],["camera","Câmera",20],["tela","Tela",15],["bateria","Bateria",20],["atualizacoes","Atualizações",20]];
const clamp = (v,a=0,b=10) => Math.max(a,Math.min(b,v));
function notas(id, p){
  const s = p.specs, cam = s.camTras || "", est = [];
  const gb = GEEKBENCH[id];
  const desempenho = gb ? clamp(gb / GB_MAX * 10) : 5;
  if(!gb) est.push("desempenho");
  let camera = 3;
  if(/OIS/.test(cam)) camera += 2;
  const uw = cam.match(/(\d+) MP ultrawide/); if(uw) camera += +uw[1] >= 48 ? 1.5 : +uw[1] >= 8 ? .75 : .25;
  const teles = (cam.match(/tele|periscópio/g) || []).length; camera += teles >= 2 ? 3 : teles ? 2 : 0;
  if(/^200 MP/.test(cam)) camera += .5;
  if(/8K/.test(s.video)) camera += .5; else if(/4K a (60|120)/.test(s.video)) camera += .25;
  const hz = {60:4,90:6,120:8,144:9,165:10}[s.taxaN] ?? 6;
  let tela = hz + (/LTPO/.test(s.tela) ? .5 : 0) - (/LCD/.test(s.tela) ? 1.5 : 0) - (/720×/.test(s.tela) ? 1 : 0);
  let carga = s.cargaN; if(!carga){ carga = 20; est.push("bateria"); }
  const bateria = clamp((s.bateriaN-3000)/5500*7, 0, 7) + clamp(carga/100*3, 0, 3);
  let os = s.updOSN, seg = s.updSegN;
  if(p.marca === "Apple"){ os = os ?? 6; seg = seg ?? 6; est.push("atualizacoes"); }
  else { os = os ?? 1; seg = seg ?? os; }
  const atualizacoes = clamp(os*.9 + seg*.6);
  const n = {desempenho, camera:clamp(camera), tela:clamp(tela), bateria:clamp(bateria), atualizacoes};
  n.tecnica = PESOS.reduce((t,[k,,w])=>t + n[k]*w/100, 0);
  const c = CRITICA[id];
  n.critica = c ? c[0] / 10 : n.tecnica;
  n.reviews = c ? c[1] : 0;
  n.final = (n.critica + n.tecnica) / 2;
  n.est = est;
  return n;
}
function renderRanking(){
  const main = document.getElementById("content");
  const lista = Object.entries(MQ_DATA.phones).map(([id,p])=>({id, p, n:notas(id,p)}));
  lista.forEach(x => x.raw = x.n.final / Math.sqrt(x.p.atualN));
  const max = Math.max(...lista.map(x=>x.raw));
  lista.forEach(x => x.cb = x.raw / max * 10);
  let ordem = "cb";
  const fmt = v => v.toFixed(1).replace(".", ",");
  const draw = () => {
    const ord = lista.slice().sort((a,b)=> ordem==="cb" ? b.cb-a.cb : ordem==="nota" ? b.n.final-a.n.final : ordem==="critica" ? b.n.critica-a.n.critica : a.p.atualN-b.p.atualN);
    const top = ord.slice(0,10);
    const revs = x => x.n.reviews < 5 ? `poucos reviews (${x.n.reviews})` : `${x.n.reviews} reviews`;
    const bars = x => `<div class="bars"><p class="bars-title">Laboratório e ficha · ${fmt(x.n.tecnica)}</p>${PESOS.map(([k,l])=>`<div class="crit"><span>${l}</span><i style="--v:${x.n[k]*10}%"></i><em>${fmt(x.n[k])}${x.n.est.includes(k)?"*":""}</em></div>`).join("")}</div>`;
    const scores = (x,hl) => `<div class="scores">
        <div class="crt"><small>Crítica</small>${fmt(x.n.critica)}<span class="rv">${revs(x)}</span></div>
        <div class="tec"><small>Nota final</small>${fmt(x.n.final)}</div>
        <div class="cb${hl?" top":""}"><small>Custo-benefício</small>${fmt(x.cb)}</div></div>`;
    document.getElementById("rankPodium").innerHTML = top.slice(0,3).map((x,i)=>`
      <a class="pod pod-${i+1}" href="${R}artigos/${x.id}/${window.MQ_DIRINDEX || ""}">
        <span class="medal">${i+1}º</span>
        <div class="pod-photo"><img src="${R}${x.p.img}" alt="${esc(x.p.full)}" width="160" height="212"></div>
        <div class="who"><span class="kicker"><span class="brandtag">${esc(x.p.marcaMenu)}</span></span><b>${esc(x.p.nome)}</b><span class="price">≈ ${brl(x.p.atualN)} ${offBadge(x.p)}</span></div>
        ${scores(x, i===0)}
        ${bars(x)}
      </a>`).join("");
    document.getElementById("rankList").innerHTML = top.slice(3).map((x,i)=>`
      <a class="rank-row" href="${R}artigos/${x.id}/${window.MQ_DIRINDEX || ""}">
        <span class="pos">${i+4}</span>
        <img src="${R}${x.p.img}" alt="" width="160" height="212">
        <div class="who"><span class="kicker"><span class="brandtag">${esc(x.p.marcaMenu)}</span></span><b>${esc(x.p.nome)}</b><span class="price">≈ ${brl(x.p.atualN)} ${offBadge(x.p)}</span></div>
        ${bars(x)}
        ${scores(x, false)}
      </a>`).join("");
    document.querySelectorAll(".sort button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.o===ordem));
  };
  const fontes = Object.entries(CRITICA).filter(([id])=>MQ_DATA.phones[id]).map(([id,[v,n,u,obs]])=>
    `<li><a href="${NBC}${u}" target="_blank" rel="noopener">${esc(MQ_DATA.phones[id].nome)}</a> ${String(v).replace(".", ",")}% · ${n} ${n===1?"review":"reviews"}${obs?` <em>(${esc(obs)})</em>`:""}</li>`).join("");
  main.innerHTML = `
    <header class="brand-head rank-head"><div><span class="kicker">Ranking · Top 10</span><h1>Custo-benefício</h1></div>
      <p>Metade da nota vem da crítica especializada, a média das avaliações publicadas por sites de tecnologia do mundo todo. A outra metade vem de testes de laboratório e da ficha técnica. Depois comparamos com o preço médio de hoje.</p></header>
    <div class="sort" role="group" aria-label="Ordenar ranking">
      <span>Ordenar por</span>
      <button type="button" data-o="cb">Custo-benefício</button>
      <button type="button" data-o="nota">Nota final</button>
      <button type="button" data-o="critica">Crítica</button>
      <button type="button" data-o="preco">Menor preço</button>
    </div>
    <details class="box method">
      <summary><b>Como calculamos</b><span class="weights"><span>Crítica <em>50%</em></span><span>Laboratório e ficha <em>50%</em></span></span></summary>
      <div class="method-body">
        <p><b>Crítica (50%):</b> média das notas de reviews de sites reconhecidos, agregada pelo Notebookcheck. Quanto mais reviews, mais confiável. Abaixo de 5 avisamos "poucos reviews".</p>
        <p><b>Laboratório e ficha (50%):</b> desempenho ${PESOS[0][2]}%, câmera ${PESOS[1][2]}%, tela ${PESOS[2][2]}%, bateria ${PESOS[3][2]}% e atualizações ${PESOS[4][2]}%.</p>
        <p><b>Desempenho:</b> Geekbench 6 multi-core. O mais rápido da lista vale 10 e os outros são proporcionais.</p>
        <p><b>Câmera:</b> estabilização (OIS), ultrawide, teleobjetiva e gravação em 4K ou 8K.</p>
        <p><b>Tela:</b> taxa de atualização, com ajuste para LTPO, LCD e resolução baixa.</p>
        <p><b>Bateria:</b> capacidade em mAh e velocidade de carga.</p>
        <p><b>Atualizações:</b> versões do sistema e anos de segurança prometidos.</p>
        <p><b>Custo-benefício:</b> nota final dividida pela raiz do preço médio atual. O melhor da lista fica com 10.</p>
        <p class="fine">* Estimativa: a Apple não divulga prazo de atualizações nem a potência de carga com fio de alguns iPhones.</p>
        <div class="fontes"><p><b>Fontes da nota da crítica</b></p><ul>${fontes}</ul></div>
      </div>
    </details>
    <div id="rankPodium" class="podium"></div>
    <div id="rankList" class="rank-list"></div>
    </div>`;
  main.querySelectorAll(".sort button").forEach(b=>b.addEventListener("click",()=>{ ordem = b.dataset.o; draw(); }));
  draw();
  reveal(main);
}

/* "Role para ver mais": rolagem suave até "Mais recentes" */
document.addEventListener("click", e=>{
  const b = e.target.closest(".scroll-btn");
  if(!b) return;
  const alvo = document.getElementById("mais");
  if(!alvo) return;
  e.preventDefault();
  const off = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const ini = window.scrollY, fim = alvo.getBoundingClientRect().top + ini - off - 8;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){ window.scrollTo(0, fim); return; }
  const dur = Math.min(1200, Math.max(700, Math.abs(fim-ini)*0.9)), t0 = performance.now();
  const ease = t => t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;   /* acelera e desacelera devagar */
  const passo = now => { const t = Math.min(1,(now-t0)/dur); window.scrollTo(0, ini+(fim-ini)*ease(t)); if(t<1) requestAnimationFrame(passo); };
  requestAnimationFrame(passo);
});

/* abre o comparador já com o celular escolhido */
document.addEventListener("click", e=>{
  const t = e.target.closest("[data-compare]");
  if(!t) return;
  e.preventDefault();
  try{ localStorage.setItem("cmp-sel2", JSON.stringify([t.dataset.compare, null])); }catch(err){}
  location.href = comTema(R+"comparador.html") || R+"comparador.html";
});

try{ if("scrollRestoration" in history) history.scrollRestoration = "manual"; }catch(e){}
window.addEventListener("pageshow", e=>{ if(!e.persisted && !location.hash) window.scrollTo(0,0); });
document.addEventListener("DOMContentLoaded", ()=>{ if(!location.hash) window.scrollTo(0,0); });

/* ================= catálogo (68 modelos): notas, ranking e comparador ================= */
const CHIP_GB = [  /* Geekbench 6 multi-core aproximado por processador (estimativa quando não há medição própria) */
  [/8 Elite Extreme Gen 6/i,11500],[/A20 Pro/i,11000],[/8 Elite Gen 5|8 Gen 5|Dimensity 9500/i,10500],[/A19 Pro/i,10000],[/Exynos 2600/i,10000],
  [/8 Elite/i,9600],[/A19/i,9400],[/Dimensity 9400/i,9300],[/A18/i,8360],[/Exynos 2500/i,8000],[/A17 Pro/i,7200],[/Exynos 2400/i,7000],
  [/A16/i,6500],[/Dimensity 8500/i,6500],[/Dimensity 8400/i,6000],[/Exynos 1680/i,4500],[/7 Gen 4/i,4200],[/Exynos 1580/i,4000],
  [/6 Gen 5/i,3800],[/7s Gen 4/i,3500],[/Dimensity 7450/i,3500],[/Exynos 1480/i,3400],[/7s Gen 3/i,3200],[/Dimensity 7300/i,3000],
  [/6s Gen 4/i,3000],[/6 Gen 3/i,2900],[/T760/i,2300],[/4 Gen 4/i,2200],[/Exynos 1330/i,2090],[/Dimensity 6[34]00/i,2000],
  [/G100|G99/i,1950],[/Exynos 1280/i,1900],[/685/i,1700],[/G8[15]/i,1350]];
const CAT = () => MQ_DATA.cat || [];
const catP = c => c.antigo ? P(c.antigo) : null;
function notasCat(c){
  const est = [];
  let gb = c.antigo && GEEKBENCH[c.antigo];
  if(!gb){ const m = CHIP_GB.find(([r])=>r.test(c.chip||"")); gb = m ? m[1] : 2500; est.push("desempenho"); }
  const desempenho = clamp(gb / 11500 * 10);
  const cams = (c.cams||[]).join(" | ");
  let camera = 3;
  if(/OIS/i.test(cams)) camera += 2;
  const uw = (c.cams||[]).find(x=>/ultrawide/i.test(x)); if(uw){ const mp = +(uw.match(/(\d+)\s*MP/i)||[0,0])[1]; camera += mp>=48 ? 1.5 : mp>=8 ? .75 : .25; }
  const teles = (c.cams||[]).filter(x=>/tele|periscope/i.test(x)).length; camera += teles>=2 ? 3 : teles ? 2 : 0;
  if(/^200\s*MP/i.test((c.cams||[])[0]||"")) camera += .5;
  if(/8K/i.test(c.video||"")) camera += .5; else if(/4K/i.test(c.video||"")) camera += .25;
  const hz = c.tela.hz || (c.marca==="Apple" ? 60 : 90);
  let tela = ({60:4,90:6,120:8,144:9,165:10,185:10}[hz] ?? 7) + (/LTPO/i.test(c.tela.tec||"") ? .5 : 0) - (/LCD/i.test(c.tela.tec||"") ? 1.5 : 0) - (/^720|x 720|720 x/.test(c.tela.res||"") ? 1 : 0);
  let carga = c.carga; if(!carga){ carga = c.marca==="Apple" ? 25 : 18; est.push("bateria"); }
  const bateria = clamp(((c.bat||4000)-3000)/5500*7, 0, 7) + clamp(carga/100*3, 0, 3);
  const anos = t => +((String(c.upd||"").match(new RegExp("(\\d+) anos \\("+t)))||[0,0])[1];
  let os = anos("sistema"), seg = anos("segurança") || os;
  if(c.marca==="Apple"){ os = os || 6; seg = seg || 6; est.push("atualizacoes"); }
  else if(!os){ os = 1; seg = seg || 2; est.push("atualizacoes"); }
  const atualizacoes = clamp(os*.9 + seg*.6);
  const n = {desempenho, camera:clamp(camera), tela:clamp(tela), bateria:clamp(bateria), atualizacoes};
  n.tecnica = PESOS.reduce((t,[k,,w])=>t + n[k]*w/100, 0);
  const cr = c.antigo && CRITICA[c.antigo];
  if(c.critica && c.critica.nota != null){ n.critica = c.critica.nota; n.reviews = c.critica.n; }   // catálogo: média de análises editoriais (nota em 10)
  else { n.critica = cr ? cr[0]/10 : null; n.reviews = cr ? cr[1] : 0; }
  n.final = n.critica != null ? (n.critica + n.tecnica)/2 : n.tecnica;
  const p = catP(c); n.preco = c.preco || (p ? p.atualN : null);
  n.est = est;
  return n;
}
const MARCA_COR = {Samsung:"#1428A0",Apple:"#1C1C1C",Motorola:"#5C88DA",Redmi:"#FF6900",POCO:"#FFD000",Xiaomi:"#FF6900"};
function catImg(c, cls){
  const p = catP(c);
  if(c.img || p) return `<img class="${cls||""}" src="${R}${c.img || p.cut}" alt="${esc(c.marca+" "+c.nome)}" loading="lazy">`;
  return `<span class="cat-ico ${cls||""}" aria-hidden="true"><svg viewBox="0 0 40 64"><rect x="2" y="2" width="36" height="60" rx="7" fill="none" stroke="currentColor" stroke-width="2"/><rect x="15" y="6" width="10" height="2" rx="1" fill="currentColor"/></svg><b style="color:${MARCA_COR[c.marca]||"currentColor"}">${esc(c.marca[0])}</b></span>`;
}
const ICO_NBR = `<span class="ico-nbr" role="img" aria-label="Venda no Brasil não confirmada" title="Venda no Brasil não confirmada"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M1.5 8h13M8 1.5c-2.2 2-2.2 11 0 13M8 1.5c2.2 2 2.2 11 0 13" fill="none" stroke="currentColor" stroke-width="1.1"/></svg></span>`;
const PESQ_DATA = () => { const d = CAT().map(c=>c.precoInfo&&c.precoInfo.data).filter(Boolean).sort().pop(); return d ? d.split("-").reverse().join("/") : "—"; };
const SEG_NOME = {topo:"Topo de linha", intermediario:"Intermediário", entrada:"Entrada"};
const nota1 = v => v == null ? "—" : v.toFixed(1).replace(".", ",");

const ORD_NOME = {cb:"custo-benefício", nota:"nota final", critica:"nota da crítica"};
function resumoCat(c){
  const t = c.tela || {}, p = [];
  if(t.tec) p.push(`tela ${t.tec.replace(/\s*\d+X$/i,"")}${t.hz?` de ${t.hz} Hz`:""}`);
  if((c.cams||[]).some(x=>/OIS/i.test(x))) p.push("câmera com estabilização");
  if(c.bat) p.push(`bateria de ${c.bat.toLocaleString("pt-BR")} mAh`);
  const os = +(String(c.upd||"").match(/(\d+) anos \(sistema/)||[0,0])[1]; if(os) p.push(`${os} anos de sistema`);
  const s = p.join(", "); return s ? s[0].toUpperCase()+s.slice(1) : "";
}
function painelRk(x, pos, ordem){
  const c = x.c, n = x.n, src = c.img || (catP(c) ? catP(c).cut : null);
  const fmt = v => v==null ? "—" : nota1(v);
  const cor = v => v < 4 ? "#D9534F" : v >= 7 ? "#2FA86B" : "var(--v-gold)";
  const anel = (v, cr) => `<svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="30" fill="none" stroke="var(--v-line)" stroke-width="6"/>${v!=null?`<circle cx="36" cy="36" r="30" fill="none" stroke="${cr}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(v/10*188.5).toFixed(1)} 188.5" transform="rotate(-90 36 36)"/>`:""}<text x="36" y="42" text-anchor="middle">${v!=null?fmt(v):"—"}</text></svg>`;
  const POS = [["Câmera","camera",16,24],["Desempenho","desempenho",16,176],["Bateria","bateria",16,328],["Tela","tela",272,88],["Atualizações","atualizacoes",272,248]];
  const etq = POS.map(([t,k,l,tp])=>`<div class="xp-tag" style="left:${l}px;top:${tp}px"><span>${t}${n.est.includes(k)?" <em title=\"Estimado pela ficha\">*</em>":""}</span><b>${fmt(n[k])}</b><i style="--p:${n[k]*10}%;--c:${cor(n[k])}"></i></div>`).join("");
  const camadas = src ? Array.from({length:14},(_,i)=>`<img class="ly" src="${R}${src}" alt="" style="transform:translateZ(-${((i+1)*1.4).toFixed(1)}px)">`).join("") : "";
  const tel = src ? `<div class="xp-tel" style="--m:url('${R}${src}')"><div class="cam">${camadas}</div><img class="fr" src="${R}${src}" alt="${esc(c.marca+" "+c.nome)}"><span class="brilho"></span><img class="ref" src="${R}${src}" alt=""></div>` : `<div class="xp-tel xp-semfoto">${catImg(c)}</div>`;
  const pr = n.preco, pi = c.precoInfo || {};
  const baixo = pr ? Math.round(pr*.9/10)*10 : null, alto = pr ? Math.round(pr*1.1/10)*10 : null;
  const regua = pr ? `<div class="xp-preco"><h4>Quanto pagar</h4><p>Preço aproximado de hoje${pi.canais?`, pesquisado em ${pi.canais} ${pi.canais>1?"lojas":"loja"}`:""}${pi.data?` em ${pi.data.slice(8,10)}/${pi.data.slice(5,7)}`:""}${pi.gb?`, versão de ${pi.gb>=1000?pi.gb/1000+" TB":pi.gb+" GB"}`:""}.</p>
      <div class="xp-regua"><div class="xp-hoje" style="left:50%">Hoje ≈ ${brl(pr)}</div></div>
      <div class="xp-faixas"><div><b>até ${brl(baixo)}</b>Super promoção</div><div><b>${brl(baixo)} a ${brl(alto)}</b>Preço justo</div><div><b>acima de ${brl(alto)}</b>Caro</div></div></div>`
    : `<div class="xp-preco"><h4>Quanto pagar</h4><p>Ainda não temos preço pesquisado para este aparelho.</p></div>`;
  const art = c.antigo && publicados().filter(a=>a.phone===c.antigo).sort(porData)[0];
  const sobreCb = x.cb==null ? "Sem preço pesquisado" : x.cb>=9 ? "Entre os melhores da lista" : x.cb>=7 ? "Acima da média" : x.cb>=5 ? "Na média da lista" : "Abaixo da média";
  return `<li class="xp"><div class="xp-palco"><div class="xp-luz"></div><div class="xp-anel"></div><div class="xp-chao"></div>
      <svg class="xp-lin" viewBox="0 0 400 440" aria-hidden="true"><g stroke="var(--v-gold)" stroke-width="1.2" fill="var(--v-gold)">
      <line x1="128" y1="58" x2="172" y2="90"/><circle cx="172" cy="90" r="3"/><line x1="128" y1="210" x2="176" y2="200"/><circle cx="176" cy="200" r="3"/>
      <line x1="128" y1="362" x2="180" y2="316"/><circle cx="180" cy="316" r="3"/><line x1="272" y1="122" x2="232" y2="140"/><circle cx="232" cy="140" r="3"/>
      <line x1="272" y1="282" x2="228" y2="268"/><circle cx="228" cy="268" r="3"/></g></svg>
      ${tel}${etq}</div>
    <button type="button" class="xp-btn xp-cmp" data-compare="${c.id}">Comparar com outro</button>
    <div class="xp-dir">
      <div class="xp-tit"><span class="xp-selo">${pos}º em ${ORD_NOME[ordem]||ordem}</span><h3>${esc(c.nome)}</h3><p>${esc(c.marca)} · ${SEG_NOME[c.seg]}${c.br?"":` · ${ICO_NBR}`}${resumoCat(c)?" · "+esc(resumoCat(c)):""}</p></div>
      <div class="xp-aneis">
        <div class="xp-nota">${anel(n.critica,"var(--v-purple)")}<div><small>Crítica</small><span${c.critica && c.critica.fontes.length ? ` title="${esc(c.critica.fontes.map(f=>f.v+": "+String(f.n).replace(".",",")).join(" · "))}"` : ""}>${n.critica!=null?`Média de ${n.reviews} ${n.reviews>1?"análises":"análise"}`:"Sem análises publicadas"}</span></div></div>
        <div class="xp-nota">${anel(x.cb,"#2FA86B")}<div><small>Custo-benefício</small><span>${sobreCb}</span></div></div>
        <div class="xp-nota">${anel(n.final,"var(--v-gold)")}<div><small>Nota final</small><span>${n.critica!=null?"Crítica + laboratório":"Só laboratório e ficha"}</span></div></div>
      </div>
      ${c.critica && c.critica.sintese ? `<div class="xp-crit"><b>O que diz a crítica</b><p>${esc(c.critica.sintese)}</p>${c.critica.fontes.length?`<small>${c.critica.fontes.map(f=>`<a href="${esc(f.u)}" target="_blank" rel="noopener">${esc(f.v)}</a> ${String(f.n).replace(".",",")}`).join(" · ")}</small>`:""}</div>` : ""}
      ${regua}
      ${art?`<div class="xp-pe"><a class="xp-btn p" href="${R}artigos/${art.id}/">Ler a análise</a></div>`:""}
      ${n.est.length?`<small class="xp-obs">* Estimado pela ficha técnica, sem medição publicada.</small>`:""}
    </div></li>`;
}
function inclinaRk(el){
  const palco = el && el.querySelector(".xp-palco"), tel = palco && palco.querySelector(".xp-tel");
  if(!tel || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  palco.addEventListener("pointermove", e=>{ const r = palco.getBoundingClientRect(); const dx = (e.clientX-r.left)/r.width-.5, dy = (e.clientY-r.top)/r.height-.5;
    tel.style.setProperty("--ry", (-30 + dx*24).toFixed(1)+"deg"); tel.style.setProperty("--rx", (12 - dy*14).toFixed(1)+"deg"); tel.style.setProperty("--bx", (dx*60+50).toFixed(0)+"%"); });
  palco.addEventListener("pointerleave", ()=>{ tel.style.removeProperty("--ry"); tel.style.removeProperty("--rx"); tel.style.removeProperty("--bx"); });
}

function renderRanking2(){
  const main = document.getElementById("content");
  const L = CAT().map(c=>({c, n:notasCat(c)}));
  const comPreco = L.filter(x=>x.n.preco);
  const maxRaw = Math.max(...comPreco.map(x=>x.n.final/Math.sqrt(x.n.preco)));
  L.forEach(x=>{ x.cb = x.n.preco ? (x.n.final/Math.sqrt(x.n.preco))/maxRaw*10 : null; });
  /* temas: geral (custo-benefício ou crítica) e rankings por categoria (câmera, tela, jogos, bateria) */
  const TEMAS = {geral:{l:"Geral", k:null, ico:"M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.6 6.7 19.5l1.1-6L3.4 9.3l6-.8z"},
    camera:{l:"Câmera", k:"camera", t:"câmera", ico:"M4 8h3l2-3h6l2 3h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"},
    tela:{l:"Tela", k:"tela", t:"tela", ico:"M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM10 18h4"},
    jogos:{l:"Jogos", k:"desempenho", t:"desempenho", ico:"M7 9h10a4 4 0 0 1 3.9 4.9l-.6 2.6a2 2 0 0 1-3.4.9L15 15H9l-1.9 2.4a2 2 0 0 1-3.4-.9l-.6-2.6A4 4 0 0 1 7 9zM8 11.5v3M6.5 13h3M15.5 12h.01M17.5 14h.01"},
    bateria:{l:"Bateria", k:"bateria", t:"bateria", ico:"M3 8h15a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM22 11v2M5 11v2M8 11v2"}};
  const MARCAS = [...new Set(L.map(x=>x.c.marca))].sort();
  let ordem = "cb", seg = "", tema = "geral", marca = "", qtd = 10;
  main.classList.add("h2");
  main.innerHTML = `<header class="pg-head"><h1>Ranking</h1><p>Metade da nota vem da crítica especializada, a média das avaliações publicadas por sites de tecnologia do mundo todo. A outra metade vem de testes de laboratório e da ficha técnica. Depois comparamos com o preço médio de hoje.</p></header>
    <div class="rk-temas" role="tablist" aria-label="Tipo de ranking">${Object.entries(TEMAS).map(([k,t])=>`<button type="button" role="tab" class="rk-tema" data-tema="${k}" aria-selected="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${t.ico}"/></svg>${k==="geral"?"Geral":"Melhor "+(k==="jogos"?"para jogos":t.l.toLowerCase())}</button>`).join("")}<label class="rk-marca"><span class="sr">Marca</span><select id="rkMarca"><option value="">Todas as marcas</option>${MARCAS.map(m=>`<option>${esc(m)}</option>`).join("")}</select></label></div>
    <div class="rk-filtros" role="toolbar" aria-label="Ordenar e filtrar">
      <b>Ordenar por:</b>
      <button type="button" class="rk-f" data-ord="cb">Custo-benefício</button><button type="button" class="rk-f" data-ord="nota" id="rkOrdNota">Nota da crítica</button>
      <div class="rk-ordm"><button type="button" class="rk-ordm-b" aria-haspopup="true" aria-expanded="false" aria-label="Ordenar por"><span class="rk-ordm-p">Ordenar por: </span><b id="rkOrdNome">Custo-benefício</b><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div class="rk-ordm-l" role="menu" hidden><button type="button" role="menuitemradio" data-ord="cb"><b>Custo-benefício</b><small>Nota em relação ao preço de hoje</small></button><button type="button" role="menuitemradio" data-ord="nota"><b id="rkOrdNotaM">Nota da crítica</b><small id="rkOrdNotaD">Média das análises publicadas</small></button></div></div>
      <button type="button" class="rk-filt-b" aria-haspopup="dialog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h18l-7 8v6l-4 2v-8z"/></svg>Filtros<span class="rk-filt-n" hidden></span></button>
      <span class="rk-sep" aria-hidden="true"></span>
      ${[["topo","Topo de linha"],["intermediario","Intermediário"],["entrada","Entrada"]].map(([k,l])=>`<button type="button" class="rk-f" data-seg="${k}">${l}</button>`).join("")}
    </div>
    <section class="rk-box"><div class="rk-cab"><span>#</span><span>Celular</span><span id="rkCab1">Crítica</span><span>Custo-benefício</span><span>Nota final</span><span>Preço aprox. hoje</span><span></span></div><p class="rk-dica">Clique em um celular para ver a análise completa.</p><ol class="rk-lista" id="rkLista"></ol>
      <button type="button" class="rk-mais" id="rkMais" hidden></button>
      <p class="rk-nota" id="rkNota"></p>
      <p class="rk-legenda">${ICO_NBR} Venda no Brasil não confirmada: a ficha é da versão global e ainda não há versão oficial confirmada aqui.</p></section>
    <details class="rk-calc"><summary>Como calculamos</summary><div class="rk-calc-in">
      <p><b>Nota final</b> = metade crítica + metade laboratório e ficha. Todas as notas vão de 0 a 10.</p>
      <p><b>Crítica (50%)</b>: média simples das notas gerais de análises publicadas por sites de tecnologia do Brasil e de fora (como GSMArena, Oficina da Net, Tecnoblog, Canaltech e PhoneArena), convertidas para a escala de 0 a 10. Cada site conta uma vez. Abra um celular no ranking para ver quantas análises entraram na média. Quando um aparelho ainda não tem análises publicadas, a nota final usa só o laboratório e a ficha, e ele aparece como “sem nota” na coluna da crítica.</p>
      <p><b>Laboratório e ficha (50%)</b>, com estes pesos:</p>
      <ul>
        <li><b>Desempenho (25%)</b>: resultado do Geekbench 6 multi-core. Sem medição própria, estimamos pelo processador.</li>
        <li><b>Câmera (20%)</b>: estabilização óptica, ultrawide, teleobjetivas com zoom óptico e gravação em 4K ou 8K.</li>
        <li><b>Tela (15%)</b>: taxa de atualização, tecnologia (OLED ou LCD), LTPO e resolução.</li>
        <li><b>Bateria (20%)</b>: capacidade em mAh e velocidade de carregamento.</li>
        <li><b>Atualizações (20%)</b>: anos prometidos de versões do sistema e de segurança. A Apple não divulga prazo; usamos o histórico de 5 a 7 anos.</li>
      </ul>
      <p><b>Custo-benefício</b>: a nota final dividida pela raiz quadrada do preço médio de hoje, convertida para uma escala de 0 a 10, em que 10 é o melhor resultado da lista. Só entram aparelhos com preço pesquisado.</p>
      <p><b>Preço aproximado hoje</b>: média das menores ofertas de aparelhos novos encontradas em cada loja, na versão de armazenamento com mais lojas vendendo. Não inclui frete nem cupons. Pesquisa de ${PESQ_DATA()}, atualizada toda segunda-feira.</p>
    </div></details>`;
  const nTema = x => { const T = TEMAS[tema]; return T.k ? x.n[T.k] : x.n.critica; };
  const cbTema = (() => { const memo = {}; return k => { if(memo[k]) return memo[k];
    const m = Math.max(...L.filter(x=>x.n.preco && x.n[k]!=null).map(x=>x.n[k]/Math.sqrt(x.n.preco)));
    return memo[k] = x => x.n.preco && x.n[k]!=null ? (x.n[k]/Math.sqrt(x.n.preco))/m*10 : null; }; })();
  const cbDe = x => TEMAS[tema].k ? cbTema(TEMAS[tema].k)(x) : x.cb;
  const draw = () => {
    let arr = L.filter(x=>(!seg || x.c.seg===seg) && (!marca || x.c.marca===marca));
    if(ordem==="cb") arr = arr.filter(x=>cbDe(x)!=null).sort((a,b)=>cbDe(b)-cbDe(a));
    else arr = arr.filter(x=>nTema(x)!=null).sort((a,b)=>nTema(b)-nTema(a) || (b.n.final-a.n.final));
    /* ranking geral por custo-benefício, sem filtros: abre com 10 e mostra mais de 10 em 10; nos outros recortes, só o top 10 */
    const completo = tema==="geral" && ordem==="cb" && !seg && !marca;
    if(!completo) qtd = 10;
    const top = arr.slice(0, qtd), mais = document.getElementById("rkMais"), resto = arr.length - top.length;
    mais.hidden = !completo || resto <= 0;
    mais.textContent = resto > 0 ? `Ver mais ${Math.min(10, resto)} do ranking (${top.length} de ${arr.length})` : "";
    document.getElementById("rkLista").innerHTML = top.map((x,i)=>{ const c=x.c;
      return `<li class="rk-item${i<3?" top top"+(i+1):""}" data-id="${c.id}" data-pos="${i+1}" tabindex="0" role="button" aria-expanded="false">
        <span class="rk-pos">${i+1}</span>
        <span class="rk-cel"><span class="rk-img">${catImg(c)}</span><span class="rk-nome"><b>${esc(c.nome)}</b><small>${esc(c.marca)} · ${SEG_NOME[c.seg]}${c.br?"":` · ${ICO_NBR}`}</small></span></span>
        <span class="rk-v rk-n1" data-l="${TEMAS[tema].k ? TEMAS[tema].l : "Crítica"}">${nTema(x)!=null ? nota1(nTema(x)) : `<em class="rk-sem">sem nota</em>`}</span>
        <span class="rk-v" data-l="Custo-benefício">${cbDe(x)!=null ? nota1(cbDe(x)) : `<em class="rk-sem">sem preço</em>`}</span>
        <span class="rk-v rk-final" data-l="Nota final">${nota1(x.n.final)}</span>
        <span class="rk-v rk-preco" data-l="Preço aproximado hoje">${x.n.preco ? "≈ "+brl(x.n.preco) : `<em class="rk-sem">em pesquisa</em>`}</span>
        <span class="rk-seta" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </li>`; }).join("") || `<li class="rk-vazio">Ainda não temos aparelhos suficientes com esses dados nesta categoria.</li>`;
    const total = L.filter(x=>(!seg || x.c.seg===seg) && (!marca || x.c.marca===marca)).length, T = TEMAS[tema];
    const onde = `${seg?" da categoria "+SEG_NOME[seg]:""}${marca?" da "+marca:""}`;
    document.getElementById("rkNota").textContent = ordem==="cb" ? `Custo-benefício considera só os aparelhos que já têm preço pesquisado (${arr.length} de ${total}${onde}).`
      : T.k ? `Top 10 em ${T.t} entre ${total} aparelhos${onde}. A nota de ${T.t} vem da ficha técnica e de testes de laboratório (veja "Como calculamos").`
      : `Mostrando só aparelhos com análises publicadas (${arr.length} de ${total}${onde}).`;
    main.querySelectorAll("[data-ord]").forEach(b=>{ b.classList.toggle("on", b.dataset.ord===ordem); if(b.getAttribute("role")==="menuitemradio") b.setAttribute("aria-checked", b.dataset.ord===ordem); });
    main.querySelectorAll("[data-tema]").forEach(b=>{ const on = b.dataset.tema===tema; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
    const nomeNota = T.k ? `Nota de ${T.t}` : "Nota da crítica";
    document.getElementById("rkOrdNota").textContent = nomeNota; document.getElementById("rkOrdNotaM").textContent = nomeNota;
    document.getElementById("rkOrdNotaD").textContent = T.k ? "Pontuação da ficha e de testes nesta categoria" : "Média das análises publicadas";
    document.getElementById("rkCab1").textContent = T.k ? T.l : "Crítica";
    document.getElementById("rkLista").dataset.ord = ordem==="cb" ? "cb" : "critica";
    document.getElementById("rkOrdNome").textContent = ordem==="cb" ? "Custo-benefício" : nomeNota;
    const nf = (tema!=="geral") + !!seg + !!marca, nb = main.querySelector(".rk-filt-n"); nb.hidden = !nf; nb.textContent = nf;
    const p1 = document.querySelector("#rkLista .rk-item"); if(p1 && !draw.dica){ p1.classList.add("dica"); draw.dica = 1; }
    main.querySelectorAll("[data-seg]").forEach(b=>b.classList.toggle("on", b.dataset.seg===seg));
  };
  const lista = document.getElementById("rkLista");
  lista.addEventListener("click", e=>{
    if(e.target.closest("a,button")) return;
    const li = e.target.closest(".rk-item"); if(!li) return;
    const aberto = li.classList.contains("aberto");
    lista.querySelectorAll(".rk-item.aberto").forEach(x=>{ x.classList.remove("aberto"); x.setAttribute("aria-expanded","false"); });
    lista.querySelectorAll(".xp").forEach(x=>x.remove());
    if(aberto) return;
    const x = L.find(y=>y.c.id===li.dataset.id); if(!x) return;
    li.classList.add("aberto"); li.setAttribute("aria-expanded","true");
    li.insertAdjacentHTML("afterend", painelRk(x, +li.dataset.pos, !TEMAS[tema].k ? (ordem==="cb" ? "cb" : "critica") : ordem==="cb" ? "custo-benefício em "+TEMAS[tema].t : TEMAS[tema].t));
    inclinaRk(li.nextElementSibling);
  });
  lista.addEventListener("keydown", e=>{ if((e.key==="Enter"||e.key===" ") && e.target.classList.contains("rk-item")){ e.preventDefault(); e.target.click(); } });
  const ordB = main.querySelector(".rk-ordm-b"), ordL = main.querySelector(".rk-ordm-l");
  const abreOrd = on => { ordL.hidden = !on; ordB.setAttribute("aria-expanded", on); };
  ordB.addEventListener("click", e=>{ e.stopPropagation(); abreOrd(ordL.hidden); });
  document.addEventListener("click", e=>{ if(!ordL.hidden && !ordL.contains(e.target)) abreOrd(false); });
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !ordL.hidden){ abreOrd(false); ordB.focus(); } });
  main.querySelectorAll("[data-ord]").forEach(b=>b.addEventListener("click", ()=>{ ordem=b.dataset.ord; abreOrd(false); draw(); }));
  main.querySelectorAll("[data-seg]").forEach(b=>b.addEventListener("click", ()=>{ seg = seg===b.dataset.seg ? "" : b.dataset.seg; draw(); }));
  document.getElementById("rkMais").addEventListener("click", ()=>{ const antes = qtd; qtd += 10; draw();
    const novo = document.querySelector(`#rkLista .rk-item[data-pos="${antes+1}"]`); if(novo) novo.focus({preventScroll:true}); });
  /* geral abre em custo-benefício; as categorias abrem pela melhor nota da categoria */
  main.querySelectorAll("[data-tema]").forEach(b=>b.addEventListener("click", ()=>{ tema = b.dataset.tema; ordem = tema==="geral" ? "cb" : "nota"; draw(); }));
  document.getElementById("rkMarca").addEventListener("change", e=>{ marca = e.target.value; draw(); });
  /* celular: botão Filtros abre uma gaveta com tipo de ranking, categoria e marca; vale ao tocar em "Ver ranking" */
  const fb = main.querySelector(".rk-filt-b");
  const fsheet = document.createElement("div"); fsheet.className = "rk-fs-fundo"; fsheet.hidden = true;
  const grupo = (tit, nome, ops) => `<fieldset class="rk-fs-g"><legend>${tit}</legend><div>${ops.map(([v,l])=>`<button type="button" class="rk-fs-op" data-g="${nome}" data-v="${v}">${l}</button>`).join("")}</div></fieldset>`;
  fsheet.innerHTML = `<div class="rk-fs" role="dialog" aria-modal="true" aria-labelledby="rkFsT"><div class="rk-fs-top"><b id="rkFsT">Filtros</b><button type="button" class="rk-fs-x" aria-label="Fechar">×</button></div>
    ${grupo("Ranking de", "tema", Object.entries(TEMAS).map(([k,t])=>[k, k==="geral" ? "Geral" : k==="jogos" ? "Jogos" : t.l]))}
    ${grupo("Categoria", "seg", [["","Todas"],["topo","Topo de linha"],["intermediario","Intermediário"],["entrada","Entrada"]])}
    ${grupo("Marca", "marca", [["","Todas"]].concat(MARCAS.map(m=>[m,m])))}
    <div class="rk-fs-pe"><button type="button" class="rk-fs-limpa">Limpar</button><button type="button" class="rk-fs-ok">Ver ranking</button></div></div>`;
  document.body.appendChild(fsheet);
  let rasc = {};
  const pinta = () => fsheet.querySelectorAll(".rk-fs-op").forEach(b=>{ const on = String(rasc[b.dataset.g]) === b.dataset.v; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
  const fecha = () => { fsheet.hidden = true; document.documentElement.classList.remove("gm-on"); fb.focus(); };
  fb.addEventListener("click", ()=>{ rasc = {tema, seg, marca}; pinta(); fsheet.hidden = false; document.documentElement.classList.add("gm-on"); fsheet.querySelector(".rk-fs-x").focus(); });
  fsheet.addEventListener("click", e=>{ if(e.target===fsheet) fecha(); });
  fsheet.querySelector(".rk-fs-x").onclick = fecha;
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !fsheet.hidden) fecha(); });
  fsheet.querySelectorAll(".rk-fs-op").forEach(b=>b.addEventListener("click", ()=>{ rasc[b.dataset.g] = b.dataset.v; pinta(); }));
  fsheet.querySelector(".rk-fs-limpa").onclick = ()=>{ rasc = {tema:"geral", seg:"", marca:""}; pinta(); };
  fsheet.querySelector(".rk-fs-ok").onclick = ()=>{ if(rasc.tema !== tema) ordem = rasc.tema==="geral" ? "cb" : "nota";
    tema = rasc.tema; seg = rasc.seg; marca = rasc.marca; document.getElementById("rkMarca").value = marca; fecha(); draw(); };
  draw();
}

function vencedores(cmp, cs, ns){
  if(!cmp) return [];
  const v = cs.map((c,i)=>{ try{ const x = cmp(c, ns[i]); return typeof x==="number" && isFinite(x) ? x : null; }catch(e){ return null; } });
  const val = v.filter(x=>x!=null); if(val.length < 2) return [];
  const m = Math.max(...val); if(val.every(x=>x===m)) return [];
  return v.map((x,i)=>x===m ? i : -1).filter(i=>i>=0);
}
const MES = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
function updMarca(marca){
  if(marca==="Apple") return "a Apple não divulga prazo, mas costuma atualizar por 5 a 7 anos";
  const cont = {}; CAT().filter(c=>c.marca===marca && c.upd).forEach(c=>cont[c.upd]=(cont[c.upd]||0)+1);
  const top = Object.entries(cont).sort((a,b)=>b[1]-a[1])[0];
  return top ? `a ${marca} costuma oferecer ${top[0].replace(/\(([^)]+)\)/g,"de $1")}` : "";
}
const lancPreco = c => (c.lanc && c.lanc.preco_brl) || (catP(c) && catP(c).precoN) || null;
const lancData = c => { if(c.lanc && c.lanc.data){ const [y,m] = c.lanc.data.split("-"); return `${MES[+m-1]}/${y}`; } const p = catP(c), s = p && p.specs; return s && s.lancamento ? s.lancamento.replace(/\s*\(.*\)/,"").toLowerCase() : null; };
function infoLanc(c){
  const pr = notasCat(c).preco, pi = c.precoInfo || {};
  const quando = pi.data ? ` (pesquisa de ${pi.data.slice(8,10)}/${pi.data.slice(5,7)})` : "";
  const linha1 = !c.br
    ? `${ICO_NBR} Sem venda oficial no Brasil${pr ? ` · ≈ ${brl(pr)} em importadoras${quando}` : ""}`
    : pr ? `Preço médio hoje: <b>≈ ${brl(pr)}</b>${quando}` : "Preço médio hoje: em pesquisa";
  const upd = c.upd ? `Atualizações: ${c.upd.replace(/\(([^)]+)\)/g,"de $1")}` : (updMarca(c.marca) ? `Sem prazo informado; ${updMarca(c.marca)}` : "Atualizações: não informado");
  return `<span class="cp-info"><span>${linha1}</span><span>${esc(upd)}</span></span>`;
}
/* comparador: quem faz sentido comparar com quem (categoria do catálogo + preço de hoje) */
const SEG_RANK = {entrada:0, intermediario_entrada:1, intermediario:2, intermediario_premium:3, topo_de_linha:4};
const SEG_LONGO = {entrada:"entrada", intermediario_entrada:"intermediário de entrada", intermediario:"intermediário", intermediario_premium:"intermediário premium", topo_de_linha:"topo de linha"};
const precoRef = c => notasCat(c).preco || lancPreco(c) || null;
function distCmp(a, b){
  const ra = SEG_RANK[a.segOrig] ?? 2, rb = SEG_RANK[b.segOrig] ?? 2;
  const pa = precoRef(a), pb = precoRef(b);
  return Math.abs(ra - rb) + (pa && pb ? 1.5*Math.abs(Math.log(pa/pb)) : .6) + (a.formato !== b.formato ? .5 : 0);
}
const parecido = (a, b) => distCmp(a, b) <= 1.1;
function renderComparador(){
  const main = document.getElementById("content");
  const C = CAT(), byId = id => C.find(c=>c.id===id);
  const marcas = [...new Set(C.map(c=>c.marca))];
  const N = 3;
  let sel = [null,null,null];
  try{ const s = JSON.parse(localStorage.getItem("cmp-sel2")); localStorage.removeItem("cmp-sel2");
    if(Array.isArray(s)) s.slice(0,N).forEach((id,i)=>{ if(!id) return; const c = byId(id) || C.find(x=>x.antigo===id); if(c) sel[i]=c.id; }); }catch(e){}
  main.classList.add("h2");
  main.innerHTML = `<header class="pg-head"><h1>Comparador</h1><p>Escolha a marca e o modelo de até 3 celulares e veja a ficha técnica, o preço de lançamento e quanto custa hoje.</p></header>
    <div class="cp-slots">${[0,1,2].map(i=>`<div class="cp-slot" data-i="${i}"><div class="cp-topo"><b class="cp-t">Celular ${i+1}</b><button type="button" class="cp-del" aria-label="Tirar o celular ${i+1} do comparativo" title="Tirar do comparativo" hidden><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5M7 7v4M9 7v4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
      <select class="cp-sel cp-marca" aria-label="Marca do celular ${i+1}"><option value="">Marca</option>${marcas.map(m=>`<option>${esc(m)}</option>`).join("")}</select>
      <select class="cp-sel cp-modelo" aria-label="Modelo do celular ${i+1}" disabled><option value="">Modelo</option></select>
      <div class="cp-foto"></div></div>`).join("")}</div>
    <section class="cp-sug" id="cpSug" aria-live="polite"></section>
    <section class="cp-ficha" id="cpFicha"></section>
    <div class="cp-fix" id="cpFix" aria-hidden="true"><div class="cp-fix-in"></div></div>`;
  const slots = [...main.querySelectorAll(".cp-slot")];
  const visiveis = () => matchMedia("(max-width:760px)").matches ? 2 : N;
  const refDe = i => { const j = sel.findIndex((id,k)=>id && k!==i); return j >= 0 ? byId(sel[j]) : null; };
  const fillModelos = (i, marca, semRec) => { const m = slots[i].querySelector(".cp-modelo");
    const lista = C.filter(c=>c.marca===marca).sort((a,b)=>a.nome.localeCompare(b.nome));
    const ref = semRec ? null : refDe(i);
    const opt = (c, rec) => `<option value="${c.id}">${esc(c.nome)}${rec ? "  ★ recomendado" : ""}</option>`;
    if(ref && marca){
      const bons = lista.filter(c=>c.id!==ref.id && parecido(c, ref)).sort((a,b)=>distCmp(a,ref)-distCmp(b,ref));
      const outros = lista.filter(c=>!bons.includes(c));
      m.innerHTML = `<option value="">Modelo</option>` + (bons.length ? `<optgroup label="Mais parecidos com o ${esc(ref.nome)}">${bons.map((c,k)=>opt(c, k===0)).join("")}</optgroup>` : "")
        + (outros.length ? `<optgroup label="${bons.length ? "Outras categorias" : `Nenhum ${esc(marca)} na mesma faixa do ${esc(ref.nome)}`}">${outros.map(c=>opt(c)).join("")}</optgroup>` : "");
    } else m.innerHTML = `<option value="">Modelo</option>` + lista.map(c=>opt(c)).join("");
    m.disabled = !marca; };
  const sugestoes = () => {
    const box = document.getElementById("cpSug");
    const vazio = sel.slice(0, visiveis()).findIndex(x=>!x);
    const ref = sel[0] ? byId(sel[0]) : sel.map(id=>id && byId(id)).find(Boolean);
    if(!ref || vazio < 0){ box.innerHTML = ""; return; }
    const ja = new Set(sel.filter(Boolean));
    const cand = C.filter(c=>!ja.has(c.id)).map(c=>({c, d:distCmp(c, ref)})).sort((a,b)=>(a.c.marca===ref.marca)-(b.c.marca===ref.marca) || a.d-b.d).slice(0,4);
    box.innerHTML = `<div class="cp-sug-in"><div class="cp-sug-t"><b>Boas comparações para o ${esc(ref.nome)}</b><span>Celulares da mesma categoria (${esc(SEG_LONGO[ref.segOrig]||SEG_NOME[ref.seg])}) e faixa de preço parecida. Toque para colocar no Celular ${vazio+1}.</span></div>
      <div class="cp-sug-l">${cand.map(({c})=>{ const pr = precoRef(c); return `<button type="button" class="cp-sug-b" data-id="${c.id}"><span class="cp-sug-img">${catImg(c)}</span><span><small>${esc(c.marca)}</small><b>${esc(c.nome)}</b><em>${pr ? "≈ "+brl(pr) : SEG_NOME[c.seg]}</em></span></button>`; }).join("")}</div></div>`;
    box.querySelectorAll(".cp-sug-b").forEach(b=>b.addEventListener("click", ()=>{ const k = sel.slice(0, visiveis()).findIndex(x=>!x); if(k<0) return; sel[k] = b.dataset.id; draw(); slots[k].scrollIntoView({behavior:"smooth", block:"nearest"}); }));
  };
  const linhas = [
    ["Categoria", c=>SEG_NOME[c.seg]], ["Preço aprox. hoje", (c,n)=>n.preco ? "≈ "+brl(n.preco) : "em pesquisa", (c,n)=>n.preco ? -n.preco : null], ["Preço de lançamento", c=>lancPreco(c) ? brl(lancPreco(c)) : "não informado"],
    ["Nota final", (c,n)=>nota1(n.final), (c,n)=>+n.final.toFixed(1)], ["Nota da crítica", (c,n)=>n.critica!=null ? nota1(n.critica) : "sem nota", (c,n)=>n.critica!=null ? +n.critica.toFixed(1) : null],
    ["Tela", c=>[c.tela.pol ? String(c.tela.pol).replace(".",",")+"\"" : "", c.tela.tec, c.tela.res].filter(Boolean).join(" · "), (c,n)=>n.tela],
    ["Taxa de atualização", c=>c.tela.hz ? c.tela.hz+" Hz" : "60 Hz", c=>c.tela.hz || 60], ["Processador", c=>c.chip, (c,n)=>+n.desempenho.toFixed(1)], ["Memória RAM", c=>c.ram.length ? c.ram.join(" ou ")+" GB" : "—", c=>c.ram.length ? Math.max(...c.ram) : null],
    ["Armazenamento", c=>c.armaz.map(g=>g>=1000 ? (g/1000)+" TB" : g+" GB").join(", "), c=>c.armaz.length ? Math.max(...c.armaz) : null], ["Câmeras traseiras", c=>c.cams.join("<br>"), (c,n)=>n.camera], ["Câmera frontal", c=>c.frontal],
    ["Vídeo", c=>c.video], ["Bateria", c=>c.bat ? c.bat.toLocaleString("pt-BR")+" mAh" : "—", c=>c.bat || null], ["Carregamento", c=>[c.carga ? c.carga+" W com fio" : "", c.semfio && !/^Não/.test(c.semfio) ? c.semfio+" sem fio" : ""].filter(Boolean).join(" · ") || "—", c=>c.carga || null],
    ["Resistência", c=>c.prot || "—"], ["Peso", c=>c.peso ? c.peso+" g" : "—", c=>c.peso ? -c.peso : null], ["Sistema", c=>c.sistema], ["Atualizações", c=>c.upd || (c.marca==="Apple" ? "Sem prazo oficial (costuma ser de 5 a 7 anos)" : "Não informado"), (c,n)=>c.upd || c.marca==="Apple" ? +n.atualizacoes.toFixed(1) : null],
    ["5G", c=>c.g5 ? "Sim" : "Não", c=>c.g5 ? 1 : 0], ["NFC", c=>c.nfc || "—"], ["Venda no Brasil", c=>c.br ? "Confirmada" : "Não confirmada"]];
  const draw = () => {
    slots.forEach((el,i)=>{ const c = sel[i] && byId(sel[i]);
      if(c){ el.querySelector(".cp-marca").value = c.marca; fillModelos(i, c.marca, true); el.querySelector(".cp-modelo").value = c.id; }
      el.querySelector(".cp-foto").innerHTML = c ? `<span class="cp-img">${catImg(c)}</span><b>${esc(c.nome)}</b>${infoLanc(c)}` : `<span class="cp-mais" aria-hidden="true">+</span>`;
      el.classList.toggle("cheio", !!c); el.querySelector(".cp-del").hidden = !c; });
    sugestoes();
    const cs = sel.map(id=>id && byId(id)).filter(Boolean);
    const box = document.getElementById("cpFicha");
    if(cs.length < 2){ box.innerHTML = `<p class="cp-vazio">Escolha pelo menos dois celulares para ver a ficha técnica lado a lado.</p>`; return; }
    const ns = cs.map(notasCat);
    const cab = c => `<span class="cp-th"><span class="cp-th-img">${catImg(c)}</span><span><small>${esc(c.marca)}</small>${esc(c.nome)}</span></span>`;
    const rk = cs.map(c=>SEG_RANK[c.segOrig] ?? 2), longe = Math.max(...rk) - Math.min(...rk) >= 2;
    const aviso = longe ? `<div class="cp-aviso"><b>Categorias bem diferentes</b><span>Você está comparando ${(l=>l.length>2 ? l.slice(0,-1).join(", ")+" e "+l[l.length-1] : l.join(" com "))(cs.map(c=>`o ${esc(c.nome)} (${esc(SEG_LONGO[c.segOrig]||SEG_NOME[c.seg])})`))}. A comparação vale, mas as diferenças tendem a ser grandes em quase tudo. Para um comparativo mais equilibrado, escolha celulares da mesma categoria: a lista de modelos mostra primeiro os mais parecidos.</span></div>` : "";
    box.innerHTML = aviso + `<table class="cp-tab" data-k="${cs.map(c=>c.id).join()}" style="--n:${cs.length}"><colgroup><col class="cp-c0">${cs.map(()=>`<col>`).join("")}</colgroup><thead><tr><th></th>${cs.map(c=>`<th>${cab(c)}</th>`).join("")}</tr></thead><tbody>${
      linhas.map(([k,fn,cmp])=>{ const ven = vencedores(cmp, cs, ns);
        return `<tr><th>${k}</th>${cs.map((c,i)=>`<td${ven.includes(i)?' class="ven"':""}>${fn(c,ns[i]) || "—"}</td>`).join("")}</tr>`; }).join("")}</tbody></table>
      <p class="cp-leg"><span class="cp-leg-cor" aria-hidden="true"></span>Destaque em roxo: o celular que se sai melhor em cada item.</p>
      <p class="cp-fonte">Fichas: ${cs.map(c=>c.fonte ? `<a href="${esc(c.fonte)}" target="_blank" rel="noopener">${esc(c.nome)}</a>` : "").filter(Boolean).join(", ")}. Preços de hoje entram conforme a pesquisa semanal.</p>`;
  };
  const fix = document.getElementById("cpFix"), fixIn = fix.querySelector(".cp-fix-in");
  const posFix = () => {
    const tab = document.querySelector(".cp-tab"); if(!tab){ fix.classList.remove("on"); return; }
    const hdr = document.querySelector(".hdr"), topo = hdr ? hdr.getBoundingClientRect().bottom : 0;
    const head = tab.tHead.getBoundingClientRect(), r = tab.getBoundingClientRect();
    const on = head.bottom < topo && r.bottom > topo + 120;
    fix.style.top = topo + "px"; fix.classList.toggle("on", on);
    if(!on) return;
    const ths = [...tab.tHead.rows[0].cells];
    if(fixIn.dataset.k !== tab.dataset.k){ fixIn.innerHTML = ths.slice(1).map(th=>`<div class="cp-fix-cel">${th.innerHTML}</div>`).join(""); fixIn.dataset.k = tab.dataset.k; }
    [...fixIn.children].forEach((d,i)=>{ const b = ths[i+1].getBoundingClientRect(); d.style.left = b.left+"px"; d.style.width = b.width+"px"; });
  };
  addEventListener("scroll", posFix, {passive:true}); addEventListener("resize", posFix);
  document.getElementById("cpFicha").addEventListener("scroll", posFix, {passive:true});
  slots.forEach((el,i)=>{
    el.querySelector(".cp-del").addEventListener("click", ()=>{
      sel = sel.filter((_,k)=>k!==i).concat([null]);   // os da direita andam uma casa para a esquerda
      slots.forEach((o,k)=>{ if(!sel[k]){ o.querySelector(".cp-marca").value = ""; const m = o.querySelector(".cp-modelo"); m.innerHTML = `<option value="">Modelo</option>`; m.disabled = true; } });
      draw(); });
    el.querySelector(".cp-marca").addEventListener("change", e=>{ fillModelos(i, e.target.value); sel[i]=null; draw(); });
    el.querySelector(".cp-modelo").addEventListener("change", e=>{ sel[i] = e.target.value || null; draw();
      slots.forEach((o,k)=>{ if(k!==i && !sel[k]){ const mk = o.querySelector(".cp-marca").value; if(mk) fillModelos(k, mk); } }); });
  });
  draw();
}

/* ---------- game: cenas em pixel art 16 bits (canvas 128x72, ampliado sem suavizar) ---------- */
const PIX = (() => {
  const W = 128, H = 68, CH = 56;   /* CH = linha do chão */
  const PAL = {K:"#1b1420",H:"#3a2318",h:"#603c28",S:"#c98a5e",s:"#a86c45",W:"#f2f0ea",P:"#7c5cff",p:"#5b3fd6",D:"#2b2b3a",d:"#1e1e2a",
    G:"#d4af5a",g:"#a8862f",F:"#26262e",L:"#8fe3c8",R:"#d9534f",O:"#4caf50",Y:"#e0a030",B:"#e88a8a",k:"#342446",C:"#468cdc",c:"#2864b4",N:"#f0c896",T:"#5ac878",A:"#9aa0b8",a:"#6a7088"};
  const col = v => PAL[v] || v;
  const R = (c,x,y,w,h,v) => { if(w<=0||h<=0) return; c.fillStyle = col(v); c.fillRect(Math.round(x),Math.round(y),w,h); };
  const put = (c,rows,x,y,flip) => { x = Math.round(x); y = Math.round(y);
    rows.forEach((r,j)=>{ if(flip) r = [...r].reverse().join(""); for(let i=0;i<r.length;i++){ const v = PAL[r[i]]; if(v){ c.fillStyle = v; c.fillRect(x+i,y+j,1,1); } } }); };
  /* ---- personagens ---- */
  const TOP = {
    girl:["......KKKKKK......","....KKHHHHHHKK....","...KHHHHHHHHHHK...","..KHHhhHHHHHHHHK..","..KHHHHHHHHHHHHKK.","..KHSSSSSSSSSSHKHK","..KHSSSSSSSSSSHKHK"],
    boy: ["..................","....KKKKKKKKKK....","...KHhHHHhHHHhK...","..KHHHHHHHHHHHHK..","..KHHHHHHHHHHHHK..","..KHSSSSSSSSSSHK..","..KSSSSSSSSSSSSK.."]};
  const FACE = {
    feliz: ["..KSSKSSSSSSKSSK..","..KSSKSSSSSSKSSK..","..KSBSSSSSSSSBSK..","...KSSSKSSKSSSK...","....KKSSKKSSKK...."],
    neutro:["..KSSKSSSSSSKSSK..","..KSSKSSSSSSKSSK..","..KSBSSSSSSSSBSK..","...KSSSSKKSSSSK...","....KKSSSSSSKK...."],
    triste:["..KSSSSSSSSSSSSK..","..KSKKSSSSSSKKSK..","..KSSSSSSSSSSCSK..","...KSSSSKKSSSCK...","....KKSKSSKSKK...."],
    susto: ["..KSKKSSSSSSKKSK..","..KSKKSSSSSSKKSK..","..KSSSSSSSSSSSSK..","...KSSSSKKSSSSK...","....KKSSKKSSKK...."],
    dorme: ["..KSSSSSSSSSSSSK..","..KSKKSSSSSSKKSK..","..KSBSSSSSSSSBSK..","...KSSSSSSSSSSK...","....KKSSKKSSKK...."],
    pisca: ["..KSSKSSSSSSSSSK..","..KSSKSSSSSSKKSK..","..KSBSSSSSSSSBSK..","...KSSSKSSKSSSK...","....KKSSKKSSKK...."]};
  const LEG = ["....KDDDDDDDDK....","....KDDDKKDDDK....","....KDDK..KDDK....","....KDDK..KDDK....","....KSSK..KSSK....","...KWWWK..KWWWK...","...KKKKK..KKKKK..."];
  const BODY = {
    cel:  ["......KSSSSK......","....KKPPPPPPKK....","...KPPPPPPPPPPK...","..KPPPKFFFFKPPPK..","..KPPSKFLLFKSPPK..","..KPPSKFLLFKSPPK..","..KPpSKFFFFKSpPK..","...KKPPPPPPPPKK...","....KPPPPPPPPK...."],
    cima: ["..KK..KSSSSK..KK..","..KSKKPPPPPPKKSK..","...KSPPPPPPPPSK...","....KPPPPPPPPK....","....KPPPPPPPPK....","....KPPPPPPPPK....","....KPpPPPPpPK....","....KPPPPPPPPK....","....KPPPPPPPPK...."],
    baixo:["......KSSSSK......","....KKPPPPPPKK....","...KPPPPPPPPPPK...","..KPPKPPPPPPKPPK..","..KPPKPPPPPPKPPK..","..KPSKPPPPPPKPPK..","..KSSKPPPPPPKSFK..","...KKKPPPPPPKKFK..","....KPPPPPPPPKK..."],
    jogo: ["......KSSSSK......","....KKPPPPPPKK....","...KPPPPPPPPPPK...","..KSKFFFFFFFFFKSK.","..KSKFLLLLLLLFKSK.","..KSKFLLLLLLLFKSK.","...KKFFFFFFFFFKK..","....KPPPPPPPPK....","....KPPPPPPPPK...."],
    selfie:["......KSSSSK...KK.","....KKPPPPPPKKKFK.","...KPPPPPPPPPKSFK.","..KPPKPPPPPPPKSK..","..KPPKPPPPPPPPK...","..KPSKPPPPPPPPK...","..KSSKPPPPPPPPK...","...KKKPPPPPPPPK...","....KPPPPPPPPK...."]};
  const BUG = ["...K..........K...","....K........K....",".....K......K.....","....KKKKKKKKKK....","...KkkkkkkkkkkK...","..KkWWKkkkkKWWkK..","..KkWKKkkkkKKWkK..","...KkkkkKKkkkkK...","..KKGGGGGKGGGGGKK.",".KGGgGGGGKGGGGgGGK","KGGGGGGGGKGGGGGGGK","KGGGGGGGGKGGGGGGGK","KGGGGGGGGKGGGGGGGK","KGgGGGGGGKGGGGGGgK",".KGGGGGGGKGGGGGGK.",".KGGGGGGGKGGGGGGK.","..KKGGGGGKGGGGKK..","...KKKKKKKKKKKK...","...K.K......K.K...","..K..K......K..K.."];
  /* desenha o personagem com os pés na linha y (28 px de altura); bug tem 20 */
  function pessoa(c, av, x, pe, face="feliz", pose="cel", camisa){
    if(av === "bug"){
      const y = pe - 20; put(c, BUG, x, y);
      if(face==="triste"){ R(c,x+5,y+7,1,2,"C"); } if(face==="susto"){ R(c,x+4,y+4,2,1,"W"); R(c,x+12,y+4,2,1,"W"); }
      if(face==="dorme"){ R(c,x+4,y+5,3,2,"k"); R(c,x+11,y+5,3,2,"k"); R(c,x+4,y+6,3,1,"W"); R(c,x+11,y+6,3,1,"W"); }
      if(face==="feliz"||face==="pisca"){ R(c,x+5,y+6,1,1,"W"); if(face==="pisca"){ R(c,x+12,y+5,2,2,"k"); R(c,x+12,y+6,2,1,"W"); } }
      if(pose==="cel"||pose==="selfie"){ R(c,x+7,y+10,5,7,"K"); R(c,x+8,y+11,3,5,"L"); }
      if(pose==="jogo"){ R(c,x+4,y+11,10,5,"K"); R(c,x+5,y+12,8,3,"L"); }
      if(pose==="baixo"){ R(c,x+14,y+13,3,5,"K"); R(c,x+15,y+14,1,3,"F"); }
      if(pose==="cima"){ R(c,x-1,y+6,2,2,"K"); R(c,x+17,y+6,2,2,"K"); }
      return;
    }
    let rows = TOP[av==="boy"?"boy":"girl"].concat(FACE[face]||FACE.feliz, BODY[pose]||BODY.cel, LEG);
    if(av === "boy") rows = rows.map(r=>r.replace(/P/g,"G").replace(/p/g,"g"));
    if(camisa) rows = rows.map(r=>r.replace(/P/g,camisa[0]).replace(/p/g,camisa[1]));
    put(c, rows, x, pe - rows.length);
  }
  /* ---- objetos ---- */
  const HEART = [".KK.KK.","KRRKRRK","KRRRRRK",".KRRRK.","..KRK..","...K..."];
  const COIN = [".KKK.","KGGgK","KGYgK","KGGgK",".KKK."];
  const PIG = ["....KKKKKKKK.....","..KKBBBBBBBBKK...",".KBBBBBBBBBBBBK..","KBBBKBBBBBBBBBBKK","KBBBBBBBBBBBBBBBK","KBBBBBBBBBBBBBBRK","KBBBBBBBBBBBBBBBK",".KBBBBBBBBBBBBBK.","..KKBBKKKKKBBKK..","...KKK.....KKK..."];
  const CROWN = ["K..K..K","KGKGKGK","KGGGGGK","KKKKKKK"];
  const balao = (c,x,y,w=16,h=7,pts=true) => { R(c,x,y,w,h,"K"); R(c,x+1,y+1,w-2,h-2,"W"); R(c,x+2,y+h,3,2,"K"); R(c,x+3,y+h-1,1,1,"W"); if(pts) for(let i=0;i<3;i++) R(c,x+3+i*4,y+3,2,1,"K"); };
  const bateria = (c,x,y,n,v) => { R(c,x,y,14,7,"K"); R(c,x+14,y+2,2,3,"K"); R(c,x+1,y+1,12,5,"#19191e"); R(c,x+1,y+1,Math.max(1,Math.round(12*n)),5,v); };
  const brilho = (c,x,y,v,f) => { const s = f%2; R(c,x,y,1,1,v); if(s){ R(c,x-1,y,1,1,v); R(c,x+1,y,1,1,v); R(c,x,y-1,1,1,v); R(c,x,y+1,1,1,v); } };
  const sobe = (t, vel, alt, fase=0) => ((t/vel + fase) % 1) * alt;   /* 0..alt em loop */
  /* fonte 3x5 (M e W com 5) */
  const FN = {"0":"111101101101111","1":"010110010010111","2":"111001111100111","3":"111001111001111","4":"101101111001001","5":"111100111001111","6":"111100111101111","7":"111001001001001","8":"111101111101111","9":"111101111001111",
    "%":"101001010100101","A":"010101111101101","T":"111010010010010","C":"111100100100111","H":"101101111101101"," ":"000000000000000","!":"010010010000010","?":"111001011000010","Z":"111001010100111","X":"101101010101101","$":"011110010011110",
    "R":"110101110101101","E":"111100110100111","S":"111100111001111","O":"111101101101111","N":"110101101101101","F":"111100110100100","I":"111010010010111","Q":"111101101111011","U":"101101101101111","D":"110101101101110","L":"100100100100111","P":"111101111100100",
    "V":"101101101101010","B":"110101110101110","G":"111100101101111","J":"001001001101111","K":"101101110101101","Y":"101101010010010","+":"000010111010000",":":"000010000010000","-":"000000111000000"};
  const F5 = {M:"1000111011101011000110001",W:"1000110001101011101110001"};
  function texto(c,x,y,s,v="W"){ for(const ch0 of s){ const ch = ch0.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
      if(F5[ch]){ [...F5[ch]].forEach((b,k)=>{ if(b==="1") R(c,x+k%5,y+(k/5|0),1,1,v); }); x += 6; continue; }
      if(ch==="."){ R(c,x,y+4,1,1,v); x += 2; continue; }
      [...(FN[ch]||FN[" "])].forEach((b,k)=>{ if(b==="1") R(c,x+k%3,y+(k/3|0),1,1,v); }); x += 4; } }
  const largura = s => [...s].reduce((a,ch)=>a + ("MWmw".includes(ch)?6:ch==="."?2:4), 0) - 1;
  const textoC = (c,cx,y,s,v) => texto(c, Math.round(cx - largura(s)/2), y, s, v);
  /* ---- cenários ---- */
  const chao = (c,a,b) => { R(c,0,CH,W,H-CH,a); for(let x=0;x<W;x+=8) R(c,x,CH,1,H-CH,b); };
  const quarto = (c,noite) => { R(c,0,0,W,H,noite?"#161a36":"#463a62"); R(c,86,16,26,18,"K"); R(c,87,17,24,16,noite?"#22285a":"#ffc478"); if(!noite) R(c,87,17,24,6,"#ffe2a0"); R(c,98,17,1,16,"K"); R(c,87,25,24,1,"K");
    if(noite){ for(let dx=0;dx<8;dx++) for(let dy=0;dy<8;dy++) if((dx-3.5)**2+(dy-3.5)**2<=14 && (dx-6)**2+(dy-2)**2>10) R(c,92+dx,19+dy,1,1,"#f0e6aa"); }
    chao(c, noite?"#28243c":"#5c4030", noite?"#221e34":"#4c3426"); };
  const cama = (c,x) => { R(c,x,CH-12,40,12,"K"); R(c,x+1,CH-11,38,11,"#e6e6f0"); R(c,x+1,CH-11,9,5,"W"); R(c,x+11,CH-8,28,8,"C"); R(c,x+11,CH-8,28,2,"c"); };
  const criado = (c,x) => { R(c,x,CH-10,13,10,"K"); R(c,x+1,CH-9,11,9,"#785032"); };
  const sala = c => { R(c,0,0,W,H,"#2e4256"); chao(c,"#46384a","#3c303e"); };
  const sofa = (c,x,w=80) => { R(c,x,CH-16,w,16,"K"); R(c,x+1,CH-15,w-2,14,"p"); R(c,x+1,CH-15,w-2,4,"P"); R(c,x-4,CH-19,6,19,"K"); R(c,x-3,CH-18,4,17,"p"); R(c,x+w-2,CH-19,6,19,"K"); R(c,x+w-1,CH-18,4,17,"p"); };
  const estrelas = (c,t,bg="#120e1e") => { R(c,0,0,W,H,bg); for(let i=0;i<40;i++){ const x = (i*37)%W, y = 12 + (i*23)%44; R(c,x,y,1,1,(i+(t/300|0))%5?"#504678":"#a096d2"); } };
  const rua = (c,t) => { R(c,0,0,W,H,"#96b4d7"); [[0,26],[16,18],[32,30],[96,24],[110,32]].forEach(([x,h])=>R(c,x,CH-6-h,16,h,"#5a6078")); for(let x=4;x<W;x+=8) R(c,x,CH-16,2,2,"#f0dc8c");
    R(c,0,CH-4,W,H,"#46464f"); R(c,0,CH-4,W,1,"#c8c8c8"); for(let x=((t/60|0)%20)-20;x<W;x+=20) R(c,x+4,CH+8,10,1,"W"); R(c,100,CH-30,1,26,"K"); R(c,97,CH-31,7,2,"K"); R(c,98,CH-29,5,1,"#ffe696"); };
  const montanha = (c,t) => { R(c,0,0,W,H,"#f4a46a"); R(c,0,0,W,24,"#e47a5a"); for(let i=0;i<9;i++) for(let j=0;j<9;j++) if((i-4)**2+(j-4)**2<=16) R(c,84+i,18+j,1,1,"#ffe08a");
    for(let x=0;x<W;x++){ const h1 = 18+Math.abs(((x*7)%48)-24)*.6, h2 = 10+Math.abs(((x*5+20)%60)-30)*.4; R(c,x,CH-h1,1,h1,"#6a4a7a"); R(c,x,CH-h2,1,h2,"#4a3260"); } chao(c,"#3a6a46","#2e5a3a"); };
  const palco = (c,t) => { R(c,0,0,W,H,"#0c0a14"); const f = t/150|0; ["#d9534f","#7c5cff","#4caf50","#e0a030"].forEach((v,i)=>{ const x = 10 + i*32 + Math.round(Math.sin(f/2+i)*4);
      c.globalAlpha = .35; for(let y=10;y<CH;y++){ const w = (y-10)*.5; R(c,x-w/2,y,w,1,v); } c.globalAlpha = 1; R(c,x-2,10,4,3,v); });
    R(c,0,CH-8,W,H,"#1e1a2a"); for(let i=0;i<10;i++) R(c,4+i*13,CH-10+((f+i)%2),6,6,"#2c2640"); };
  const estudio = c => { R(c,0,0,W,H,"#2a1e3e"); chao(c,"#3a2e52","#322846"); };
  const ringlight = (c,x,y,f) => { for(let a=0;a<24;a++){ const an = a/24*Math.PI*2; R(c,x+Math.round(Math.cos(an)*9),y+Math.round(Math.sin(an)*9),2,2,f%4<2?"#fff6d8":"#ffeab0"); } R(c,x,y+10,1,CH-y-10,"K"); };
  const escritorio = c => { R(c,0,0,W,H,"#3c4a52"); R(c,10,16,30,18,"K"); R(c,11,17,28,16,"#cfe6ef"); chao(c,"#5a5048","#4e4640"); R(c,52,CH-14,64,3,"#8a5a34"); R(c,54,CH-11,3,11,"#6a4428"); R(c,110,CH-11,3,11,"#6a4428"); };
  const laptop = (c,x,y,f) => { R(c,x,y,22,14,"K"); R(c,x+1,y+1,20,12,"#20242e"); for(let i=0;i<4;i++) R(c,x+3,y+3+i*2,6+((f+i)%3)*4,1,"L"); R(c,x-2,y+14,26,2,"A"); };
  const loja = c => { R(c,0,0,W,H,"#3a2a20"); for(let x=0;x<W;x+=16) R(c,x,10,8,46,"#423024"); chao(c,"#6a5040","#5c4436"); };
  /* ---- painel do topo ---- */
  function hud(c, st){
    R(c,0,0,W,10,"#0e0c14"); const n = st.bat ?? 1, v = n > .6 ? "O" : n > .25 ? "Y" : "R";
    bateria(c,3,2,n, v==="R" && (st.t/300|0)%2 ? "#5a1e1e" : v);
    for(let i=0;i<5;i++){ if(i < (st.moedas||0)) put(c,COIN,24+i*6,3); else R(c,25+i*6,4,3,3,"#3c3746"); }
    texto(c,58,3,"MATCH","G"); R(c,86,3,38,5,"#3c3746"); R(c,86,3,Math.round(38*(st.match||0)),5,"G");
  }
  /* ---- cenas (uma por resposta) ---- */
  const S = {};
  const bob = t => ((t/420|0)%2);
  S.abertura = (c,t,av) => { quarto(c,false); cama(c,8); criado(c,58); const f = t/400|0;
    pessoa(c,av,30,CH-6+0,f%3===0?"pisca":"neutro","cima"); R(c,61,CH-14,6,4,"K"); R(c,62,CH-13,4,2,(f%2)?"L":"#4a8a78"); balao(c,58,CH-30,12,8,false); texto(c,62,CH-28,"?","K"); };
  S.redes = (c,t,av) => { sala(c); sofa(c,24); pessoa(c,av,55,CH-6-bob(t),"feliz","cel");
    [[24,0],[82,.33],[40,.66]].forEach(([x,fs],i)=>{ const y = 38 - sobe(t,2200,26,fs); i===1 ? put(c,HEART,x+12,y) : balao(c,x,y,i?14:16,7); });
    put(c,HEART,100,30 - sobe(t,1800,18,.5)); };
  S.videos = (c,t,av) => { R(c,0,0,W,H,"#141428"); chao(c,"#241e30","#1e1a28"); R(c,76,18,40,26,"K"); const f = t/180|0; R(c,77,19,38,24,["#2864b4","#7c5cff","#d9534f","#4caf50"][f%4]);
    c.globalAlpha = .18; R(c,30,10,90,46,"#8fb4ff"); c.globalAlpha = 1; sofa(c,14,46); pessoa(c,av,26,CH-6,"feliz","cel");
    R(c,50,CH-14,8,6,"K"); R(c,51,CH-13,6,5,"R"); for(let i=0;i<3;i++) R(c,51+i*2,CH-15-((f+i)%2),2,2,"W"); };
  S.fotos = (c,t,av) => { R(c,0,0,W,H,"#8cc8f0"); R(c,0,30,W,26,"#7ab45a"); chao(c,"#5a9a46","#4e8a3c"); for(let i=0;i<5;i++){ R(c,8+i*26,22,6,12,"#4a7a3a"); R(c,10+i*26,34,2,6,"#5a3a24"); }
    const f = t/200|0; pessoa(c,av,52,CH,"feliz","selfie"); if(f%10===0){ c.globalAlpha=.3; R(c,0,10,W,H,"W"); c.globalAlpha=1; } R(c,80,18,20,14,"K"); R(c,81,19,18,12,f%8<4?"#f6d860":"#f0b040"); texto(c,82,22,"REC","R"); };
  S.jogos = (c,t,av) => { estrelas(c,t); chao(c,"#281e3c","#322848"); pessoa(c,av,55,CH,"susto","jogo"); const f = t/140|0;
    [[42,26],[86,24],[38,38],[92,38],[64,18],[76,16]].forEach(([x,y],i)=>{ if((f+i)%3) brilho(c,x,y,["Y","R","G"][i%3],f+i); });
    if(f%6<4) textoC(c,64,CH+6,"COMBO X3!","Y"); };
  S.trabalho = (c,t,av) => { escritorio(c); laptop(c,70,CH-28,t/200|0); R(c,96,CH-20,5,6,"K"); R(c,97,CH-19,3,4,"W"); for(let i=0;i<2;i++) R(c,97+i*2,CH-23-((t/300|0)+i)%3,1,2,"A");
    pessoa(c,av,34,CH,"neutro","cel"); balao(c,12,14 + ((t/600|0)%2),20,8,false); texto(c,15,16 + ((t/600|0)%2),"10H","K"); };
  S.basico = (c,t,av) => { sala(c); pessoa(c,av,40,CH,"feliz","cel"); balao(c,58,16,26,8,false); texto(c,61,18,"MAE","R"); put(c,HEART,78,18);
    const y = 40 - sobe(t,1600,16); put(c,COIN,80,y); texto(c,88,y,"PIX","T"); };
  /* registro */
  S.pessoas = (c,t,av) => { R(c,0,0,W,H,"#f0b4c8"); chao(c,"#c88aa0","#b47a90"); pessoa(c,"boy",30,CH,"feliz","cel");
    pessoa(c,av,52,CH,"feliz","selfie"); pessoa(c,"girl",74,CH,"pisca","cel"); if((t/150|0)%14===0){ c.globalAlpha=.3; R(c,0,10,W,H,"W"); c.globalAlpha=1; } };
  S.viagem = (c,t,av) => { montanha(c,t); pessoa(c,av,30,CH,"feliz","selfie"); R(c,24,CH-24,6,10,"K"); R(c,25,CH-23,4,8,"#c86a3a"); };
  S.noite = (c,t,av) => { palco(c,t); pessoa(c,av,55,CH,"feliz","selfie"); if((t/150|0)%14===0){ c.globalAlpha=.3; R(c,0,10,W,H,"W"); c.globalAlpha=1; } };
  S.postar = (c,t,av) => { estudio(c); ringlight(c,86,30,t/150|0); pessoa(c,av,40,CH,"feliz","cel"); if((t/400|0)%2) { R(c,14,14,4,4,"R"); texto(c,20,14,"REC","R"); } };
  /* bateria */
  S.sobra = (c,t,av) => { quarto(c,true); cama(c,10); if(av==="bug") pessoa(c,av,14,CH-4,"dorme","cel"); else { put(c,TOP[av==="boy"?"boy":"girl"].concat(FACE.dorme.slice(0,4)),12,CH-22); R(c,21,CH-8,28,8,"C"); R(c,21,CH-8,28,2,"c"); }
    criado(c,64); R(c,67,CH-14,7,4,"K"); R(c,68,CH-13,5,2,"O"); R(c,73,CH-12,6,1,"K"); R(c,78,CH-12,1,12,"K");
    const z = sobe(t,1800,14); texto(c,36,30-z,"Z","W"); texto(c,44,24-sobe(t,1800,14,.5),"Z","A"); };
  S.raspando = (c,t,av) => { sala(c); sofa(c,40,56); pessoa(c,av,62,CH-6,"neutro","cel"); bateria(c,20,22,.45,(t/400|0)%2?"Y":"#8a6420"); texto(c,18,32,"ALIVIO","Y"); };
  S.meio = (c,t,av) => { R(c,0,0,W,H,"#5a3e2c"); chao(c,"#7a5a40","#6a4e36"); R(c,82,22,30,20,"K"); R(c,83,23,28,18,"#e8c898"); texto(c,87,28,"CAFE","K");
    const x = 30 + Math.round(Math.sin(t/500)*10); pessoa(c,av,x,CH,"susto","cel"); R(c,8,40,6,8,"K"); R(c,9,41,4,6,"W"); R(c,10,43,1,2,"K"); R(c,12,43,1,2,"K"); bateria(c,x+2,12,.15,(t/300|0)%2?"R":"#5a1e1e"); };
  S.rua = (c,t,av) => { rua(c,t); pessoa(c,av,52,CH-4,"triste","baixo"); R(c,72,22+((t/250|0)%3),2,3,"C"); R(c,71,25+((t/250|0)%3),4,2,"C"); if((t/500|0)%2) textoC(c,64,14,"FIQUEI NA MAO","R"); };
  /* o que incomoda */
  S.lento = (c,t,av) => { quarto(c,false); pessoa(c,av,30,CH,"neutro","cel"); const f = t/120|0;
    for(let i=0;i<8;i++){ const an = i/8*Math.PI*2; R(c,80+Math.round(Math.cos(an)*7),32+Math.round(Math.sin(an)*7),2,2,i===f%8?"W":"#6a6488"); }
    R(c,24+(f%2),CH-2,6,2,"K"); };
  S.memoria = (c,t,av) => { quarto(c,false); pessoa(c,av,24,CH,"susto","cel"); R(c,56,16,50,18,"K"); R(c,57,17,48,16,"W"); R(c,57,17,48,5,"R"); texto(c,60,24,"MEMORIA","K"); texto(c,60,29,"CHEIA!","R");
    for(let i=0;i<4;i++){ const y = 36 + sobe(t,1200,20,i/4); R(c,62+i*10,y,7,6,"K"); R(c,63+i*10,y+1,5,4,["C","O","Y","P"][i]); } };
  S.fotoruim = (c,t,av) => { quarto(c,false); pessoa(c,av,26,CH,"triste","cel"); R(c,60,14,40,30,"K"); R(c,61,15,38,28,"#c8b8a8");
    const o = (t/200|0)%2; c.globalAlpha=.5; R(c,72+o,22,14,18,"#8a7a9a"); R(c,70-o,24,14,18,"#8a7a9a"); c.globalAlpha=1; texto(c,64,46,"BORRADA","R"); };
  S.quebra = (c,t,av) => { R(c,0,0,W,H,"#4c4058"); chao(c,"#6e645a","#605850"); pessoa(c,av,26,CH,"susto","cima"); const cai = Math.min(1,(t%2200)/700);
    const y = 16 + cai*28; R(c,74,y,10,16,"K"); R(c,75,y+1,8,14,"#1e283c");
    if(cai>=1){ [[76,3],[77,5],[79,6],[80,9],[78,10],[81,12],[76,9]].forEach(([x,dy])=>R(c,x,y+dy,1,1,"W")); textoC(c,80,16,"CRAC!","Y"); R(c,68,CH-2,3,1,"W"); R(c,88,CH-3,3,1,"W"); } };
  S.nada = (c,t,av) => { sala(c); pessoa(c,av,52,CH-bob(t),"feliz","cima"); textoC(c,64,18,"TUDO CERTO","T"); };
  /* sistema */
  const celIOS = (c,x,y) => { R(c,x,y,12,20,"K"); R(c,x+1,y+1,10,18,"#d8d2e8"); R(c,x+2,y+2,5,5,"K"); R(c,x+3,y+3,1,1,"A"); R(c,x+5,y+3,1,1,"A"); R(c,x+3,y+5,1,1,"A"); };
  const celAND = (c,x,y) => { R(c,x,y,12,20,"K"); R(c,x+1,y+1,10,18,"#2e6a5a"); R(c,x+2,y+2,3,9,"K"); for(let i=0;i<3;i++) R(c,x+3,y+3+i*3,1,1,"A"); };
  S.ios = (c,t,av) => { loja(c); pessoa(c,av,30,CH,"feliz","cel"); celIOS(c,74,22-bob(t)); for(let i=0;i<3;i++) brilho(c,70+i*10,18+(i%2)*28,"W",(t/200|0)+i); };
  S.android = (c,t,av) => { loja(c); pessoa(c,av,30,CH,"feliz","cel"); celAND(c,74,22-bob(t)); for(let i=0;i<3;i++) brilho(c,70+i*10,18+(i%2)*28,"T",(t/200|0)+i); };
  S.tanto = (c,t,av) => { loja(c); pessoa(c,av,52,CH,"feliz","cima"); const a = t/500; celIOS(c,58+Math.round(Math.cos(a)*18),18+Math.round(Math.sin(a)*6)); celAND(c,58-Math.round(Math.cos(a)*18),18-Math.round(Math.sin(a)*6)); };
  /* orçamento */
  const NIVEL = {1000:1,2000:2,3500:3,5500:4,99999:5};
  S.orcamento = (c,t,av,st) => { R(c,0,0,W,H,"#2c241e"); chao(c,"#5a4632","#4c3a2a"); put(c,PIG,72,CH-10); R(c,78,CH-11,6,1,"K"); pessoa(c,av,30,CH,"feliz","cel");
    const n = st.moedas||0; for(let i=0;i<n;i++){ const y = 14 + sobe(t,900,CH-26,i/Math.max(n,1)); put(c,COIN,78,y); }
    if(st.faixa) textoC(c,64,13,st.faixa,"G"); else textoC(c,64,13,"?","G"); };
  /* atitude */
  S.barato = (c,t,av) => { R(c,0,0,W,H,"#2c241e"); chao(c,"#5a4632","#4c3a2a"); put(c,PIG,72,CH-10); pessoa(c,av,30,CH,(t/500|0)%3?"feliz":"pisca","cel"); textoC(c,64,14,"ECONOMIA","T");
    put(c,COIN,78,14+sobe(t,800,CH-26)); };
  S.dura = (c,t,av) => { quarto(c,false); pessoa(c,av,26,CH,"feliz","cel"); const f = t/160|0; R(c,62,14,22,24,"K"); R(c,63,15,20,22,"W"); R(c,63,15,20,5,"R");
    textoC(c,73,24,String(2026+(f%5)),"K"); R(c,92,18,16,20,"K"); R(c,93,19,14,18,"C"); R(c,99,21,2,12,"W"); R(c,95,25,10,2,"W"); };
  S.bonito = (c,t,av) => { R(c,0,0,W,H,"#3e2a4e"); chao(c,"#4e3a60","#463456"); R(c,70,12,30,44,"K"); R(c,71,13,28,42,"#a8c8e8"); pessoa(c,av,40,CH,"feliz","selfie");
    for(let i=0;i<5;i++) brilho(c,74+(i*7)%24,18+(i*11)%30,"W",(t/180|0)+i); };
  S.melhor = (c,t,av) => { R(c,0,0,W,H,"#2a1a40"); chao(c,"#3a2a56","#33244c"); R(c,40,CH-10,40,10,"K"); R(c,41,CH-9,38,9,"G"); textoC(c,60,CH-7,"1","K");
    pessoa(c,av,51,CH-10,"feliz","cima"); put(c,CROWN,av==="bug"?56:56,CH-10-(av==="bug"?24:31)-bob(t)); };
  /* telas sem resposta ainda (base de cada pergunta) */
  S.base_bateria = (c,t,av) => { sala(c); pessoa(c,av,30,CH,"neutro","cel"); const n = .5+Math.sin(t/700)*.45; bateria(c,70,24,n,n>.6?"O":n>.25?"Y":"R"); textoC(c,77,36,"?","W"); };
  S.base_incomoda = (c,t,av) => { quarto(c,false); pessoa(c,av,30,CH,"neutro","cel"); balao(c,50,18,18,8,true); };
  S.base_sistema = (c,t,av) => { loja(c); pessoa(c,av,30,CH,"neutro","cel"); ((t/700|0)%2 ? celIOS : celAND)(c,74,22); textoC(c,80,46,"?","W"); };
  S.base_atitude = (c,t,av) => { loja(c); celIOS(c,46,24); celAND(c,70,24); textoC(c,64,16,"= ?","W"); pessoa(c,av,10,CH,"neutro","cel"); };
  /* o match: a foto real do celular reduzida vira pixel art */
  S.match = (c,t,av,st) => { R(c,0,0,W,H,"#24183e"); chao(c,"#3c2c5e","#44326a");
    for(let i=0;i<50;i++){ const x = (i*29)%W, y = 10 + ((i*13 + t/30) % 46); R(c,x,y,2,1,["G","P","R","O","Y","W"][i%6]); }
    R(c,90,CH-12,22,12,"K"); R(c,91,CH-11,20,11,"g"); R(c,91,CH-11,20,3,"G"); R(c,100,CH-11,2,11,"R");
    const sobeCel = Math.min(1,(t%100000)/900), base = CH-12 - sobeCel*6;
    for(let i=0;i<4;i++) if(sobeCel>=1) brilho(c,[90,112,92,110][i],[22,24,40,42][i],"Y",(t/160|0)+i);
    if(st.img && st.img.complete && st.img.naturalWidth){ const h = 22, w = Math.round(st.img.naturalWidth/st.img.naturalHeight*h); c.imageSmoothingEnabled = false; c.drawImage(st.img, 101-w/2, base-h, w, h); }
    else { R(c,97,base-16,8,16,"K"); R(c,98,base-15,6,14,"L"); }
    pessoa(c,av,22,CH,"feliz","cima"); put(c,CROWN,27,CH-(av==="bug"?24:31)-bob(t));
    textoC(c,52,14,(st.pct||92)+"% MATCH!","G"); };
  /* desenha uma cena no canvas */
  function desenha(cv, cena, t, st){
    const c = cv.getContext("2d"); c.imageSmoothingEnabled = false; c.clearRect(0,0,W,H);
    (S[cena] || S.abertura)(c, t, st.av || "girl", st); hud(c, Object.assign({t}, st));
  }
  /* avatar parado (para a escolha do personagem) */
  function avatar(cv, av, t){ const c = cv.getContext("2d"); c.clearRect(0,0,24,32); pessoa(c, av, 3, 30 - ((t/420|0)%2), (t/1400|0)%4===3 ? "pisca" : "feliz", "cel"); }
  return { W, H, desenha, avatar, NIVEL };
})();

/* ---------- game "Celular ideal": perguntas rápidas → celular que combina com a pessoa ---------- */
const GSV = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const GIC = {
  chat:GSV('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/>'),
  play:GSV('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>'),
  cam:GSV('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
  jogo:GSV('<path d="M7 9h10a4 4 0 0 1 3.9 4.9l-.6 2.6a2 2 0 0 1-3.4.9L15 15H9l-1.9 2.4a2 2 0 0 1-3.4-.9l-.6-2.6A4 4 0 0 1 7 9z"/><path d="M8 11.5v3M6.5 13h3M15.5 12h.01M17.5 14h.01"/>'),
  trab:GSV('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>'),
  basico:GSV('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>'),
  pessoa:GSV('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>'),
  viagem:GSV('<path d="M3 19l6-9 4 6 3-4 5 7z"/><circle cx="17" cy="6" r="2"/>'),
  noite:GSV('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/><path d="M17 3v2M16 4h2"/>'),
  postar:GSV('<rect x="3" y="7" width="12" height="10" rx="2"/><path d="M15 11l6-3v8l-6-3"/><path d="M7 3l.8 1.7L9.5 5.5l-1.7.8L7 8l-.8-1.7L4.5 5.5l1.7-.8z"/>'),
  lento:GSV('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M10 2h4"/>'),
  memoria:GSV('<path d="M4 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 15h8"/>'),
  fotoruim:GSV('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><path d="M3 3l18 18"/>'),
  quebra:GSV('<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 6l-2 4 3 1-2 5"/>'),
  ok:GSV('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>'),
  ios:GSV('<rect x="7" y="2.5" width="10" height="19" rx="3"/><path d="M10.5 5h3"/><circle cx="12" cy="18.5" r=".6"/>'),
  andr:GSV('<rect x="6.5" y="2.5" width="11" height="19" rx="2"/><path d="M6.5 5.5h11M6.5 18h11"/>'),
  tanto:GSV('<path d="M4 7h11l-3-3M20 17H9l3 3"/>'),
  barato:GSV('<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.5.8-2.5 1.9 0 2.6 5 1.4 5 4.1 0 1.1-1 2-2.5 2-1.2 0-2.2-.5-2.7-1.3M12 6.5v1.5M12 16v1.5"/>'),
  dura:GSV('<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>'),
  bonito:GSV('<path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.6 6.7 19.5l1.1-6L3.4 9.3l6-.8z"/>'),
  topo:GSV('<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>')
};
const nivel = n => `<span class="gm-nivel" aria-hidden="true">${[1,2,3,4,5].map(i=>`<i class="${i<=n?"on":""}"></i>`).join("")}</span>`;
const bateriaIco = (cor, pct) => `<span class="gm-bat" aria-hidden="true"><i style="width:${pct}%;background:${cor}"></i></span>`;
const GAME_Q = [
  {id:"uso", tag:"Seu dia a dia", t:"Para que você mais usa o celular?", sub:"Escolha até 2. Pense no que você faz de verdade.", max:2, ops:[
    {v:"redes", l:"Redes sociais", ic:"chat", sub:"Instagram, TikTok, WhatsApp", dica:"Para isso quase todo celular de hoje dá conta. O que vai pesar é bateria e tela."},
    {v:"videos", l:"Vídeos e séries", ic:"play", sub:"YouTube, Netflix, streaming", dica:"Anotado: tela boa e bateria que aguenta maratona sobem na sua lista."},
    {v:"fotos", l:"Fotos e vídeos", ic:"cam", sub:"Registrar o dia a dia", dica:"Câmera vai pesar bastante. Na próxima, conta para a gente o que você mais registra."},
    {v:"jogos", l:"Jogos", ic:"jogo", sub:"Free Fire, COD, Roblox", dica:"Processador forte e tela rápida vão pesar mais na escolha."},
    {v:"trabalho", l:"Trabalho ou estudo", ic:"trab", sub:"E-mail, reuniões, documentos", dica:"Desempenho e anos de atualização contam mais para quem depende do celular."},
    {v:"basico", l:"Só o básico", ic:"basico", sub:"Ligação, mensagem e banco", dica:"Boa notícia: você não precisa gastar muito. Bateria e durabilidade resolvem."}]},
  {id:"registro", se:r=>(r.uso||[]).includes("fotos"), tag:"Fotos e vídeos", t:"O que você mais registra?", sub:"Escolha até 2.", max:2, ops:[
    {v:"pessoas", l:"Pessoas e selfies", ic:"pessoa", sub:"Amigos, família, você", dica:"Câmera frontal e retrato vão contar pontos."},
    {v:"viagem", l:"Lugares e viagens", ic:"viagem", sub:"Paisagens e passeios", dica:"Lente grande-angular e zoom ajudam a caber tudo na foto."},
    {v:"noite", l:"À noite", ic:"noite", sub:"Festas, shows, rolês", dica:"É no escuro que a diferença entre câmeras mais aparece."},
    {v:"postar", l:"Vídeos para postar", ic:"postar", sub:"Reels, TikTok, YouTube", dica:"Vídeo estável e em boa resolução viram prioridade."}]},
  {id:"bateria", tag:"Bateria", t:"Quanto tempo o celular passa longe da tomada?", sub:"Escolha uma.", max:1, lista:true, ops:[
    {v:"sobra", l:"Sempre sobra bateria", sub:"Carrego só à noite", bat:["#4CAF50",88], dica:"Então bateria não precisa ser prioridade, e dá para olhar outras coisas."},
    {v:"raspando", l:"Chego no fim do dia raspando", sub:"Mas ainda dá conta", bat:["#E0A030",40], dica:"Anotado: bateria grande e carga rápida sobem na sua lista."},
    {v:"meio", l:"Carrego no meio do dia", sub:"Vivo atrás de tomada", bat:["#D9534F",16], dica:"Bateria vira uma das prioridades da sua escolha."},
    {v:"rua", l:"Passo o dia na rua", sub:"Entrega, motorista, vendas", bat:["#D9534F",4], dica:"Bateria e resistência a queda e água passam a pesar muito."}]},
  {id:"incomoda", tag:"Seu celular hoje", t:"O que mais te incomoda no seu celular atual?", sub:"Escolha uma.", max:1, ops:[
    {v:"lento", l:"Fica lento", ic:"lento", sub:"Trava e demora para abrir", dica:"Processador mais forte vai fazer diferença no seu dia."},
    {v:"memoria", l:"Memória cheia", ic:"memoria", sub:"Sempre apagando coisa", dica:"Vamos priorizar modelos com 256 GB ou mais."},
    {v:"fotoruim", l:"Fotos ruins", ic:"fotoruim", sub:"Escuras ou sem nitidez", dica:"Câmera ganha peso extra na sua lista."},
    {v:"quebra", l:"Quebra fácil", ic:"quebra", sub:"Tela trincada é rotina", dica:"Resistência a água e poeira vai contar pontos."},
    {v:"nada", l:"Nada, só quero trocar", ic:"ok", sub:"Ou vai ser o primeiro", dica:"Tudo certo. A gente olha o conjunto."}]},
  {id:"sistema", tag:"Sistema", t:"iPhone ou Android?", sub:"Escolha uma.", max:1, ops:[
    {v:"ios", l:"iPhone", ic:"ios", sub:"Só Apple", dica:"Vamos te mostrar só iPhones."},
    {v:"android", l:"Android", ic:"andr", sub:"Samsung, Motorola, Xiaomi", dica:"Vamos olhar todas as marcas Android do catálogo."},
    {v:"tanto", l:"Tanto faz", ic:"tanto", sub:"O que valer mais a pena", dica:"Ótimo: com mais opções, sobra mais chance de achar um bom preço."}]},
  {id:"orcamento", tag:"Orçamento", t:"Quanto dá para investir?", sub:"Escolha uma faixa.", max:1, lista:true, ops:[
    {v:1000, l:"Até R$ 1.000", sub:"Básicos que resolvem", niv:1}, {v:2000, l:"R$ 1.000 a R$ 2.000", sub:"Onde mora o custo-benefício", niv:2}, {v:3500, l:"R$ 2.000 a R$ 3.500", sub:"Intermediários caprichados", niv:3},
    {v:5500, l:"R$ 3.500 a R$ 5.500", sub:"Quase topo de linha", niv:4}, {v:99999, l:"Mais de R$ 5.500", sub:"Topo de linha", niv:5}]},
  {id:"atitude", tag:"Última pergunta", t:"Se dois celulares fizessem tudo o que você precisa, qual você levaria?", sub:"Escolha uma.", max:1, lista:true, ops:[
    {v:"barato", l:"O mais barato", ic:"barato", sub:"E guardo a diferença", dica:"Vamos caçar o que resolve gastando menos."},
    {v:"dura", l:"O que dura mais", ic:"dura", sub:"Para ficar anos com ele", dica:"Anos de atualização e resistência vão pesar mais."},
    {v:"bonito", l:"O mais bonito", ic:"bonito", sub:"Que chama atenção", dica:"Design e acabamento entram na conta."},
    {v:"melhor", l:"O melhor que existe", ic:"topo", sub:"Quero o topo mesmo", dica:"Sem problema. E se tiver algo que faz o mesmo por menos, a gente também mostra."}]}
];
const GAME_MOT = {redes:"você passa bastante tempo nas redes", videos:"você vê muitos vídeos", fotos:"você tira muitas fotos e vídeos", jogos:"você joga", trabalho:"você trabalha ou estuda nele", basico:"você quer o básico bem feito",
  pessoas:"você tira muitas fotos de pessoas", viagem:"você fotografa lugares e viagens", noite:"você fotografa à noite", postar:"você quer postar vídeos",
  raspando:"você chega no fim do dia raspando", meio:"você precisa carregar no meio do dia", rua:"você passa o dia na rua",
  lento:"o seu atual trava", memoria:"você vive com a memória cheia", fotoruim:"as fotos do seu atual não ficam boas", quebra:"o seu atual cai e quebra fácil", dura:"você quer ficar anos com ele"};
const G_LS = "bs-perfil";
const G_BASE = {uso:"abertura", registro:"fotos", bateria:"base_bateria", incomoda:"base_incomoda", sistema:"base_sistema", orcamento:"orcamento", atitude:"base_atitude"};
const G_BAT = {sobra:1, raspando:.45, meio:.15, rua:.04};
const G_FAIXA = {1000:"ATE R$ 1.000", 2000:"ATE R$ 2.000", 3500:"ATE R$ 3.500", 5500:"ATE R$ 5.500", 99999:"SEM LIMITE"};
const gLer = () => { try{ return JSON.parse(localStorage.getItem(G_LS)); }catch(e){ return null; } };
const gSalva = v => { try{ v ? localStorage.setItem(G_LS, JSON.stringify(v)) : localStorage.removeItem(G_LS); }catch(e){} };

function gameCalcula(r){
  const w = {camera:1, bateria:1, desempenho:1, tela:1, atualizacoes:1, durab:.5, mem:.5}, mot = {};
  const add = (k, n, m) => { w[k] += n; if(m && !mot[k]) mot[k] = m; };
  const usos = r.uso || [];
  for(const u of usos){ const m = GAME_MOT[u];
    if(u==="redes"){ add("bateria",1,m); add("tela",.5); }
    if(u==="videos"){ add("tela",2,m); add("bateria",1,m); }
    if(u==="fotos") add("camera",2.5,m);
    if(u==="jogos"){ add("desempenho",2.5,m); add("tela",1,m); add("bateria",.5); }
    if(u==="trabalho"){ add("desempenho",1.5,m); add("atualizacoes",1,m); add("bateria",.5); }
    if(u==="basico"){ add("bateria",1,m); add("durab",.5,m); } }
  for(const g of (r.registro||[])){ const m = GAME_MOT[g]; add("camera", g==="noite"?1.5:1, m); if(g==="postar") add("desempenho",.5); }
  const b = r.bateria; if(b==="raspando") add("bateria",1.5,GAME_MOT[b]); if(b==="meio") add("bateria",3,GAME_MOT[b]); if(b==="rua"){ add("bateria",3.5,GAME_MOT[b]); add("durab",1.5,GAME_MOT[b]); }
  const i = r.incomoda; if(i==="lento") add("desempenho",2,GAME_MOT[i]); if(i==="memoria") add("mem",2.5,GAME_MOT[i]); if(i==="fotoruim") add("camera",1.5,GAME_MOT[i]); if(i==="quebra") add("durab",2.5,GAME_MOT[i]);
  const at = r.atitude; if(at==="dura"){ add("atualizacoes",2,GAME_MOT.dura); add("durab",1); } if(at==="bonito") add("tela",1);
  const alfa = {barato:.55, dura:.25, bonito:.25, melhor:.05}[at] ?? .3;
  const teto = +r.orcamento || 99999;
  const nota = c => {
    const n = notasCat(c), pr = c.prot||"";
    const durab = (/IP69/.test(pr)?10:/IP68/.test(pr)?9:/IP67/.test(pr)?7.5:/IP6|IP5/.test(pr)?5:3);
    const mx = Math.max(...(c.armaz||[128])), mem = mx>=512?10:mx>=256?8.5:mx>=128?6:3;
    const s = {camera:n.camera, bateria:n.bateria, desempenho:n.desempenho, tela:n.tela, atualizacoes:n.atualizacoes, durab, mem};
    let soma = 0, pw = 0; for(const k in w){ soma += w[k]*s[k]; pw += w[k]; }
    let fit = soma/pw;
    if(at==="bonito" || at==="melhor") fit += c.seg==="topo" ? .5 : 0;
    if(at==="bonito" && c.formato==="dobravel") fit += .4;
    if(usos.includes("postar") || (r.registro||[]).includes("postar")) fit += /60\s*fps|8K/i.test(c.video||"") ? .3 : 0;
    const q = .7*fit + .3*(n.critica != null ? n.critica : fit);
    return {c, s, q, preco:c.preco, u: q / Math.pow(c.preco/1000, alfa)};
  };
  let base = CAT().filter(c=>c.preco && c.br !== false);
  if(r.sistema==="ios") base = base.filter(c=>c.marca==="Apple"); else if(r.sistema==="android") base = base.filter(c=>c.marca!=="Apple");
  if(!["bonito","melhor"].includes(at)) base = base.filter(c=>c.formato!=="dobravel");
  const todos = base.map(nota);
  let dentro = todos.filter(x=>x.preco <= teto*1.05), fora = false;
  if(!dentro.length){ fora = true; dentro = todos.slice().sort((a,b)=>a.preco-b.preco).slice(0,3); }
  /* o match é o mais barato que chega perto do melhor do orçamento; quanto mais "quero o topo", menor a folga */
  const qTop = Math.max(...dentro.map(x=>x.q)), qMin = Math.min(...dentro.map(x=>x.q));
  const folga = {barato:.9, melhor:.05}[at] ?? .4;
  const match = dentro.filter(x=>x.q >= qTop - folga).sort((a,b)=> at==="melhor" ? b.q-a.q : a.preco-b.preco)[0];
  match.pct = Math.round(qTop > qMin ? 72 + 26*(match.q-qMin)/(qTop-qMin) : 92);
  const outraMarca = x => r.sistema==="tanto" && x.c.marca!==match.c.marca ? .15 : 0;
  const usados = new Set([match.c.id]);
  const pega = (lista, chave) => { const x = lista.filter(y=>!usados.has(y.c.id)).sort((a,b)=>chave(b)-chave(a))[0]; if(x) usados.add(x.c.id); return x; };
  let ecoTipo = "eco", maisTipo = "mais", eco, mais;
  if(fora && r.sistema==="ios"){ eco = pega(CAT().filter(c=>c.preco && c.br!==false && c.marca!=="Apple" && c.formato!=="dobravel").map(nota).filter(x=>x.preco<=teto), x=>x.q); ecoTipo = "android"; }
  else eco = pega(todos.filter(x=>x.preco <= match.preco*.85 && x.q >= match.q - 1.2), x=>x.q + outraMarca(x));
  const tetoMais = teto < 99999 ? Math.max(teto*1.35, match.preco*1.15) : match.preco*1.6;
  mais = pega(todos.filter(x=>x.preco > match.preco && x.preco <= tetoMais && x.q > match.q + .15), x=>x.q - .3*x.preco/match.preco + outraMarca(x));
  if(!eco){ eco = pega(dentro.filter(x=>x.c.marca!==match.c.marca || r.sistema==="ios"), x=>x.q + outraMarca(x)); ecoTipo = "outra"; }
  if(!mais){ mais = pega(dentro, x=>x.q + outraMarca(x)); maisTipo = "outra"; }
  /* para quem quer o topo: o mais barato que já dá conta do uso descrito */
  const basta = at==="melhor" ? todos.filter(x=>x.preco < match.preco*.8 && x.q >= match.q - .9).sort((a,b)=>a.preco-b.preco)[0] : null;
  return {match, eco, mais, ecoTipo, maisTipo, w, mot, fora, teto, basta};
}
const G_ROT = {camera:"câmera", bateria:"bateria", desempenho:"desempenho", tela:"tela", atualizacoes:"anos de atualização", durab:"resistência", mem:"armazenamento"};
function gameMotivos(x, w, mot){
  const c = x.c, s = x.s, mil = n => Number(n).toLocaleString("pt-BR");
  const txt = {
    camera:()=>`Câmera principal de ${esc(String((c.cams||[""])[0]).split("·")[0].trim())}${/OIS/i.test((c.cams||[]).join(" "))?" com estabilização óptica":""}`,
    bateria:()=>`Bateria de ${mil(c.bat)} mAh${c.carga?` e carga de ${c.carga} W`:""}`,
    desempenho:()=>`Processador ${esc(c.chip)}`,
    tela:()=>`Tela de ${String(c.tela.pol).replace(".",",")}" a ${c.tela.hz||60} Hz`,
    atualizacoes:()=>`Atualizações: ${esc(c.upd)}`,
    durab:()=>`Resistente a água e poeira (${esc(c.prot)})`,
    mem:()=>`Versões de até ${Math.max(...(c.armaz||[128]))} GB`};
  const fortes = Object.keys(txt).filter(k=>(k!=="durab" || c.prot) && (k!=="atualizacoes" || c.upd));
  const boas = fortes.filter(k=>s[k] >= 6.5 || (w[k] >= 2.5 && s[k] >= 4.5));
  const prio = fortes.slice().sort((a,b)=>w[b]-w[a])[0];   /* o que mais pesa nas respostas sempre aparece */
  const resto = (boas.length >= 2 ? boas : fortes).filter(k=>k!==prio).sort((a,b)=> ((w[b]-1)*s[b] + s[b]*.3) - ((w[a]-1)*s[a] + s[a]*.3));
  return [prio, ...resto].slice(0,3)
    .map(k=>`<li><div>${txt[k]()}${mot[k]?` <span>· ${mot[k]}</span>`:""}</div></li>`).join("");
}
function gameAlt(x, ref, tipo, w){
  if(!x) return "";
  const dif = Math.round(x.preco - ref.preco), c = x.c;
  const ks = Object.keys(G_ROT).filter(k=>w[k] >= 1);
  const ganho = ks.slice().sort((a,b)=>(x.s[b]-ref.s[b])-(x.s[a]-ref.s[a]))[0], perda = ks.slice().sort((a,b)=>(x.s[a]-ref.s[a])-(x.s[b]-ref.s[b]))[0];
  const k = {eco:"Se quiser economizar", mais:"Se der para esticar", outra:"Outra boa opção", android:"Se topar Android"}[tipo];
  const preco = `≈ ${brl(x.preco)}${dif ? ` · ${brl(Math.abs(dif))} a ${dif<0?"menos":"mais"}` : ""}`;
  let p = tipo==="eco" ? (x.s[perda] < ref.s[perda]-.4 ? `Abre mão de um pouco de ${G_ROT[perda]}, mas resolve o seu uso.` : "Resolve o seu uso gastando menos.")
        : tipo==="mais" ? (x.s[ganho] > ref.s[ganho]+.4 ? `Ganha em ${G_ROT[ganho]}, que pesa no seu perfil.` : "Um degrau acima no conjunto.")
        : tipo==="android" ? "O melhor para o seu uso dentro do seu orçamento."
        : c.marca!==ref.c.marca ? "Outra marca com um conjunto parecido." : "Outra opção para colocar lado a lado.";
  return `<button type="button" class="gm-alt" data-gm-ver="${c.id}">${catImg(c)}<div><span class="k">${k}</span><b>${esc(c.nome)}</b><span class="p">${preco}</span><p>${p}</p></div></button>`;
}
function gameAbre(forcar){
  if(document.querySelector(".gm-fundo")) return;
  if(!document.documentElement.classList.contains("v2")){ location.href = R + "index.html#celular-ideal"; return; }
  const salvo = gLer();
  let r = {}, passo = -1;
  const f = document.createElement("div"); f.className = "gm-fundo";
  f.innerHTML = `<div class="gm" role="dialog" aria-modal="true" aria-labelledby="gmT"></div>`;
  document.body.appendChild(f); document.documentElement.classList.add("gm-on");
  const box = f.firstChild, volta = document.activeElement;
  /* animação das cenas: um laço só, que desenha no canvas da tela atual */
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anim = {cv:null, cena:"abertura", t0:0, raf:0, st:{}};
  const passoAnim = now => { if(anim.cv && anim.cv.isConnected) PIX.desenha(anim.cv, anim.cena, reduz ? 2500 : now - anim.t0, anim.st); if(!reduz) anim.raf = requestAnimationFrame(passoAnim); };
  const cena = (nome, st) => { anim.cv = box.querySelector(".gm-cena canvas"); if(nome !== anim.cena) anim.t0 = performance.now(); anim.cena = nome; anim.st = st;
    if(reduz){ passoAnim(performance.now()); } else if(!anim.raf) anim.raf = requestAnimationFrame(passoAnim); };
  const estado = extra => { const qs = visiveis(), feitas = qs.filter(q=>r[q.id]!==undefined && [].concat(r[q.id]).length).length;
    return Object.assign({av:r.av||"girl", bat: G_BAT[r.bateria] ?? 1, moedas: PIX.NIVEL[r.orcamento]||0, faixa: G_FAIXA[r.orcamento], match: Math.min(.9, feitas/(qs.length||6)*.9)}, extra||{}); };
  const fecha = () => { cancelAnimationFrame(anim.raf); anim.raf = 0; f.remove(); document.documentElement.classList.remove("gm-on"); document.removeEventListener("keydown", tecla); try{ if(!gLer()) localStorage.setItem("bs-game","visto"); }catch(e){} if(volta && volta.focus) volta.focus(); };
  const tecla = e => { if(e.key==="Escape") fecha(); };
  document.addEventListener("keydown", tecla);
  f.addEventListener("click", e=>{ if(e.target===f) fecha(); });
  const visiveis = () => GAME_Q.filter(q=>!q.se || q.se(r));
  const X = `<button type="button" class="gm-x" aria-label="Fechar">×</button>`;
  const liga = () => { box.querySelector(".gm-x").onclick = fecha; box.scrollTop = 0; const p = box.querySelector("h2"); if(p){ p.setAttribute("tabindex","-1"); p.focus({preventScroll:true}); } };
  const intro = () => {
    box.innerHTML = `${X}<div class="gm-intro">
      <div class="gm-cena gm-cena-intro"><canvas width="${PIX.W}" height="${PIX.H}" aria-hidden="true"></canvas></div>
      <div><span class="gm-k">Game · 1 minuto</span><h2 id="gmT">Qual celular combina com você?</h2>
      <p class="gm-sub">Responda umas perguntas rápidas sobre o seu dia a dia. Assim a gente entende do que você precisa e passa a te mostrar os modelos e as ofertas que fazem sentido para você, sempre que voltar.</p>
      <ul class="gm-lista"><li><span class="d">7</span><span><b>Até 7 perguntas rápidas</b>, uma por tela</span></li><li><span class="d">✓</span><span>Toque nos cards, sem digitar nada</span></li><li><span class="d">★</span><span>No fim: o seu match e mais duas opções</span></li></ul>
      <div class="gm-acoes"><button type="button" class="gm-b ouro" data-a="ir">Bora jogar →</button><button type="button" class="gm-b txt" data-a="nao">Agora não</button></div>
      <p class="gm-priv">🔒 Suas respostas ficam salvas só neste aparelho. Dá para refazer quando quiser pelo menu.</p></div></div>`;
    liga(); cena("abertura", estado()); box.querySelector('[data-a="ir"]').onclick = escolhe; box.querySelector('[data-a="nao"]').onclick = fecha;
  };
  const escolhe = () => {
    const AV = [["girl","Menina"],["boy","Menino"],["bug","Besouro Bugsale"]];
    if(!r.av) r.av = "girl";
    box.innerHTML = `${X}<span class="gm-k">Antes de começar</span><h2 id="gmT">Quem vai jogar?</h2><p class="gm-sub">Escolha o personagem que vai viver o seu dia com o celular.</p>
      <div class="gm-avs" role="radiogroup" aria-label="Personagem">${AV.map(([k,l])=>`<button type="button" class="gm-av${r.av===k?" on":""}" role="radio" aria-checked="${r.av===k}" data-av="${k}"><canvas width="24" height="32" aria-hidden="true"></canvas><b>${l}</b></button>`).join("")}</div>
      <div class="gm-pe"><button type="button" class="gm-b lin" data-a="volta">← Voltar</button><span class="gm-hint"></span><button type="button" class="gm-b ouro" data-a="seg">Começar →</button></div>`;
    liga();
    const cvs = [...box.querySelectorAll(".gm-av canvas")];
    const gira = now => { if(!box.querySelector(".gm-avs")) return; cvs.forEach((cv,i)=>PIX.avatar(cv, AV[i][0], reduz ? 0 : now)); if(!reduz) requestAnimationFrame(gira); };
    requestAnimationFrame(gira);
    box.querySelectorAll(".gm-av").forEach(b=>b.onclick = ()=>{ r.av = b.dataset.av; box.querySelectorAll(".gm-av").forEach(x=>{ const on = x===b; x.classList.toggle("on",on); x.setAttribute("aria-checked",on); }); });
    box.querySelector('[data-a="volta"]').onclick = intro;
    box.querySelector('[data-a="seg"]').onclick = ()=>{ passo = 0; pergunta(); };
  };
  const pergunta = () => {
    const qs = visiveis(), q = qs[passo], tot = Math.max(qs.length, 6);
    const sel = [].concat(r[q.id] ?? []);
    const opHTML = o => { const on = sel.includes(o.v);
      const vis = o.bat ? bateriaIco(o.bat[0], o.bat[1]) : o.niv ? nivel(o.niv) : `<span class="gm-ic">${GIC[o.ic]}</span>`;
      return `<button type="button" class="gm-card${on?" on":""}" aria-pressed="${on}" data-v="${o.v}">${vis}<span>${esc(o.l)}${o.sub?`<small>${esc(o.sub)}</small>`:""}</span></button>`; };
    const ult = q.ops.find(o=>o.v===sel[sel.length-1]);
    box.innerHTML = `${X}<div class="gm-top"><div class="gm-prog" style="--n:${tot}">${Array.from({length:tot},(_,i)=>`<i class="${i<passo?"ok":i===passo?"at":""}"></i>`).join("")}</div><span class="gm-n">${passo+1} de ${tot}</span></div>
      <div class="gm-cab"><div class="gm-cena"><canvas width="${PIX.W}" height="${PIX.H}" role="img" aria-label="Cena ilustrada da sua resposta"></canvas></div>
      <div class="gm-tit"><span class="gm-k">${esc(q.tag)}</span><h2 id="gmT">${esc(q.t)}</h2><p class="gm-sub">${esc(q.sub)}</p></div></div>
      <div class="gm-ops${q.ops.length===3?" gm-o3":""}" role="group" aria-label="${esc(q.t)}">${q.ops.map(opHTML).join("")}</div>
      <div class="gm-dica" aria-live="polite"${ult&&ult.dica?"":" hidden"}><span class="bug" aria-hidden="true">${LOGO}</span><span>${ult&&ult.dica?esc(ult.dica):""}</span></div>
      <div class="gm-pe"><button type="button" class="gm-b lin" data-a="volta">← Voltar</button><span class="gm-hint">${q.max>1?`${sel.length} de ${q.max} escolhidas`:""}</span><button type="button" class="gm-b ouro" data-a="seg"${sel.length?"":" disabled"}>${passo===qs.length-1?"Ver meu resultado →":"Continuar →"}</button></div>`;
    liga();
    const ultV = sel[sel.length-1];
    cena(ultV === undefined ? G_BASE[q.id] : q.id==="orcamento" ? "orcamento" : String(ultV), estado());
    box.querySelectorAll(".gm-card").forEach(b=>b.onclick = ()=>{
      const o = q.ops.find(x=>String(x.v)===b.dataset.v), v = o.v;
      if(q.max===1) r[q.id] = v;
      else { let a = [].concat(r[q.id]||[]); a = a.includes(v) ? a.filter(x=>x!==v) : a.concat(v); if(a.length > q.max) a.shift(); r[q.id] = a; }
      if(q.id==="uso" && !(r.uso||[]).includes("fotos")) delete r.registro;
      const top = box.scrollTop; pergunta(); box.scrollTop = top; anim.t0 = performance.now();
      const d = box.querySelector(".gm-dica"); if(d && o.dica && [].concat(r[q.id]).includes(v)){ d.hidden = false; d.lastChild.textContent = o.dica; }
    });
    box.querySelector('[data-a="volta"]').onclick = ()=>{ if(passo===0) escolhe(); else { passo--; pergunta(); } };
    box.querySelector('[data-a="seg"]').onclick = ()=>{ if(passo < visiveis().length-1){ passo++; pergunta(); } else { const res = gameCalcula(r); gSalva({r, data:new Date().toISOString()}); resultado(res); } };
  };
  const resumo = () => {
    const nomes = {redes:"redes sociais", videos:"ver vídeos", fotos:"fotos e vídeos", jogos:"jogar", trabalho:"trabalhar ou estudar", basico:"o básico"};
    const u = (r.uso||[]).map(x=>nomes[x]); const uso = u.length ? `Para ${u.join(" e ")}` : "Para o seu dia a dia";
    const bat = {sobra:"", raspando:", com bateria para o dia todo", meio:", com bateria que aguente mais", rua:", com bateria e resistência para a rua"}[r.bateria]||"";
    const orc = +r.orcamento >= 99999 ? ", sem teto de preço" : `, até ${brl(+r.orcamento)}`;
    const sis = {ios:", no iPhone", android:", no Android", tanto:", tanto faz a marca"}[r.sistema]||"";
    return `${uso}${bat}${orc}${sis}.`;
  };
  const resultado = res => {
    const m = res.match, c = m.c, p = catP(c);
    const lista = p && p.ofertas && p.ofertas.lista ? p.ofertas.lista.slice().sort((a,b)=>a.preco-b.preco) : [];
    const art = p ? publicados().find(a=>a.phone===p.id) : null;
    const pct = Math.max(60, Math.min(98, m.pct || 80));
    const cta = lista.length ? `<a class="gm-b ouro" href="${esc(lista[0].url)}" target="_blank" rel="sponsored nofollow noopener">Ver ofertas ↗</a>`
      : art ? `<a class="gm-b ouro" href="${artURL(art)}">Ler a análise →</a>` : `<button type="button" class="gm-b ouro" data-gm-ver="${c.id}">Ver no comparador →</button>`;
    const topoAviso = res.basta ? `<p class="gm-obs">Se mudar de ideia: pelo que você contou, o <b>${esc(res.basta.c.nome)}</b> já dá conta do seu uso por ${brl(m.preco - res.basta.preco)} a menos.</p>` : "";
    box.innerHTML = `${X}<div class="gm-cena"><canvas width="${PIX.W}" height="${PIX.H}" role="img" aria-label="Seu celular ideal chegando"></canvas></div><span class="gm-k">Resultado</span><h2 id="gmT">Seu celular ideal é…</h2><p class="gm-sub">${esc(resumo())}</p>
      ${res.fora ? `<p class="gm-obs">${r.sistema==="ios" ? `O iPhone mais em conta hoje custa ≈ ${brl(m.preco)}, acima do seu orçamento. Se topar Android, tem opção boa dentro dele.` : "Nenhum modelo do catálogo cabe nesse orçamento com o que você escolheu. Estes são os mais em conta."}</p>` : ""}
      <div class="gm-res"><div class="gm-match"><span class="tag">Seu match</span><div class="ft">${catImg(c)}</div><div>
        <h3>${esc(c.nome)}</h3><div class="gm-af"><span class="bar"><i style="width:${pct}%"></i></span><b>${pct}%</b> a ver com você</div>
        <ul class="gm-por">${gameMotivos(m, res.w, res.mot)}</ul>
        <div class="gm-preco"><span class="p">≈ ${brl(m.preco)}<small>preço médio hoje</small></span><span class="gm-acoes"><button type="button" class="gm-b lin" data-a="cmp">Comparar os 3</button>${cta}</span></div></div></div>
        ${topoAviso}
        <div class="gm-alts">${gameAlt(res.eco, m, res.ecoTipo, res.w)}${gameAlt(res.mais, m, res.maisTipo, res.w)}</div>
        <div class="gm-res-pe"><span>🔒 Salvo só neste aparelho.</span><button type="button" class="gm-b txt" data-a="refaz">↻ Refazer o game</button></div></div>`;
    liga();
    const im = new Image(); im.src = R + "img/cat/" + c.id + ".webp";
    cena("match", estado({match:1, pct, img:im}));
    const vaiCmp = ids => { try{ localStorage.setItem("cmp-sel2", JSON.stringify(ids)); }catch(e){} location.href = comTema(R+"comparador.html") || R+"comparador.html"; };
    box.querySelector('[data-a="cmp"]').onclick = ()=> vaiCmp([c.id, res.eco && res.eco.c.id, res.mais && res.mais.c.id]);
    box.querySelectorAll("[data-gm-ver]").forEach(b=>b.addEventListener("click", e=>{ e.stopPropagation(); vaiCmp([b.dataset.gmVer, b.dataset.gmVer===c.id ? null : c.id]); }));
    box.querySelector('[data-a="refaz"]').onclick = ()=>{ const av = r.av; r = {av}; passo = 0; escolhe(); };
  };
  if(salvo && salvo.r && !forcar){ r = salvo.r; resultado(gameCalcula(r)); } else intro();
}
function gameInicia(){
  if(!GAME_ON) return;
  document.addEventListener("click", e=>{ const a = e.target.closest && e.target.closest('a[href*="#celular-ideal"]'); if(!a || !document.documentElement.classList.contains("v2")) return; e.preventDefault(); const mm = document.getElementById("menuM"); if(mm && !mm.hidden) document.querySelector(".hdr-menu").click(); gameAbre(); });
  if(!document.documentElement.classList.contains("v2")) return;
  if(location.hash === "#celular-ideal"){ setTimeout(()=>gameAbre(), 300); return; }
  let visto = null; try{ visto = localStorage.getItem("bs-game"); }catch(e){ visto = "sem-storage"; }
  if(!visto && !gLer() && !/[?&]semgame\b/.test(location.search)) setTimeout(()=>{ if(!document.querySelector(".busca:not([hidden])")) gameAbre(); }, 3000);
}


function renderAgendados(){
  const main = document.getElementById("content");
  const L = MQ_DATA.articles.filter(a=>a.locked).sort((a,b)=>a.pub.localeCompare(b.pub));
  const dia = d => { const x = new Date(d+"T12:00:00"); return x.toLocaleDateString("pt-BR",{weekday:"long", day:"2-digit", month:"2-digit"}); };
  const grupos = {}; L.forEach(a=>{ (grupos[a.pub.slice(0,10)] = grupos[a.pub.slice(0,10)] || []).push(a); });
  const TIP = {lista:"Guia", noticia:"Notícia", comparativo:"Comparativo", vale:"Vale a pena?", ocasiao:"Black Friday", novidade:"Novidade", review:"Review"};
  main.innerHTML = `<section class="ag"><span class="kicker">Só na prévia</span><h1>Artigos agendados</h1>
    <p class="ag-sub">Esta página existe só aqui no artifact. Ela não é gerada no site oficial: lá, cada artigo aparece sozinho no horário marcado.</p>
    ${Object.keys(grupos).length ? Object.entries(grupos).map(([d, as])=>`<h2 class="ag-dia">${esc(dia(d))}</h2><div class="ag-lista">${as.map(a=>{
      const p = PA(a), ok = !a.chamada;
      return `<${ok?"a":"div"} class="ag-item${ok?"":" ag-falta"}"${ok?` href="${artURL(a)}"`:""}><span class="ag-img">${img2(p)}</span>
        <span class="ag-txt"><span class="ag-meta"><b>${a.pub.slice(11,16)}</b> · ${esc(TIP[a.tipo]||a.cat)}${ok?"":" · <i>sem texto ainda</i>"}</span>
        <span class="ag-tit">${esc(a.titulo)}</span><span class="ag-dek">${esc(a.dek)}</span></span>${ok?`<span class="ag-ir">Ler prévia →</span>`:""}</${ok?"a":"div"}>`;}).join("")}</div>`).join("") : `<p>Nenhum artigo agendado.</p>`}
  </section>`;
}
window.MQ = { header, footer, renderArticles, renderArticle, renderRanking: ()=>renderRanking2(), renderComparador, renderAgendados };
})();
