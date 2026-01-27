'use client'

import { Shield, Package, CreditCard, RefreshCw, Lock, FileText, AlertCircle, CheckCircle, Clock, Phone } from 'lucide-react'
import { motion } from 'motion/react'

export function PoliticasPageClient() {
  const sections = [
    {
      id: 'privacidade',
      icon: Lock,
      title: 'Política de Privacidade (LGPD)',
      gradient: 'from-blue-600 to-blue-700',
      items: [
        {
          subtitle: 'Coleta de Dados',
          content: 'Coletamos apenas dados necessários para processar seu pedido: nome, CPF/CNPJ, endereço, telefone e e-mail. Dados de pagamento são processados por gateways certificados e não são armazenados em nossos servidores.'
        },
        {
          subtitle: 'Uso das Informações',
          content: 'Seus dados são utilizados exclusivamente para: processar e entregar pedidos, emitir notas fiscais, comunicar sobre o status do pedido, e enviar ofertas promocionais (apenas com seu consentimento).'
        },
        {
          subtitle: 'Seus Direitos (LGPD)',
          content: 'Você tem direito a acessar, corrigir, excluir ou solicitar portabilidade dos seus dados. Para exercer seus direitos, entre em contato via privacidade@mgtratopecas.com.br. Respondemos em até 48 horas.'
        },
        {
          subtitle: 'Compartilhamento',
          content: 'Compartilhamos dados apenas com transportadoras (para entrega), gateways de pagamento (para processar transações), e emissores de nota fiscal. Nunca vendemos seus dados a terceiros.'
        },
        {
          subtitle: 'Cookies e Rastreamento',
          content: 'Utilizamos cookies para melhorar sua experiência de navegação, lembrar itens no carrinho e analisar tráfego do site. Você pode desabilitar cookies nas configurações do navegador.'
        }
      ]
    },
    {
      id: 'trocas',
      icon: RefreshCw,
      title: 'Política de Trocas e Devoluções',
      gradient: 'from-emerald-600 to-emerald-700',
      items: [
        {
          subtitle: 'Prazo de Arrependimento (CDC Art. 49)',
          content: 'Você tem até 7 dias corridos após o recebimento para desistir da compra sem necessidade de justificativa. O prazo conta a partir da data de recebimento do produto.'
        },
        {
          subtitle: 'Condições para Troca/Devolução',
          content: 'Peças devem estar: sem uso e sem instalação, na embalagem original lacrada, com nota fiscal e todos os acessórios. Não aceitamos devolução de peças com embalagem violada ou sinais de uso.'
        },
        {
          subtitle: 'Como Solicitar',
          content: 'Entre em contato pelo WhatsApp (31) 99875-3200 ou e-mail trocas@mgtratopecas.com.br informando número do pedido e motivo. Enviaremos instruções e código de autorização em até 24 horas.'
        },
        {
          subtitle: 'Frete de Devolução',
          content: 'Arrependimento (CDC): frete por conta do cliente. Defeito de fabricação ou erro no envio: frete por nossa conta. Produto trocado: envio do novo produto sem custo adicional.'
        },
        {
          subtitle: 'Reembolso',
          content: 'Após recebermos e inspecionarmos o produto, o reembolso é processado em até 7 dias úteis na mesma forma de pagamento original. Compras no cartão: estorno em 1-2 faturas. PIX/Boleto: depósito bancário.'
        },
        {
          subtitle: 'Produtos Sob Encomenda/Importados',
          content: 'Peças sob encomenda ou importadas especialmente para você só podem ser trocadas em caso de defeito de fabricação ou erro no envio. Não aplicável direito de arrependimento (CDC Art. 49, §3º).'
        }
      ]
    },
    {
      id: 'garantia',
      icon: Shield,
      title: 'Política de Garantia',
      gradient: 'from-amber-600 to-amber-700',
      items: [
        {
          subtitle: 'Cobertura de Garantia',
          content: 'Peças Genuínas Originais: 12 meses de garantia de fábrica contra defeitos de fabricação. Peças Compatíveis Certificadas: 6 meses de garantia contra defeitos de fabricação. A garantia não cobre desgaste natural ou uso inadequado.'
        },
        {
          subtitle: 'O Que a Garantia Cobre',
          content: 'Defeitos de fabricação, falhas de material, peças com desempenho abaixo do especificado pelo fabricante. A garantia cobre reparo ou substituição da peça defeituosa sem custo.'
        },
        {
          subtitle: 'O Que a Garantia NÃO Cobre',
          content: 'Instalação incorreta, uso inadequado ou abusivo, manutenção inadequada, desgaste natural, danos causados por acidentes, uso de peças não originais/compatíveis em conjunto, modificações não autorizadas.'
        },
        {
          subtitle: 'Como Acionar a Garantia',
          content: 'Entre em contato com nossa equipe técnica via WhatsApp ou e-mail. Informe número da nota fiscal, fotos da peça e descrição do problema. Enviaremos instruções para análise técnica. Prazo de análise: até 30 dias.'
        },
        {
          subtitle: 'Requisitos Obrigatórios',
          content: 'Nota fiscal original, peça com numeração visível, sem sinais de violação ou tentativa de reparo, e instalação conforme manual do fabricante. Sem nota fiscal, a garantia não pode ser acionada.'
        }
      ]
    },
    {
      id: 'entrega',
      icon: Package,
      title: 'Política de Entrega e Frete',
      gradient: 'from-purple-600 to-purple-700',
      items: [
        {
          subtitle: 'Prazos de Entrega',
          content: 'Pronta Entrega (estoque): 2-5 dias úteis (MG e região metropolitana), 5-10 dias úteis (outras regiões). Sob Encomenda: 7-15 dias úteis + prazo de entrega. Importados: 20-30 dias úteis + prazo de entrega. Prazo conta após confirmação do pagamento.'
        },
        {
          subtitle: 'Cálculo do Frete',
          content: 'Calculado automaticamente no checkout baseado em: CEP de destino, peso e dimensões dos produtos, e modalidade de entrega (PAC, SEDEX, transportadora). Você visualiza o valor antes de finalizar a compra.'
        },
        {
          subtitle: 'Frete Grátis',
          content: 'Região Metropolitana BH: pedidos acima de R$ 1.500. Outras regiões de MG: pedidos acima de R$ 2.500. Válido apenas para produtos em Pronta Entrega. Promoções podem ter condições diferentes.'
        },
        {
          subtitle: 'Rastreamento',
          content: 'Após o envio, você recebe por e-mail e SMS o código de rastreamento. Acesse a área "Meus Pedidos" ou consulte diretamente no site da transportadora. Atualizações automáticas sobre o status da entrega.'
        },
        {
          subtitle: 'Retirada em Loja',
          content: 'Disponível nas unidades de Contagem e Betim. Sem custo de frete. Pedido disponível em até 24h após confirmação do pagamento (produtos em estoque). Você recebe notificação quando estiver pronto para retirada.'
        },
        {
          subtitle: 'Problemas na Entrega',
          content: 'Produto não chegou no prazo: entre em contato imediatamente. Produto danificado no transporte: não aceite a entrega e fotografe a embalagem. Produto errado: entre em contato em até 24h após recebimento. Providenciamos solução imediata.'
        }
      ]
    },
    {
      id: 'pagamento',
      icon: CreditCard,
      title: 'Política de Pagamento',
      gradient: 'from-rose-600 to-rose-700',
      items: [
        {
          subtitle: 'Formas de Pagamento Aceitas',
          content: 'PIX: aprovação instantânea, desconto de 5% à vista. Cartão de Crédito: parcelamento em até 12x (compras acima de R$ 300), aprovação em minutos. Boleto Bancário: vencimento em 3 dias úteis, desconto de 3% à vista. Faturamento (PJ): condições especiais mediante análise de crédito.'
        },
        {
          subtitle: 'Segurança das Transações',
          content: 'Todas as transações são protegidas por criptografia SSL. Dados de cartão processados por gateways certificados PCI DSS. Não armazenamos dados completos de cartão de crédito. Ambiente 100% seguro.'
        },
        {
          subtitle: 'Confirmação de Pagamento',
          content: 'PIX: confirmação instantânea. Cartão de Crédito: aprovação em até 1 hora. Boleto: confirmação em até 3 dias úteis após pagamento. Você recebe e-mail de confirmação assim que o pagamento é aprovado.'
        },
        {
          subtitle: 'Cancelamento e Reembolso',
          content: 'Cancelamento gratuito antes do envio. Após envio, siga processo de devolução. Reembolso processado em até 7 dias úteis. Cartão: estorno em 1-2 faturas. PIX/Boleto: depósito em conta informada.'
        },
        {
          subtitle: 'Condições Especiais para Empresas',
          content: 'Faturamento 30/60 dias (análise de crédito). Descontos para grandes volumes. Orçamentos personalizados. Atendimento comercial dedicado. Contato: comercial@mgtratopecas.com.br ou (31) 3368-4500.'
        }
      ]
    },
    {
      id: 'termos',
      icon: FileText,
      title: 'Termos de Uso',
      gradient: 'from-slate-600 to-slate-700',
      items: [
        {
          subtitle: 'Aceitação dos Termos',
          content: 'Ao acessar e usar este site, você concorda com estes Termos de Uso e nossa Política de Privacidade. Se não concordar, não utilize o site. Reservamos o direito de modificar estes termos a qualquer momento.'
        },
        {
          subtitle: 'Uso do Site',
          content: 'Este site destina-se exclusivamente para: consulta de produtos, realização de pedidos, e acesso a informações sobre nossos serviços. É proibido: uso para fins ilícitos, tentativas de invasão ou hacking, cópia não autorizada de conteúdo, e uso de robôs/scrapers sem autorização.'
        },
        {
          subtitle: 'Cadastro e Conta',
          content: 'Você é responsável por: manter a confidencialidade da senha, todas as atividades realizadas em sua conta, e informações cadastrais corretas e atualizadas. Contas com dados falsos serão suspensas imediatamente.'
        },
        {
          subtitle: 'Preços e Disponibilidade',
          content: 'Preços estão sujeitos a alteração sem aviso prévio. Disponibilidade de produtos é atualizada em tempo real, mas não garantida. Em caso de indisponibilidade após confirmação, você será notificado e poderá cancelar o pedido com reembolso integral.'
        },
        {
          subtitle: 'Propriedade Intelectual',
          content: 'Todo conteúdo deste site (textos, imagens, logos, códigos) é protegido por direitos autorais e propriedade da MG Trator Peças ou licenciado. É proibida reprodução sem autorização expressa.'
        },
        {
          subtitle: 'Limitação de Responsabilidade',
          content: 'Não nos responsabilizamos por: danos causados por instalação incorreta de peças, incompatibilidade não identificada pelo cliente, problemas de terceiros (transportadoras, gateways), e interrupções temporárias do site para manutenção.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-[var(--primary)] via-[#1a2d5e] to-[var(--primary)] text-white overflow-hidden" style={{ minHeight: '320px' }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-white mb-4">Políticas e Termos</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Compre com segurança e transparência. Conheça nossas políticas de privacidade, trocas, garantia e termos de uso.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-0 z-40 bg-white border-b-2 border-gray-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all duration-300 whitespace-nowrap"
              >
                <section.icon className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-gray-700 group-hover:text-[var(--primary)]">
                  {section.title.split(':')[0].replace('Política de ', '').replace('Termos de ', '')}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4 space-y-16">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="scroll-mt-32"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                  <section.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="font-black text-3xl text-[var(--neutral-900)]">{section.title}</h2>
                </div>
              </div>

              <div className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIndex * 0.05 }}
                    className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-[var(--primary)]/30 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-black text-lg text-[var(--neutral-900)] mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[var(--primary)]" />
                      {item.subtitle}
                    </h3>
                    <p className="text-[var(--neutral-700)] leading-relaxed">{item.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[var(--primary)] to-[#1a2d5e] rounded-3xl p-10 text-white text-center shadow-2xl"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="font-black text-3xl mb-4">Ficou com Alguma Dúvida?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para esclarecer qualquer questão sobre nossas políticas
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5531998753200"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white text-[var(--primary)] px-8 py-4 rounded-xl font-black hover:scale-105 transition-transform"
              >
                <Phone className="w-5 h-5" />
                WhatsApp: (31) 99875-3200
              </a>
              <a
                href="mailto:contato@mgtratopecas.com.br"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-black hover:bg-white/20 transition-all"
              >
                <FileText className="w-5 h-5" />
                contato@mgtratopecas.com.br
              </a>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              Horário de atendimento: Segunda a Sexta, 8h às 18h | Sábado, 8h às 12h
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
