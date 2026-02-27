'use client'

import { MapPin, Phone, Clock, Navigation, Car, Wrench, Store as StoreIcon, Shield, Zap, MessageCircle, ArrowRight, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { storesData } from '@/data/stores'
import { siteConfig } from '@/data/site'
import PageHero from '../common/PageHero'

export const LojasPageClient = () => {
  const handleWhatsApp = (storeWhatsapp?: string) => {
    const phone = storeWhatsapp ? storeWhatsapp.replace(/\D/g, '') : siteConfig.contact.whatsapp
    const message = encodeURIComponent('Olá! Gostaria de consultar sobre peças para maquinas pesadas e máquinas pesadas. Pode me ajudar?')
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        breadcrumbs={[{
          label: "Lojas",
          href: ''
        }]}
        title="Nossa Loja"
        description="Visite nossa unidade"
      />

      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--secondary)]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="space-y-8">
            {storesData.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/90 backdrop-blur-sm rounded-[32px] border-2 border-[var(--neutral-200)] shadow-2xl overflow-hidden hover:border-[var(--primary)]/50 hover:shadow-[0_24px_60px_-12px_rgba(33,58,119,0.28)] transition-all duration-500"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <div className="absolute top-6 left-6 z-10">
                      <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xl border-2 border-white/60 px-4 py-2 rounded-2xl shadow-xl">
                        <StoreIcon className="w-5 h-5 text-[var(--primary)]" />
                        <span className="font-black text-[var(--primary)] uppercase tracking-wide"> {store.address.city}</span>
                      </div>
                    </div>

                    <div className="aspect-video lg:aspect-[4/3] overflow-hidden relative">
                      {store.image && (
                        <ImageWithFallback
                          src={store.image.startsWith('/') ? store.image : `/${store.image}`}
                          alt={`Loja ${store.name} da ${siteConfig.name} - ${store.address.street} em ${store.address.city}`}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </div>
                    
                    <div className="h-64 overflow-hidden border-t-2 border-[var(--neutral-200)]">
                      <iframe
                        src={store.mapEmbed}
                        width="100%"
                        height="100%"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Localização ${store.name}`}
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                      ></iframe>
                    </div>
                  </div>

                  <div className="p-8 lg:p-10 flex flex-col">
                    <h2 className="font-black text-3xl text-[var(--neutral-900)] mb-6">
                      {store.name}
                    </h2>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-[var(--neutral-200)] hover:border-[var(--primary)]/30 transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[#1a2d5e] rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-sm text-[var(--neutral-900)] mb-1">Endereço</div>
                          <div className="text-sm text-[var(--neutral-700)] leading-relaxed">
                            {store.address.street}, {store.address.number}<br />
                            {store.address.city}/{store.address.state}<br />
                            CEP: {store.address.zipCode}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-[var(--neutral-200)] hover:border-[var(--primary)]/30 transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--secondary)] to-[#f4d348] rounded-xl flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-[var(--primary)]" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-sm text-[var(--neutral-900)] mb-1">Telefones</div>
                          <div className="text-sm text-[var(--neutral-700)]">
                            <a href={`tel:${store.contact.phone}`} className="hover:text-[var(--primary)] transition-colors font-medium">
                              {store.contact.phoneFormatted}
                            </a>
                            <br />
                            {store.contact.whatsapp && (
                              <>
                                <span className="text-xs text-[var(--neutral-500)]">WhatsApp:</span>{' '}
                                <a href={`https://wa.me/${store.contact.whatsapp.replace(/\D/g, '')}`} className="hover:text-[#25D366] transition-colors font-medium">
                                  {store.contact.whatsapp}
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-[var(--neutral-200)] hover:border-[var(--primary)]/30 transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-sm text-[var(--neutral-900)] mb-1">Horário de Funcionamento</div>
                          <div className="text-sm text-[var(--neutral-700)] space-y-1">
                            <div>{siteConfig.businessHours.detailed}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {store.features && store.features.length > 0 && (
                      <div className="mb-8">
                        <div className="font-bold text-sm text-[var(--neutral-900)] mb-3 uppercase tracking-wide">Diferenciais da Loja</div>
                        <div className="grid grid-cols-2 gap-3">
                          {store.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-[var(--neutral-700)] bg-white rounded-xl px-3 py-2 border border-[var(--neutral-200)]">
                              <div className="w-2 h-2 bg-[var(--secondary)] rounded-full flex-shrink-0" />
                              <span className="font-semibold">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button
                        onClick={() => handleWhatsApp(store.contact.whatsapp)}
                        className="flex items-center justify-center gap-2 bg-gradient-to-br from-[#25D366] to-[#20BD5A] text-white py-4 px-5 rounded-2xl font-black hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>WhatsApp</span>
                      </button>
                      
                      <a
                        href={store.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 border-2 border-[var(--primary)] text-[var(--primary)] py-4 px-5 rounded-2xl font-black hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
                      >
                        <Navigation className="w-5 h-5" />
                        <span>Como Chegar</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className=" bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-black text-4xl md:text-5xl text-[var(--neutral-900)] mb-5">
              Vantagens de Visitar Nossa Loja
            </h2>
            <p className="text-xl text-[var(--neutral-600)] max-w-3xl mx-auto">
              Experiência completa com atendimento especializado e toda a estrutura para melhor atendê-lo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border-2 border-[var(--neutral-200)] p-6 text-center hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[#1a2d5e] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-xl text-[var(--neutral-900)] mb-3">
                Consultoria Técnica
              </h3>
              <p className="text-sm text-[var(--neutral-700)] leading-relaxed">
                Equipe especializada para auxiliar na escolha da <strong>peça correta</strong> para seu equipamento
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border-2 border-[var(--neutral-200)] p-6 text-center hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-xl text-[var(--neutral-900)] mb-3">
                Retirada Imediata
              </h3>
              <p className="text-sm text-[var(--neutral-700)] leading-relaxed">
                Peças em estoque para <strong>retirada na hora</strong>. Sem espera, sem complicação
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border-2 border-[var(--neutral-200)] p-6 text-center hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--secondary)] to-[#f4d348] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Car className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="font-black text-xl text-[var(--neutral-900)] mb-3">
                Estacionamento
              </h3>
              <p className="text-sm text-[var(--neutral-700)] leading-relaxed">
                <strong>Amplo estacionamento gratuito</strong> em todas as unidades com segurança
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border-2 border-[var(--neutral-200)] p-6 text-center hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-xl text-[var(--neutral-900)] mb-3">
                Garantia Total
              </h3>
              <p className="text-sm text-[var(--neutral-700)] leading-relaxed">
                Todas as peças com <strong>certificado e garantia</strong>. Compra segura e procedente
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-50 to-white rounded-3xl border-2 border-[var(--neutral-200)] p-8 lg:p-10"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="font-black text-3xl text-[var(--neutral-900)] mb-4">
                  Atendimento que Faz a Diferença
                </h3>
                <p className="text-lg text-[var(--neutral-700)] leading-relaxed mb-6">
                  Em nossas lojas físicas você tem acesso a todo nosso estoque, pode visualizar as peças pessoalmente 
                  e contar com a orientação de profissionais com <strong>mais de 25 anos de experiência</strong> no segmento.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-[var(--neutral-200)]">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-lg text-[var(--neutral-900)]">+10k</div>
                      <div className="text-xs text-[var(--neutral-600)] font-semibold">Clientes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-[var(--neutral-200)]">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <StoreIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-lg text-[var(--neutral-900)]">{storesData.length}</div>
                      <div className="text-xs text-[var(--neutral-600)] font-semibold">Unidades</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-[var(--neutral-200)]">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-lg text-[var(--neutral-900)]">25+</div>
                      <div className="text-xs text-[var(--neutral-600)] font-semibold">Anos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--primary)]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--secondary)]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-black text-4xl md:text-5xl text-[var(--neutral-900)] mb-5">
              Prefere Comprar sem Sair de Casa?
            </h2>
            <p className="text-xl text-[var(--neutral-600)] max-w-3xl mx-auto">
              Atendemos você também pelos nossos canais digitais com a mesma qualidade e segurança
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-[#25D366] to-[#20BD5A] rounded-[32px] p-10 lg:p-12 text-white relative overflow-hidden shadow-2xl hover:shadow-[0_24px_60px_-12px_rgba(37,211,102,0.5)] transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="font-black text-3xl mb-4">
                  WhatsApp Direto
                </h3>
                
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Consulte disponibilidade, tire dúvidas e faça seu pedido diretamente pelo WhatsApp com nossa equipe especializada.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="font-semibold">Atendimento humanizado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="font-semibold">Resposta rápida</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="font-semibold">Envio de fotos e vídeos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="font-semibold">Orçamento sem compromisso</span>
                  </div>
                </div>

                <button
                  onClick={() => handleWhatsApp()}
                  className="w-full bg-white text-[#25D366] py-5 px-8 rounded-2xl font-black text-lg hover:bg-white/95 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
                >
                  <span>Falar no WhatsApp</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-[#FFF159] to-[#FFE600] rounded-[32px] p-10 lg:p-12 relative overflow-hidden shadow-2xl hover:shadow-[0_24px_60px_-12px_rgba(255,230,0,0.5)] transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2D3277] rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 48 48" className="w-12 h-12">
                    <path fill="#2D3277" d="M37.8 15.4c-3.1-3.1-8.1-3.1-11.2 0L24 18.1l-2.6-2.7c-3.1-3.1-8.1-3.1-11.2 0-3.1 3.1-3.1 8.1 0 11.2L24 40.4l13.8-13.8c3.1-3.2 3.1-8.2 0-11.2z"/>
                  </svg>
                </div>
                
                <h3 className="font-black text-3xl text-[#2D3277] mb-4">
                  Mercado Livre
                </h3>
                
                <p className="text-lg text-[#2D3277]/80 mb-8 leading-relaxed">
                  Nossa <strong>loja oficial verificada</strong> na maior plataforma de e-commerce da América Latina. Compra 100% protegida.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-[#2D3277]">
                    <div className="w-2 h-2 bg-[#2D3277] rounded-full" />
                    <span className="font-semibold">Frete grátis em produtos selecionados</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2D3277]">
                    <div className="w-2 h-2 bg-[#2D3277] rounded-full" />
                    <span className="font-semibold">Parcele em até 12x sem juros</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2D3277]">
                    <div className="w-2 h-2 bg-[#2D3277] rounded-full" />
                    <span className="font-semibold">Compra protegida e garantida</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2D3277]">
                    <div className="w-2 h-2 bg-[#2D3277] rounded-full" />
                    <span className="font-semibold">Avaliação 5 estrelas</span>
                  </div>
                </div>

                <a
                  href="https://www.mercadolivre.com.br/perfil/MGTRATORPECAS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#2D3277] text-white py-5 px-8 rounded-2xl font-black text-lg hover:bg-[#1a1d4a] hover:scale-[1.02] transition-all duration-300 text-center shadow-xl"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span>Visitar Loja Oficial</span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}