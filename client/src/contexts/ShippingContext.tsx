import React, { createContext, useContext, useState } from 'react';

interface ShippingOption {
  id: number;
  name: string;
  price: number;
  deliveryTime: number;
  deliveryRange?: {
    min: number;
    max: number;
  };
  company: string;
  companyLogo?: string;
}

interface ShippingContextType {
  selectedShipping: ShippingOption | null;
  shippingOptions: ShippingOption[];
  isLoading: boolean;
  error: string | null;
  calculateShipping: (fromCEP: string, toCEP: string) => Promise<void>;
  selectShipping: (option: ShippingOption) => void;
}

const ShippingContext = createContext<ShippingContextType | undefined>(undefined);

export function ShippingProvider({ children }: { children: React.ReactNode }) {
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateShipping = async (fromCEP: string, toCEP: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Usar valores padrão por enquanto
      // Integração com Melhor Envio será feita depois via tRPC
      const fallbackOptions: ShippingOption[] = [
        {
          id: 1,
          name: 'SEDEX (2-3 dias úteis)',
          price: 21.0,
          deliveryTime: 2,
          company: 'Correios',
        },
        {
          id: 2,
          name: 'PAC (5-10 dias úteis)',
          price: 20.4,
          deliveryTime: 5,
          company: 'Correios',
        },
      ];
      
      setShippingOptions(fallbackOptions);
      setSelectedShipping(fallbackOptions[0]);
    } catch (err) {
      console.error('Erro ao calcular frete:', err);
      
      // Usar fallback em caso de erro
      const fallbackOptions: ShippingOption[] = [
        {
          id: 1,
          name: 'SEDEX (2-3 dias úteis)',
          price: 21.0,
          deliveryTime: 2,
          company: 'Correios',
        },
        {
          id: 2,
          name: 'PAC (5-10 dias úteis)',
          price: 20.4,
          deliveryTime: 5,
          company: 'Correios',
        },
      ];
      setShippingOptions(fallbackOptions);
      setSelectedShipping(fallbackOptions[0]);
      setError('Usando valores padrão de frete');
    } finally {
      setIsLoading(false);
    }
  };

  const selectShipping = (option: ShippingOption) => {
    setSelectedShipping(option);
  };

  return (
    <ShippingContext.Provider
      value={{
        selectedShipping,
        shippingOptions,
        isLoading,
        error,
        calculateShipping,
        selectShipping,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}

export function useShipping() {
  const context = useContext(ShippingContext);
  if (context === undefined) {
    throw new Error('useShipping deve ser usado dentro de ShippingProvider');
  }
  return context;
}
