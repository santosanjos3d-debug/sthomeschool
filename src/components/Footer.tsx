import { Mail, MessageCircle, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Footer Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Verde Oxford como fundo
 * - Links para redes sociais
 * - Informações de contato direto
 * - Copyright e links úteis
 */

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: MessageCircle, href: 'https://wa.me/5547996448774', label: 'WhatsApp' },
    { icon: Mail, href: 'mailto:giorgio@sthomeschool.com', label: 'Email' },
    { icon: Linkedin, href: 'http://linkedin.com/in/giorgio-testoni/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/testoni.giorgio/', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@giorgioernestotestoni-ci5mf?si=O1j08BEOPuXABZlr', label: 'YouTube' },
  ];

  return (
    <footer className="bg-green-oxford text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo-saint-thomas-white-final.png" alt="Saint Thomas Homeschool" className="h-12 w-auto" />
              <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                ST Homeschool
              </h3>
            </div>
            <p className="text-sm text-gray-300">
              {t('hero.descricao').split('.')[0]}.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-antique">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#turmas" className="hover:text-gold-antique transition-colors">Turmas 2026</a></li>
              <li><a href="#clube" className="hover:text-gold-antique transition-colors">Clube de Ciências</a></li>
              <li><a href="#metodologia" className="hover:text-gold-antique transition-colors">Metodologia</a></li>
              <li><a href="#sobre" className="hover:text-gold-antique transition-colors">Sobre</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-antique">Programas</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#turmas" className="hover:text-gold-antique transition-colors">Matemática</a></li>
              <li><a href="#turmas" className="hover:text-gold-antique transition-colors">Ciências</a></li>
              <li><a href="#turmas" className="hover:text-gold-antique transition-colors">Física</a></li>
              <li><a href="#turmas" className="hover:text-gold-antique transition-colors">Química</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-antique">Contato</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/5547996448774"
                target="_blank"
                rel="noopener noreférrer"
                className="flex items-center gap-2 text-sm hover:text-gold-antique transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a
                href="mailto:giorgio@sthomeschool.com"
                className="flex items-center gap-2 text-sm hover:text-gold-antique transition-colors"
              >
                <Mail size={16} />
                giorgio@sthomeschool.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-salvia my-8"></div>

        {/* Social Links */}
        <div className="flex items-center justify-between flex-col md:flex-row gap-6">
          <p className="text-sm text-gray-300">
            © {currentYear} {t('footer.direitos')}
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreférrer"
                  className="p-2 hover:bg-gold-antique rounded-full transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
