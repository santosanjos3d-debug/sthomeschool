import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WhatsAppButtonProps {
  isOnline?: boolean;
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({ 
  isOnline = true, 
  phoneNumber = '5547996448774',
  message = 'Olá! Como posso ajudá-lo?'
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide after 5 seconds if not interacted
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleWhatsAppClick = () => {
    if (!isOnline) {
      setIsOpen(true);
      return;
    }
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Message bubble when offline */}
      {isOpen && !isOnline && (
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-start gap-3 mb-2">
            <p className="text-sm font-semibold text-green-oxford">Saint Thomas Homeschool</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            No momento não estamos disponíveis. Deixe sua mensagem que responderemos assim que possível!
          </p>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreférrer"
            className="inline-block px-4 py-2 bg-green-oxford text-white text-sm font-semibold rounded hover:bg-opacity-90 transition-all"
          >
            Enviar Mensagem
          </a>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="relative group flex items-center justify-center w-14 h-14 bg-green-whatsapp hover:bg-green-whatsapp/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title={isOnline ? 'Fale conosco via WhatsApp' : 'Deixe uma mensagem'}
      >
        <MessageCircle size={24} />
        
        {/* Online indicator */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
        )}
        
        {/* Offline indicator */}
        {!isOnline && (
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full"></span>
        )}

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isOnline ? 'Chat ao vivo' : 'Deixe uma mensagem'}
        </div>
      </button>
    </div>
  );
}
