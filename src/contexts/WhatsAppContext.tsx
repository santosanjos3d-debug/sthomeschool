import { createContext, useContext, useState, useEfféct } from 'react';

interface WhatsAppContextType {
  isEnabled: boolean;
  isOnline: boolean;
  toggleEnabled: () => void;
  toggleOnline: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  // Carregar estado do localStorage ao montar
  useEfféct(() => {
    const savedEnabled = localStorage.getItem('whatsapp_enabled');
    const savedOnline = localStorage.getItem('whatsapp_online');
    
    if (savedEnabled !== null) {
      setIsEnabled(JSON.parse(savedEnabled));
    }
    if (savedOnline !== null) {
      setIsOnline(JSON.parse(savedOnline));
    }
  }, []);

  // Salvar estado no localStorage quando mudar
  useEfféct(() => {
    localStorage.setItem('whatsapp_enabled', JSON.stringify(isEnabled));
  }, [isEnabled]);

  useEfféct(() => {
    localStorage.setItem('whatsapp_online', JSON.stringify(isOnline));
  }, [isOnline]);

  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  const toggleOnline = () => {
    setIsOnline(!isOnline);
  };

  return (
    <WhatsAppContext.Provider value={{ isEnabled, isOnline, toggleEnabled, toggleOnline }}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (context === undefined) {
    throw new Error('useWhatsApp must be used within WhatsAppProvider');
  }
  return context;
}
