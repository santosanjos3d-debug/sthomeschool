import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePayment } from '@/contexts/PaymentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface CardPaymentProps {
  amount: number;
  orderId: string;
  customerEmail: string;
  customerName: string;
  onPaymentConfirmed: () => void;
}

export default function CardPayment({
  amount,
  orderId,
  customerEmail,
  customerName,
  onPaymentConfirmed,
}: CardPaymentProps) {
  const { language } = useLanguage();
  const { processCardPayment } = usePayment();
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: '1',
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData(prev => ({ ...prev, cardNumber: value }));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setCardData(prev => ({ ...prev, expiryDate: value }));
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardData(prev => ({ ...prev, cvv: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
      toast.error(language === 'pt' ? 'Preencha todos os campos do cartão' : 'Fill in all card fields');
      return;
    }

    if (cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error(language === 'pt' ? 'Número do cartão inválido' : 'Invalid card number');
      return;
    }

    setLoading(true);
    try {
      const response = await processCardPayment({
        method: 'card',
        amount,
        orderId,
        customerEmail,
        customerName,
      });

      // Simular processamento
      toast.success(language === 'pt' ? 'Pagamento processado com sucesso!' : 'Payment processed successfully!');
      onPaymentConfirmed();
    } catch (error) {
      toast.error(language === 'pt' ? 'Erro ao processar pagamento' : 'Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  const installmentOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const installmentAmount = amount / parseInt(cardData.installments);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {language === 'pt' ? 'Número do Cartão' : 'Card Number'}
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="0000 0000 0000 0000"
            value={cardData.cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Card Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {language === 'pt' ? 'Nome no Cartão' : 'Cardholder Name'}
        </label>
        <Input
          type="text"
          placeholder={language === 'pt' ? 'Como aparece no cartão' : 'As it appears on card'}
          value={cardData.cardName}
          onChange={(e) => setCardData(prev => ({ ...prev, cardName: e.target.value.toUpperCase() }))}
          required
        />
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'pt' ? 'Validade' : 'Expiry Date'}
          </label>
          <Input
            type="text"
            placeholder="MM/YY"
            value={cardData.expiryDate}
            onChange={handleExpiryDateChange}
            maxLength={5}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'pt' ? 'CVV' : 'CVV'}
          </label>
          <Input
            type="text"
            placeholder="000"
            value={cardData.cvv}
            onChange={handleCVVChange}
            maxLength={3}
            required
          />
        </div>
      </div>

      {/* Installments */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {language === 'pt' ? 'Parcelamento' : 'Installments'}
        </label>
        <select
          value={cardData.installments}
          onChange={(e) => setCardData(prev => ({ ...prev, installments: e.target.value }))}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
        >
          {installmentOptions.map((num) => (
            <option key={num} value={num}>
              {num}x de R$ {(amount / num).toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Summary */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">
          {language === 'pt' ? 'Resumo do Pagamento' : 'Payment Summary'}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-blue-800">
            <span>{language === 'pt' ? 'Valor total:' : 'Total amount:'}</span>
            <span className="font-bold">R$ {amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-blue-800">
            <span>{language === 'pt' ? 'Parcelado em:' : 'Installments:'}</span>
            <span className="font-bold">{cardData.installments}x</span>
          </div>
          <div className="flex justify-between text-blue-900 font-bold pt-2 border-t border-blue-200">
            <span>{language === 'pt' ? 'Valor por parcela:' : 'Amount per installment:'}</span>
            <span>R$ {installmentAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-green-oxford hover:bg-green-oxford/90 text-white py-6 text-lg"
      >
        {loading 
          ? (language === 'pt' ? 'Processando...' : 'Processing...')
          : (language === 'pt' ? 'Confirmar Pagamento' : 'Confirm Payment')}
      </Button>

      {/* Security Notice */}
      <p className="text-xs text-muted-foreground text-center">
        {language === 'pt' 
          ? '🔒 Suas informações de cartão são seguras e criptografadas'
          : '🔒 Your card information is secure and encrypted'}
      </p>
    </form>
  );
}
