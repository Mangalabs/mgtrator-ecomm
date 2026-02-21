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
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/50 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-[var(--secondary)]" aria-hidden="true" />
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-[var(--neutral-400)] uppercase tracking-wider mb-0.5">Peças Originais</div>
                <div className="text-xs sm:text-sm font-bold text-white">100% Certificadas</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/50 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-[var(--secondary)]" aria-hidden="true" />
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-[var(--neutral-400)] uppercase tracking-wider mb-0.5">Certificação</div>
                <div className="text-xs sm:text-sm font-bold text-white">ISO 9001:2015</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/50 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-[var(--secondary)]" aria-hidden="true" />
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-[var(--neutral-400)] uppercase tracking-wider mb-0.5">Experiência</div>
                <div className="text-xs sm:text-sm font-bold text-white">10+ Anos</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/50 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  <path d="M13 7h-2v5H7v2h4v2l3-3-3-3v2h2z"/>
                </svg>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-[var(--neutral-400)] uppercase tracking-wider mb-0.5">Especialista</div>
                <div className="text-xs sm:text-sm font-bold text-white">Volvo</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
      
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt={`${siteConfig.name} - Peças para Tratores e Máquinas Pesadas`}
                className="h-14 sm:h-16 w-auto object-contain"
                width={180}
                height={56}
              />
            </div>
            
            <p className="text-[var(--neutral-300)] text-sm mb-4 leading-relaxed max-w-sm">
              Especialistas em <strong className="text-white">peças originais para máquinas pesadas</strong>.
            </p>

            <div className="bg-[var(--neutral-800)]/30 rounded-2xl p-4 w-full max-w-sm">
              <div className="text-sm text-[var(--neutral-300)] leading-relaxed space-y-2">
                <p>
                  <span className="text-[var(--secondary)] al font-semibold block sm:inline">Peças para:</span> Escavadeiras, Carregadeiras, Motoniveladoras e mais.
                </p>
                <p>
                  <span className="text-[var(--secondary)] font-semibold block sm:inline">Marcas:</span> Caterpillar, Volvo e mais.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-3">
              <div className="w-1.5 h-5 bg-[var(--secondary)] rounded-full"></div>
              Links Rápidos
            </h4>
            <nav aria-labelledby="quick-links-heading">
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Produtos', href: '/produtos' },
                  { name: 'Lojas', href: '/lojas' },
                  { name: 'Contato', href: '/contato' },
                  { name: 'Políticas', href: '/politicas' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[var(--neutral-300)] hover:text-[var(--secondary)] transition-colors text-sm flex items-center gap-3 group py-1 w-fit"
                      aria-label={`Ir para página ${link.name}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--neutral-600)] group-hover:bg-[var(--secondary)] group-hover:scale-125 transition-all"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-3">
              <div className="w-1.5 h-5 bg-[var(--secondary)] rounded-full"></div>
              Contato
            </h4>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[var(--secondary)]" aria-hidden="true" />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-xs text-[var(--neutral-400)] mb-0.5 tracking-wide uppercase">WhatsApp</div>
                  <a 
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-white hover:text-[var(--secondary)] transition-colors font-semibold"
                    aria-label="Enviar mensagem via WhatsApp"
                  >
                    {siteConfig.contact.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[var(--secondary)]" aria-hidden="true" />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-xs text-[var(--neutral-400)] mb-0.5 tracking-wide uppercase">E-mail</div>
                  <a 
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm sm:text-base text-white hover:text-[var(--secondary)] transition-colors font-semibold break-all"
                    aria-label={`Enviar e-mail para ${siteConfig.contact.email}`}
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#20BD5A] hover:from-[#20BD5A] hover:to-[#1DA851] text-white px-4 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Solicitar orçamento via WhatsApp"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Cotação
              </a>
              
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 text-white px-4 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] bg-[var(--neutral-800)] hover:bg-[var(--neutral-700)] border border-[var(--neutral-700)]"
                aria-label="Siga-nos no Instagram"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-3">
              <div className="w-1.5 h-5 bg-[var(--secondary)] rounded-full"></div>
              Nossas Lojas
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {storesData.map((store) => (
                <div key={store.id} className="bg-[var(--neutral-800)]/40 border border-[var(--neutral-700)] rounded-2xl p-4 hover:border-[var(--primary)]/50 transition-all group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors">
                      <MapPin className="w-5 h-5 text-[var(--secondary)]" aria-hidden="true" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="font-bold text-white text-sm mb-1.5">{store.name}</div>
                      <p className="text-xs text-[var(--neutral-400)] leading-relaxed">
                        {store.address.street}, {store.address.number}<br/>
                        {store.address.neighborhood}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-2xl p-4 mt-2">
                <div className="text-xs sm:text-sm text-[var(--neutral-300)] flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse shadow-[0_0_8px_var(--secondary)]"></span>
                  <p>
                    <strong className="text-white font-bold">Atendimento:</strong> {siteConfig.businessHours.short}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-[var(--neutral-800)]/60 bg-[var(--neutral-900)]/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
            <div className="text-xs text-[var(--neutral-500)] text-center lg:text-left font-medium">
              © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs text-[var(--neutral-400)] font-medium">
              <Link href="/como-comprar" className="hover:text-[var(--secondary)] transition-colors py-1">
                Como Comprar
              </Link>
              <span className="w-1 h-1 rounded-full bg-[var(--neutral-700)] hidden sm:block"></span>
              <Link href="/politicas" className="hover:text-[var(--secondary)] transition-colors py-1">
                Políticas e Termos
              </Link>
              <span className="w-1 h-1 rounded-full bg-[var(--neutral-700)] hidden sm:block"></span>
              <Link href="/contato" className="hover:text-[var(--secondary)] transition-colors py-1">
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}