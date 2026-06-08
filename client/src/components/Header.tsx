import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Header Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Verde Oxford (#1B3022) como cor primária
 * - Tipografia Playfair Display para o logo
 * - Navegação clara e acessível
 * - Hover effects sutis em Dourado Antigo
 */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav.turmas'), href: '#turmas' },
    { label: t('nav.clube'), href: '#clube' },
    { label: t('nav.metodologia'), href: '#metodologia' },
    { label: t('nav.sobre'), href: '#sobre' },
    { label: t('nav.loja'), href: '/shop' },
  ];

  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScRKDV-l8_FKuIfUUc5KUDzfWzcy7m4TGcXGVrfmfW7zaBlAQ/viewform';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                 <a href="/" className="flex items-center gap-2">
            <img src="/images/logo-saint-thomas.png" alt="Saint Thomas Homeschool" className="h-12 w-auto" />
            <span className="text-xl font-bold text-green-oxford hidden sm:inline" style={{ fontFamily: "'Playfair Display', serif" }}>
              ST Homeschool
            </span>
          </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-700 hover:text-gold-antique transition-colors duration-300 font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button and Language Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {t('nav.preInscricao')}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-50 border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <LanguageSwitcher />
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-gold-antique transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              {t('nav.preInscricao')}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
