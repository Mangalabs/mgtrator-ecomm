import Script from 'next/script'
import { siteConfig } from '@/data/site'

// Google Tag Manager (snippet oficial). Um único script inline inicializa o
// dataLayer e só depois insere o gtm.js, garantindo a ordem; o `id` impede
// carga duplicada. Conversões do Google Ads são configuradas no GTM.
export const TrackingScripts = () => {
  const { googleTagId } = siteConfig.tracking

  return (
    <>
      <Script id='google-tag-manager' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagId}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${googleTagId}`}
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
