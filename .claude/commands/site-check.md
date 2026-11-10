Valide as alterações atuais do site sem fazer commit, push ou deploy.

Contexto opcional fornecido pelo usuário: $ARGUMENTS

1. Confirme a raiz do repositório e execute `git status --short --branch`.
2. Identifique os arquivos alterados e as rotas afetadas.
3. Execute `npm run type-check`.
4. Execute `npx eslint` nos arquivos alterados (ou `npx eslint .` se o alcance
   justificar).
5. Execute `npm run build` quando houver mudança de rotas, dados, metadata,
   redirects, `next.config.ts` ou dependências.
6. Para mudanças visuais, rode `npm run dev` e confira as páginas afetadas em
   ~375px, ~768px e ~1280px, com navegação por teclado.
7. Se URLs mudaram, confirme redirects, `sitemap.ts` e links internos.
8. Execute `git diff --check`, revise o diff e confirme que arquivos não
   relacionados foram preservados.
9. Resuma comandos realmente executados, resultados, páginas verificadas,
   riscos não verificados e pendências. Não faça commit sem pedido explícito.
