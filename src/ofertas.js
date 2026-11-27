/* ---------- Ofertas: loja de ofertas + ranking por uso ---------- */
/* categoria de cada aparelho (5 faixas pedidas pelo Gubbio) */
const OF_SEG = {
  "galaxy-a07":"entrada",
  "galaxy-a17-5g":"int-entrada", "moto-g86":"int-entrada", "moto-g-max":"int-entrada",
  "galaxy-a57":"int", "redmi-note-17-pro":"int", "poco-x8-pro":"int",
  "edge-70":"int-pro", "edge-70-pro":"int-pro", "poco-x8-pro-max":"int-pro",
  "galaxy-s26":"topo", "galaxy-s26-ultra":"topo", "iphone-15":"topo", "iphone-16":"topo", "iphone-17":"topo", "razr-70-ultra":"topo", "razr-flex":"topo"
};
const OF_SEGS = [["entrada","Entrada"],["int-entrada","Intermediário de entrada"],["int","Intermediário"],["int-pro","Intermediário Pro"],["topo","Topo de linha"]];
const OF_USOS = [
  ["jogos","Jogos","🎮","Desempenho", n=>n.desempenho],
  ["foto","Fotografia","📷","Câmera", n=>n.camera],
  ["filmar","Filmar e produzir conteúdo","🎬","Vídeo", (n,p)=>clamp(n.camera + (/8K/.test(p.specs.video)?1:/4K a (60|120)/.test(p.specs.video)?.6:/4K/.test(p.specs.video)?.3:-.5))],
  ["videos","Ver vídeos e séries","📺","Tela e bateria", n=>(n.tela+n.bateria)/2],
  ["bateria","Bateria que dura","🔋","Bateria", n=>n.bateria],
  ["tela","Tela bonita","✨","Tela", n=>n.tela]
];
const OF_ORD = [["desconto","Maior desconto"],["menor","Menor preço"],["maior","Maior preço"]];
const ICO_FILTRO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>';
const lojaPrep = l => /amazon/i.test(l) ? "na" : "no";
const nota1 = v => v.toFixed(1).replace(".",",");

function ofertasLista(){
  return Object.values(MQ_DATA.phones).map(p=>{
    const lista = ((p.ofertas||{}).lista||[]).filter(o=>o.loja && o.preco && o.url).slice().sort((a,b)=>a.preco-b.preco);
    if(!lista.length) return null;
    const melhor = lista[0], n = notas(p.id, p);
    const pct = p.precoN ? Math.round((1 - melhor.preco/p.precoN)*100) : 0;
    const usos = Object.fromEntries(OF_USOS.map(([k,,,,f])=>[k, f(n,p)]));
    const s = p.specs || {};
    const tela = (s.tela||"").split(" ")[0];
    const chips = [tela, s.bateria, s.armazN ? s.armazN + " GB" : null].filter(Boolean);
    const minimo = p.specs && p.specs.minimoN && melhor.preco <= p.specs.minimoN + 1;
    return {p, id:p.id, lista, melhor, pct, usos, chips, minimo, seg:OF_SEG[p.id] || "int", marca:/^poco/.test(p.id) ? "POCO" : p.marca};
  }).filter(Boolean);
}

function renderOfertas(){
  const main = document.getElementById("content");
  main.classList.add("h2","of");
  const todos = ofertasLista();
  const marcas = [...new Set(todos.map(x=>x.marca))];
  const maxP = Math.ceil(Math.max(...todos.map(x=>x.melhor.preco))/500)*500;
  const st = {seg:[], marca:[], uso:null, min:0, max:maxP, ord:"desconto"};
  const pesquisa = todos.map(x=>(x.p.ofertas||{}).pesquisa).filter(Boolean).sort().pop();
  const segN = k => (OF_SEGS.find(s=>s[0]===k)||[,""])[1];

  main.innerHTML = `<h1 class="b-tit">Ofertas</h1>
    <p class="of-lead">Encontre as melhores ofertas de celulares do dia. Use os filtros abaixo para achar o celular mais adequado para você.</p>
    <section class="of-game" aria-label="Celular ideal"></section>
    <div class="of-bar">
      <div class="of-fs">
        <button type="button" class="of-fb" data-f="seg" aria-expanded="false">Categoria<i>▾</i></button>
        <button type="button" class="of-fb" data-f="marca" aria-expanded="false">Marca<i>▾</i></button>
        <button type="button" class="of-fb" data-f="uso" aria-expanded="false">Uso<i>▾</i></button>
        <button type="button" class="of-fb" data-f="preco" aria-expanded="false">Preço<i>▾</i></button>
      </div>
      <button type="button" class="of-fb of-filtros" data-f="tudo" aria-expanded="false">${ICO_FILTRO}Filtros<b class="of-cnt" hidden></b></button>
      <button type="button" class="of-fb of-ordb" data-f="ord" aria-expanded="false"><span></span><i>▾</i></button>
      <div class="of-pop" hidden></div>
    </div>
    <div class="of-tags"></div>
    <p class="of-res"></p>
    <div class="of-grid"></div>
    <p class="of-nota">Desconto calculado sobre o preço de lançamento. Preços pesquisados ${pesquisa ? "em " + dataHora(pesquisa) : "hoje"} na Amazon, no Mercado Livre e no Magalu, e mudam ao longo do dia. Os links levam à loja; a Bugsale pode receber comissão, sem custo extra para você.</p>`;

  const $ = s => main.querySelector(s);
  const grid = $(".of-grid"), pop = $(".of-pop"), bar = $(".of-bar");

  /* ---- banner do game ---- */
  const banner = () => {
    const el = $(".of-game");
    const salvo = typeof gLer === "function" ? gLer() : null;
    let match = null;
    if(salvo && salvo.r){ try{ match = gameCalcula(salvo.r).match; }catch(e){} }
    const chars = `<span class="of-chars" aria-hidden="true"><img src="${R}img/game/menina.webp" alt=""><img src="${R}img/game/menino.webp" alt=""><img src="${R}img/game/besouro.webp" alt=""></span>`;
    if(match){
      const c = match.c, x = todos.find(t=>t.id===c.antigo);
      const img = c.img ? R + c.img : (x ? R + (x.p.catImg||x.p.cut) : "");
      el.innerHTML = `<div class="of-g-txt"><span class="of-k">Seu match</span><h2>O celular que combina com você</h2>
        <div class="of-match">${img?`<img src="${img}" alt="">`:""}<div><b>${esc(c.nome)}</b><span>${x ? `a partir de ${brl(x.melhor.preco)} hoje` : "ainda sem oferta acompanhada por aqui"}</span></div></div>
        <div class="of-g-acts">${x ? `<button type="button" class="of-g-btn" data-g="ver">Ver ofertas dele →</button>` : `<button type="button" class="of-g-btn" data-g="res">Ver o resultado →</button>`}<button type="button" class="of-g-link" data-g="nova">Jogar de novo</button></div></div>${chars}`;
      const v = el.querySelector('[data-g="ver"]');
      if(v) v.onclick = ()=>{ Object.assign(st, {seg:[], marca:[], uso:null, min:0, max:maxP}); desenha(); const card = document.getElementById("of-"+x.id); if(card){ card.scrollIntoView({behavior:"smooth", block:"center"}); card.classList.remove("of-pisca"); void card.offsetWidth; card.classList.add("of-pisca"); } };
      const rb = el.querySelector('[data-g="res"]'); if(rb) rb.onclick = ()=>gameAbre();
      el.querySelector('[data-g="nova"]').onclick = ()=>gameAbre(true);
    } else {
      el.innerHTML = `<div class="of-g-txt"><span class="of-k">Game · 1 minuto</span><h2>Qual celular combina com você?</h2>
        <p>Responda 7 perguntas rápidas sobre o seu dia a dia e veja as ofertas do seu match.</p>
        <div class="of-g-acts"><button type="button" class="of-g-btn" data-g="jogar">Descobrir meu celular →</button></div></div><span class="of-balao" aria-hidden="true">MATCH?</span>${chars}`;
      el.querySelector('[data-g="jogar"]').onclick = ()=>gameAbre(true);
    }
  };
  banner();
  document.addEventListener("bs-game-fim", banner);

  /* ---- lista ---- */
  const filtra = () => {
    let l = todos.filter(x=>(!st.seg.length || st.seg.includes(x.seg)) && (!st.marca.length || st.marca.includes(x.marca)) && x.melhor.preco >= st.min && x.melhor.preco <= st.max);
    if(st.uso) l.sort((a,b)=>b.usos[st.uso]-a.usos[st.uso]);
    else if(st.ord==="menor") l.sort((a,b)=>a.melhor.preco-b.melhor.preco);
    else if(st.ord==="maior") l.sort((a,b)=>b.melhor.preco-a.melhor.preco);
    else l.sort((a,b)=>b.pct-a.pct || a.melhor.preco-b.melhor.preco);
    return l;
  };
  const usoDe = k => OF_USOS.find(u=>u[0]===k);
  const card = (x, i) => {
    const u = st.uso ? usoDe(st.uso) : null, v = u ? x.usos[st.uso] : 0;
    const selo = u ? `<span class="of-rk">#${i+1} em ${esc(u[1].toLowerCase())}</span>` : x.minimo ? `<span class="of-selo">⚡ Menor preço já visto</span>` : "";
    const lojas = x.lista.map(o=>`<a href="${esc(o.url)}" target="_blank" rel="sponsored noopener"><span>${esc(o.loja)}</span><b>${brl(o.preco)}</b></a>`).join("");
    return `<article class="of-card" id="of-${x.id}">
      <div class="of-img"><img src="${R}${x.p.catImg||x.p.cut}" alt="${esc(x.p.full)}" loading="lazy">${x.pct>0?`<span class="of-off">-${x.pct}%</span>`:""}${selo}</div>
      <div class="of-info">
        <span class="of-seg">${esc(segN(x.seg))}</span>
        <h3><a href="${modeloURL(x.p)}">${esc(x.p.nome)}</a></h3>
        <div class="of-chips">${x.chips.map(c=>`<span>${esc(c)}</span>`).join("")}</div>
        ${u ? `<div class="of-nota-b"><span>${u[3]}</span><i><b style="width:${Math.round(v*10)}%"></b></i><strong>${nota1(v)}</strong></div>` : ""}
        <div class="of-pr"><b>${brl(x.melhor.preco)}</b>${x.p.precoN?`<s>${brl(x.p.precoN)}</s>`:""}</div>
        <span class="of-loja">Menor preço ${lojaPrep(x.melhor.loja)} <strong>${esc(x.melhor.loja)}</strong>${x.lista.length>1?` · <button type="button" class="of-ver" aria-expanded="false">ver ${x.lista.length} lojas</button>`:""}</span>
        <div class="of-lojas" hidden>${lojas}</div>
        <div class="of-acts"><a class="of-btn" href="${esc(x.melhor.url)}" target="_blank" rel="sponsored noopener">Ver oferta <i aria-hidden="true">↗</i></a><button type="button" class="of-btn2" data-compare="${x.id}">Comparar</button></div>
      </div></article>`;
  };
  const tags = () => {
    const t = [...st.seg.map(k=>["seg",k,segN(k)]), ...st.marca.map(k=>["marca",k,k])];
    if(st.uso) t.push(["uso",st.uso,usoDe(st.uso)[1]]);
    if(st.min>0 || st.max<maxP) t.push(["preco","",`${brl(st.min)} a ${brl(st.max)}`]);
    $(".of-tags").innerHTML = t.length ? t.map(([f,k,l])=>`<button type="button" class="of-tag" data-f="${f}" data-k="${esc(k)}">${esc(l)} <span aria-hidden="true">×</span><span class="sr">remover filtro</span></button>`).join("") + `<button type="button" class="of-limpa">Limpar filtros</button>` : "";
    const cnt = $(".of-cnt"); cnt.hidden = !t.length; cnt.textContent = t.length;
    main.querySelectorAll(".of-fs .of-fb").forEach(b=>{
      const f = b.dataset.f, on = f==="seg" ? st.seg.length : f==="marca" ? st.marca.length : f==="uso" ? !!st.uso : (st.min>0 || st.max<maxP);
      b.classList.toggle("on", !!on);
      b.firstChild.textContent = f==="uso" && st.uso ? "Uso: " + usoDe(st.uso)[1] : {seg:"Categoria",marca:"Marca",uso:"Uso",preco:"Preço"}[f] + (on && f!=="uso" && f!=="preco" ? ` (${f==="seg"?st.seg.length:st.marca.length})` : "");
    });
    $(".of-ordb span").textContent = st.uso ? "Melhor em " + usoDe(st.uso)[1].toLowerCase() : "Ordenar: " + OF_ORD.find(o=>o[0]===st.ord)[1];
  };
  const desenha = () => {
    const l = filtra();
    grid.innerHTML = l.length ? l.map(card).join("") : `<div class="b-vazio"><span>Nenhum celular com esses filtros. Tente tirar algum.</span></div>`;
    $(".of-res").innerHTML = `<b>${l.length} ${l.length===1?"celular":"celulares"}</b> · preços pesquisados ${pesquisa ? "em " + dataHora(pesquisa) : "hoje"} na Amazon, no Mercado Livre e no Magalu`;
    tags();
  };

  /* ---- pop-ups dos filtros ---- */
  let aberto = null;
  const fechaPop = () => { pop.hidden = true; pop.className = "of-pop"; aberto = null; main.querySelectorAll(".of-fb").forEach(b=>b.setAttribute("aria-expanded","false")); document.documentElement.classList.remove("of-sheet-on"); };
  const chk = (grp, k, l, on) => `<button type="button" class="of-op${on?" on":""}" data-grp="${grp}" data-k="${esc(k)}" aria-pressed="${on}">${l}</button>`;
  const precoHTML = (mn, mx) => {
    const barras = Array.from({length:18}, (_,i)=>{ const a = i*maxP/18, b = (i+1)*maxP/18, n = todos.filter(x=>x.melhor.preco>=a && x.melhor.preco<b).length; return `<span style="height:${8+n*24}px" class="${b>mn && a<mx?"in":""}"></span>`; }).join("");
    return `<div class="of-hist" aria-hidden="true">${barras}</div>
      <div class="of-rg"><input type="range" min="0" max="${maxP}" step="100" value="${mn}" aria-label="Preço mínimo" data-r="min"><input type="range" min="0" max="${maxP}" step="100" value="${mx}" aria-label="Preço máximo" data-r="max"></div>
      <div class="of-ins"><label>Mínimo<span><em>R$</em><input type="number" inputmode="numeric" min="0" max="${maxP}" step="50" value="${mn}" data-i="min"></span></label><span class="of-ate">–</span><label>Máximo<span><em>R$</em><input type="number" inputmode="numeric" min="0" max="${maxP}" step="50" value="${mx}" data-i="max"></span></label></div>`;
  };
  const ligaPreco = box => {
    const r = k => box.querySelector(`[data-r="${k}"]`), i = k => box.querySelector(`[data-i="${k}"]`);
    const sync = (from) => {
      let mn = +(from==="i" ? i("min").value : r("min").value) || 0, mx = +(from==="i" ? i("max").value : r("max").value) || 0;
      if(from!=="i"){ if(mn > mx){ if(document.activeElement===r("min")) mn = mx; else mx = mn; } i("min").value = mn; i("max").value = mx; }
      r("min").value = Math.min(mn,maxP); r("max").value = Math.min(mx,maxP);
      const a = Math.min(mn,mx), b = Math.max(mn,mx);
      box.querySelectorAll(".of-hist span").forEach((s,j)=>s.classList.toggle("in", (j+1)*maxP/18 > a && j*maxP/18 < b));
      box.querySelector(".of-rg").style.setProperty("--a", a/maxP*100+"%"); box.querySelector(".of-rg").style.setProperty("--b", b/maxP*100+"%");
    };
    box.querySelectorAll("input[type=range]").forEach(x=>x.addEventListener("input", ()=>sync("r")));
    box.querySelectorAll("input[type=number]").forEach(x=>x.addEventListener("input", ()=>sync("i")));
    sync("r");
    return () => { const a = +i("min").value||0, b = +i("max").value||maxP; return [Math.max(0,Math.min(a,b)), Math.min(maxP,Math.max(a,b))]; };
  };
  const abrePop = (f, btn) => {
    if(aberto===f){ fechaPop(); return; }
    fechaPop(); aberto = f; btn.setAttribute("aria-expanded","true");
    let h = "";
    if(f==="seg") h = `<h4>Categoria</h4><div class="of-ops">${OF_SEGS.map(([k,l])=>chk("seg",k,l,st.seg.includes(k))).join("")}</div>`;
    else if(f==="marca") h = `<h4>Marca</h4><div class="of-ops">${marcas.map(m=>chk("marca",m,m,st.marca.includes(m))).join("")}</div>`;
    else if(f==="uso") h = `<h4>Para que você mais usa o celular?</h4><div class="of-ops of-ops-l">${OF_USOS.map(([k,l,ic])=>chk("uso",k,`<em aria-hidden="true">${ic}</em>${l}`,st.uso===k)).join("")}</div>`;
    else if(f==="ord") h = `<h4>Ordenar por</h4><div class="of-ops of-ops-l">${(st.uso?[["uso","Melhor em "+usoDe(st.uso)[1].toLowerCase()]]:[]).concat(OF_ORD).map(([k,l])=>chk("ord",k,l,(st.uso?"uso":st.ord)===k)).join("")}</div>`;
    else if(f==="preco") h = `<h4>Faixa de preço</h4><p>Arraste ou digite o menor e o maior valor.</p>${precoHTML(st.min, st.max)}<div class="of-pact"><button type="button" class="of-lk" data-a="limpa">Limpar</button><button type="button" class="of-ap" data-a="aplica">Aplicar</button></div>`;
    else if(f==="tudo") h = `<div class="of-sh-hd"><b>Filtros</b><button type="button" class="of-lk" data-a="limpa-tudo">Limpar</button></div>
      <h4>Categoria</h4><div class="of-ops">${OF_SEGS.map(([k,l])=>chk("seg",k,l,st.seg.includes(k))).join("")}</div>
      <h4>Marca</h4><div class="of-ops">${marcas.map(m=>chk("marca",m,m,st.marca.includes(m))).join("")}</div>
      <h4>Uso</h4><div class="of-ops">${OF_USOS.map(([k,l,ic])=>chk("uso",k,`<em aria-hidden="true">${ic}</em>${l}`,st.uso===k)).join("")}</div>
      <h4>Faixa de preço</h4>${precoHTML(st.min, st.max)}
      <div class="of-sbar"><button type="button" class="of-cn" data-a="cancela">Cancelar</button><button type="button" class="of-ap" data-a="aplica-tudo">Ver celulares</button></div>`;
    pop.innerHTML = h; pop.hidden = false;
    pop.classList.add("of-pop-"+f);
    if(f==="tudo") document.documentElement.classList.add("of-sheet-on");
    else { const r = btn.getBoundingClientRect(), b = bar.getBoundingClientRect(); const left = Math.min(r.left - b.left, b.width - pop.offsetWidth); pop.style.left = Math.max(0,left) + "px"; }
    const lerPreco = (f==="preco" || f==="tudo") ? ligaPreco(pop) : null;
    /* no "Filtros" do celular, as escolhas só valem ao tocar em "Ver celulares" */
    const rasc = f==="tudo" ? {seg:st.seg.slice(), marca:st.marca.slice(), uso:st.uso} : st;
    const conta = () => { if(f!=="tudo") return; const [mn,mx] = lerPreco(); const n = todos.filter(x=>(!rasc.seg.length||rasc.seg.includes(x.seg))&&(!rasc.marca.length||rasc.marca.includes(x.marca))&&x.melhor.preco>=mn&&x.melhor.preco<=mx).length; pop.querySelector('[data-a="aplica-tudo"]').textContent = `Ver ${n} ${n===1?"celular":"celulares"}`; };
    pop.querySelectorAll("input").forEach(x=>x.addEventListener("input", conta)); conta();
    pop.onclick = e => {
      const o = e.target.closest(".of-op"), a = e.target.closest("[data-a]");
      if(o){
        const g = o.dataset.grp, k = o.dataset.k;
        if(g==="ord"){ if(k!=="uso"){ st.uso = null; st.ord = k; } fechaPop(); desenha(); return; }
        if(g==="uso"){ rasc.uso = rasc.uso===k ? null : k; pop.querySelectorAll('[data-grp="uso"]').forEach(b=>{ const on = b.dataset.k===rasc.uso; b.classList.toggle("on",on); b.setAttribute("aria-pressed",on); }); }
        else { const arr = rasc[g], j = arr.indexOf(k); j<0 ? arr.push(k) : arr.splice(j,1); o.classList.toggle("on", j<0); o.setAttribute("aria-pressed", j<0); }
        if(f!=="tudo"){ if(g==="uso") fechaPop(); desenha(); } else conta();
        return;
      }
      if(!a) return;
      const act = a.dataset.a;
      if(act==="aplica"){ [st.min, st.max] = lerPreco(); fechaPop(); desenha(); }
      else if(act==="limpa"){ st.min = 0; st.max = maxP; fechaPop(); desenha(); }
      else if(act==="cancela") fechaPop();
      else if(act==="limpa-tudo"){ rasc.seg = []; rasc.marca = []; rasc.uso = null; pop.querySelectorAll(".of-op").forEach(b=>{ b.classList.remove("on"); b.setAttribute("aria-pressed","false"); }); pop.querySelector('[data-i="min"]').value = 0; pop.querySelector('[data-i="max"]').value = maxP; pop.querySelector('[data-i="min"]').dispatchEvent(new Event("input")); }
      else if(act==="aplica-tudo"){ Object.assign(st, {seg:rasc.seg, marca:rasc.marca, uso:rasc.uso}); [st.min, st.max] = lerPreco(); fechaPop(); desenha(); }
    };
  };
  main.querySelectorAll(".of-bar > .of-fs > .of-fb, .of-bar > .of-fb").forEach(b=>b.addEventListener("click", e=>{ e.stopPropagation(); abrePop(b.dataset.f, b); }));
  pop.addEventListener("click", e=>e.stopPropagation());
  document.addEventListener("click", e=>{ if(!pop.hidden && !pop.contains(e.target)) fechaPop(); });
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !pop.hidden) fechaPop(); });
  main.addEventListener("click", e=>{
    const t = e.target.closest(".of-tag");
    if(t){ const f = t.dataset.f, k = t.dataset.k; if(f==="seg"||f==="marca") st[f] = st[f].filter(x=>x!==k); else if(f==="uso") st.uso = null; else { st.min = 0; st.max = maxP; } desenha(); return; }
    if(e.target.closest(".of-limpa")){ Object.assign(st, {seg:[], marca:[], uso:null, min:0, max:maxP}); desenha(); return; }
    const v = e.target.closest(".of-ver");
    if(v){ const box = v.closest(".of-info").querySelector(".of-lojas"); box.hidden = !box.hidden; v.setAttribute("aria-expanded", !box.hidden); v.textContent = box.hidden ? v.textContent.replace("esconder","ver") : "esconder lojas"; if(box.hidden) v.textContent = `ver ${box.children.length} lojas`; }
  });
  desenha();
}
