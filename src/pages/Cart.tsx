import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { t, language } = useLanguage();
  const { cart, removeFromCart, updateCartQuantity, getCartSubtotal, getCartShippingTotal, getCartTotal } = useProducts();

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <Link href="/catalog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft size={18} className="mr-2" />
              {language === 'pt' ? 'Continuar Comprando' : 'Continue Shopping'}
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground">
            {language === 'pt' ? 'Seu Carrinho' : 'Your Cart'}
          </h1>
        </div>
      </div>

      {/* Cart Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="bg-white rounded-lg p-6 border border-border shadow-sm">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={language === 'pt' ? item.product.name : item.product.nameEn}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {language === 'pt' ? item.product.name : item.product.nameEn}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'pt' ? 'Preço unitário: ' : 'Unit price: '}
                        <span className="font-medium text-foreground">R$ {item.product.price.toFixed(2)}</span>
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Minus size={18} className="text-muted-foreground" />
                        </button>
                        <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Plus size={18} className="text-muted-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="text-right flex flex-col justify-between">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {language === 'pt' ? 'Subtotal do Item' : 'Item Subtotal'}
                        </p>
                        <p className="text-2xl font-bold text-green-oxford">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      {language === 'pt' ? 'Frete: ' : 'Shipping: '}
                      <span className="font-medium text-foreground">R$ {item.shippingCost.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-border shadow-lg sticky top-4">
              <h2 className="text-xl font-bold text-foreground mb-6">
                {language === 'pt' ? 'Resumo do Pedido' : 'Order Summary'}
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
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

              <Link href="/checkout">
                <Button className="w-full bg-green-oxford hover:bg-green-oxford/90 text-white mb-3">
                  {language === 'pt' ? 'Ir para Checkout' : 'Go to Checkout'}
                </Button>
              </Link>

              <Link href="/catalog">
                <Button variant="outline" className="w-full">
                  {language === 'pt' ? 'Continuar Comprando' : 'Continue Shopping'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
