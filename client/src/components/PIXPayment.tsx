import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePayment } from '@/contexts/PaymentContext';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PIXPaymentProps {
  amount: number;
  orderId: string;
  customerEmail: string;
  customerName: string;
  onPaymentConfirmed: () => void;
}

export default function PIXPayment({
  amount,
  orderId,
  customerEmail,
  customerName,
  onPaymentConfirmed,
}: PIXPaymentProps) {
  const { language } = useLanguage();
  const { processPIXPayment, verifyPIXPayment } = usePayment();
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    generatePIXQRCode();
  }, []);

  const generatePIXQRCode = async () => {
    setLoading(true);
    try {
      const response = await processPIXPayment({
        method: 'pix',
        amount,
        orderId,
        customerEmail,
        customerName,
      });
      setPixData(response);
    } catch (error) {
      toast.error(language === 'pt' ? 'Erro ao gerar QR Code' : 'Error generating QR Code');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPixKey = () => {
    const pixKey = '49.964.765/0001-30';
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast.success(language === 'pt' ? 'Chave PIX copiada!' : 'PIX key copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyPayment = async () => {
    if (!pixData) return;
    
    setVerifying(true);
    try {
      const isConfirmed = await verifyPIXPayment(pixData.pixId);
      if (isConfirmed) {
        toast.success(language === 'pt' ? 'Pagamento confirmado!' : 'Payment confirmed!');
        onPaymentConfirmed();
      } else {
        toast.error(language === 'pt' ? 'Pagamento não confirmado' : 'Payment not confirmed');
      }
    } catch (error) {
      toast.error(language === 'pt' ? 'Erro ao verificar pagamento' : 'Error verifying payment');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-oxford mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === 'pt' ? 'Gerando QR Code...' : 'Generating QR Code...'}
          </p>
        </div>
      </div>
    );
  }

  if (!pixData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* QR Code Section */}
      <div className="bg-white rounded-lg p-6 border border-border text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {language === 'pt' ? 'Escanear QR Code' : 'Scan QR Code'}
        </h3>
        
        {/* Simulated QR Code */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="text-6xl mb-2">📱</div>
            <p className="text-sm text-muted-foreground">
              {language === 'pt' 
                ? 'QR Code será exibido aqui'
                : 'QR Code will be displayed here'}
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {language === 'pt' 
            ? 'Abra seu app de banco e escaneie o QR Code acima para realizar o pagamento'
            : 'Open your bank app and scan the QR Code above to make the payment'}
        </p>
      </div>

      {/* PIX Key Section */}
      <div className="bg-white rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {language === 'pt' ? 'Ou copie a chave PIX' : 'Or copy the PIX key'}
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-between">
          <code className="text-sm font-mono text-foreground break-all">
            49.964.765/0001-30
          </code>
          <Button
            onClick={handleCopyPixKey}
            variant="ghost"
            size="sm"
            className="ml-2 flex-shrink-0"
          >
            {copied ? (
              <Check size={18} className="text-green-oxford" />
            ) : (
              <Copy size={18} />
            )}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {language === 'pt' 
            ? 'Copie a chave PIX acima e cole no seu app de banco'
            : 'Copy the PIX key above and paste it into your bank app'}
        </p>
      </div>

      {/* Payment Details */}
      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          {language === 'pt' ? 'Detalhes do Pagamento' : 'Payment Details'}
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-green-800">
              {language === 'pt' ? 'Valor a pagar:' : 'Amount to pay:'}
            </span>
            <span className="font-bold text-green-900">R$ {amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-800">
              {language === 'pt' ? 'ID do Pedido:' : 'Order ID:'}
            </span>
            <span className="font-mono text-green-900">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-800">
              {language === 'pt' ? 'Válido por:' : 'Valid for:'}
            </span>
            <span className="text-green-900">1 hora</span>
          </div>
        </div>
      </div>

      {/* Verify Payment Button */}
      <Button
        onClick={handleVerifyPayment}
        disabled={verifying}
        className="w-full bg-green-oxford hover:bg-green-oxford/90 text-white"
      >
        {verifying 
          ? (language === 'pt' ? 'Verificando...' : 'Verifying...')
          : (language === 'pt' ? 'Já realizei o pagamento' : 'I already made the payment')}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        {language === 'pt' 
          ? 'Após realizar o pagamento, clique no botão acima para confirmar'
          : 'After making the payment, click the button above to confirm'}
      </p>
    </div>
  );
}
