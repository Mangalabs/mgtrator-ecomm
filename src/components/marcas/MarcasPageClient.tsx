'use client'

import {
  Check,
  Sparkles,
  ArrowRight,
  Shield,
  Award,
  Truck,
  Package,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { brands } from '@/data/mockData'
import PageHero from '../common/PageHero'

export const MarcasPageClient = () => {
  const handleWhatsApp = () => {
    window.open(
      'https://tintim.link/whatsapp/d6ae85fb-b33f-4b08-b29b-e9b0ee72942a/135f8540-2a5d-4573-b52f-338b7b4d4d39',
      '_blank',
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      <PageHero
        breadcrumbs={[
          {
            label: 'Marcas',
            href: '',
          },
        ]}
        title='Marcas Atendidas'
        description='Trabalhamos com as principais marcas de maquinas pesadas e máquinas pesadas do mundo.'
      />

      <section className='py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-40' aria-hidden='true'>
          <div className='absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px]' />
          <div className='absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--secondary)]/5 rounded-full blur-[100px]' />
        </div>

        <div className='relative max-w-7xl mx-auto px-4'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {brands.map((brand, index) => (
              <motion.article
                key={brand.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group relative bg-white rounded-3xl border border-[var(--neutral-200)] overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-[0_32px_64px_-12px_rgba(33,58,119,0.18)] transition-all duration-500 flex flex-col h-full'>
                <div className='absolute inset-0 bg-gradient-to-br from-[var(--primary)]/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none' />

                <div className='relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50/50 p-12'>
                  <div className='relative w-full h-full'>
                    <Image
                      src={brand.logo}
                      alt={`Logo da marca ${brand.name} - fabricante de máquinas e equipamentos pesados`}
                      fill
                      className='object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out'
                    />
                  </div>

                  <div className='absolute top-4 right-4'>
                    <div className='backdrop-blur-xl bg-white/90 px-3 py-1.5 rounded-xl shadow-lg'>
                      <span className='text-xs font-black text-[var(--primary)] uppercase tracking-wider'>
                        {brand.productCount}+ produtos
                      </span>
                    </div>
                  </div>
                </div>

                <div className='relative flex-1 flex flex-col p-6 gap-4'>
                  <h3 className='text-gray-900 font-black text-2xl leading-tight'>
                    {brand.name}
                  </h3>

                  <p className='text-gray-600 leading-relaxed text-sm line-clamp-3 flex-1'>
                    {brand.description}
                  </p>

                  <div className='flex flex-wrap gap-2'>
                    <span className='inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold'>
                      <Check className='w-3 h-3' aria-hidden='true' />
                      Genuínas
                    </span>
                    <span className='inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-bold'>
                      <Shield className='w-3 h-3' aria-hidden='true' />
                      Garantia
                    </span>
                    <span className='inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg border border-amber-200 font-bold'>
                      <Truck className='w-3 h-3' aria-hidden='true' />
                      Pronta Entrega
                    </span>
                  </div>

                  <div className='flex flex-col gap-2.5 pt-2'>
                    <Link href={`/categoria/${brand.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full bg-gradient-to-br from-[var(--primary)] to-[#1a2d5f] text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-[var(--primary)]/30 hover:shadow-xl hover:shadow-[var(--primary)]/40 transition-all flex items-center justify-center gap-2 group/btn'>
                        <Package className='w-5 h-5 transition-transform group-hover/btn:scale-110' />
                        <span>VER PRODUTOS</span>
                        <ArrowRight className='w-4 h-4 transition-transform group-hover/btn:translate-x-1' />
                      </motion.button>
                    </Link>

                    <motion.a
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      href='https://tintim.link/whatsapp/d6ae85fb-b33f-4b08-b29b-e9b0ee72942a/135f8540-2a5d-4573-b52f-338b7b4d4d39'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-full bg-gradient-to-r from-[#25D366] to-[#20BD5A] text-white py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 hover:from-[#20BD5A] hover:to-[#1DA851] shadow-md hover:shadow-lg'
                      title={`Consultar ${brand.name} no WhatsApp`}>
                      <svg
                        className='w-4 h-4'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                        aria-hidden='true'>
                        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                      </svg>
                      <span>Consultar via WhatsApp</span>
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 bg-white relative overflow-hidden'>
        <div
          className='absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white'
          aria-hidden='true'
        />

        <div className='relative max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='font-black text-4xl md:text-5xl text-[var(--neutral-900)] mb-5'>
              Por que Escolher Nossas Marcas?
            </h2>
            <p className='text-xl text-[var(--neutral-600)] max-w-3xl mx-auto'>
              Trabalhamos exclusivamente com fabricantes líderes mundiais,
              garantindo qualidade e performance
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border-2 border-[var(--neutral-200)] p-8 hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500'>
              <div className='w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Shield className='w-8 h-8 text-white' />
              </div>
              <h3 className='font-black text-2xl text-[var(--neutral-900)] mb-4'>
                100% Genuíno
              </h3>
              <p className='text-[var(--neutral-700)] leading-relaxed mb-6'>
                Peças <strong>originais de fábrica</strong> com certificado de
                autenticidade. Garantia total de procedência e qualidade.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-start gap-2 text-sm text-[var(--neutral-600)]'>
                  <div className='w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0' />
                  <span>
                    Garantia de <strong>12 meses</strong> em peças genuínas
                  </span>
                </li>
                <li className='flex items-start gap-2 text-sm text-[var(--neutral-600)]'>
                  <div className='w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0' />
                  <span>Certificados de origem e qualidade</span>
                </li>
                <li className='flex items-start gap-2 text-sm text-[var(--neutral-600)]'>
                  <div className='w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0' />
                  <span>Fornecedores homologados pelas marcas</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border-2 border-[var(--neutral-200)] p-8 hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500'>
              <div className='w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[#1a2d5e] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Award className='w-8 h-8 text-white' />
              </div>
              <h3 className='font-black text-2xl text-[var(--neutral-900)] mb-4'>
                Expertise Técnica
              </h3>
              <p className='text-[var(--neutral-700)] leading-relaxed mb-6'>
                <strong>Mais de 25 anos</strong> atendendo o segmento de
                máquinas pesadas com equipe especializada.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-start gap-2 text-sm text-[var(--neutral-600)]'>
                  <div className='w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-1.5 flex-shrink-0' />
                  <span>Consultoria para escolha correta da peça</span>
                </li>
                <li className='flex items-start gap-2 text-sm text-[var(--neutral-600)]'>
                  <div className='w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-1.5 flex-shrink-0' />
                  <span>Suporte técnico especializado</span>
                </li>
                <li className='flex items-start gap-2 text-sm text-[var(--neutral-600)]'>
                  <div className='w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-1.5 flex-shrink-0' />
                  <span>Atendimento pós-venda dedicado</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className='group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border-2 border-[var(--neutral-200)] p-8 hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500'>
              <div className='w-16 h-16 bg-gradient-to-br from-[var(--secondary)] to-[#f4d348] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Package className='w-8 h-8 text-[var(--primary)]' />
              </div>
              <h3 className='font-black text-2xl text-[var(--neutral-900)] mb-4'>
                Estoque Completo
              </h3>
              <p className='text-[var(--neutral-700)] leading-relaxed mb-6'>
                <strong>Pronta entrega</strong> das peças mais procuradas de
                todas as marcas que atendemos.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-start gap-2 text-sm text-[var(--neutral-600)]'>
                  <div className='w-1.5 h-1.5 bg-[var(--secondary)] rounded-full mt-1.5 flex-shrink-0' />
                  <span>Estoque permanente atualizado</span>
                </li>
                <li className='flex items-start gap-2 text-sm text-[var(--neutral-600)]'>
                  <div className='w-1.5 h-1.5 bg-[var(--secondary)] rounded-full mt-1.5 flex-shrink-0' />
                  <span>Importação sob encomenda disponível</span>
                </li>
                <li className='flex items-start gap-2 text-sm text-[var(--neutral-600)]'>
                  <div className='w-1.5 h-1.5 bg-[var(--secondary)] rounded-full mt-1.5 flex-shrink-0' />
                  <span>Envio para todo o Brasil</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-gradient-to-br from-slate-50 to-white rounded-3xl border-2 border-[var(--neutral-200)] p-10 lg:p-12'>
            <div className='flex flex-col lg:flex-row items-center gap-8'>
              <div className='flex-1'>
                <h3 className='font-black text-3xl text-[var(--neutral-900)] mb-4'>
                  Peças para Diferentes Aplicações
                </h3>
                <p className='text-lg text-[var(--neutral-700)] leading-relaxed mb-6'>
                  Cada marca possui características únicas. Nossa equipe ajuda
                  você a encontrar a peça ideal para seu equipamento,
                  considerando modelo, ano e aplicação específica.
                </p>
                <div className='grid sm:grid-cols-2 gap-4'>
                  <div className='flex items-center gap-3 bg-white rounded-2xl p-4 border border-[var(--neutral-200)]'>
                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <Check className='w-5 h-5 text-white' />
                    </div>
                    <span className='font-bold text-sm text-[var(--neutral-900)]'>
                      Motores e Transmissões
                    </span>
                  </div>
                  <div className='flex items-center gap-3 bg-white rounded-2xl p-4 border border-[var(--neutral-200)]'>
                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <Check className='w-5 h-5 text-white' />
                    </div>
                    <span className='font-bold text-sm text-[var(--neutral-900)]'>
                      Sistemas Hidráulicos
                    </span>
                  </div>
                  <div className='flex items-center gap-3 bg-white rounded-2xl p-4 border border-[var(--neutral-200)]'>
                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <Check className='w-5 h-5 text-white' />
                    </div>
                    <span className='font-bold text-sm text-[var(--neutral-900)]'>
                      Filtros e Manutenção
                    </span>
                  </div>
                  <div className='flex items-center gap-3 bg-white rounded-2xl p-4 border border-[var(--neutral-200)]'>
                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <Check className='w-5 h-5 text-white' />
                    </div>
                    <span className='font-bold text-sm text-[var(--neutral-900)]'>
                      Componentes Elétricos
                    </span>
                  </div>
                </div>
              </div>
              <div className='lg:w-96 flex-shrink-0'>
                <div className='bg-gradient-to-br from-[var(--primary)] to-[#1a2d5e] rounded-2xl p-8 text-white shadow-2xl'>
                  <div className='text-6xl font-black mb-3'>6</div>
                  <div className='text-xl font-bold mb-2'>Marcas Premium</div>
                  <p className='text-blue-100 text-sm mb-6'>
                    Caterpillar, Volvo
                  </p>
                  <div className='flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl'>
                    <Star className='w-5 h-5 text-[var(--secondary)]' />
                    <span className='font-bold text-sm'>
                      Líderes Mundiais do Setor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className='py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-40' aria-hidden='true'>
          <div className='absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--primary)]/5 rounded-full blur-[100px]' />
          <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--secondary)]/5 rounded-full blur-[100px]' />
        </div>

        <div className='relative max-w-5xl mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-gradient-to-br from-[var(--primary)] via-[#1a2d5e] to-[var(--primary)] rounded-[32px] p-12 lg:p-16 text-center overflow-hidden relative'>
            <div className='absolute inset-0 opacity-10' aria-hidden='true'>
              <div className='absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl' />
              <div className='absolute bottom-0 left-0 w-64 h-64 bg-[var(--secondary)] rounded-full blur-3xl' />
            </div>

            <div className='relative z-10'>
              <h2 className='font-black text-4xl lg:text-5xl text-white mb-5 leading-tight'>
                Procura Outra Marca?
              </h2>

              <p className='text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed'>
                Nossa rede de fornecedores é ampla. Consulte disponibilidade
                para <strong>outras marcas e modelos</strong>.
              </p>

              <div className='flex flex-col sm:flex-row justify-center gap-4 mb-8'>
                <button
                  onClick={handleWhatsApp}
                  className='group inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#20BD5A] hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#25D366]/50'>
                  <svg
                    className='w-7 h-7'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'>
                    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                  </svg>
                  <span>Consultar no WhatsApp</span>
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </button>

                <Link href='/contato'>
                  <button className='inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm border-2 border-white/60 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-[var(--primary)] transition-all duration-300'>
                    <span>Outros Contatos</span>
                  </button>
                </Link>
              </div>

              <div className='inline-flex items-center gap-2 text-sm text-white/80'>
                <Shield className='w-4 h-4' />
                <span>Atendimento especializado • Resposta rápida</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
