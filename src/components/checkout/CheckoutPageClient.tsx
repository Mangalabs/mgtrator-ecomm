'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Package,
  Truck,
  Tag,
  AlertCircle,
  Loader2,
  Copy,
  Check
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'
import type { CheckoutFormData } from '@/data/types'

type CheckoutStep = 'customer' | 'shipping' | 'payment' | 'review'

interface PaymentInfo {
  pixQrCode?: string
  pixCopyPaste?: string
  cardBrand?: string
  boletoUrl?: string
  boletoBarcode?: string
}

export function CheckoutPageClient() {
  const router = useRouter()
  const { items, subtotal, discount, total, itemCount, clearCart, coupon } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({})
  const [copiedPix, setCopiedPix] = useState(false)

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    cpfCnpj: '',
    shippingAddress: {
      type: 'shipping',
      recipientName: '',
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      country: 'Brasil',
      phone: ''
    },
    useSameAddress: true,
    paymentMethod: 'pix',
    acceptTerms: false,
    acceptNewsletter: false,
    notes: ''
  })

  const [loadingCep, setLoadingCep] = useState(false)
  const [shippingCost] = useState(50)

  useEffect(() => {
    if (itemCount === 0 && !orderCompleted) {
      router.push('/carrinho')
    }
  }, [itemCount, orderCompleted, router])

  useEffect(() => {
    if (formData.customerName && !formData.shippingAddress.recipientName) {
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          recipientName: prev.customerName
        }
      }))
    }
  }, [formData.customerName])

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }

  const formatCpfCnpj = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
    }
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5')
  }

  const formatCep = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    return cleaned.replace(/(\d{5})(\d{0,3})/, '$1-$2')
  }

  const searchCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8) return

    setLoadingCep(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await response.json()

      if (data.erro) {
        toast.error('CEP não encontrado')
        return
      }

      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          zipCode: cep
        }
      }))
      toast.success('Endereço encontrado!')
    } catch (error) {
      toast.error('Erro ao buscar CEP')
    } finally {
      setLoadingCep(false)
    }
  }

  const validateStep = (step: CheckoutStep): boolean => {
    switch (step) {
      case 'customer':
        if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.cpfCnpj) {
          toast.error('Preencha todos os campos obrigatórios')
          return false
        }
        if (!formData.customerEmail.includes('@')) {
          toast.error('Email inválido')
          return false
        }
        return true

      case 'shipping':
        const addr = formData.shippingAddress
        if (!addr.zipCode || !addr.street || !addr.number || !addr.neighborhood || !addr.city || !addr.state) {
          toast.error('Preencha todos os campos do endereço')
          return false
        }
        return true

      case 'payment':
        if (!formData.paymentMethod) {
          toast.error('Selecione um método de pagamento')
          return false
        }
        return true

      case 'review':
        if (!formData.acceptTerms) {
          toast.error('Você precisa aceitar os termos e condições')
          return false
        }
        return true

      default:
        return true
    }
  }

  const goToStep = (step: CheckoutStep) => {
    const steps: CheckoutStep[] = ['customer', 'shipping', 'payment', 'review']
    const currentIndex = steps.indexOf(currentStep)
    const targetIndex = steps.indexOf(step)

    if (targetIndex > currentIndex) {
      if (!validateStep(currentStep)) return
    }

    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const nextStep = () => {
    const steps: CheckoutStep[] = ['customer', 'shipping', 'payment', 'review']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      goToStep(steps[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const steps: CheckoutStep[] = ['customer', 'shipping', 'payment', 'review']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      goToStep(steps[currentIndex - 1])
    }
  }

  const processOrder = async () => {
    if (!validateStep('review')) return

    setIsProcessing(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const orderNum = `MG${Date.now().toString().slice(-8)}`
      setOrderNumber(orderNum)

      const paymentData: PaymentInfo = {}
      if (formData.paymentMethod === 'pix') {
        paymentData.pixQrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
        paymentData.pixCopyPaste = '00020126580014BR.GOV.BCB.PIX0136' + orderNum
      } else if (formData.paymentMethod === 'bank_slip') {
        paymentData.boletoUrl = '/boleto/' + orderNum
        paymentData.boletoBarcode = '34191.79001 01043.510047 91020.150008 1 96610000050000'
      }

      setPaymentInfo(paymentData)
      setOrderCompleted(true)

      clearCart()

      toast.success('Pedido realizado com sucesso!', {
        description: `Número do pedido: ${orderNum}`
      })
    } catch (error) {
      toast.error('Erro ao processar pedido')
    } finally {
      setIsProcessing(false)
    }
  }

  const copyPixCode = () => {
    if (paymentInfo.pixCopyPaste) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(paymentInfo.pixCopyPaste)
          .then(() => {
            setCopiedPix(true)
            toast.success('Código PIX copiado!')
            setTimeout(() => setCopiedPix(false), 2000)
          })
          .catch(() => {
            copyToClipboardFallback(paymentInfo.pixCopyPaste!)
          })
      } else {
        copyToClipboardFallback(paymentInfo.pixCopyPaste)
      }
    }
  }

  const copyToClipboardFallback = (text: string) => {
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      
      if (successful) {
        setCopiedPix(true)
        toast.success('Código PIX copiado!')
        setTimeout(() => setCopiedPix(false), 2000)
      } else {
        toast.error('Não foi possível copiar. Selecione o texto manualmente.')
      }
    } catch (err) {
      toast.error('Não foi possível copiar. Selecione o texto manualmente.')
    }
  }

  if (orderCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border-2 border-[var(--neutral-200)] p-8 md:p-12 text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-[var(--neutral-900)] mb-4">Pedido Realizado com Sucesso!</h1>
          <p className="text-xl text-[var(--neutral-600)] mb-8">
            Número do pedido: <span className="font-black text-[var(--primary)]">{orderNumber}</span>
          </p>

          {formData.paymentMethod === 'pix' && paymentInfo.pixCopyPaste && (
            <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-2xl p-8 mb-8 border-2 border-[var(--primary)]/20">
              <h3 className="font-bold text-xl text-[var(--neutral-900)] mb-4">Pagamento via PIX</h3>
              <p className="text-[var(--neutral-600)] mb-6">Escaneie o QR Code ou copie o código abaixo:</p>
              
              <div className="bg-white p-4 rounded-xl inline-block mb-4">
                <div className="w-48 h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                  <Package className="w-16 h-16 text-[var(--primary)]" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-[var(--neutral-200)] mb-4">
                <p className="text-xs text-[var(--neutral-600)] font-mono break-all">
                  {paymentInfo.pixCopyPaste}
                </p>
              </div>

              <button
                onClick={copyPixCode}
                className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1a2d5f] transition-all inline-flex items-center gap-2"
              >
                {copiedPix ? (
                  <>
                    <Check className="w-5 h-5" />
                    Código Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar Código PIX
                  </>
                )}
              </button>

              <p className="text-sm text-[var(--neutral-500)] mt-4">
                O pagamento será confirmado em até 2 horas
              </p>
            </div>
          )}

          {formData.paymentMethod === 'bank_slip' && paymentInfo.boletoBarcode && (
            <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-2xl p-8 mb-8 border-2 border-[var(--primary)]/20">
              <h3 className="font-bold text-xl text-[var(--neutral-900)] mb-4">Pagamento via Boleto</h3>
              <p className="text-[var(--neutral-600)] mb-6">Código de barras:</p>
              
              <div className="bg-white rounded-xl p-4 border-2 border-[var(--neutral-200)] mb-4">
                <p className="text-sm text-[var(--neutral-900)] font-mono">
                  {paymentInfo.boletoBarcode}
                </p>
              </div>

              <button
                className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1a2d5f] transition-all inline-flex items-center gap-2"
              >
                Baixar Boleto
              </button>

              <p className="text-sm text-[var(--neutral-500)] mt-4">
                Vencimento: 3 dias úteis
              </p>
            </div>
          )}

          {formData.paymentMethod === 'credit_card' && (
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8 mb-8 border-2 border-green-200">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-lg text-green-900 font-semibold">Pagamento aprovado!</p>
              <p className="text-sm text-green-700 mt-2">Seu pedido será processado em breve</p>
            </div>
          )}

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
            <h4 className="font-bold text-[var(--neutral-900)] mb-4">Resumo do Pedido</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--neutral-600)]">Subtotal</span>
                <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--neutral-600)]">Frete</span>
                <span className="font-semibold">R$ {shippingCost.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto</span>
                  <span className="font-semibold">- R$ {discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t-2 border-[var(--neutral-300)] pt-2 flex justify-between text-lg font-bold text-[var(--primary)]">
                <span>Total</span>
                <span>R$ {(total + shippingCost).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-xl font-bold hover:bg-[var(--primary)]/5 transition-all"
            >
              Voltar para Home
            </button>
            <button
              onClick={() => router.push('/produtos')}
              className="px-8 py-3 bg-[var(--primary)] text-white rounded-xl font-bold hover:bg-[#1a2d5f] transition-all"
            >
              Continuar Comprando
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.push('/carrinho')}
          className="inline-flex items-center gap-2 text-[var(--neutral-600)] hover:text-[var(--primary)] transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para o carrinho
        </button>
        <h1 className="text-[var(--neutral-900)] mb-2">Finalizar Compra</h1>
        <p className="text-lg text-[var(--neutral-600)]">
          Complete as informações abaixo para finalizar seu pedido
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { id: 'customer' as CheckoutStep, label: 'Seus Dados', icon: User },
            { id: 'shipping' as CheckoutStep, label: 'Entrega', icon: MapPin },
            { id: 'payment' as CheckoutStep, label: 'Pagamento', icon: CreditCard },
            { id: 'review' as CheckoutStep, label: 'Revisão', icon: CheckCircle2 }
          ].map((step, index, array) => {
            const steps: CheckoutStep[] = ['customer', 'shipping', 'payment', 'review']
            const currentIndex = steps.indexOf(currentStep)
            const stepIndex = steps.indexOf(step.id)
            const isActive = currentIndex === stepIndex
            const isCompleted = currentIndex > stepIndex

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => goToStep(step.id)}
                    disabled={stepIndex > currentIndex}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30'
                        : 'bg-[var(--neutral-200)] text-[var(--neutral-500)]'
                    } ${stepIndex <= currentIndex ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </button>
                  <span className={`text-xs mt-2 font-semibold hidden sm:block ${
                    isActive ? 'text-[var(--primary)]' : 'text-[var(--neutral-500)]'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < array.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded transition-colors ${
                    isCompleted ? 'bg-green-500' : 'bg-[var(--neutral-200)]'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl border-2 border-[var(--neutral-200)] p-6 md:p-8"
            >
              {currentStep === 'customer' && (
                <div>
                  <h2 className="font-bold text-2xl text-[var(--neutral-900)] mb-6">Seus Dados</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                        placeholder="João Silva"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.customerEmail}
                          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                          placeholder="joao@exemplo.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          value={formData.customerPhone}
                          onChange={(e) => setFormData({ ...formData, customerPhone: formatPhone(e.target.value) })}
                          className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                          placeholder="(31) 99999-9999"
                          maxLength={15}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                        CPF/CNPJ *
                      </label>
                      <input
                        type="text"
                        value={formData.cpfCnpj}
                        onChange={(e) => setFormData({ ...formData, cpfCnpj: formatCpfCnpj(e.target.value) })}
                        className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                        placeholder="000.000.000-00"
                        maxLength={18}
                      />
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Seus dados estão seguros</p>
                        <p className="text-blue-700">
                          Utilizamos criptografia e seguimos as normas da LGPD para proteger suas informações.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'shipping' && (
                <div>
                  <h2 className="font-bold text-2xl text-[var(--neutral-900)] mb-6">Endereço de Entrega</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                        Nome do Destinatário *
                      </label>
                      <input
                        type="text"
                        value={formData.shippingAddress.recipientName}
                        onChange={(e) => setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, recipientName: e.target.value }
                        })}
                        className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                        placeholder="Quem vai receber?"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                          CEP *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.shippingAddress.zipCode}
                            onChange={(e) => {
                              const formatted = formatCep(e.target.value)
                              setFormData({
                                ...formData,
                                shippingAddress: { ...formData.shippingAddress, zipCode: formatted }
                              })
                              if (formatted.replace(/\D/g, '').length === 8) {
                                searchCep(formatted)
                              }
                            }}
                            className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                            placeholder="00000-000"
                            maxLength={9}
                          />
                          {loadingCep && (
                            <Loader2 className="w-5 h-5 text-[var(--primary)] animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          value={formData.shippingAddress.phone || formData.customerPhone}
                          onChange={(e) => setFormData({
                            ...formData,
                            shippingAddress: { ...formData.shippingAddress, phone: formatPhone(e.target.value) }
                          })}
                          className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                          placeholder="(31) 9999-9999"
                          maxLength={15}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                        Endereço *
                      </label>
                      <input
                        type="text"
                        value={formData.shippingAddress.street}
                        onChange={(e) => setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, street: e.target.value }
                        })}
                        className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                        placeholder="Rua, Avenida..."
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                          Número *
                        </label>
                        <input
                          type="text"
                          value={formData.shippingAddress.number}
                          onChange={(e) => setFormData({
                            ...formData,
                            shippingAddress: { ...formData.shippingAddress, number: e.target.value }
                          })}
                          className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                          placeholder="123"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                          Complemento
                        </label>
                        <input
                          type="text"
                          value={formData.shippingAddress.complement}
                          onChange={(e) => setFormData({
                            ...formData,
                            shippingAddress: { ...formData.shippingAddress, complement: e.target.value }
                          })}
                          className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                          placeholder="Apto, Bloco, Sala..."
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          value={formData.shippingAddress.neighborhood}
                          onChange={(e) => setFormData({
                            ...formData,
                            shippingAddress: { ...formData.shippingAddress, neighborhood: e.target.value }
                          })}
                          className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                          placeholder="Centro"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          value={formData.shippingAddress.city}
                          onChange={(e) => setFormData({
                            ...formData,
                            shippingAddress: { ...formData.shippingAddress, city: e.target.value }
                          })}
                          className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                          placeholder="Contagem"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                        Estado *
                      </label>
                      <select
                        value={formData.shippingAddress.state}
                        onChange={(e) => setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, state: e.target.value }
                        })}
                        className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                      >
                        <option value="">Selecione o estado</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="BA">Bahia</option>
                        <option value="GO">Goiás</option>
                      </select>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex gap-3">
                      <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Entrega em toda região metropolitana</p>
                        <p className="text-blue-700">
                          Prazo estimado: 3-5 dias úteis para Contagem e Betim
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'payment' && (
                <div>
                  <h2 className="font-bold text-2xl text-[var(--neutral-900)] mb-6">Método de Pagamento</h2>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                      className={`w-full p-6 border-2 rounded-2xl transition-all text-left ${
                        formData.paymentMethod === 'pix'
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--neutral-200)] hover:border-[var(--primary)]/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          formData.paymentMethod === 'pix'
                            ? 'border-[var(--primary)] bg-[var(--primary)]'
                            : 'border-[var(--neutral-300)]'
                        }`}>
                          {formData.paymentMethod === 'pix' && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Package className="w-6 h-6 text-[var(--primary)]" />
                            <h3 className="font-bold text-lg text-[var(--neutral-900)]">PIX</h3>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                              Aprovação instantânea
                            </span>
                          </div>
                          <p className="text-sm text-[var(--neutral-600)]">
                            Pagamento instantâneo via QR Code ou Copia e Cola
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                      className={`w-full p-6 border-2 rounded-2xl transition-all text-left ${
                        formData.paymentMethod === 'credit_card'
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--neutral-200)] hover:border-[var(--primary)]/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          formData.paymentMethod === 'credit_card'
                            ? 'border-[var(--primary)] bg-[var(--primary)]'
                            : 'border-[var(--neutral-300)]'
                        }`}>
                          {formData.paymentMethod === 'credit_card' && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CreditCard className="w-6 h-6 text-[var(--primary)]" />
                            <h3 className="font-bold text-lg text-[var(--neutral-900)]">Cartão de Crédito</h3>
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">
                              Em até 12x
                            </span>
                          </div>
                          <p className="text-sm text-[var(--neutral-600)]">
                            Parcelamento em até 12x sem juros
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setFormData({ ...formData, paymentMethod: 'bank_slip' })}
                      className={`w-full p-6 border-2 rounded-2xl transition-all text-left ${
                        formData.paymentMethod === 'bank_slip'
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--neutral-200)] hover:border-[var(--primary)]/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          formData.paymentMethod === 'bank_slip'
                            ? 'border-[var(--primary)] bg-[var(--primary)]'
                            : 'border-[var(--neutral-300)]'
                        }`}>
                          {formData.paymentMethod === 'bank_slip' && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Package className="w-6 h-6 text-[var(--primary)]" />
                            <h3 className="font-bold text-lg text-[var(--neutral-900)]">Boleto Bancário</h3>
                          </div>
                          <p className="text-sm text-[var(--neutral-600)]">
                            Vencimento em 3 dias úteis
                          </p>
                        </div>
                      </div>
                    </button>

                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-900">
                        <p className="font-semibold mb-1">Pagamento 100% seguro</p>
                        <p className="text-green-700">
                          Ambiente protegido com certificado SSL e criptografia de dados
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'review' && (
                <div>
                  <h2 className="font-bold text-2xl text-[var(--neutral-900)] mb-6">Revisão do Pedido</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-[var(--neutral-900)]">Dados do Cliente</h3>
                        <button
                          onClick={() => setCurrentStep('customer')}
                          className="text-sm text-[var(--primary)] hover:underline"
                        >
                          Editar
                        </button>
                      </div>
                      <div className="space-y-1 text-sm text-[var(--neutral-600)]">
                        <p><span className="font-semibold">Nome:</span> {formData.customerName}</p>
                        <p><span className="font-semibold">Email:</span> {formData.customerEmail}</p>
                        <p><span className="font-semibold">Telefone:</span> {formData.customerPhone}</p>
                        <p><span className="font-semibold">CPF/CNPJ:</span> {formData.cpfCnpj}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-[var(--neutral-900)]">Endereço de Entrega</h3>
                        <button
                          onClick={() => setCurrentStep('shipping')}
                          className="text-sm text-[var(--primary)] hover:underline"
                        >
                          Editar
                        </button>
                      </div>
                      <div className="text-sm text-[var(--neutral-600)]">
                        <p className="font-semibold mb-1">{formData.shippingAddress.recipientName}</p>
                        <p>
                          {formData.shippingAddress.street}, {formData.shippingAddress.number}
                          {formData.shippingAddress.complement && ` - ${formData.shippingAddress.complement}`}
                        </p>
                        <p>{formData.shippingAddress.neighborhood}</p>
                        <p>{formData.shippingAddress.city} - {formData.shippingAddress.state}</p>
                        <p>CEP: {formData.shippingAddress.zipCode}</p>
                        <p className="mt-2">Telefone: {formData.shippingAddress.phone || formData.customerPhone}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-[var(--neutral-900)]">Método de Pagamento</h3>
                        <button
                          onClick={() => setCurrentStep('payment')}
                          className="text-sm text-[var(--primary)] hover:underline"
                        >
                          Editar
                        </button>
                      </div>
                      <p className="text-sm text-[var(--neutral-600)]">
                        {formData.paymentMethod === 'pix' && '💳 PIX'}
                        {formData.paymentMethod === 'credit_card' && '💳 Cartão de Crédito'}
                        {formData.paymentMethod === 'bank_slip' && '📄 Boleto Bancário'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[var(--neutral-700)] mb-2">
                        Observações (Opcional)
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                        rows={3}
                        placeholder="Alguma informação adicional sobre o pedido?"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                          className="mt-1 w-5 h-5 accent-[var(--primary)]"
                        />
                        <span className="text-sm text-[var(--neutral-700)]">
                          Li e aceito os <button className="text-[var(--primary)] hover:underline">termos e condições</button> e a <button className="text-[var(--primary)] hover:underline">política de privacidade</button> *
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.acceptNewsletter}
                          onChange={(e) => setFormData({ ...formData, acceptNewsletter: e.target.checked })}
                          className="mt-1 w-5 h-5 accent-[var(--primary)]"
                        />
                        <span className="text-sm text-[var(--neutral-700)]">
                          Quero receber ofertas e novidades por email
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                {currentStep !== 'customer' && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-xl font-bold hover:bg-[var(--primary)]/5 transition-all"
                  >
                    Voltar
                  </button>
                )}
                
                {currentStep !== 'review' ? (
                  <button
                    onClick={nextStep}
                    className="flex-1 bg-[var(--primary)] text-white py-3 rounded-xl font-bold hover:bg-[#1a2d5f] transition-all"
                  >
                    Continuar
                  </button>
                ) : (
                  <button
                    onClick={processOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-3 rounded-xl font-bold shadow-xl shadow-green-600/40 hover:shadow-2xl hover:shadow-green-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Finalizar Pedido
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border-2 border-[var(--neutral-200)] p-6 sticky top-24">
            <h3 className="font-bold text-xl text-[var(--neutral-900)] mb-6">Resumo do Pedido</h3>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-16 h-16 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border-2 border-[var(--neutral-200)]">
                    <ImageWithFallback
                      src={item.product.thumbnail || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300'}
                      alt={item.product.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--neutral-900)] line-clamp-2">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-[var(--neutral-500)] mt-1">
                      Qtd: {item.quantity}
                    </p>
                    <p className="text-sm font-bold text-[var(--primary)] mt-1">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {coupon && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 mb-6 flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-green-900">{coupon.code}</p>
                  <p className="text-xs text-green-700">{coupon.description}</p>
                </div>
              </div>
            )}

            <div className="border-t-2 border-[var(--neutral-200)] pt-4 space-y-3">
              <div className="flex justify-between text-sm text-[var(--neutral-700)]">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-[var(--neutral-700)]">
                <span>Frete</span>
                <span className="font-semibold">R$ {shippingCost.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto</span>
                  <span className="font-semibold">- R$ {discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t-2 border-[var(--neutral-200)] pt-3 flex justify-between text-lg">
                <span className="font-bold text-[var(--neutral-900)]">Total</span>
                <span className="font-black text-2xl text-[var(--primary)]">
                  R$ {(total + shippingCost).toFixed(2)}
                </span>
              </div>

              {discount > 0 && (
                <p className="text-xs text-green-600 font-semibold text-center">
                  Você economizou R$ {discount.toFixed(2)}!
                </p>
              )}
            </div>

            <div className="mt-6 pt-6 border-t-2 border-[var(--neutral-200)]">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[var(--neutral-600)]">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--neutral-600)]">
                  <Package className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Entrega garantida</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--neutral-600)]">
                  <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Frete para todo Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}