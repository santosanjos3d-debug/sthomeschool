import { BookOpen, Beaker, Zap, Microscope } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Courses Section Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Cards com sombra suave e hover effécts
 * - Ícones lineares customizados para cada disciplina
 * - Verde Sálvia para subtítulos
 * - Layout em grid responsivo
 */



export default function CoursesSection() {
  const { t, language } = useLanguage();
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScRKDV-l8_FKuIfUUc5KUDzfWzcy7m4TGcXGVrfmfW7zaBlAQ/viewform';
  
  const coursesData = [
    {
      id: 'matematica',
      titlePt: 'Matemática',
      titleEn: 'Mathematics',
      descriptionPt: 'A matemática como linguagem científica universal: compreendida e práticada através de exercícios, simulações e aplicações no cotidiano. Desenvolvemos o real domínio da lógica matemática, essencial para a compreensão do mundo ao nosso redor.',
      descriptionEn: 'Mathematics as a universal scientific language: understood and practiced through exercises, simulations and real-world applications. We develop true mastery of mathematical logic, essential for understanding the world around us.',
      ageGroupPt: 'A partir de 11 anos',
      ageGroupEn: 'From 11 years old',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'border-green-oxford',
    },
    {
      id: 'ciências',
      titlePt: 'Ciências',
      titleEn: 'Sciences',
      descriptionPt: 'Introdução integrada aos conceitos e definições de Física, Química e Biologia. Através de experimentos práticos, simulações e atividades mão na massa, os alunos exploram o mundo natural e desenvolvem o pensamento científico desde cedo.',
      descriptionEn: 'Integrated introduction to Physics, Chemistry and Biology concepts. Through hands-on experiments, simulations and practical activities, students explore the natural world and develop scientific thinking early on.',
      ageGroupPt: 'A partir de 11 anos (Fundamental II)',
      ageGroupEn: 'From 11 years old (Middle School)',
      icon: <Microscope className="w-8 h-8" />,
      color: 'border-green-salvia',
    },
    {
      id: 'fisica',
      titlePt: 'Física',
      titleEn: 'Physics',
      descriptionPt: 'O uso da matemática para resolução de problemas de engenharia e compreensão profunda do desenvolvimento tecnológico. Experimentos, simulações computacionais e exercícios práticos conectam teoria e aplicações reais do mundo moderno.',
      descriptionEn: 'Using mathematics to solve engineering problems and deeply understand technological development. Experiments, computer simulations and practical exercises connect theory with real-world applications.',
      ageGroupPt: 'A partir de 15 anos (Ensino Médio)',
      ageGroupEn: 'From 15 years old (High School)',
      icon: <Zap className="w-8 h-8" />,
      color: 'border-gold-antique',
    },
    {
      id: 'quimica',
      titlePt: 'Química',
      titleEn: 'Chemistry',
      descriptionPt: 'O estudo da matéria em sua constituição atômica: reações e ligações químicas aplicadas à compreensão da matéria orgânica e inorgânica. Experimentos controlados, simulações moleculares e atividades práticas conectam teoria e observação.',
      descriptionEn: 'Study of matter in its atomic constitution: chemical reactions and bonds applied to understanding organic and inorganic matter. Controlled experiments, molecular simulations and practical activities connect theory and observation.',
      ageGroupPt: 'A partir de 15 anos (Ensino Médio)',
      ageGroupEn: 'From 15 years old (High School)',
      icon: <Beaker className="w-8 h-8" />,
      color: 'border-green-oxford',
    },
  ];
  return (
    <section id="turmas" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-gold-antique uppercase tracking-widest mb-2">
            {t('courses.label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-green-oxford mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('courses.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coursesData.map((course) => (
            <div
              key={course.id}
              className={`card-elegant border-l-4 ${course.color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className="mb-4 text-gold-antique">
                {course.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-green-oxford mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {language === 'pt' ? course.titlePt : course.titleEn}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'pt' ? course.descriptionPt : course.descriptionEn}
              </p>

              {/* Age Group */}
              <div className="flex items-center gap-2 text-sm font-semibold text-green-salvia">
                <span className="inline-block w-2 h-2 bg-gold-antique rounded-full"></span>
                {language === 'pt' ? course.ageGroupPt : course.ageGroupEn}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info and CTA */}
        <div className="mt-12 space-y-6">
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <p className="text-center text-gray-600">
              <span className="font-semibold text-green-oxford">*</span> {t('courses.note')}
            </p>
          </div>
          <div className="text-center">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreférrer"
              className="btn-accent inline-block"
            >
              {t('hero.preInscricao')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
