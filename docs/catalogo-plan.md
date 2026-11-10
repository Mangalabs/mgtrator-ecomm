# Plano — redesign do site e catálogo (linha amarela + MG Agro)

Branch: `chore/agent-rules` (regras) → cortes seguintes em branches próprias
ou na mesma, conforme combinado com o usuário.

## Objetivo

Substituir o modelo e-commerce (dependente da API GestãoClick, sem acesso
desde 2026-10) por um site institucional com catálogo próprio, mesclando as
identidades MG Tratorpeças (linha amarela) e MG Agro (linha verde).

## Decisões tomadas (2026-10-28)

- Marca principal MG Tratorpeças; MG Agro é a linha verde dentro do site.
- Catálogo sem preço; cada item tem "Consultar no WhatsApp". Carrinho e
  checkout saem.
- Nomes das peças da linha verde: sugeridos a partir das fotos, corrigidos
  depois pela loja.
- Botão "Baixar catálogo" para os PDFs.
- Eusébio fica fora do site por enquanto.
- WhatsApp geral do site abre escolha de unidade antes de ir ao WhatsApp.
- Contatos (formato com 9 dígitos confirmado pelo usuário):
  - São Luís (matriz): (98) 99162-0972
  - Araguaína: (63) 99982-8455
  - MG Agro: (63) 99101-2458
  - E-mail: comercial@mgtratorpecas.com.br

## Pendências do usuário

- CNPJ real e certificações (ISO 9001 aparece no rodapé; "Distribuidor
  Autorizado Caterpillar" em `company.ts`).
- Endereço, foto e mapa da unidade/filial MG Agro, se houver unidade física.
- Fotos novas (lojas, equipe, máquinas, peças). Fotos dos PDFs são
  provisórias: parecem de internet e mostram marcas de terceiros.
- Fachada e coordenadas da unidade Araguaína.

## Estrutura alvo

| Rota | Conteúdo |
| --- | --- |
| `/` | Home com as duas linhas, serviços, unidades e contato |
| `/catalogo/linha-amarela` | Peças linha amarela por categoria |
| `/catalogo/linha-verde` | MG Agro: plantadeira, pulverizador, colheitadeira |
| `/servicos` | Manutenção comum e preventiva (linha amarela e caminhões) |
| `/lojas`, `/contato` | Mantidas, com dados corrigidos |
| `/politicas` | Revisada: privacidade e garantia, sem regras de pedido online |

Saem com redirect permanente: `/produtos`, `/produtos/[slug]`,
`/categoria/[slug]`, `/busca`, `/carrinho`, `/checkout`, `/como-comprar`,
`/marcas` (destinos definidos na etapa 6).

## Etapas

1. **Dados e contatos** — fonte única de contatos/unidades; números e e-mail
   corrigidos; remover números fixos em componentes que permanecem.
2. **Base visual** — tokens das duas linhas (paleta, tipografia, logos),
   aprovados pelo usuário antes de espalhar.
3. **Dados do catálogo** — `src/data/catalog.ts` + imagens provisórias
   extraídas dos PDFs em WebP; PDFs renomeados para download.
4. **Páginas do catálogo** — `/catalogo/*` com consulta por WhatsApp.
5. **Home, header, footer, seletor de WhatsApp e `/servicos`.**
6. **Remoção do e-commerce** — páginas, `CartContext`, GestãoClick, route
   handlers, env vars, domínios de imagem, redirects, `sitemap.ts`.
7. **Revisão final** — build, verificação visual 375/768/1280, diff completo.

## Estado

- completed: regras de agentes; análise dos PDFs; decisões acima; etapa 1
  (contatos em `site.ts`/`stores.ts`, `CONTACTS` derivado de `siteConfig`,
  unidade Araguaína, links `wa.me` com código do país); PDFs renomeados para
  `public/catalogos/catalogo-linha-amarela.pdf` e `catalogo-mg-agro.pdf`.
- verified (etapa 1): `type-check` ok; `eslint` 0 erros (49 warnings
  preexistentes); `build` ok; `/lojas` e `/contato` renderizam as duas
  unidades e links `wa.me/55…`.
- pending cleanup: `public/logo-mg-agro.jpeg` (duplicado, remoção pelo
  usuário); `/politicas`, `/como-comprar`, `/marcas` ainda têm números fixos
  e e-mails com erro — tratados na etapa 6.
- completed (etapa 2): tokens em `global.css` (`:root` + `@theme inline`),
  âmbar unificado `#F4A30A`, paleta MG Agro, Barlow Condensed nos títulos
  (variável no `<html>`), cores fixas da marca trocadas por tokens nas
  páginas que permanecem.
- verified (etapa 2): `type-check`, `eslint` (0 erros), `build`; capturas
  headless de `/`, `/lojas` (1280) e `/contato` (375); contraste AA dos pares
  âmbar/azul/verde/lima calculado.
- completed (etapas 3 e 4): `src/data/catalog.ts` (tipos em `types.ts`),
  27 fotos extraídas dos PDFs em `public/catalogo/<linha>/*.webp`; rotas
  `/catalogo`, `/catalogo/linha-amarela`, `/catalogo/linha-verde` (estáticas,
  sem preço, consulta por WhatsApp, botão de download do PDF); menu
  "Produtos" → "Catálogo"; `getWhatsAppUrl` aceita número por linha.
- verified (etapas 3 e 4): `type-check`; `eslint` (0 erros, 49 warnings
  preexistentes); `build`; capturas headless 1280 e 375 das três rotas.
- decisões a confirmar: consulta por item da linha amarela vai para São Luís
  (o hero mostra São Luís e Araguaína); nomes das peças sugeridos;
  PDF MG Agro tem 13 MB (versão comprimida com `gs /ebook` fica ~2,7 MB).
- fotos a substituir: polia (fundo xadrez falso); todas as fotos dos PDFs
  são provisórias.
- completed (etapa 5, parcial): home mantida (`HomePageClient`) com ajustes,
  a pedido do usuário (não deve copiar o catálogo): slide 1 leva a
  `/catalogo/linha-amarela`, novo slide MG Agro, slide de lojas no plural,
  "Produtos em Destaque" (API) trocado por `LinesSection` (duas linhas);
  `page.tsx` sem chamadas à API. Header sem busca de produtos/carrinho e com
  item "MG Agro"; rodapé e 404 apontam para o catálogo. JSON-LD da home usa
  o endereço de `stores.ts` (402).
- verified (etapa 5, parcial): `type-check`; `eslint` (0 erros, warnings
  preexistentes); `build`; capturas da home (slides e "Nossas linhas") em
  1280 e 375.
- pendente na etapa 5: seletor de unidade no WhatsApp flutuante, `/servicos`,
  revisão do rodapé (selos "100% Certificadas", "ISO 9001:2015" aguardam
  confirmação). Componentes antigos sem uso em `components/home/`
  (HeroSection, FeaturedProducts etc.) saem na etapa 6.
- remaining: restante da etapa 5; etapas 6–7.
- risks: perda de URLs indexadas (mitigar com redirects); fotos provisórias
  com direitos incertos; certificações não confirmadas publicadas.
- completed (SEO local, 2026-11-10): `stores.ts` com horário por unidade,
  link do perfil no Google Empresas e slugs `sao-luis`/`araguaina`;
  `lib/structuredData.ts` gera Organization + AutoPartsStore por unidade
  (home, `/lojas`, `/lojas/[slug]`); páginas `/lojas/sao-luis` e
  `/lojas/araguaina`; `/lojas` com título/descrição das duas cidades; sitemap
  com linhas do catálogo e unidades; endereço 402 confirmado pelo usuário.
- resolvido (SEO local): endereço de Araguaína definido pelo usuário como o
  do Google (Av. Cônego João Lima, Quadra 50, Lote 55, Jardim dos Ipês II,
  77820-160), com coordenadas do perfil. O PDF da linha amarela ainda traz o
  antigo (nº 1047, Setor Central).
- pendente (SEO local): perfil de São Luís mostra só "Tirirical, São Luís -
  MA", sem rua/número/telefone (usuário não vê "Reivindicar", provavelmente
  já é gerenciado); dias de Araguaína assumidos como seg–sex.
