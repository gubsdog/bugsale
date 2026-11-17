/* Bugsale · cabeçalho, menu e páginas de artigos (dados em js/data.js) */
(function(){
const R = window.MQ_ROOT || "";   /* prefixo até a raiz do site ("" na raiz, "../../" nos artigos) */
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
const dataBR = iso => { const [y,m,d] = iso.split("-"); return `${+d} ${MESES[+m-1]} ${y}`; };

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
function header(current){
  const el = document.getElementById("site-header");
  if(!el) return;
  el.className = "site-header";
  document.documentElement.classList.toggle("home", current === "home");
  el.innerHTML = `<div class="bar">
      <a class="brand" href="${R}index.html" aria-label="Bugsale, página inicial">${LOCKUP}</a>
      <div class="tools"><div class="tagline">O preço que parece bug.</div></div>
      <nav class="nav" id="site-nav" aria-label="Seções">${MENU.map(([href,label,key])=>`<a href="${href}" class="${key===current?"on":""}${key==="comparador"?" cta":""}">${label}</a>`).join("")}</nav>
    </div>`;
  /* barra inferior do celular: no máximo 5 itens; as marcas ficam juntas em "Marcas" */
  if(!document.querySelector(".dock")){
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
  let lastY = window.scrollY;
  const mq = window.matchMedia("(max-width:760px)");
  const onScroll = () => {
    const y = window.scrollY;
    el.classList.toggle("compact", y > 40);
    document.documentElement.classList.toggle("scrolled", y > 24);
    if(current !== "comparador"){
      if(mq.matches && y > 160 && y > lastY + 4 && !el.contains(document.activeElement)) el.classList.add("hide");
      else if(y < lastY - 4 || y < 160 || !mq.matches) el.classList.remove("hide");
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
}

function footer(){
  const el = document.getElementById("site-footer");
  if(!el) return;
  el.className = "site-footer";
  el.innerHTML = `<div class="wrap"><div class="cols">
      <div><a class="brand foot-brand" href="${R}index.html" aria-label="Bugsale, página inicial">${LOCKUP}</a>
        <p class="slogan">o preço que parece bug</p>
        <p style="max-width:40ch;margin:16px 0 0">Reviews, comparativos e o preço justo de celulares e produtos para casa. O preço que parece bug, checado com histórico.</p></div>
      <div class="ft-secoes"><h5>Seções</h5>${MENU.map(([h,l])=>`<a href="${h}">${l}</a>`).join("")}</div>
      <div><h5>Bugsale</h5><a href="${R}sobre.html">Sobre e como avaliamos</a><a href="${R}privacidade.html">Política de privacidade</a></div>
      <div><h5>Comunidade</h5><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Comunidade no WhatsApp</a></div>
    </div><div class="fine">Preços médios e fichas técnicas de nov/2026, a partir de Oficina da Net, Tecnoblog, Buscapé e GSMArena. Preços mudam todo dia. Fotos: divulgação das marcas.</div></div>`;
}

/* ---------- artigos ---------- */
const P = id => MQ_DATA.phones[id];
function offBadge(p){
  if(!p.precoN) return "";
  const pct = Math.round((1 - p.atualN/p.precoN)*100);
  return pct > 0 ? `<span class="off${pct>=40?" hot":""}">-${pct}%</span>` : "";
}
const artURL = a => `${R}artigos/${a.phone}/${window.MQ_DIRINDEX || ""}`;
function readLink(a){ return `<a class="btn primary" href="${artURL(a)}">Leia o artigo →</a>`; }
const byline = a => `<span class="avatar">${LOGO_SQ}</span> Equipe Bugsale · <time datetime="${a.data}">${dataBR(a.data)}</time>`;
const kicker = a => `<span class="kicker">${esc(a.cat)} · <span class="brandtag">${esc(P(a.phone).marcaMenu)}</span></span>`;

function heroHTML(a){
  const p = P(a.phone);
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
  const lista = o.lista || [];
  const slots = [0,1,2].map(i=>{
    const x = lista[i];
    if(!x) return `<div class="of-slot vazio"><span class="of-loja">Oferta ${i+1}</span><b class="of-preco">—</b><span class="btn of-btn" aria-disabled="true">Em breve</span></div>`;
    return `<a class="of-slot${i===0?" melhor":""}" href="${esc(x.url)}" target="_blank" rel="sponsored nofollow noopener">
      ${i===0?`<span class="of-tag">Menor preço</span>`:""}
      <span class="of-loja">${esc(x.loja)}</span><b class="of-preco">${brl(x.preco)}</b>
      <span class="btn of-btn${i===0?" primary":""}">Ver oferta ↗</span></a>`;
  }).join("");
  const meta = lista.length ? `Última pesquisa em ${o.pesquisa ? dataBR(o.pesquisa) : "—"}` : `Preço médio de referência ≈ ${brl(p.atualN)} · a pesquisa de ofertas sai em breve`;
  return `<section class="ofertas" aria-label="Melhores ofertas">
    <div class="of-head"><span class="of-label">Melhores ofertas encontradas</span><span class="of-meta">${meta}</span></div>
    <div class="of-grid">${slots}</div>
    <small class="of-nota">${lista.length ? "Links de afiliado: a Bugsale pode ganhar uma comissão, sem custo extra para você. Preços sujeitos a mudança nas lojas." : "Quando a pesquisa sair, você escolhe entre as 3 lojas com o melhor preço."}</small>
  </section>`;
}
/* visual do artigo: foto oficial de uso quando existe; senão, o aparelho num "estúdio" com a cara da Bugsale */
function visual(p, sm){
  if(p.foto) return `<img class="ph" src="${R}${sm ? p.foto.sm : p.foto.src}" alt="${esc(p.full)} em uso" style="object-position:${p.foto.pos}" loading="lazy">`;
  return `<span class="ghost">${esc(p.nome)}</span><span class="floor"></span><img class="cut" src="${R}${p.cut}" alt="${esc(p.full)}" width="160" height="212" loading="lazy">`;
}
const vcls = p => p.foto ? "is-photo" : "is-studio";
/* camada de fundo desfocada: a própria imagem do artigo, que emenda a imagem com o texto */
const blurBG = p => `<span class="bs-bg" aria-hidden="true">${p.foto ? `<img src="${R}${p.foto.sm}" alt="" loading="lazy" style="object-position:${p.foto.pos}">` : `<img class="c" src="${R}${p.cut}" alt="" loading="lazy">`}</span>`;
function cardHTML(a){
  const p = P(a.phone);
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
function rowHTML(a){
  const p = P(a.phone);
  return `<a class="row blurred tl ${vcls(p)}" href="${artURL(a)}">${blurBG(p)}
    <div class="thumb ${vcls(p)}">${visual(p, true)}</div>
    <div class="row-txt"><h3>${esc(a.titulo)}</h3><p class="meta">${esc(a.dek)}</p></div>
    <span class="more">Leia mais →</span>
  </a>`;
}

function dropsHTML(list){
  const top = list.map(id=>P(id)).filter(p=>p.precoN)
    .map(p=>({p, pct:Math.round((1-p.atualN/p.precoN)*100)}))
    .sort((a,b)=>b.pct-a.pct).slice(0,5);
  return `<div class="box"><h4>Maiores quedas de preço</h4><ol class="drops">${top.map(({p,pct})=>
    `<li><span class="dr-img"><img src="${R}${p.cut}" alt="" loading="lazy"></span><div><b>${esc(p.full)}</b><span>≈ ${brl(p.atualN)} · lançou a ${brl(p.precoN)}</span></div><span class="off${pct>=40?" hot":""}">-${pct}%</span></li>`).join("")}</ol></div>`;
}
const communityHTML = `<div class="box community"><h4>Promoções todo dia</h4><p>Entre na comunidade da Bugsale no WhatsApp e receba só as ofertas que passaram no nosso filtro de preço.</p><a class="btn" href="#">Entrar na comunidade</a></div>`;

/* página: lista de artigos (home = todas as marcas; página de marca = só aquela) */
function renderArticles(brand){
  const main = document.getElementById("content");
  const arts = MQ_DATA.articles.filter(a => !brand || P(a.phone).marca === brand).sort((a,b)=>b.data.localeCompare(a.data));
  const [first, ...rest] = arts;
  const recent = rest.slice(0,4), older = rest.slice(4, 9); /* linha do tempo: no máximo os 5 últimos */
  let html = "";
  if(brand){
    const label = brand==="Apple" ? "iPhone" : brand;
    const ids = Object.keys(MQ_DATA.phones).filter(id=>P(id).marca===brand);
    html += `<header class="brand-head"><div><span class="kicker">Celulares</span><h1>${label}</h1></div><p>${arts.length} textos sobre ${label}. Toque em um modelo para abrir o comparador com ele.</p></header>
      <div class="models" style="margin-top:16px">${ids.map(id=>`<button type="button" data-compare="${id}"><img src="${R}${P(id).img}" alt="">${esc(P(id).nome)}</button>`).join("")}</div>`;
  }
  if(first) html += heroHTML(first);
  if(recent.length) html += `<div class="section-title" id="mais"><h2>Mais recentes</h2></div><div class="grid4 swipe">${recent.map(cardHTML).join("")}</div>`;
  const allIds = [...new Set(arts.map(a=>a.phone))];
  html += `<div class="section-title"><h2>Linha do tempo</h2></div>
    <div class="split"><div class="timeline">${older.length ? older.map(rowHTML).join("") : `<p class="meta">Mais textos em breve.</p>`}</div>
    <aside class="side">${dropsHTML(allIds)}${communityHTML}</aside></div>`;
  main.innerHTML = html;
  reveal(main);
}


/* ---------- página de artigo (article.html#id-do-celular) ---------- */
function para(s){ return `<p>${s}</p>`; }
function renderArticle(){
  const main = document.getElementById("content");
  const id = window.MQ_ARTICLE || location.hash.replace("#","");
  const a = MQ_DATA.articles.find(x=>x.phone===id) || MQ_DATA.articles.slice().sort((x,y)=>y.data.localeCompare(x.data))[0];
  const p = P(a.phone), s = p.specs, b = MQ_DATA.bodies[a.phone];
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
  const ficha = [["Tela",s.tela],["Taxa de atualização",s.taxa],["Tela externa",s.telaExt],["Processador",s.chip],["Memória RAM",s.ram],["Armazenamento",s.armaz],["Câmeras traseiras",s.camTras],["Zoom óptico",s.zoom],["Câmera frontal",s.camFrontal],["Vídeo",s.video],["Bateria",s.bateria],["Carregamento",s.carga],["Resistência",s.resist],["Peso",s.peso],["Espessura",s.espessura]]
    .filter(r=>r[1]).map(r=>`<tr><th>${r[0]}</th><td>${esc(r[1])}</td></tr>`).join("");
  const related = MQ_DATA.articles.filter(x=>x.phone!==a.phone).sort((x,y)=>(P(y.phone).marca===p.marca)-(P(x.phone).marca===p.marca) || y.data.localeCompare(x.data)).slice(0,4);
  const shareText = encodeURIComponent(`${a.titulo} · Bugsale`);
  main.innerHTML = `
  <article class="post">
    <nav class="crumb" aria-label="Você está em"><a href="${R}index.html">Início</a> / ${brandPage?`<a href="${brandPage}">${esc(p.marcaMenu)}</a>`:esc(p.marcaMenu)}</nav>
    <div class="post-head">
      <span class="kicker">${esc(a.cat)} · <span class="brandtag">${esc(p.marcaMenu)}</span></span>
      <h1>${esc(a.titulo)}</h1>
      <p class="dek">${esc(a.dek)}</p>
      <aside class="quick">
        <span class="q-label">Resumo rápido</span>
        <div class="q-price"><small>Preço médio hoje</small><b>≈ ${brl(p.atualN)}</b> ${offBadge(p)}</div>
        <dl>
          ${p.precoN?`<div><dt>Lançamento</dt><dd>${brl(p.precoN)}</dd></div>`:""}
          <div><dt>Processador</dt><dd>${esc(s.chip)}</dd></div>
          <div><dt>Bateria</dt><dd>${esc(s.bateria)}${s.carga?` · ${esc(s.carga)}`:""}</dd></div>
          <div><dt>Atualizações</dt><dd>${esc(s.updResumo || "Não divulgado")}</dd></div>
        </dl>
        <a class="btn q-btn" href="${R}comparador.html" data-compare="${a.phone}">Comparar com outros</a>
      </aside>
      <div class="author">
        <div class="meta">${byline(a)}</div>
        <div class="share"><a href="https://wa.me/?text=${shareText}" target="_blank" rel="noopener">WhatsApp</a><button type="button" id="copyLink">Copiar link</button></div>
      </div>
    </div>
    <figure class="cover">
      <div class="art ${vcls(p)}">${visual(p)}${p.foto ? "" : `<span class="watermark">${brl(p.atualN).replace("R$ ","")}</span>`}</div>
        <figcaption>${p.foto ? `${esc(p.full)} no dia a dia. ${esc(p.foto.credito)}.` : `${esc(p.full)}. Imagem do aparelho: divulgação (via GSMArena).`}</figcaption>
    </figure>
    <div class="post-body">
      <p class="lede">${esc(b[0])}</p>
      ${ofertaHTML(p)}
      <h2>O que ele oferece</h2>${para(oferece)}
      <div class="ficha"><h3>Ficha rápida</h3><table>${ficha}</table></div>
      <h2>Quanto custa hoje</h2>${para(preco)}
      <h2>Atualizações</h2>${para(upd)}
      <h2>Para quem vale</h2>${para(esc(b[1]))}
      <div class="verdict"><span class="kicker">Veredito Bugsale</span><p>${esc(b[2])}</p></div>
      <div class="cta-compare"><div><b>Compare com outros celulares</b><span>Coloque o ${esc(p.nome)} lado a lado com até dois modelos.</span></div><button class="btn primary" type="button" data-compare="${a.phone}">Abrir no comparador →</button></div>
      <div class="tags"><a href="${brandPage||R+"index.html"}">${esc(p.marcaMenu)}</a><span>${esc(a.cat)}</span><span>Celulares</span></div>
      <p class="note">Preços e fichas de nov/2026, a partir de Oficina da Net, Tecnoblog, Buscapé e GSMArena. Preços mudam todo dia.</p>
    </div>
  </article>
  <div class="section-title"><h2>Leia também</h2><a href="${R}index.html">Ver todos →</a></div>
  <div class="grid4 swipe">${related.map(cardHTML).join("")}</div>`;
  reveal(main);
  const cp = document.getElementById("copyLink");
  const canShare = !!navigator.share && window.matchMedia("(pointer:coarse)").matches;
  if(canShare) cp.textContent = "Compartilhar";
  cp.addEventListener("click", async ()=>{
    if(canShare){ try{ await navigator.share({title:a.titulo, text:a.dek, url:location.href}); }catch(e){} return; }
    try{ await navigator.clipboard.writeText(location.href); cp.textContent = "Link copiado"; }catch(e){ cp.textContent = "Não deu para copiar"; }
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

/* abre o comparador já com o celular escolhido */
document.addEventListener("click", e=>{
  const t = e.target.closest("[data-compare]");
  if(!t) return;
  e.preventDefault();
  try{ localStorage.setItem("cmp-sel2", JSON.stringify([t.dataset.compare, null, null])); }catch(err){}
  location.href = R+"comparador.html";
});

window.MQ = { header, footer, renderArticles, renderArticle, renderRanking };
})();
