/**
 * About Section Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - História da ST Homeschool
 * - Inspiração em São Tomás de Aquino
 * - Relação entre fé e razão na educação científica
 */

import { BookOpen, Heart, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t, language } = useLanguage();
  return (
    <section id="sobre" className="py-16 md:py-24 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-gold-antique uppercase tracking-widest mb-2">
            {t('about.label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-green-oxford mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('about.title')}
          </h2>
        </div>

        {/* Origin Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-green-oxford mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('about.originTitle')}
            </h3>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t('about.origin1') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.origin2') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.origin3') }} />
            </div>
          </div>
        </div>

        {/* Saint Thomas Aquinas Inspiration */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-green-oxford mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('about.whySaintThomasTitle')}
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: t('about.whySaintThomasDesc') }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1: Faith */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gold-antique rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-green-oxford mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('about.faith')}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('about.faithDesc')}
              </p>
            </div>

            {/* Card 2: Reason */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gold-antique rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-green-oxford mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('about.reason')}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('about.reasonDesc')}
              </p>
            </div>

            {/* Card 3: Harmony */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gold-antique rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-green-oxford mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('about.harmony')}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('about.harmonyDesc')}
              </p>
            </div>
          </div>

          {/* Aquinas Quote */}
          <div className="bg-green-oxford text-white rounded-lg p-8 md:p-12">
            <blockquote className="text-center">
              <p className="text-xl md:text-2xl italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('about.aquinasQuote')}
              </p>
              <footer className="text-gold-antique font-semibold">
                {t('about.aquinasAttribution')}
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Philosophy */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-green-oxford mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('about.philosophyTitle')}
            </h3>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t('about.philosophy1') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.philosophy2') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.philosophy3') }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
