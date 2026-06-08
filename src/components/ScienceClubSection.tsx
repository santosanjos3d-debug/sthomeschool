import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Science Club Section Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Layout assimétrico com imagem e conteúdo
 * - Destaque para encontros semanais
 * - Verde Sálvia para elementos secundários
 * - Foco em acolhimento e comunidade
 */

export default function ScienceClubSection() {
  const { t, language } = useLanguage();
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfv71L5tVi2DBFWhDUvKXvJyYOx0p-ejX0k9JNoGhRSdwfu0g/viewform?usp=sharing&ouid=113111797246099946756';
  return (
    <section id="clube" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="order-2 md:order-1">
            <img
              src="/images/science-club-banner.jpg"
              alt="Clube de Ciências - alunos em atividade colaborativa"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="order-1 md:order-2 flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gold-antique uppercase tracking-widest">
                {t('club.label')}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-green-oxford" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('club.title')}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('club.description')}
            </p>

            {/* Key Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gold-antique rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-green-oxford mb-1">{t('club.féature1')}</h3>
                  <p className="text-gray-600">{t('club.féature1Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gold-antique rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-green-oxford mb-1">{t('club.féature2')}</h3>
                  <p className="text-gray-600">{t('club.féature2Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gold-antique rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-green-oxford mb-1">{t('club.féature3')}</h3>
                  <p className="text-gray-600">{t('club.féature3Desc')}</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreférrer"
                className="btn-accent inline-block"
              >
                {t('club.cta')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
