import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function OrderConfirmation() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-oxford/20 rounded-full blur-xl animate-pulse"></div>
            <CheckCircle size={80} className="text-green-oxford relative" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          {language === 'pt' ? 'Pedido Confirmado!' : 'Order Confirmed!'}
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          {language === 'pt' 
            ? 'Seu pedido foi realizado com sucesso. Você receberá um email com os detalhes da compra em breve.'
            : 'Your order has been placed successfully. You will receive an email with the purchase details shortly.'}
        </p>

        <div className="bg-white rounded-lg p-6 border border-border mb-8 text-left">
          <h2 className="font-semibold text-foreground mb-4">
            {language === 'pt' ? 'Próximos Passos:' : 'Next Steps:'}
          </h2>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-bold text-green-oxford flex-shrink-0">1.</span>
              <span>
                {language === 'pt' 
                  ? 'Você receberá um email de confirmação em alguns minutos'
                  : 'You will receive a confirmation email in a few minutes'}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-green-oxford flex-shrink-0">2.</span>
              <span>
                {language === 'pt' 
                  ? 'Seu pedido será preparado e enviado em até 2 dias úteis'
                  : 'Your order will be prepared and shipped within 2 business days'}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-green-oxford flex-shrink-0">3.</span>
              <span>
                {language === 'pt' 
                  ? 'Você receberá um código de rastreamento para acompanhar sua entrega'
                  : 'You will receive a tracking code to monitor your delivery'}
              </span>
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full bg-green-oxford hover:bg-green-oxford/90 text-white">
              {language === 'pt' ? 'Voltar à Página Inicial' : 'Back to Home'}
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline" className="w-full">
              {language === 'pt' ? 'Continuar Comprando' : 'Continue Shopping'}
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          {language === 'pt' 
            ? 'Dúvidas? Entre em contato conosco via WhatsApp'
            : 'Questions? Contact us via WhatsApp'}
        </p>
      </div>
    </div>
  );
}
