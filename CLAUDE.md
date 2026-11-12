# MG Tratorpeças — bootstrap para Claude Code

O Claude é o único agente que opera neste repositório e é responsável por todo
o projeto (páginas, componentes, dados, configuração do Next.js). Este arquivo
adapta as regras de `AGENTS.md`. Requisitos explícitos do usuário continuam
tendo precedência; depois vale este arquivo e então `AGENTS.md`.

## Início obrigatório de cada tarefa

1. Confirme a raiz com `pwd`.
2. Execute `git status --short --branch` e preserve todo trabalho existente.
3. Leia `AGENTS.md`, este arquivo, os entry points envolvidos e só o módulo de
   `.agents/` que a tarefa exigir.
4. Inspecione o diff relevante antes de editar. Alterações preexistentes
   pertencem ao usuário.
5. Defina objetivo observável, não objetivos, riscos e validação proporcional.
6. Faça a menor alteração coerente; não aproveite a tarefa para reformatação ou
   refatoração ampla.

Nunca descarte alterações, faça reset ou troque arquivos pela versão do Git.
Não crie commit, não faça push, não abra PR e não faça deploy sem solicitação
explícita.

Classifique inconsistências como em `AGENTS.md` (informativa, resolução segura,
ambiguidade material, bloqueio) e só pare diante de risco real.

## Contexto do produto

Site institucional da MG Tratorpeças, com duas frentes:

- **MG Tratorpeças — linha amarela:** peças para máquinas pesadas de
  construção e serviços de manutenção comum e preventiva para linha amarela e
  caminhões.
- **MG Agro — linha verde:** filial nova para máquinas agrícolas, com
  identidade visual própria.

O objetivo do site é gerar contato qualificado (WhatsApp, telefone, lojas), não
fechar pagamento online. Não há backend próprio.

O catálogo antigo vinha da API GestãoClick, que não está mais disponível. A
direção atual:

1. atualizar o site (fotos novas, melhorias visuais);
2. mesclar as identidades MG Tratorpeças e MG Agro;
3. substituir a navegação estilo e-commerce por uma tela de catálogo adaptada
   dos catálogos em PDF que a empresa já produz.

Decisões de escopo (quais produtos, se exibe preço, se mantém carrinho de
orçamento, como as duas marcas convivem) pertencem ao usuário; pergunte em vez
de presumir.

## Identidade visual e UI

- Interface e mensagens em português do Brasil.
- Tokens aprovados (2026-10-28) em `src/styles/global.css` (`:root` +
  `@theme inline`, Tailwind v4). `tailwind.config.ts` não é carregado pelo v4.
  - Comum: âmbar `--secondary` `#F4A30A` (+ `-light`, `-dark`), marinho
    `--ink` `#0D1D34`.
  - Linha amarela: azul `--primary` `#213A77`, `--primary-dark` `#1A2D5E`.
    Logo: engrenagem azul "MG TRATORPEÇAS" (azul, branca, amarela).
  - Linha verde (MG Agro): `--agro` `#106034`, `--agro-deep` `#12381D`,
    `--agro-mid` `#409844`, `--agro-lime` `#E4FC84` (lima só sobre fundo
    escuro). Logo: `public/logo-mgagro.png`.
- Âmbar como texto só sobre fundo escuro (2.08:1 sobre branco); sobre âmbar use
  texto escuro (`--ink`, preto ou `--primary`).
- Tipografia: Barlow Condensed (`--font-display`, títulos h1–h6) e Inter
  (corpo), ambas via `next/font` em `src/app/layout.tsx`.
- Use tokens; não codifique cores soltas quando houver token. Exceções: cores
  de marcas de terceiros (WhatsApp, Mercado Livre).
- Reutilize `src/components/common/`, `layout/` e `shared/` antes de criar
  componentes novos.
- Imagens via `next/image` com `alt` descritivo, dimensões/`sizes` corretos e
  domínios permitidos em `next.config.ts`.
- Layout utilizável de 375px a 1280px+, sem rolagem horizontal; alvos de toque
  adequados; foco visível; contraste WCAG AA.
- Respeite `prefers-reduced-motion` em animações com framer-motion/motion.
- Represente loading, vazio e erro; não esconda falhas.
- Para trabalho visual, carregue as skills listadas em
  `.agents/skills-manifest.md` (ex.: `frontend-design`, `vectorlab-ux-skills`,
  `a11y-enforcer`).

## Regras de engenharia

- Server Components por padrão; `'use client'` só onde houver interação.
- O site é exportado como estático (`output: 'export'`): nada de route
  handlers, `revalidate`, APIs de request (`cookies`, `headers`,
  `searchParams` no servidor) ou variáveis de ambiente em runtime.
- Produção atual: Vercel, ligada a `Mangalabs/mgtrator-ecomm` (`main` →
  produção; branches → preview). O mesmo `out/` também roda no cPanel.
  Redirects e cabeçalhos ficam em `vercel.json` (Vercel) e
  `public/.htaccess` (Apache/cPanel); mantenha os dois equivalentes.
- HTML não pode ser cacheado em pedaços: o roteador do Next 16 pré-carrega
  páginas com `Range` e o navegador abre a página em branco depois
  (`no-store` no `vercel.json`, `Range` descartado no `.htaccess`).
- Cliques no WhatsApp emitem `whatsapp_click` via `src/lib/tracking.ts`
  (`trackWhatsAppClick`, `openWhatsApp`, `WhatsAppLink`); todo novo link de
  WhatsApp deve usá-los. O GTM (`siteConfig.tracking`) é carregado em
  `TrackingScripts`.
- Conteúdo estático e tipos ficam em `src/data/`; helpers puros em `src/lib/`.
- Não introduza outro sistema de estado, estilo, componentes ou fetch sem
  decisão explícita.
- A integração GestãoClick e o fluxo de e-commerce foram removidos
  (2026-11); não os reintroduza sem decisão explícita.
- Preserve URLs indexadas ou planeje redirects ao remover páginas.

## Fonte de dados inexistente

Quando o catálogo precisar de dados que nenhuma fonte fornece (backend,
planilha, novo ERP), não invente endpoint nem dados falsos em produção. Use
`/data-contract <necessidade>` para propor o formato e a origem, e implemente
depois que o usuário decidir.

## Validação e entrega

Use `/site-check` ao terminar uma alteração. Comandos base:

```bash
npm run type-check
npx eslint .
npm run build
```

Para mudanças visuais, rode `npm run dev` e confira as páginas afetadas em
larguras compactas e desktop. Nunca diga que um comando passou se ele não foi
executado. Na entrega, relate alterações, decisões, verificações, riscos não
validados e pendências.
