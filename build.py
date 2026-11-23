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


# ---------- catálogo (modelos: ranking e comparador) ----------
CAT = json.load(open(os.path.join(ROOT, 'data/catalogo.json'), encoding='utf-8'))
ANTIGO = {"samsung-galaxy-a07-4g":"galaxy-a07","samsung-galaxy-a17-5g":"galaxy-a17-5g","samsung-galaxy-a57-5g":"galaxy-a57",
  "samsung-galaxy-s26":"galaxy-s26","samsung-galaxy-s26-ultra":"galaxy-s26-ultra","apple-iphone-15":"iphone-15","apple-iphone-16":"iphone-16",
  "apple-iphone-17":"iphone-17","motorola-moto-g86":"moto-g86","motorola-edge-70":"edge-70","motorola-edge-70-pro":"edge-70-pro",
  "motorola-razr-70-ultra":"razr-70-ultra","xiaomi-poco-x8-pro":"poco-x8-pro","xiaomi-poco-x8-pro-max":"poco-x8-pro-max"}
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

# ---------- comparador (visual novo, até 3 aparelhos do catálogo) ----------
page('comparador.html', 'Comparador de celulares · Bugsale', 'Compare até 3 celulares lado a lado: ficha técnica, preço de lançamento, preço de hoje e promessa de atualizações.', 'comparador', 'MQ.renderComparador();')

# ---------- sitemap e robots ----------
w('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ''.join(f'  <url><loc>{u}</loc><lastmod>{hoje.isoformat()}</lastmod></url>\n' for u in sitemap) + '</urlset>\n')
w('robots.txt', f'User-agent: *\nAllow: /\n\nSitemap: {SITE}sitemap.xml\n')

print(f'ok: {len(artigos)} artigos, {len(sitemap)} páginas no sitemap -> {DIST}')
