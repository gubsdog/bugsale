#!/usr/bin/env python3
"""Gera o site estático da Bugsale em dist/.

Uso:  python3 build.py            (gera dist/)
      python3 -m http.server -d dist 8000   (para ver em http://localhost:8000)

Só usa a biblioteca padrão do Python 3.9+.
"""
import os, json, re, shutil, datetime, sys
from html import escape

ROOT = os.path.dirname(os.path.abspath(__file__))
# --preview: gera dist-preview/ para a pré-visualização no Claude (links de pasta apontam para index.html)
PREVIEW = '--preview' in sys.argv
DIST = os.path.join(ROOT, 'dist-preview' if PREVIEW else 'dist')
cfg = json.load(open(os.path.join(ROOT, 'config.json'), encoding='utf-8'))
SITE = cfg['site_url'].rstrip('/') + '/'
BASE = cfg.get('base_path', '/')
if not BASE.endswith('/'): BASE += '/'

celulares = json.load(open(os.path.join(ROOT, 'data/celulares.json'), encoding='utf-8'))
artigos = json.load(open(os.path.join(ROOT, 'data/artigos.json'), encoding='utf-8'))
ids = {c['id'] for c in celulares}
for a in artigos:
    assert a['celular'] in ids, f"artigo aponta para celular inexistente: {a['celular']}"

# ---------- limpa e copia os arquivos estáticos ----------
if os.path.exists(DIST): shutil.rmtree(DIST)
shutil.copytree(os.path.join(ROOT, 'static'), DIST)
open(os.path.join(DIST, '.nojekyll'), 'w').close()
if cfg.get('custom_domain'):
    open(os.path.join(DIST, 'CNAME'), 'w').write(cfg['custom_domain'].strip() + '\n')

def w(path, text):
    full = os.path.join(DIST, path)
    os.makedirs(os.path.dirname(full) or DIST, exist_ok=True)
    open(full, 'w', encoding='utf-8').write(text)


# ---------- catálogo (modelos: ranking e comparador) ----------
CAT = json.load(open(os.path.join(ROOT, 'data/catalogo.json'), encoding='utf-8'))
ANTIGO = {"samsung-galaxy-a07-4g":"galaxy-a07","samsung-galaxy-a17-5g":"galaxy-a17-5g","samsung-galaxy-a57-5g":"galaxy-a57",
  "samsung-galaxy-s26":"galaxy-s26","samsung-galaxy-s26-ultra":"galaxy-s26-ultra","apple-iphone-15":"iphone-15","apple-iphone-16":"iphone-16",
  "apple-iphone-17":"iphone-17","motorola-moto-g86":"moto-g86","motorola-edge-70":"edge-70","motorola-edge-70-pro":"edge-70-pro",
  "motorola-razr-70-ultra":"razr-70-ultra","xiaomi-poco-x8-pro":"poco-x8-pro","xiaomi-poco-x8-pro-max":"poco-x8-pro-max","xiaomi-redmi-note-17-pro-5g":"redmi-note-17-pro"}
SEG = {"entrada":"entrada","intermediario_entrada":"intermediario","intermediario":"intermediario","intermediario_premium":"intermediario","topo_de_linha":"topo"}
cat = []
for m in CAT['modelos']:
    e = m['especificacoes']; t = e.get('tela') or {}; cams = e.get('cameras') or {}
    vs = m.get('variantes_por_capacidade') or []
    regs = {r for v in vs for r in ((v.get('regioes') or []) + [v.get('regiao')]) if r} | {x.get('regiao') for x in (m.get('configuracoes_memoria') or []) if x.get('regiao')}
    br = not ('global' in regs and 'BR' not in regs)   # aviso só quando a ficha é global sem versão BR confirmada
    ce = m.get('critica_especializada') or {}
    crit = dict(nota=ce.get('nota_media_0_10'), n=ce.get('quantidade_veiculos_com_nota') or 0, sintese=ce.get('sintese'),
                fontes=[dict(v=f.get('veiculo'), u=f.get('url'), n=f.get('nota_em_10')) for f in (ce.get('fontes') or []) if f.get('nota_em_10') is not None]) if ce.get('nota_media_0_10') is not None else None
    dem = [d['posicao'] for d in (m.get('sinais_demanda') or []) if d.get('posicao')]
    cat.append(dict(id=m['id'], nome=m['modelo'], marca=m['marca'], fab=m['fabricante'], seg=SEG.get(m['segmento'],'intermediario'),
        segOrig=m['segmento'], formato=m['formato'], br=br, sistema=e.get('sistema'), upd=e.get('atualizacoes_informadas'),
        chip=e.get('processador'), tela=dict(tec=t.get('tecnologia'), pol=t.get('diagonal_pol'), hz=t.get('frequencia_hz'), res=t.get('resolucao_px'), det=t.get('detalhes')),
        cams=cams.get('traseiras') or [], frontal=cams.get('frontal'), video=cams.get('video_traseiro'),
        bat=e.get('bateria_mah'), carga=e.get('recarga_com_fio_w'), semfio=e.get('recarga_sem_fio'), peso=e.get('peso_g'),
        dim=e.get('dimensoes'), prot=e.get('protecao'), g5=e.get('rede_5g'), nfc=e.get('nfc'),
        ram=m.get('ram_gb_opcoes') or [], armaz=m.get('armazenamento_gb_opcoes') or sorted({v['armazenamento_gb'] for v in vs}), critica=crit,
        regFicha=m.get('regiao_ficha'), lanc=m.get('lancamento'), revisao=(m.get('revisao_tecnica') or {}).get('fonte_principal'),
        fonte=(m.get('fontes') or {}).get('ficha_tecnica'), demanda=min(dem) if dem else None, antigo=ANTIGO.get(m['id']),
        preco=m.get('preco_medio_brl'), img=(f"img/cat/{m['id']}.webp" if os.path.exists(os.path.join(ROOT,'static/img/cat',m['id']+'.webp')) else None),
        precoInfo=(lambda p: p and dict(data=p.get('data_consulta'), canais=p.get('quantidade_canais'), min=p.get('menor_brl'), max=p.get('maior_brl'), gb=p.get('armazenamento_referencia_gb')))(m.get('pesquisa_preco'))))

# ---------- js/data.js (usado pelas páginas) ----------
phones = {}
for c in celulares:
    s = c['specs']
    q = dict(id=c['id'], nome=c['nome'], marca=c['marca'], marcaMenu=('iPhone' if c['marca'] == 'Apple' else c['marca']),
             full=(c['nome'] if c['marca'] == 'Apple' else f"{c['marca']} {c['nome']}"),
             img=f"img/{c['img']}.webp", atualN=s['atualN'], precoN=s['precoN'], specs=s)
    if c.get('foto'):
        q['foto'] = dict(src=f"img/foto/{c['id']}.webp", sm=f"img/foto/{c['id']}-sm.webp",
                         pos=c['foto'].get('posicao', '50% 50%'), credito=c['foto']['credito'])
    cut = f"img/cut/{c['img']}.webp"
    q['cut'] = cut if os.path.exists(os.path.join(DIST, cut)) else q['img']
    o = c.get('ofertas') or {}
    lista = [x for x in o.get('lista', []) if x.get('preco') and x.get('url')][:3]
    if lista:
        q['ofertas'] = dict(pesquisa=o.get('pesquisa',''), lista=sorted(lista, key=lambda x: x['preco']))
    if c.get('historico'): q['historico'] = c['historico']   # [{"mes": "2026-03", "preco": 3299}, ...]
    if c.get('historicoFonte'): q['historicoFonte'] = c['historicoFonte']
    if c.get('galeria'): q['galeria'] = c['galeria']         # [{"src": "img/galeria/x.webp", "legenda": "...", "credito": "..."}]
    rev = {v: k for k, v in ANTIGO.items()}.get(c['id'])
    if rev and os.path.exists(os.path.join(ROOT, 'static/img/cat', rev + '.webp')): q['catImg'] = f"img/cat/{rev}.webp"
    elif os.path.exists(os.path.join(ROOT, 'static/img/cat', c['id'] + '.webp')): q['catImg'] = f"img/cat/{c['id']}.webp"
    phones[c['id']] = q
for a in artigos: a.setdefault('slug', a['celular'])
slugs = [a['slug'] for a in artigos]
assert len(slugs) == len(set(slugs)), 'dois artigos com o mesmo slug'

# ---------- agendamento ----------
# "publicar": "AAAA-MM-DDTHH:MM" no horário de Brasília. O robô diário do GitHub refaz o site às 7h, 12h e 19h,
# e só publica o que já chegou na hora. "status": "rascunho" nunca vai ao ar.
# "teaser": true mostra o card bloqueado ("Será lançado em...") antes da data (usado só no lançamento).
BRT = datetime.timezone(datetime.timedelta(hours=-3))
AGORA = datetime.datetime.now(BRT).strftime('%Y-%m-%dT%H:%M')
for a in artigos:
    a.setdefault('publicar', a['data'] + 'T07:00')
    a['data'] = a['publicar'][:10]
pronto = lambda a: a.get('pronto', True)   # "pronto": false = só o card de chamada; nunca publica sozinho
publicados = [a for a in artigos if a.get('status') != 'rascunho' and a['publicar'] <= AGORA and pronto(a)]
bloqueados = [a for a in artigos if a.get('status') != 'rascunho' and (a['publicar'] > AGORA or not pronto(a)) and a.get('teaser')]
# na pré-visualização do Claude, os agendados aparecem bloqueados mas com a página pronta para revisão
agendados_preview = [a for a in artigos if a.get('status') != 'rascunho' and a['publicar'] > AGORA and pronto(a)] if PREVIEW else []
paginas = publicados + agendados_preview

def art_json(a, locked=False):
    d = dict(id=a['slug'], phone=a['celular'], data=a['data'], pub=a['publicar'], cat=a['categoria'], tipo=a.get('tipo', 'review'),
             titulo=a['titulo'], dek=a['resumo'])
    for k in ('alvo', 'alvoVs', 'vs', 'indicado'):
        if a.get(k): d[k] = a[k]
    if a.get('capa'):   # capa própria do artigo (ex.: montagem de comparativo) em img/capa/<slug>.webp
        d['capa'] = dict(src=f"img/capa/{a['slug']}.webp", sm=f"img/capa/{a['slug']}-sm.webp",
                         pos=a['capa'].get('posicao', '50% 50%'), credito=a['capa']['credito'])
        if os.path.exists(f"static/img/capa/{a['slug']}-card.webp"):   # versão sem texto para os cards da home
            d['capa'] |= dict(card=f"img/capa/{a['slug']}-card.webp", cardSm=f"img/capa/{a['slug']}-card-sm.webp")
    if locked: d['locked'] = True
    if a.get('teaser'): d['teaser'] = True
    if not pronto(a): d['chamada'] = True   # card de chamada: ainda sem texto
    return d
arts = [art_json(a) for a in publicados] + [art_json(a, True) for a in bloqueados]
arts += [art_json(a, True) | {'previewOnly': True} for a in agendados_preview if a not in bloqueados]
bodies = {a['slug']: dict(abertura=a.get('chamada', ''), para_quem=a.get('para_quem', ''), veredito=a.get('veredito', ''), secoes=a.get('secoes'))
          for a in paginas}
w('js/data.js', 'window.MQ_DATA = ' + json.dumps(dict(phones=phones, articles=arts, bodies=bodies, cat=cat, geradoEm=AGORA, preview=PREVIEW), ensure_ascii=False) + ';\n')

# ---------- páginas ----------
TPL = open(os.path.join(ROOT, 'src/page.tpl.html'), encoding='utf-8').read()
TAGLINE = 'Reviews, ranking de custo-benefício e o preço justo de celulares no Brasil, checado com histórico de preço.'

# ---------- texto no HTML (para o Google): versão simples do artigo que o JavaScript troca pela página completa ----------
E = lambda t: escape(str(t), quote=True)
def _paras(v):
    if isinstance(v, str): return f'<p>{E(v.replace("**", ""))}</p>' if v.strip() else ''
    if isinstance(v, list): return ''.join(_paras(x) if not isinstance(x, list) else '' for x in v)
    return ''
def ssr_artigo(a):
    S = a.get('secoes') or {}
    cmp_ = a.get('tipo') == 'comparativo'
    H = dict(oferece='O que cada um oferece' if cmp_ else 'O que ele oferece', preco='Quanto custa hoje', atualizacoes='Atualizações',
             para_quem='Para quem vale' if cmp_ else 'Para quem ele faz sentido', veredito='Qual comprar' if cmp_ else 'Vale a pena?',
             status='O que já se sabe', concorrentes='Contra quem ele briga')
    h = [f'<article class="ssr"><p class="ssr-k">{E(a.get("categoria",""))}</p><h1>{E(a["titulo"])}</h1><p class="ssr-dek">{E(a["resumo"])}</p>',
         f'<p class="ssr-by">Por Equipe Bugsale · {E(a["publicar"][8:10])}/{E(a["publicar"][5:7])}/{E(a["publicar"][:4])}</p>']
    if S.get('abertura'): h.append(_paras(S['abertura']))
    elif S.get('status'): h.append(f'<h2>{H["status"]}</h2>' + _paras(S['status']))
    if S.get('resumoTopo'): h.append('<dl>' + ''.join(f'<dt>{E(k)}</dt><dd>{E(v)}</dd>' for k, v in S['resumoTopo']) + '</dl>')
    for k in ['oferece', 'preco', 'concorrentes', 'atualizacoes', 'para_quem', 'veredito']:
        if S.get(k): h.append(f'<h2>{H[k]}</h2>' + _paras(S[k]))
        if k == 'oferece' and isinstance(S.get('tabela'), dict):
            T = S['tabela']
            h.append(f'<h2>{E(T.get("titulo","Ficha"))}</h2><table><thead><tr><th></th>' + ''.join(f'<th>{E(c)}</th>' for c in T.get('cols', [])) + '</tr></thead><tbody>'
                     + ''.join('<tr>' + ''.join(f'<{"th" if i == 0 else "td"}>{E(x)}</{"th" if i == 0 else "td"}>' for i, x in enumerate(r)) + '</tr>' for r in T.get('linhas', [])) + '</tbody></table>')
    for k, tit in [('para_quem', H['para_quem']), ('veredito', H['veredito'])]:
        if not S.get(k) and a.get(k): h.append(f'<h2>{tit}</h2>' + _paras(a[k]))
    ids = [a['celular']] + ([a['vs']] if a.get('vs') else [])
    ofs = [(phones[i], o) for i in ids if i in phones for o in sorted((phones[i].get('ofertas') or {}).get('lista', []), key=lambda o: o['preco'])]
    if ofs:
        h.append('<h2>Onde comprar</h2><ul>' + ''.join(f'<li><a href="{E(o["url"])}" rel="sponsored nofollow noopener">{E(p["full"])} {"no" if o["loja"] == "Mercado Livre" else "na"} {E(o["loja"])}: R$ {o["preco"]:,.0f}</a></li>'.replace(',', '.') for p, o in ofs) + '</ul>')
    for k in S.get('blocos') or []:   # matérias livres (guias e notícias)
        if k.get('h'): h.append(f'<h2>{E(k["h"])}</h2>')
        elif k.get('p'): h.append(_paras(k['p']))
        elif k.get('lista'): h.append('<ul>' + ''.join(f'<li>{E(t)}</li>' for t in k['lista']) + '</ul>')
        elif k.get('destaque'): h.append(f'<p><b>{E(k["destaque"][0])}:</b> {E(k["destaque"][1])}</p>')
        elif k.get('item'):
            it = k['item']; q = phones.get(it['id'], {})
            h.append(f'<h3>{E(it.get("faixa",""))} {E(it.get("titulo") or q.get("full",""))}</h3>' + _paras(it.get('texto', '')))
        elif k.get('tabela'):
            T = k['tabela']
            h.append('<table><thead><tr>' + ''.join(f'<th>{E(c)}</th>' for c in T['cols']) + '</tr></thead><tbody>' + ''.join('<tr>' + ''.join(f'<td>{E(x)}</td>' for x in r) + '</tr>' for r in T['linhas']) + '</tbody></table>')
    if S.get('fontes'): h.append('<h2>Fontes</h2><ul>' + ''.join(f'<li><a href="{E(u)}" rel="noopener">{E(n)}</a></li>' for n, u in S['fontes']) + '</ul>')
    h.append('</article>')
    return ''.join(h)
def ssr_lista(titulo, intro, arts, root):
    li = ''.join(f'<li><a href="{root}artigos/{E(a["slug"])}/">{E(a["titulo"])}</a> <span>{E(a["resumo"])}</span></li>' for a in arts)
    return f'<section class="ssr"><h1>{E(titulo)}</h1><p class="ssr-dek">{E(intro)}</p>{"<h2>Artigos</h2><ul>" + li + "</ul>" if li else ""}</section>'
_vistos = sorted([a for a in publicados if not a.get('teaser') or pronto(a)], key=lambda a: a['publicar'], reverse=True)

OG_DEFAULT = SITE + 'img/foto/razr-70-ultra.webp'
sitemap = []

def page(path, title, desc, key, render='', content='', root='', article='null', ogimg=OG_DEFAULT, ogtype='website', jsonld='', pagetype='list', index=True):
    url = SITE + path.replace('index.html', '')
    html = (TPL.replace('__TITLE__', escape(title)).replace('__DESC__', escape(desc))
               .replace('__CANON__', url).replace('__OGIMG__', ogimg).replace('__OGTYPE__', ogtype)
               .replace('__JSONLD__', jsonld).replace('__PAGE__', pagetype).replace('__KEY__', key)
               .replace('__RENDER__', render).replace('__ARTICLE__', article)
               .replace('__CONTENT__', content).replace('__ROOT__', root))
    if PREVIEW: html = html.replace('<script>window.MQ_ROOT', '<script>window.MQ_DIRINDEX = "index.html"; window.MQ_ROOT', 1)
    w(path, html)
    if index: sitemap.append(url)

page('index.html', 'Bugsale · Reviews, ranking e preço justo de celulares', TAGLINE, 'home', 'MQ.renderArticles(null);',
     content=ssr_lista('Bugsale: reviews, comparativos e o preço justo de celulares', TAGLINE, _vistos, ''))
page('ranking.html', 'Ranking de custo-benefício de celulares · Bugsale',
     'Os 10 celulares com melhor custo-benefício: nota da crítica especializada, testes de laboratório e preço médio de hoje.',
     'ranking', 'MQ.renderRanking();',
     content=ssr_lista('Ranking de celulares', 'Os celulares com melhor custo-benefício, melhor câmera, melhor tela, melhores para jogos e com mais bateria, com nota da crítica especializada, testes de laboratório e preço médio de hoje.', [], ''))
for f, nome, marca in [('samsung.html', 'Samsung', 'Samsung'), ('iphone.html', 'iPhone', 'Apple'), ('motorola.html', 'Motorola', 'Motorola')]:
    page(f, f'Celulares {nome}: reviews e preços · Bugsale', f'Reviews, preço médio atual e quanto caiu desde o lançamento de cada celular {nome}.',
         marca, f'MQ.renderArticles("{marca}");',
         content=ssr_lista(f'Celulares {nome}: reviews e preços', f'Reviews, comparativos e preço médio atual dos celulares {nome}.', [a for a in _vistos if any(c['id'] == a['celular'] and c.get('marca') == marca for c in celulares) or (marca == 'Apple' and a['celular'].startswith('iphone'))], ''))

hoje = datetime.date.today()
MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
def frag(nome, root):
    t = open(os.path.join(ROOT, 'src/paginas', nome), encoding='utf-8').read()
    return t.replace('__ROOT__', root).replace('__HOJE__', f'{hoje.day} de {MESES[hoje.month-1]} de {hoje.year}')
page('sobre.html', 'Sobre a Bugsale e como avaliamos', 'Como a Bugsale avalia celulares, de onde vêm os preços e como funcionam os links de afiliado.',
     'sobre', content=frag('sobre.html', ''), pagetype='doc')
page('privacidade.html', 'Política de privacidade · Bugsale', 'Quais dados a Bugsale coleta e como são tratados, de acordo com a LGPD.',
     'privacidade', content=frag('privacidade.html', ''), pagetype='doc')
page('404.html', 'Página não encontrada · Bugsale', 'Essa página não existe.', '404', content=frag('404.html', BASE),
     root=BASE, pagetype='doc', index=False)

for a in paginas:
    c = next(x for x in celulares if x['id'] == a['celular'])
    p = phones[c['id']]
    img = SITE + (f"img/capa/{a['slug']}.webp" if a.get('capa') else p['foto']['src'] if 'foto' in p else p['img'])
    path = f"artigos/{a['slug']}/index.html"
    ld = {"@context": "https://schema.org", "@type": "Article", "headline": a['titulo'], "description": a['resumo'],
          "image": [img], "datePublished": a['publicar'] + ":00-03:00", "dateModified": a['publicar'] + ":00-03:00", "inLanguage": "pt-BR",
          "author": {"@type": "Organization", "name": "Equipe Bugsale"},
          "publisher": {"@type": "Organization", "name": "Bugsale", "logo": {"@type": "ImageObject", "url": SITE + "img/favicon.svg"}},
          "mainEntityOfPage": SITE + f"artigos/{a['slug']}/"}
    page(path, f"{a['titulo']} · Bugsale", a['resumo'], 'artigo', 'MQ.renderArticle();', root='../../',
         article=json.dumps(a['slug']), ogimg=img, ogtype='article', pagetype='article',
         content=ssr_artigo(a) if a in publicados else '',
         jsonld='<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>',
         index=(a in publicados))

# ---------- comparador (visual novo, até 3 aparelhos do catálogo) ----------
page('comparador.html', 'Comparador de celulares · Bugsale', 'Compare até 3 celulares lado a lado: ficha técnica, preço de lançamento, preço de hoje e promessa de atualizações.', 'comparador', 'MQ.renderComparador();',
     content=ssr_lista('Comparador de celulares', 'Compare até 3 celulares lado a lado: ficha técnica, preço de lançamento, preço de hoje e promessa de atualizações. São ' + str(len(cat)) + ' modelos de Samsung, Apple, Motorola, Xiaomi e Huawei.', [], ''))

if PREVIEW:   # só na prévia do artifact: lista dos agendados (nunca gerada no build oficial)
    page('agendados.html', 'Artigos agendados (prévia) · Bugsale', 'Prévia dos artigos agendados.', 'agendados', 'MQ.renderAgendados();', index=False)

# ---------- sitemap e robots ----------
w('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ''.join(f'  <url><loc>{u}</loc><lastmod>{hoje.isoformat()}</lastmod></url>\n' for u in sitemap) + '</urlset>\n')
w('robots.txt', f'User-agent: *\nAllow: /\n\nSitemap: {SITE}sitemap.xml\n')

print(f'ok: {len(artigos)} artigos, {len(sitemap)} páginas no sitemap -> {DIST}')
