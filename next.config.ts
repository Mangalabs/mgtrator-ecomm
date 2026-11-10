import type { NextConfig } from 'next'

// Export estático (`npm run build` gera `out/`) para a public_html do cPanel.
// Redirects, URLs sem `.html` e cabeçalhos de segurança ficam em
// `public/.htaccess`, que o build copia para `out/`.
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    // Sem servidor Node não há otimização sob demanda; as imagens de
    // `public/` já são servidas em tamanho adequado.
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
