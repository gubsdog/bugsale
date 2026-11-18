# Bugsale · site

Reviews, ranking de custo-benefício e comparador de celulares, com o preço justo checado contra o histórico.

O site é **estático**: um script em Python lê os dados em `data/`, junta com os modelos em `src/` e os arquivos em `static/`, e gera tudo pronto em `dist/`. O GitHub Actions faz isso sozinho e publica no GitHub Pages a cada alteração na branch `main`.

## Estrutura

```
data/
  celulares.json     ficha técnica, preços e foto de cada aparelho
  artigos.json       título, resumo, chamada, "para quem vale" e veredito de cada artigo
src/
  page.tpl.html      modelo de todas as páginas (cabeçalho, SEO, scripts)
  comparador.tpl.html
  paginas/           sobre, política de privacidade e 404
static/
  css/site.css       visual da Bugsale (modo escuro e claro)
  js/site.js         cabeçalho, home, artigos, ranking
  img/               fotos dos aparelhos, fotos de uso (img/foto) e recortes (img/cut)
config.json          endereço do site
build.py             gera o site em dist/
.github/workflows/   publicação automática no GitHub Pages
```

## Ver o site no seu computador

Precisa só do Python 3.9 ou mais novo.

```
python3 build.py
python3 -m http.server -d dist 8000
```

Abra http://localhost:8000.

## Publicar um artigo novo

1. Se o aparelho ainda não existe, adicione-o em `data/celulares.json` (copie um parecido e troque os dados) e coloque a foto do produto em `static/img/<img>.webp`.
2. Adicione o artigo em `data/artigos.json`:
   - `celular`: o `id` do aparelho
   - `data`: no formato `AAAA-MM-DD`
   - `categoria`, `titulo`, `resumo`
   - `chamada`, `para_quem`, `veredito`
3. Opcional: uma foto de uso em `static/img/foto/<id>.webp` (1600 px de largura) e `static/img/foto/<id>-sm.webp` (720 px), com o crédito em `foto` no `celulares.json`.
4. Faça o commit na branch `main`. Em cerca de 1 minuto o site está no ar.

O artigo ganha endereço próprio (`/artigos/<id>/`), entra na home, na página da marca e no `sitemap.xml`.

## Endereço e domínio

Em `config.json`:

- **GitHub Pages sem domínio:** `site_url` = `https://SEU-USUARIO.github.io/NOME-DO-REPO/` e `base_path` = `/NOME-DO-REPO/`.
- **Com domínio próprio** (ex.: bugsale.com.br): `site_url` = `https://bugsale.com.br/`, `base_path` = `/` e `custom_domain` = `bugsale.com.br`. Depois aponte o DNS do domínio para o GitHub Pages.

## Primeira publicação

1. Crie o repositório no GitHub e envie estes arquivos.
2. Em **Settings → Pages**, em "Build and deployment", escolha **GitHub Actions**.
3. O workflow "Publicar site" roda sozinho e mostra o link do site no fim.

## Ranking

As notas da crítica (Notebookcheck) e os resultados do Geekbench ficam no começo da seção "ranking" de `static/js/site.js`, nas constantes `CRITICA` e `GEEKBENCH`.

## Campos extras (artigos e preços)

Em `data/artigos.json`:
- `slug` (opcional): endereço do artigo (`artigos/<slug>/`). Sem ele, usa o id do celular. Use quando houver mais de um artigo sobre o mesmo modelo, por exemplo `galaxy-a57-black-friday`.
- `alvo` (opcional): régua "quanto vale pagar". Exemplo: `{"versao": "128 GB", "otimo": 1500, "bom": 1650, "caro": 1800}`.

Em `data/celulares.json`, para cada celular:
- `historico`: pesquisas de preço com data, que viram os pontos do gráfico. Exemplo: `[{"data": "2026-11-23", "preco": 1629}]`. O preço de lançamento entra sozinho como primeiro ponto.
- `ofertas`: as 3 melhores ofertas com link de afiliado. Formato: `{"pesquisa": "2026-11-23", "lista": [{"loja": "Amazon", "preco": 1629, "url": "https://..."}]}`. Só aparece no site quando tem preço e link.
- `galeria` (opcional): imagens extras no meio do artigo. Exemplo: `[{"src": "img/galeria/x.webp", "legenda": "...", "credito": "Foto: divulgação"}]`.

## Pesquisa semanal de preços

Toda segunda uma tarefa agendada pesquisa o menor preço de cada modelo e acrescenta um ponto em `historico`. Ela atualiza `atualN` (preço médio de hoje) e, se for o caso, `minimoN` (menor preço já visto). Tudo vai numa branch `pesquisa-AAAA-MM-DD` com um pull request. Nada entra na `main` sem aprovação.

## Tom dos textos

Misture o técnico com o dia a dia. Todo número da ficha vem acompanhado do que ele significa na vida de quem compra. Exemplos:
- "Para fotografar a família e o pet, a câmera de 50 MP dá conta do recado; para fotos mais profissionais, à noite ou com movimento, não é a melhor escolha."
- "Com IP68, dá para usar na beira da piscina sem medo."
- "Para quem joga jogos pesados, o processador segura os gráficos no máximo."

As seções "O que ele oferece" e "Atualizações" são geradas a partir da ficha, em `textoOferece()` e `textoUpd()` no `static/js/site.js`. As notas de câmera (`CAM`) e de desempenho (`PERF`) de cada modelo ficam no mesmo arquivo. Ao cadastrar um celular novo, inclua ele nas duas tabelas.

## Regras de publicação

- **O artigo do dia vira o destaque.** O destaque da tela inicial é sempre o artigo publicado mais recente: quando um artigo agendado chega na data e hora de `publicar`, ele assume o destaque sozinho e o anterior desce para a lateral ou para "Mais recentes".
- **Cards de chamada (`teaser: true`) são só do lançamento do site.** Com `"pronto": false`, o artigo ainda não tem texto: aparece só o card "Será lançado em dd/mm" (ou "em breve", se a data passar) e **nunca é publicado sozinho**. Quando o texto estiver escrito e aprovado, troque para `"pronto": true` (ou apague o campo).
- O site é gerado de novo às 7h02 e 12h02 (Brasília) pelo GitHub Actions, para liberar os agendados.
