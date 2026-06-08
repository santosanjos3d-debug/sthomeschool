import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductContext';
import { useShipping } from '@/contexts/ShippingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ShoppingCart, Check } from 'lucide-react';
import { Link } from 'wouter';

export default function Catalog() {
  const { t, language } = useLanguage();
  const { products, addToCart } = useProducts();
  const { calculateShipping, shippingOptions, selectedShipping, selectShipping, isLoading } = useShipping();
  const [cep, setCep] = useState('');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleCalculateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cep || cep.length !== 8) {
      toast.error(language === 'pt' ? 'CEP inválido' : 'Invalid CEP');
      return;
    }

    // CEP de origem (Joinville)
    const fromCEP = '89227320';
    await calculateShipping(fromCEP, cep);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (!selectedShipping) {
      toast.error(language === 'pt' ? 'Selecione um tipo de frete' : 'Select a shipping method');
      return;
    }

    addToCart(product, 1, selectedShipping.price);
    setAddedToCart(productId);
    
    toast.success(language === 'pt' ? 'Produto adicionado ao carrinho!' : 'Product added to cart!');
    
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-6">
            <Link href="/cart">
              <Button variant="outline" className="gap-2">
                <ShoppingCart size={18} />
                {language === 'pt' ? 'Carrinho' : 'Cart'}
                {products.length > 0 && <span className="bg-green-oxford text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{products.length}</span>}
              </Button>
            </Link>
          </div>
          <div className="text-center">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
            {language === 'pt' ? 'Loja Educacional' : 'Educational Shop'}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {language === 'pt' ? 'Produtos Educacionais 3D' : '3D Educational Products'}
          </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'pt' 
                ? 'Explore nossa coleção de produtos educacionais féitos em impressão 3D. Modelos anatômicos, peças de robótica e muito mais para complementar seu aprendizado.'
                : 'Explore our collection of educational products made with 3D printing. Anatomical models, robotics parts and much more to complement your learning.'}
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Calculator */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleCalculateShipping} className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {language === 'pt' ? 'Calcular Frete' : 'Calculate Shipping'}
            </h2>
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder={language === 'pt' ? 'Digite seu CEP' : 'Enter your CEP'}
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                maxLength={8}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-green-oxford hover:bg-green-oxford/90"
              >
                {isLoading ? (language === 'pt' ? 'Calculando...' : 'Calculating...') : (language === 'pt' ? 'Calcular' : 'Calculate')}
              </Button>
            </div>

            {shippingOptions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground mb-3">
                  {language === 'pt' ? 'Opções de Frete:' : 'Shipping Options:'}
                </p>
                {shippingOptions.map((quote) => (
                  <label key={quote.id} className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      checked={selectedShipping?.id === quote.id}
                      onChange={() => selectShipping(quote)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{quote.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'pt' ? 'Prazo: ' : 'Deadline: '}{quote.deliveryTime} {language === 'pt' ? 'dias úteis' : 'business days'}
                      </p>
                    </div>
                    <p className="font-semibold text-green-oxford">R$ {quote.price.toFixed(2)}</p>
                  </label>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-border hover:shadow-xl transition-shadow">
                {/* Product Image */}
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={product.image}
                    alt={language === 'pt' ? product.name : product.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {language === 'pt' ? product.name : product.nameEn}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {language === 'pt' ? product.description : product.descriptionEn}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      {language === 'pt' ? 'Inclui:' : 'Includes:'}
                    </p>
                    <ul className="space-y-1">
                      {(language === 'pt' ? product.féatures : product.féaturesEn).slice(0, 3).map((féature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check size={16} className="text-green-oxford flex-shrink-0 mt-0.5" />
                          <span>{féature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-green-oxford">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-amber-600 font-medium">
                      {language === 'pt' ? 'ou R$' : 'or R$'} {product.pixPrice.toFixed(2)} {language === 'pt' ? 'via PIX' : 'via PIX'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {language === 'pt' ? '12x de R$' : '12x of R$'} {(product.price / 12).toFixed(2)}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={!selectedShipping || addedToCart === product.id || isLoading}
                    className="w-full bg-green-oxford hover:bg-green-oxford/90 text-white"
                  >
                    {addedToCart === product.id ? (
                      <>
                        <Check size={18} className="mr-2" />
                        {language === 'pt' ? 'Adicionado!' : 'Added!'}
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} className="mr-2" />
                        {language === 'pt' ? 'Adicionar ao Carrinho' : 'Add to Cart'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
