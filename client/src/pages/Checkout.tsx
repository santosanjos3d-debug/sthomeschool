import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import PIXPayment from '@/components/PIXPayment';
import CardPayment from '@/components/CardPayment';

export default function Checkout() {
  const { language } = useLanguage();
  const { cart, getCartSubtotal, getCartShippingTotal, getCartTotal, clearCart } = useProducts();
  const [, setLocation] = useLocation();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [loading, setLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {language === 'pt' ? 'Carrinho Vazio' : 'Empty Cart'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {language === 'pt' 
              ? 'Seu carrinho está vazio. Explore nossos produtos!'
              : 'Your cart is empty. Explore our products!'}
          </p>
          <Link href="/catalog">
            <Button className="bg-green-oxford hover:bg-green-oxford/90">
              <ArrowLeft size={18} className="mr-2" />
              {language === 'pt' ? 'Voltar ao Catálogo' : 'Back to Catalog'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.fullName || !formData.email || !formData.phone || !formData.cpf) {
      toast.error(language === 'pt' ? 'Preencha todos os campos obrigatórios' : 'Fill in all required fields');
      return;
    }

    // Mostrar formulário de pagamento
    setShowPaymentForm(true);
  };

  const handlePaymentConfirmed = () => {
    // Limpar carrinho e redirecionar para confirmação
    clearCart();
    setLocation('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <Link href="/cart">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft size={18} className="mr-2" />
              {language === 'pt' ? 'Voltar' : 'Back'}
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground">
            {language === 'pt' ? 'Checkout' : 'Checkout'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {!showPaymentForm ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {language === 'pt' ? 'Informações Pessoais' : 'Personal Information'}
                  </h2>
                  <div className="space-y-4">
                    <Input
                      name="fullName"
                      placeholder={language === 'pt' ? 'Nome Completo' : 'Full Name'}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder={language === 'pt' ? 'Email' : 'Email'}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="phone"
                      placeholder={language === 'pt' ? 'Telefone' : 'Phone'}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="cpf"
                      placeholder={language === 'pt' ? 'CPF' : 'CPF'}
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {language === 'pt' ? 'Endereço de Entrega' : 'Shipping Address'}
                  </h2>
                  <div className="space-y-4">
                    <Input
                      name="cep"
                      placeholder={language === 'pt' ? 'CEP' : 'CEP'}
                      value={formData.cep}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="street"
                      placeholder={language === 'pt' ? 'Rua' : 'Street'}
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <Input
                        name="number"
                        placeholder={language === 'pt' ? 'Número' : 'Number'}
                        value={formData.number}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="complement"
                        placeholder={language === 'pt' ? 'Complemento' : 'Complement'}
                        value={formData.complement}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="city"
                        placeholder={language === 'pt' ? 'Cidade' : 'City'}
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Input
                      name="state"
                      placeholder={language === 'pt' ? 'Estado' : 'State'}
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {language === 'pt' ? 'Forma de Pagamento' : 'Payment Method'}
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pix"
                        checked={paymentMethod === 'pix'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'card')}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium text-foreground">PIX</p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'pt' ? 'Pagamento instantâneo com desconto' : 'Instant payment with discount'}
                        </p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'card')}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium text-foreground">{language === 'pt' ? 'Cartão de Crédito' : 'Credit Card'}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'pt' ? 'Parcelado em até 12x' : 'Installments up to 12x'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-oxford hover:bg-green-oxford/90 text-white py-6 text-lg"
                >
                  {loading ? (
                    language === 'pt' ? 'Processando...' : 'Processing...'
                  ) : (
                    <>
                      <Check size={20} className="mr-2" />
                      {language === 'pt' ? 'Ir para Pagamento' : 'Go to Payment'}
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
                <Button
                  variant="ghost"
                  onClick={() => setShowPaymentForm(false)}
                  className="mb-4"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  {language === 'pt' ? 'Voltar' : 'Back'}
                </Button>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {language === 'pt' ? 'Pagamento' : 'Payment'}
                </h2>

                {paymentMethod === 'pix' ? (
                  <PIXPayment
                    amount={getCartTotal()}
                    orderId={`STH-${Date.now()}`}
                    customerEmail={formData.email}
                    customerName={formData.fullName}
                    onPaymentConfirmed={handlePaymentConfirmed}
                  />
                ) : (
                  <CardPayment
                    amount={getCartTotal()}
                    orderId={`STH-${Date.now()}`}
                    customerEmail={formData.email}
                    customerName={formData.fullName}
                    onPaymentConfirmed={handlePaymentConfirmed}
                  />
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-border shadow-lg sticky top-4">
              <h2 className="text-xl font-bold text-foreground mb-6">
                {language === 'pt' ? 'Resumo do Pedido' : 'Order Summary'}
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'pt' ? item.product.name : item.product.nameEn} x{item.quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'pt' ? 'Subtotal' : 'Subtotal'}
                  </span>
                  <span className="font-medium text-foreground">
                    R$ {getCartSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'pt' ? 'Frete' : 'Shipping'}
                  </span>
                  <span className="font-medium text-foreground">
                    R$ {getCartShippingTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-semibold text-foreground">
                  {language === 'pt' ? 'Total' : 'Total'}
                </span>
                <span className="text-2xl font-bold text-green-oxford">
                  R$ {getCartTotal().toFixed(2)}
                </span>
              </div>

              {paymentMethod === 'pix' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                  {language === 'pt' 
                    ? '💚 Você receberá desconto de 5% ao pagar com PIX!'
                    : '💚 You will receive a 5% discount when paying with PIX!'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
