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
  [R+"comparador.html","Comparador de preços","comparador"]
];
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
const PERFIL = {"galaxy-a07":["entrada"],"galaxy-a17-5g":["entrada","intermediario"],"galaxy-a57":["intermediario"],"galaxy-s26":["compacto","topo"],"galaxy-s26-ultra":["topo","camera"],"iphone-15":["ecossistema"],"iphone-16":["ecossistema","intermediario"],"iphone-17":["ecossistema","camera"],"moto-g86":["intermediario","bateria"],"moto-g-max":["camera","tela"],"edge-70":["estilo"],"edge-70-pro":["bateria","camera"],"razr-70-ultra":["dobravel","topo"],"poco-x8-pro":["gamer","bateria"],"poco-x8-pro-max":["gamer","tela"]};
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
  const TIPO = {review:"Review", comparativo:"Comparativo", vale:"Vale a pena?", ocasiao:a.cat, novidade:"Novidade"};
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
      <div class="rk-ordm"><button type="button" class="rk-ordm-b" aria-haspopup="true" aria-expanded="false">Ordenar por: <b id="rkOrdNome">Custo-benefício</b><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
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

window.MQ = { header, footer, renderArticles, renderArticle, renderRanking: ()=>renderRanking2(), renderComparador };
})();
