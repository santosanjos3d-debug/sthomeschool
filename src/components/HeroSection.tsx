import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Hero Section Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Layout assimétrico com imagem à esquerda
 * - Tipografia Playfair Display para títulos
 * - Citação de Santo Tomás de Aquino como elemento de autoridade
 * - Frase de Santo Tomás em Dourado Antigo para destaque
 * - Rastreamento de eventos de pré-inscrição e WhatsApp
 */

export default function HeroSection() {
  const { t } = useLanguage();
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScRKDV-l8_FKuIfUUc5KUDzfWzcy7m4TGcXGVrfmfW7zaBlAQ/viewform';

  const handlePreInscricao = () => {
    // Rastrear evento de pré-inscrição no Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'pre_inscricao', {
        'event_category': 'engagement',
        'event_label': 'Hero Section',
        'value': 1
      });
    }
  };

  const handleWhatsApp = () => {
    // Rastrear evento de contato WhatsApp no Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'contato_whatsapp', {
        'event_category': 'engagement',
        'event_label': 'Hero Section',
        'value': 1
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="order-2 md:order-1">
            <img
              src="/images/hero-experiment.jpg"
              alt="Experimento científico em andamento"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="order-1 md:order-2 flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gold-antique uppercase tracking-widest">
                {t('hero.bemVindo')}
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-green-oxford" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('hero.titulo')}
              </h1>
            </div>

            {/* Quote */}
            <div className="border-l-4 border-gold-antique pl-6 py-4">
              <p className="text-lg md:text-xl italic text-gray-700 mb-3">
                "{t('hero.citacao')}"
              </p>
              <p className="text-sm font-semibold text-green-oxford">
                {t('hero.autor')}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('hero.descricao')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreférrer"
                className="btn-primary text-center flex-1 sm:flex-none"
                onClick={handlePreInscricao}
              >
                {t('hero.preInscricao')}
              </a>
              <a
                href="https://wa.me/5547996448774"
                target="_blank"
                rel="noopener noreférrer"
                className="btn-secondary text-center flex-1 sm:flex-none"
                onClick={handleWhatsApp}
              >
                {t('hero.faleConosco')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
