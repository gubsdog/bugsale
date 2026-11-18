#!/usr/bin/env python3
"""Gera o site estático da Bugsale em dist/.

Uso:  python3 build.py            (gera dist/)
      python3 -m http.server -d dist 8000   (para ver em http://localhost:8000)

Só usa a biblioteca padrão do Python 3.9+.
"""
import json, os, re, shutil, datetime, sys
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
    phones[c['id']] = q
for a in artigos: a.setdefault('slug', a['celular'])
slugs = [a['slug'] for a in artigos]
assert len(slugs) == len(set(slugs)), 'dois artigos com o mesmo slug'

# ---------- agendamento ----------
# "publicar": "AAAA-MM-DDTHH:MM" no horário de Brasília. O robô diário do GitHub refaz o site às 7h e às 12h,
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
    if locked: d['locked'] = True
    if a.get('teaser'): d['teaser'] = True
    if not pronto(a): d['chamada'] = True   # card de chamada: ainda sem texto
    return d
arts = [art_json(a) for a in publicados] + [art_json(a, True) for a in bloqueados]
arts += [art_json(a, True) | {'previewOnly': True} for a in agendados_preview if a not in bloqueados]
bodies = {a['slug']: dict(abertura=a.get('chamada', ''), para_quem=a.get('para_quem', ''), veredito=a.get('veredito', ''), secoes=a.get('secoes'))
          for a in paginas}
w('js/data.js', 'window.MQ_DATA = ' + json.dumps(dict(phones=phones, articles=arts, bodies=bodies, geradoEm=AGORA, preview=PREVIEW), ensure_ascii=False) + ';\n')

# ---------- páginas ----------
TPL = open(os.path.join(ROOT, 'src/page.tpl.html'), encoding='utf-8').read()
TAGLINE = 'Reviews, ranking de custo-benefício e o preço justo de celulares no Brasil, checado com histórico de preço.'
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

page('index.html', 'Bugsale · Reviews, ranking e preço justo de celulares', TAGLINE, 'home', 'MQ.renderArticles(null);')
page('ranking.html', 'Ranking de custo-benefício de celulares · Bugsale',
     'Os 10 celulares com melhor custo-benefício: nota da crítica especializada, testes de laboratório e preço médio de hoje.',
     'ranking', 'MQ.renderRanking();')
for f, nome, marca in [('samsung.html', 'Samsung', 'Samsung'), ('iphone.html', 'iPhone', 'Apple'), ('motorola.html', 'Motorola', 'Motorola')]:
    page(f, f'Celulares {nome}: reviews e preços · Bugsale', f'Reviews, preço médio atual e quanto caiu desde o lançamento de cada celular {nome}.',
         marca, f'MQ.renderArticles("{marca}");')

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
    img = SITE + (p['foto']['src'] if 'foto' in p else p['img'])
    path = f"artigos/{a['slug']}/index.html"
    ld = {"@context": "https://schema.org", "@type": "Article", "headline": a['titulo'], "description": a['resumo'],
          "image": [img], "datePublished": a['publicar'] + ":00-03:00", "dateModified": a['publicar'] + ":00-03:00", "inLanguage": "pt-BR",
          "author": {"@type": "Organization", "name": "Equipe Bugsale"},
          "publisher": {"@type": "Organization", "name": "Bugsale", "logo": {"@type": "ImageObject", "url": SITE + "img/favicon.svg"}},
          "mainEntityOfPage": SITE + f"artigos/{a['slug']}/"}
    page(path, f"{a['titulo']} · Bugsale", a['resumo'], 'artigo', 'MQ.renderArticle();', root='../../',
         article=json.dumps(a['slug']), ogimg=img, ogtype='article', pagetype='article',
         jsonld='<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>',
         index=(a in publicados))

# ---------- comparador (página própria, integrada ao cabeçalho do site) ----------
t = open(os.path.join(ROOT, 'src/comparador.tpl.html'), encoding='utf-8').read()
a0 = t.index('<div class="topbar">'); b0 = t.index('</div></div>', a0) + len('</div></div>')
t = t[:a0] + '<header id="site-header"></header>' + t[b0:]
head_extra = ('<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Silkscreen&display=swap" rel="stylesheet">\n'
              '<link rel="icon" href="img/favicon.svg" type="image/svg+xml">\n<link rel="stylesheet" href="css/site.css">\n'
              f'<link rel="canonical" href="{SITE}comparador.html">\n'
              '<meta name="description" content="Compare até 3 celulares lado a lado: ficha técnica, preço de lançamento, preço médio de hoje e promessa de atualizações.">\n'
              '<script>document.documentElement.dataset.mode="dark";try{localStorage.removeItem("bs-mode")}catch(e){}</script>')
t = re.sub(r'<link href="https://fonts.googleapis.com/css2\?[^"]*" rel="stylesheet">', lambda m: head_extra, t, count=1)
t = t.replace('  bar.classList.toggle("show", show);',
              '  bar.classList.toggle("show", show);\n  const sh = document.getElementById("site-header"); if(sh) sh.classList.toggle("hide", show);')
t = re.sub(r'<title>.*?</title>', '<title>Comparador de celulares · Bugsale</title>', t, count=1)
t = t.replace('<meta name="viewport" content="width=device-width, initial-scale=1">',
              '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#0B0B0D">')
t = t.replace('</body>', '<script>window.MQ_ROOT = "";</script>\n<script src="js/site.js"></script>\n<script>MQ.header("comparador");</script>\n</body>')
t = (t.replace('.hero{', '.cmp-hero{').replace('.hero-in{', '.cmp-hero-in{').replace('.hero h1', '.cmp-hero h1').replace('.hero p', '.cmp-hero p')
      .replace('<section class="hero"><div class="hero-in">', '<section class="cmp-hero"><div class="cmp-hero-in">'))
data = [dict(c, img=f"img/{c['img']}.webp") for c in celulares]
for d in data: d.pop('foto', None)
t = t.replace('__PHONES__', json.dumps(data, ensure_ascii=False))
w('comparador.html', t)
sitemap.append(SITE + 'comparador.html')

# ---------- sitemap e robots ----------
w('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ''.join(f'  <url><loc>{u}</loc><lastmod>{hoje.isoformat()}</lastmod></url>\n' for u in sitemap) + '</urlset>\n')
w('robots.txt', f'User-agent: *\nAllow: /\n\nSitemap: {SITE}sitemap.xml\n')

print(f'ok: {len(artigos)} artigos, {len(sitemap)} páginas no sitemap -> {DIST}')
