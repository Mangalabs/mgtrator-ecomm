'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Shield, Award, Clock } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { storesData } from '@/data/stores'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[var(--neutral-900)] to-[#0f1419] text-white" role="contentinfo">
      <div className="border-b border-[var(--neutral-800)]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/50 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-[var(--secondary)]" aria-hidden="true" />
              </div>
              <div className="text-xs text-[var(--neutral-400)]">Peças Originais</div>
              <div className="text-xs font-bold text-white">100% Certificadas</div>
            </div>
            
            <div className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/50 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5 text-[var(--secondary)]" aria-hidden="true" />
              </div>
              <div className="text-xs text-[var(--neutral-400)]">Certificação</div>
              <div className="text-xs font-bold text-white">ISO 9001:2015</div>
            </div>
            
            <div className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/50 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5 text-[var(--secondary)]" aria-hidden="true" />
              </div>
              <div className="text-xs text-[var(--neutral-400)]">Experiência</div>
              <div className="text-xs font-bold text-white">10+ Anos</div>
            </div>
            
            <div className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/50 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  <path d="M13 7h-2v5H7v2h4v2l3-3-3-3v2h2z"/>
                </svg>
              </div>
              <div className="text-xs text-[var(--neutral-400)]">Distribuidor</div>
              <div className="text-xs font-bold text-white">Caterpillar</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
      
          <div className="lg:col-span-4">
            <div className="mb-2">
              <img 
                src="/logo.png" 
                alt={`${siteConfig.name} - Peças para Tratores e Máquinas Pesadas`}
                className="h-25 w-auto"
                width={180}
                height={56}
              />
            </div>
            
            <p className="text-[var(--neutral-300)] text-xs mb-2 leading-relaxed mt-2">
              Especialistas em <strong className="text-white">peças originais para máquinas pesadas</strong>.
            </p>

            <div className="mb-3 pb-3">
              <div className="text-xs text-[var(--neutral-400)] leading-relaxed">
                <p className="mb-1 text-xs">
                  <span className="text-[var(--secondary)] font-semibold">Peças para:</span> Escavadeiras, Carregadeiras, Motoniveladoras e mais.
                </p>
                <p className="mb-1 text-xs">
                  <span className="text-[var(--secondary)] font-semibold">Marcas:</span> Caterpillar, Volvo e mais.
                </p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-base mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-[var(--secondary)] rounded-full"></div>
              Links Rápidos
            </h4>
            <nav aria-labelledby="quick-links-heading">
              <ul className="space-y-5 mt-4">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Produtos', href: '/produtos' },
                  // { name: 'Marcas', href: '/marcas' },
                  { name: 'Lojas', href: '/lojas' },
                  { name: 'Contato', href: '/contato' },
                  // { name: 'Como Comprar', href: '/como-comprar' },
                  { name: 'Políticas', href: '/politicas' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[var(--neutral-300)] hover:text-[var(--secondary)] transition-colors text-sm flex items-center gap-2 group mt-2.5"
                      aria-label={`Ir para página ${link.name}`}
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--neutral-600)] group-hover:bg-[var(--secondary)] transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-base mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-[var(--secondary)] rounded-full"></div>
              Contato
            </h4>
            
            <div className="space-y-2.5 mb-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[var(--secondary)]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[var(--neutral-500)]">WhatsApp</div>
                  <a 
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-[var(--secondary)] transition-colors font-semibold"
                    aria-label="Enviar mensagem via WhatsApp"
                  >
                    {siteConfig.contact.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[var(--secondary)]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[var(--neutral-500)]">E-mail</div>
                  <a 
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm text-white hover:text-[var(--secondary)] transition-colors font-semibold break-all"
                    aria-label={`Enviar e-mail para ${siteConfig.contact.email}`}
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#20BD5A] hover:from-[#20BD5A] hover:to-[#1DA851] text-white px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 mt-2"
              aria-label="Solicitar orçamento via WhatsApp"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Solicitar Cotação
            </a>
            
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 mt-4 bg-[var(--neutral-800)] hover:bg-[var(--neutral-700)] border border-[var(--neutral-700)]"
              aria-label="Siga-nos no Instagram"
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
              {siteConfig.social.instagramHandle}
            </a>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-base mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-[var(--secondary)] rounded-full"></div>
              Nossas Lojas
            </h4>

            <div className="space-y-3">
              {storesData.map((store) => (
                <div key={store.id} className="bg-[var(--neutral-800)]/50 border border-[var(--neutral-700)] rounded-xl p-3 hover:border-[var(--primary)]/30 transition-all">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[var(--secondary)]" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm mb-1">{store.name}</div>
                      <p className="text-xs text-[var(--neutral-400)] leading-relaxed">
                        {store.address.street}, {store.address.number} - {store.address.neighborhood}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-3">
                <div className="text-xs text-[var(--neutral-400)] space-y-1">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]"></span>
                    <span className="font-semibold text-white">Atendimento:</span> {siteConfig.businessHours.short}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-[var(--neutral-800)]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-xs text-[var(--neutral-500)] text-center md:text-left">
              © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-[var(--neutral-500)]">
              <Link href="/como-comprar" className="hover:text-[var(--secondary)] transition-colors">
                Como Comprar
              </Link>
              <span>•</span>
              <Link href="/politicas" className="hover:text-[var(--secondary)] transition-colors">
                Políticas e Termos
              </Link>
              <span>•</span>
              <Link href="/contato" className="hover:text-[var(--secondary)] transition-colors">
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}