'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Shield, Award, Clock } from 'lucide-react'

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

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-3">
            <div className="mb-3">
              <img 
                src="https://mgtratorpecas.com.br/assets/logo_mgtratorpecas_png_branco-BQx3whQg.png" 
                alt="MG Trator Peças - Peças para Tratores e Máquinas Pesadas"
                className="h-14 w-auto object-contain"
                width={180}
                height={56}
              />
            </div>
            
            <p className="text-[var(--neutral-300)] text-xs mb-2 leading-relaxed">
              Distribuidora especializada em <strong className="text-white">peças originais para máquinas pesadas</strong>.
            </p>

            <div className="mb-3 pb-3">
              <div className="text-xs text-[var(--neutral-400)] leading-relaxed">
                <p className="mb-1 text-xs">
                  <span className="text-[var(--secondary)] font-semibold">Equipamentos:</span> Escavadeiras, Carregadeiras, Tratores e mais.
                </p>
                <p className="mb-1 text-xs">
                  <span className="text-[var(--secondary)] font-semibold">Marcas:</span> Caterpillar, Volvo, Komatsu e mais.
                </p>
                <p>
                  <span className="text-[var(--secondary)] font-semibold">Segmentos:</span> Construção Civil, Mineração e Terraplanagem.
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
              <ul className="space-y-1.5">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Produtos', href: '/produtos' },
                  { name: 'Marcas', href: '/marcas' },
                  { name: 'Lojas', href: '/lojas' },
                  { name: 'Contato', href: '/contato' },
                  { name: 'Como Comprar', href: '/como-comprar' },
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

            <a
              href="https://instagram.com/mgtratorpecas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--neutral-800)] hover:bg-[var(--neutral-700)] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-[var(--neutral-700)] hover:border-[var(--neutral-600)] shadow-md mt-6"
              aria-label="Siga-nos no Instagram"
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
              @mgtratorpecas
            </a>
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
                  <div className="text-xs text-[var(--neutral-500)]">Central de Atendimento</div>
                  <a 
                    href="tel:+553133684500"
                    className="text-sm text-white hover:text-[var(--secondary)] transition-colors font-semibold"
                    aria-label="Ligar para (31) 3368-4500"
                  >
                    (31) 3368-4500
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[var(--neutral-500)]">WhatsApp</div>
                  <a 
                    href="https://wa.me/5531998753200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-[var(--secondary)] transition-colors font-semibold"
                    aria-label="Enviar mensagem via WhatsApp"
                  >
                    (31) 99875-3200
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
                    href="mailto:contato@mgtratorpecas.com.br"
                    className="text-sm text-white hover:text-[var(--secondary)] transition-colors font-semibold break-all"
                    aria-label="Enviar e-mail para contato@mgtratorpecas.com.br"
                  >
                    contato@mgtratorpecas.com.br
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/5531998753200"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#20BD5A] hover:from-[#20BD5A] hover:to-[#1DA851] text-white px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 mt-2"
              aria-label="Solicitar orçamento via WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Solicitar Orçamento
            </a>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-white font-bold text-base mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-[var(--secondary)] rounded-full"></div>
              Nossas Lojas
            </h4>

            <div className="space-y-3">
              <div className="bg-[var(--neutral-800)]/50 border border-[var(--neutral-700)] rounded-xl p-3 hover:border-[var(--primary)]/30 transition-all">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--secondary)]" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm mb-1">Contagem</div>
                    <p className="text-xs text-[var(--neutral-400)] leading-relaxed">
                      Av. Babita Camargos, 3641 - Novo Progresso
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--neutral-800)]/50 border border-[var(--neutral-700)] rounded-xl p-3 hover:border-[var(--primary)]/30 transition-all">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--secondary)]" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm mb-1">Betim</div>
                    <p className="text-xs text-[var(--neutral-400)] leading-relaxed">
                      R. São Paulo, 456 - Distrito Industrial
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-3">
                <div className="text-xs text-[var(--neutral-400)] space-y-1">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]"></span>
                    <span className="font-semibold text-white">Seg-Sex:</span> 8h às 18h
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]"></span>
                    <span className="font-semibold text-white">Sábado:</span> 8h às 12h
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
              © {new Date().getFullYear()} MG Trator Peças. Todos os direitos reservados.
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