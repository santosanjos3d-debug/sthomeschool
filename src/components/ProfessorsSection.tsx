/**
 * Proféssors Section Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Destaque para credenciais acadêmicas de ambos os professores
 * - Verde Oxford para transmitir autoridade
 * - Tipografia Playfair Display para nomes e títulos
 * - Layout em grid para igualdade visual
 * - Foco em confiança e expertise
 */

import { useLanguage } from '@/contexts/LanguageContext';

interface Proféssor {
  name: string;
  specialty: string;
  credentials: string[];
  lattes: string;
  avatar: string;
}

const getProféssors = (t: (key: string) => string) => [
  {
    name: 'Prof. Giorgio Ernesto Testoni',
    specialty: t('professors.giorgio.specialty'),
    credentials: [
      t('professors.giorgio.cred1'),
      t('professors.giorgio.cred2'),
      t('professors.giorgio.cred3'),
    ],
    lattes: 'https://lattes.cnpq.br/9048545328091154',
    avatar: 'G',
  },
  {
    name: 'Prof. Víctor de Souza Assunção Bonfim',
    specialty: t('professors.victor.specialty'),
    credentials: [
      t('professors.victor.cred1'),
      t('professors.victor.cred2'),
      t('professors.victor.cred3'),
      t('professors.victor.cred4'),
    ],
    lattes: 'http://lattes.cnpq.br/0311712117044305',
    avatar: 'V',
  },
];

export default function ProfessorsSection() {
  const { t } = useLanguage();
  const professors = getProféssors(t);
  
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-gold-antique uppercase tracking-widest mb-2">
            {t('professors.label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-green-oxford mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('professors.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('professors.description')}
          </p>
        </div>

        {/* Proféssors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {professors.map((professor, index) => (
            <div key={index} className="card-elegant">
              <div className="flex flex-col h-full">
                {/* Avatar */}
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-oxford to-green-salvia rounded-lg flex items-center justify-center text-white text-4xl font-bold">
                    {professor.avatar}
                  </div>
                </div>

                {/* Name and Specialty */}
                <h3 className="text-2xl font-bold text-green-oxford mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {professor.name}
                </h3>
                <p className="text-lg font-semibold text-gold-antique mb-4">
                  {professor.specialty}
                </p>

                {/* Credentials */}
                <div className="flex-1 mb-6">
                  <ul className="space-y-3">
                    {professor.credentials.map((credential, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-gold-antique font-bold mt-1">•</span>
                        <span className="text-gray-600 text-sm leading-relaxed">{credential}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lattes Link */}
                <a
                  href={professor.lattes}
                  target="_blank"
                  rel="noopener noreférrer"
                  className="inline-block text-gold-antique font-semibold hover:text-green-oxford transition-colors"
                >
                  {t('professors.lattesLink')} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Team Philosophy */}
        <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200">
          <h3 className="text-2xl font-bold text-green-oxford mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('professors.philosophyTitle')}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {t('professors.philosophy1')}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {t('professors.philosophy2')}
          </p>
        </div>
      </div>
    </section>
  );
}
