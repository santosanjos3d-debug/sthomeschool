import React, { createContext, useContext } from 'react';

export interface PaymentData {
  method: 'pix' | 'card';
  amount: number;
  orderId: string;
  customerEmail: string;
  customerName: string;
}

export interface PIXPaymentResponse {
  qrCode: string;
  qrCodeUrl: string;
  pixId: string;
  expiresIn: number;
}

export interface CardPaymentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

interface PaymentContextType {
  processPIXPayment: (data: PaymentData) => Promise<PIXPaymentResponse>;
  processCardPayment: (data: PaymentData) => Promise<CardPaymentResponse>;
  verifyPIXPayment: (pixId: string) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Simulação de chave PIX (em produção, seria do servidor)
const PIX_KEY = '49.964.765/0001-30';

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const processPIXPayment = async (data: PaymentData): Promise<PIXPaymentResponse> => {
    // Em produção, isso seria uma chamada ao servidor que geraria o QR Code
    // Usando uma biblioteca como 'qrcode' ou um serviço de pagamento
    
    return new Promise((resolve) => {
      // Simular geração de QR Code
      const pixId = `PIX_${Date.now()}`;
      
      // QR Code simulado (em produção, seria gerado pelo servidor)
      const qrCodeData = {
        qrCode: '00020126580014br.gov.bcb.brcode0136' + PIX_KEY + '5204000053039865802BR5913SAINT THOMAS6009SAO PAULO62410503***63041D3D',
        qrCodeUrl: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`,
        pixId,
        expiresIn: 3600, // 1 hora
      };

      setTimeout(() => resolve(qrCodeData), 500);
    });
  };

  const processCardPayment = async (data: PaymentData): Promise<CardPaymentResponse> => {
    // Em produção, isso seria uma chamada ao servidor que criaria um Payment Intent no Stripe
    return new Promise((resolve) => {
      const paymentIntentId = `pi_${Date.now()}`;
      
      setTimeout(() => {
        resolve({
          clientSecret: `${paymentIntentId}_secret_${Math.random().toString(36).substr(2, 9)}`,
          paymentIntentId,
        });
      }, 500);
    });
  };

  const verifyPIXPayment = async (pixId: string): Promise<boolean> => {
    // Em produção, isso verificaria com o servidor se o pagamento foi confirmado
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular verificação (sempre retorna true para demonstração)
        resolve(true);
      }, 1000);
    });
  };

  return (
    <PaymentContext.Provider
      value={{
        processPIXPayment,
        processCardPayment,
        verifyPIXPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment deve ser usado dentro de PaymentProvider');
  }
  return context;
}
