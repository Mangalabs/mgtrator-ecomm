import { siteConfig } from '@/data/site'
import type { ExtendedStore } from '@/data/stores'

// JSON-LD (schema.org) gerado de `stores.ts`, para que nome, endereço e
// telefone sejam os mesmos no site, nos dados estruturados e no Google Empresas.

export const storeUrl = (store: ExtendedStore) => `${siteConfig.url}/lojas/${store.slug}`

export const storeJsonLd = (store: ExtendedStore) => ({
  '@type': 'AutoPartsStore',
  '@id': `${storeUrl(store)}#loja`,
  name: siteConfig.name,
  url: storeUrl(store),
  image: `${siteConfig.url}${store.image ?? '/logo-azul.png'}`,
  telephone: store.contact.phone,
  email: store.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${store.address.street}, ${store.address.number}`,
    addressLocality: store.address.city,
    addressRegion: store.address.state,
    postalCode: store.address.zipCode,
    addressCountry: 'BR',
  },
  ...(store.coordinates && {
    geo: {
      '@type': 'GeoCoordinates',
      latitude: store.coordinates.latitude,
      longitude: store.coordinates.longitude,
    },
  }),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: store.hours.opens,
    closes: store.hours.closes,
  },
  hasMap: store.mapsLink,
  sameAs: [store.googleBusinessUrl, siteConfig.social.instagram],
  parentOrganization: { '@id': `${siteConfig.url}/#organizacao` },
})

export const organizationJsonLd = (stores: ExtendedStore[]) => ({
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organizacao`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo-azul.png`,
  email: siteConfig.contact.email,
  sameAs: [siteConfig.social.instagram],
  department: stores.map((store) => ({ '@id': `${storeUrl(store)}#loja` })),
})

export const jsonLdGraph = (...nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
})
