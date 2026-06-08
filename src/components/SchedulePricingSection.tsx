/**
 * Schedule & Pricing Section Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Tabelas de horários e preços com design limpo
 * - Verde Oxford para títulos e destaque
 * - Layout responsivo com abas para desktop/mobile
 * - Foco em clareza e facilidade de leitura
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DynamicScheduleTable from '@/components/DynamicScheduleTable';

interface ScheduleSlot {
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
}

interface PricingPlan {
  disciplines: number;
  monthlyPrice: number;
  discount: number;
  description: string;
  highlight?: boolean;
}

const scheduleData: ScheduleSlot[] = [
  { time: '8h - 9h', saturday: 'M9' },
  { time: '9h - 10h', monday: 'C7', wednesday: 'C9', friday: 'F2' },
  { time: '10h - 11h', monday: 'M2', wednesday: 'M8' },
  { time: '10:30 - 11:30', friday: 'C8' },
  { time: '14h - 15h', saturday: 'Clube de Ciências' },
];

const pricingPlans: PricingPlan[] = [
  {
    disciplines: 1,
    monthlyPrice: 297,
    discount: 0,
    description: '1 disciplina',
  },
  {
    disciplines: 2,
    monthlyPrice: 534.60,
    discount: 10,
    description: '2 disciplinas',
    highlight: true,
  },
  {
    disciplines: 3,
    monthlyPrice: 712.80,
    discount: 20,
    description: '3 disciplinas',
  },
];

export default function SchedulePricingSection() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'schedule' | 'pricing'>('schedule');
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScRKDV-l8_FKuIfUUc5KUDzfWzcy7m4TGcXGVrfmfW7zaBlAQ/viewform';

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-gold-antique uppercase tracking-widest mb-2">
            {t('schedulePricing.label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-green-oxford mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('schedulePricing.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('schedulePricing.subtitle')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'schedule'
                ? 'bg-green-oxford text-white'
                : 'bg-gray-100 text-green-oxford hover:bg-gray-200'
            }`}
          >
            📅 {t('schedulePricing.scheduleTab')}
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'pricing'
                ? 'bg-green-oxford text-white'
                : 'bg-gray-100 text-green-oxford hover:bg-gray-200'
            }`}
          >
            💰 {t('schedulePricing.pricingTab')}
          </button>
        </div>

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="mb-12">
            <DynamicScheduleTable />

            {/* Legend */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-green-oxford mb-3">{t('schedulePricing.legend')}:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div><span className="font-semibold">M2:</span> {language === 'pt' ? 'Matemática - Ensino Médio' : 'Mathematics - High School'}</div>
                <div><span className="font-semibold">F2:</span> {language === 'pt' ? 'Física - Ensino Médio' : 'Physics - High School'}</div>
                <div><span className="font-semibold">C7, C8, C9:</span> {language === 'pt' ? 'Ciências - 7º, 8º, 9º ano' : 'Sciences - 7th, 8th, 9th grade'}</div>
                <div><span className="font-semibold">M8, M9:</span> {language === 'pt' ? 'Matemática - 8º, 9º ano' : 'Mathematics - 8th, 9th grade'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-8 transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-br from-green-oxford to-green-salvia text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 hover:border-green-oxford'
                  }`}
                >
                  {plan.highlight && (
                    <div className="mb-4 inline-block px-3 py-1 bg-gold-antique text-green-oxford rounded-full text-xs font-bold">
                      {t('schedulePricing.mostPopular')}
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {plan.description}
                  </h3>

                  <div className="mb-4">
                    <div className="text-4xl font-bold mb-1">
                      R$ {plan.monthlyPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <p className={`text-sm ${plan.highlight ? 'text-gray-100' : 'text-gray-600'}`}>
                      {t('schedulePricing.perMonth')}
                    </p>
                  </div>

                  {plan.discount > 0 && (
                    <div className={`mb-4 p-3 rounded ${plan.highlight ? 'bg-white' : 'bg-green-50'}`}>
                      <p className={`text-sm font-semibold ${plan.highlight ? 'text-green-oxford' : 'text-green-oxford'}`}>
                        💰 {plan.discount}% {t('schedulePricing.discount')}
                      </p>
                    </div>
                  )}

                  <a
                    href={formUrl}
                    target="_blank"
                    rel="noopener noreférrer"
                    className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${
                      plan.highlight
                        ? 'bg-white text-green-oxford hover:bg-gray-100'
                        : 'bg-green-oxford text-white hover:bg-green-salvia'
                    }`}
                  >
                    {t('schedulePricing.enroll')}
                  </a>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 space-y-4">
              <h4 className="text-xl font-bold text-green-oxford" style={{ fontFamily: "'Playfair Display', serif" }}>
                ℹ️ {t('schedulePricing.importantInfo')}
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-gold-antique font-bold mt-1">•</span>
                  <span><strong>{t('schedulePricing.paymentMethods')}:</strong> Pix ou Boleto Bancário</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-antique font-bold mt-1">•</span>
                  <span><strong>{t('schedulePricing.platform')}:</strong> Google Meet (aulas online)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-antique font-bold mt-1">•</span>
                  <span><strong>{t('schedulePricing.duration')}:</strong> 1 hora semanal por disciplina</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-antique font-bold mt-1">•</span>
                  <span><strong>{t('schedulePricing.startDate')}:</strong> Semana de 19 de janeiro de 2026</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-antique font-bold mt-1">•</span>
                  <span><strong>{t('schedulePricing.individualMentoring')}:</strong> R$ 534,60/mês (10% de desconto)</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {t('schedulePricing.ctaQuestion')}
          </p>
          <a
            href="https://wa.me/5547996448774"
            target="_blank"
            rel="noopener noreférrer"
            className="inline-block px-8 py-3 bg-green-oxford text-white font-semibold rounded-lg hover:bg-green-salvia transition-colors"
          >
            {t('schedulePricing.contactWhatsApp')}
          </a>
        </div>
      </div>
    </section>
  );
}
