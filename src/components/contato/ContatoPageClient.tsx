'use client'

import { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Zap,
} from 'lucide-react'
import { storesData } from '@/data/stores'
import { siteConfig } from '@/data/site'
import Link from 'next/link'
import PageHero from '../common/PageHero'

export const ContatoPageClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='min-h-screen bg-white'>
      <PageHero
        breadcrumbs={[
          {
            label: 'Contato',
            href: '',
          },
        ]}
        title='Entre em contato'
        description='Estamos prontos para atender você. Escolha o canal de sua preferência'></PageHero>

      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid lg:grid-cols-3 gap-8 mb-12'>
            <div className='bg-gradient-to-br from-[var(--primary)] to-[#1a2d5e] text-white p-8 rounded-2xl'>
              <div className='w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4'>
                <Phone className='w-7 h-7' />
              </div>
              <h3 className='text-white mb-3'>Telefones</h3>
              <div className='space-y-2 mb-4'>
                {storesData.map((store) => (
                  <div key={store.id}>
                    {store.name}: {store.contact.phoneFormatted}
                  </div>
                ))}
              </div>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className='inline-block bg-white text-[var(--primary)] px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors'>
                Ligar Agora
              </a>
            </div>

            <div className='bg-gradient-to-br from-[#25D366] to-[#20BD5A] text-white p-8 rounded-2xl'>
              <div className='w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4'>
                <MessageCircle className='w-7 h-7' />
              </div>
              <h3 className='text-white mb-3'>WhatsApp</h3>
              <div className='space-y-2 mb-4'>
                {storesData.map((store) => (
                  <div key={store.id}>
                    {store.name}: {store.contact.whatsapp}
                  </div>
                ))}
              </div>
              <a
                href={siteConfig.contact.whatsappLink}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block bg-white text-[#25D366] px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors'>
                Enviar Mensagem
              </a>
            </div>

            <div className='bg-gradient-to-br from-[var(--secondary)] to-[#e6b815] text-[var(--neutral-900)] p-8 rounded-2xl'>
              <div className='w-14 h-14 bg-white/30 rounded-xl flex items-center justify-center mb-4'>
                <Mail className='w-7 h-7' />
              </div>
              <h3 className='mb-3 text-[var(--neutral-900)]'>E-mail</h3>
              <div className='space-y-2 mb-4 text-sm'>
                {Array.from(
                  new Set(storesData.map((s) => s.contact.email)),
                ).map((email) => (
                  <div key={email}>{email}</div>
                ))}
              </div>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className='inline-block bg-[var(--neutral-900)] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[var(--neutral-800)] transition-colors'>
                Enviar E-mail
              </a>
            </div>
          </div>

          <div className='grid lg:grid-cols-2 gap-12'>
            <div>
              <h2 className='mb-6'>Envie uma Mensagem</h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-[var(--neutral-700)] mb-2'>
                    Nome Completo *
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full border border-[var(--neutral-300)] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent'
                    placeholder='Seu nome'
                  />
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-[var(--neutral-700)] mb-2'>
                      E-mail *
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='w-full border border-[var(--neutral-300)] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent'
                      placeholder='seu@email.com'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-[var(--neutral-700)] mb-2'>
                      Telefone
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      className='w-full border border-[var(--neutral-300)] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent'
                      placeholder='(00) 00000-0000'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-[var(--neutral-700)] mb-2'>
                    Assunto *
                  </label>
                  <select
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className='w-full border border-[var(--neutral-300)] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent'>
                    <option value=''>Selecione o assunto</option>
                    <option value='orcamento'>Solicitar Orçamento</option>
                    <option value='produto'>Informações sobre Produto</option>
                    <option value='entrega'>Informações sobre Entrega</option>
                    <option value='garantia'>Questões de Garantia</option>
                    <option value='outro'>Outro</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-[var(--neutral-700)] mb-2'>
                    Mensagem *
                  </label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className='w-full border border-[var(--neutral-300)] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none'
                    placeholder='Descreva sua necessidade ou dúvida...'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-[var(--primary)] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors flex items-center justify-center gap-2'>
                  <Send className='w-5 h-5' />
                  Enviar Mensagem
                </button>
              </form>
            </div>

            <div>
              <h2 className='mb-4'>Outras Informações</h2>

              <div className='space-y-6 mb-2 '>
                <div className='flex gap-4 bg-[var(--neutral-50)] rounded-xl p-4'>
                  <div className='w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Clock className='w-6 h-6 text-[var(--primary)]' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Horário de Atendimento</h3>
                    <div className='text-[var(--neutral-700)]'>
                      <div>{siteConfig.businessHours.detailed}</div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-4 bg-[var(--neutral-50)] rounded-xl p-4 mt-6'>
                  <div className='w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-6 h-6 text-[var(--primary)]' />
                  </div>
                  <div className='flex-1 '>
                    <h3 className='mb-2 mt-2 font-semibold'>Nossas Lojas</h3>
                    <div className='text-[var(--neutral-700)] space-y-4'>
                      {storesData.map((store) => (
                        <div
                          key={store.id}
                          className='pb-3 border-b border-gray-100 last:border-0 last:pb-0'>
                          <div className='font-medium text-[var(--primary)]'>
                            {store.name}
                          </div>
                          <div className='text-sm'>
                            {store.address.street}, {store.address.number} -{' '}
                            {store.address.neighborhood}, {store.address.city}/
                            {store.address.state}
                          </div>
                          <div className='text-sm mt-1 text-[var(--neutral-500)]'>
                            CEP: {store.address.zipCode} • Tel:{' '}
                            {store.contact.phoneFormatted}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href='/lojas'
                      className='inline-block mt-4 text-[var(--primary)] font-medium hover:text-[var(--secondary)] transition-colors'>
                      Ver detalhes completos das lojas →
                    </Link>
                  </div>
                </div>
              </div>

              <div className='flex gap-4 bg-[var(--neutral-50)] rounded-xl p-4 mt-6'>
                <div className='w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <MapPin className='w-6 h-6 text-[var(--primary)]' />
                </div>
                <div className='flex-1 '>
                  <h3 className='mb-6 font-semibold mt-2'>
                    Canais de Atendimento
                  </h3>
                  <div className='space-y-4 text-sm'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0'>
                        <Zap className='w-4 h-4' />
                      </div>
                      <div>
                        <div className='font-medium'>WhatsApp</div>
                        <div className='text-[var(--neutral-600)]'>
                          Resposta em até 5 minutos
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0'>
                        <Mail className='w-4 h-4' />
                      </div>
                      <div>
                        <div className='font-medium'>E-mail</div>
                        <div className='text-[var(--neutral-600)]'>
                          Resposta em até 24 horas
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0'>
                        <Phone className='w-4 h-4' />
                      </div>
                      <div>
                        <div className='font-medium'>Telefone</div>
                        <div className='text-[var(--neutral-600)]'>
                          {siteConfig.businessHours.detailed}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
