Prepare uma proposta de fonte/formato de dados para o catálogo, sem implementar
integração nova, editar `next.config.ts` ou mexer em variáveis de ambiente.

Necessidade: $ARGUMENTS

Faça inspeção somente leitura de `src/services/`, `src/data/types.ts`, das
páginas consumidoras e de `.agents/catalog-content.md`. Em seguida, apresente:

1. objetivo do usuário e página/fluxo bloqueado;
2. fonte atual e lacuna encontrada;
3. opções de origem (conteúdo estático em `src/data/`, backend MG Tratorpeças,
   planilha/CMS, outra) com prós, contras e quem mantém o conteúdo;
4. formato proposto (tipo TypeScript) e exemplo mínimo;
5. tratamento de imagens: onde ficam, tamanho, formato e `alt`;
6. impacto em `src/services/api.ts`, páginas, `sitemap.ts` e URLs;
7. segurança, variáveis de ambiente e cache/revalidação;
8. critérios de aceite e verificações necessárias;
9. alternativa temporária segura, sem dados falsos em produção.

Não presuma que a proposta foi aprovada. Pare e entregue para decisão do
usuário.
