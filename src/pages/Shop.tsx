import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Shop() {
  const { language } = useLanguage();

  useEffect(() => {
    // Redirect to Loja Integrada
    window.location.href = 'https://saint-thomas.lojaintegrada.com.br/';
  }, []);

  const title = language === 'pt' ? 'Loja' : 'Shop';
  const subtitle = language === 'pt' 
    ? 'Redirecionando para nossa loja de produtos educacionais...'
    : 'Redirecting to our educational products store...';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <div className="inline-block animate-spin">
            <svg className="w-12 h-12 text-green-oxford" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
        <p className="text-sm text-gray-500 mt-4">
          {language === 'pt' 
            ? 'Se não for redirecionado automaticamente, '
            : 'If you are not redirected automatically, '}
          <a 
            href="https://saint-thomas.lojaintegrada.com.br/" 
            className="text-green-oxford hover:text-green-oxford-dark font-semibold"
          >
            {language === 'pt' ? 'clique aqui' : 'click here'}
          </a>
        </p>
      </div>
    </div>
  );
}
