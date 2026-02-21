'use client'

import { Search, ShoppingCart, Package, CheckCircle, Headphones, CreditCard,
  Smartphone,
  Receipt,
  Building2, Shield, ArrowRight, Laptop, Store, Link } from 'lucide-react'
import { motion } from 'motion/react'

export function ComoComprarPageClient() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Encontre seu Produto',
      description: 'Navegue pelo catálogo, use a busca ou filtros por marca/categoria. Cada produto mostra compatibilidade, especificações técnicas e disponibilidade em estoque.',
      gradient: 'from-blue-600 to-blue-700',
      tips: ['Use a busca por código da peça', 'Filtre por marca do equipamento', 'Consulte compatibilidade na descrição']
    },
    {
      number: '02',
      icon: ShoppingCart,
      title: 'Adicione ao Carrinho',
      description: 'Selecione a quantidade desejada e clique em "Adicionar ao Carrinho". Você pode continuar comprando ou ir direto para o checkout. Seu carrinho fica salvo automaticamente.',
      gradient: 'from-emerald-600 to-emerald-700',
      tips: ['Revise a quantidade antes de adicionar', 'Consulte o resumo do carrinho', 'Aproveite cupons de desconto']
    },
    {
      number: '03',
      icon: CreditCard,
      title: 'Escolha o Pagamento',
      description: 'Informe seus dados (nome, CPF/CNPJ, endereço, telefone) e escolha a forma de pagamento: PIX (5% desconto), Cartão (até 12x), Boleto (3% desconto) ou Faturamento PJ.',
      gradient: 'from-amber-600 to-amber-700',
      tips: ['PIX tem aprovação instantânea', 'Cartão: parcele em até 12x', 'Empresas: faturamento 30/60 dias']
    },
    {
      number: '04',
      icon: Package,
      title: 'Receba em Casa ou Retire',
      description: 'Após confirmação do pagamento, você recebe o código de rastreamento por e-mail/SMS. Acompanhe a entrega em tempo real ou retire em nossa loja em Contagem/Betim.',
      gradient: 'from-purple-600 to-purple-700',
      tips: ['Rastreie pelo site da transportadora', 'Retirada em até 24h (estoque)', 'Frete grátis acima de R$ 1.500 (BH)']
    }
  ]

const paymentMethods = [
  {
    icon: CreditCard,
    title: 'Cartão de Crédito',
    description: 'Parcelamento em até 12x',
    badge: 'Aprovação rápida',
    color: 'blue'
  },
  {
    icon: Smartphone,
    title: 'PIX',
    description: 'Aprovação instantânea',
    badge: '5% de desconto',
    color: 'emerald'
  },
  {
    icon: Receipt,
    title: 'Boleto Bancário',
    description: 'Vencimento em 3 dias úteis',
    badge: '3% de desconto',
    color: 'amber'
  },
  {
    icon: Building2,
    title: 'Faturamento PJ',
    description: 'Condições especiais para empresas',
    badge: '30/60 dias',
    color: 'purple'
  }
]

  const channels = [
    {
      icon: Laptop,
      title: 'Site',
      description: 'Navegue pelo catálogo completo, compare produtos e finalize sua compra com segurança',
      link: '/produtos',
      linkText: 'Ver Catálogo'
    },
    {
      icon: Smartphone,
      title: 'WhatsApp',
      description: 'Atendimento personalizado, tire dúvidas técnicas e faça pedidos direto pelo chat',
      link: 'https://wa.me/5563999828455',
      linkText: '(63) 99982-8455'
    },
    {
      icon: Store,
      title: 'Loja Física',
      description: 'Visite nossas unidades em Contagem ou Betim para atendimento presencial',
      link: '/lojas',
      linkText: 'Ver Endereços'
    }
  ]

  const faqs = [
    {
      question: 'Como sei qual peça é compatível?',
      answer: 'Cada produto lista os modelos compatíveis. Nossa equipe técnica também auxilia via WhatsApp. Informe modelo, série e ano do equipamento ou envie foto da placa de identificação.'
    },
    {
      question: 'Posso parcelar sem juros?',
      answer: 'Sim! Parcelamento em até 12x no cartão de crédito para compras acima de R$ 300. PIX e Boleto têm desconto à vista. Empresas têm condições especiais de faturamento.'
    },
    {
      question: 'Qual o prazo de entrega?',
      answer: 'Pronta Entrega: 2-5 dias úteis (MG). Sob Encomenda: 7-15 dias. Importados: 20-30 dias. O prazo exato é calculado no checkout após informar o CEP.'
    },
    {
      question: 'Posso retirar na loja?',
      answer: 'Sim! Escolha "Retirar em Loja" no checkout. Seu pedido fica disponível em até 24h após confirmação do pagamento (produtos em estoque). Você recebe notificação quando estiver pronto.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-[var(--primary)] via-[#1a2d5e] to-[var(--primary)] text-white overflow-hidden" style={{ minHeight: '380px' }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-6">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h1 className="text-white mb-4">Como Comprar</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Comprar peças para tratores e máquinas pesadas nunca foi tão fácil e seguro
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                <Shield className="w-5 h-5" />
                <span className="font-bold">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                <Package className="w-5 h-5" />
                <span className="font-bold">Entrega Garantida</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                <Headphones className="w-5 h-5" />
                <span className="font-bold">Suporte Técnico</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-black text-4xl md:text-5xl text-[var(--neutral-900)] mb-5">
              Passo a Passo da Compra
            </h2>
            <p className="text-xl text-[var(--neutral-600)] max-w-3xl mx-auto">
              4 passos simples para receber suas peças originais com segurança
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[var(--secondary)] to-[#f4d348] rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
                    <span className="font-black text-2xl text-[var(--primary)]">{step.number}</span>
                  </div>

                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 ml-auto group-hover:scale-110 transition-transform shadow-xl`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-black text-2xl text-[var(--neutral-900)] mb-4">{step.title}</h3>
                  <p className="text-[var(--neutral-700)] leading-relaxed mb-6">{step.description}</p>

                  <div className="space-y-2">
                    {step.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-2 text-sm text-[var(--neutral-600)]">
                        <CheckCircle className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-black text-4xl md:text-5xl text-[var(--neutral-900)] mb-5">
              Formas de Pagamento
            </h2>
            <p className="text-xl text-[var(--neutral-600)] max-w-3xl mx-auto">
              Escolha a opção que melhor se adapta às suas necessidades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-gradient-to-br from-white to-slate-50 rounded-3xl border-2 border-gray-200 p-8 text-center hover:border-[var(--primary)]/50 hover:shadow-xl transition-all duration-500 group"
              >
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-${method.color}-600 to-${method.color}-700 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg`}>
                  {method.badge}
                </div>

                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform items-center justify-center"><method.icon /></div>
                <h3 className="font-black text-xl text-[var(--neutral-900)] mb-2">{method.title}</h3>
                <p className="text-sm text-[var(--neutral-600)]">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-black text-4xl md:text-5xl text-[var(--neutral-900)] mb-5">
              Onde Comprar
            </h2>
            <p className="text-xl text-[var(--neutral-600)] max-w-3xl mx-auto">
              Escolha o canal de atendimento mais conveniente para você
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {channels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border-2 border-gray-200 p-8 text-center hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[#1a2d5e] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <channel.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-black text-2xl text-[var(--neutral-900)] mb-4">{channel.title}</h3>
                <p className="text-[var(--neutral-700)] leading-relaxed mb-6">{channel.description}</p>
                <a
                  href={channel.link}
                  target={channel.link.startsWith('http') ? '_blank' : undefined}
                  rel={channel.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-black hover:bg-[#1a2d5e] transition-all"
                >
                  <span>{channel.linkText}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-black text-4xl md:text-5xl text-[var(--neutral-900)] mb-5">
              Dúvidas Frequentes
            </h2>
            <p className="text-xl text-[var(--neutral-600)] max-w-3xl mx-auto">
              Respostas rápidas para as perguntas mais comuns
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 border-gray-200 p-6 hover:border-[var(--primary)]/30 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-black text-lg text-[var(--neutral-900)] mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[var(--primary)]" />
                  {faq.question}
                </h3>
                <p className="text-[var(--neutral-700)] leading-relaxed ml-7">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a
              href="/contato"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--primary)] to-[#1a2d5e] text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Headphones className="w-6 h-6" />
              <span>Ver Todas as Perguntas Frequentes</span>
              <ArrowRight className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[#1a2d5e] to-[var(--primary)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="font-black text-4xl md:text-5xl mb-6">Pronto para Comprar?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Navegue pelo catálogo e encontre as peças certas para seu equipamento
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-3 bg-white text-[var(--primary)] px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl"
              >
                <Search className="w-6 h-6" />
                <span>Ver Catálogo Completo</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
              <a
                href="https://wa.me/5563999828455"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl"
              >
                <Smartphone className="w-6 h-6" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
