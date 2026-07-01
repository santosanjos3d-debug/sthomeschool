import { BookOpen, PenTool, Users, Target, Award, Video } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Methodology Section Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Abordagem pedagógica baseada em Víctor García Hoz (educação personalizada)
 * - Educação Clássica (leitura, escrita, discussão)
 * - Aluno como sujeito ativo no processo de ensino-aprendizagem
 * - Vídeos das Feiras de Ciências como prova social
 */

interface MethodologyPillar {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const pillars: MethodologyPillar[] = [
  {
    title: 'Educação Personalizada',
    description: 'Fundamentada nos princípios de Víctor García Hoz, reconhece cada aluno como ser único e irrepetível. Três pilares essenciais: singularidade (respeito às características individuais), autonomia (desenvolvimento da capacidade de autogoverno) e abertura (formação integral que transcende o puramente acadêmico). O ensino é adaptado ao ritmo, estilo de aprendizagem e potencial específico de cada estudante.',
    icon: <Target className="w-8 h-8" />,
  },
  {
    title: 'Educação Clássica',
    description: 'Enraizada na tradição greco-romana e no Trivium medieval (Gramática, Lógica e Retórica), busca a formação integral do ser humano através das artes liberais. Baseada em três pilares: conhecimento das grandes obras (leitura de textos fundamentais), desenvolvimento do pensamento crítico (análise, argumentação e síntese) e cultivo das virtudes intelectuais (disciplina, perseverança e amor à verdade). O aluno domina a arte de aprender através da leitura, escrita, discussão e prática constante.',
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    title: 'Aluno como Sujeito Ativo',
    description: 'Assistir aula não é estudar. O aluno precisa criar o hábito de estudo e ser protagonista do próprio aprendizado. O acompanhamento e estímulo da família são fundamentais nesse processo: pais engajados criam o ambiente propício para que o estudante desenvolva disciplina, autonomia e perseverança. Apenas através da prática constante — ler, escrever, resolver exercícios — o aprendizado realmente ocorre.',
    icon: <PenTool className="w-8 h-8" />,
  },
  {
    title: 'Avaliação Contínua',
    description: 'Quatro avaliações durante o ano (provas de múltipla escolha, discursivas e trabalhos) garantem acompanhamento constante do progresso. Todos os alunos de Ciências participam da Feira de Ciências anual.',
    icon: <Award className="w-8 h-8" />,
  },
];

const learningMethods = [
  { icon: '📖', label: 'Ler' },
  { icon: '✍️', label: 'Escrever' },
  { icon: '👂', label: 'Ouvir' },
  { icon: '💬', label: 'Discutir' },
  { icon: '🔬', label: 'Praticar' },
  { icon: '📝', label: 'Resolver Exercícios' },
];

export default function MethodologySection() {
  const { t, language } = useLanguage();
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScRKDV-l8_FKuIfUUc5KUDzfWzcy7m4TGcXGVrfmfW7zaBlAQ/viewform';
  
  const pillarsData = [
    {
      id: 'personalized',
      titlePt: 'Educação Personalizada',
      titleEn: 'Personalized Education',
      descriptionPt: 'Fundamentada nos princípios de Víctor García Hoz, reconhece cada aluno como ser único e irrepetível. Três pilares essenciais: singularidade (respeito às características individuais), autonomia (desenvolvimento da capacidade de autogoverno) e abertura (formação integral que transcende o puramente acadêmico). O ensino é adaptado ao ritmo, estilo de aprendizagem e potencial específico de cada estudante.',
      descriptionEn: 'Based on the principles of Víctor García Hoz, it recognizes each student as a unique and irreplaceable being. Three essential pillars: singularity (respect for individual characteristics), autonomy (development of self-governance capacity) and openness (comprehensive education that transcends purely academic). Teaching is adapted to each student\'s pace, learning style and specific potential.',
      icon: <Target className="w-8 h-8" />,
    },
    {
      id: 'classical',
      titlePt: 'Educação Clássica',
      titleEn: 'Classical Education',
      descriptionPt: 'Enraizada na tradição greco-romana e no Trivium medieval (Gramática, Lógica e Retórica), busca a formação integral do ser humano através das artes liberais. Baseada em três pilares: conhecimento das grandes obras (leitura de textos fundamentais), desenvolvimento do pensamento crítico (análise, argumentação e síntese) e cultivo das virtudes intelectuais (disciplina, perseverança e amor à verdade). O aluno domina a arte de aprender através da leitura, escrita, discussão e prática constante.',
      descriptionEn: 'Rooted in Greco-Roman tradition and medieval Trivium (Grammar, Logic and Rhetoric), it seeks comprehensive human formation through liberal arts. Based on three pillars: knowledge of great works (reading fundamental texts), development of critical thinking (analysis, argumentation and synthesis) and cultivation of intellectual virtues (discipline, perseverance and love of truth). Students master the art of learning through reading, writing, discussion and constant practice.',
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      id: 'active',
      titlePt: 'Aluno como Sujeito Ativo',
      titleEn: 'Student as Active Subject',
      descriptionPt: 'Assistir aula não é estudar. O aluno precisa criar o hábito de estudo e ser protagonista do próprio aprendizado. O acompanhamento e estímulo da família são fundamentais nesse processo: pais engajados criam o ambiente propício para que o estudante desenvolva disciplina, autonomia e perseverança. Apenas através da prática constante — ler, escrever, resolver exercícios — o aprendizado realmente ocorre.',
      descriptionEn: 'Attending class is not studying. Students must develop study habits and be protagonists of their own learning. Family support and encouragement are fundamental: engaged parents create an environment where students develop discipline, autonomy and perseverance. Learning truly occurs only through constant practice — reading, writing, solving exercises.',
      icon: <PenTool className="w-8 h-8" />,
    },
    {
      id: 'assessment',
      titlePt: 'Avaliação Contínua',
      titleEn: 'Continuous Assessment',
      descriptionPt: 'Quatro avaliações durante o ano (provas de múltipla escolha, discursivas e trabalhos) garantem acompanhamento constante do progresso. Todos os alunos de Ciências participam da Feira de Ciências anual.',
      descriptionEn: 'Four assessments during the year (multiple choice tests, essays and projects) ensure constant progress monitoring. All Science students participate in the annual Science Fair.',
      icon: <Award className="w-8 h-8" />,
    },
  ];

  const learningMethodsData = [
    { icon: '📖', labelPt: 'Ler', labelEn: 'Read' },
    { icon: '✍️', labelPt: 'Escrever', labelEn: 'Write' },
    { icon: '👂', labelPt: 'Ouvir', labelEn: 'Listen' },
    { icon: '🗣️', labelPt: 'Discutir', labelEn: 'Discuss' },
    { icon: '🔬', labelPt: 'Praticar', labelEn: 'Practice' },
    { icon: '📝', labelPt: 'Resolver Exercícios', labelEn: 'Solve Exercises' },
  ];

  const scienceFairVideos = [
    {
      titlePt: 'Feira de Ciências 2025',
      titleEn: 'Science Fair 2025',
      url: 'https://youtu.be/RElsoj1pyPQ',
      thumbnail: 'https://img.youtube.com/vi/RElsoj1pyPQ/maxresdefault.jpg',
    },
  ];

  return (
    <section id="metodologia" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-gold-antique uppercase tracking-widest mb-2">
            {t('methodology.label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-green-oxford mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('methodology.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('methodology.subtitle')}
          </p>
        </div>

        {/* Methodology Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pillarsData.map((pillar, index) => (
            <div
              key={index}
              className="card-elegant hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="text-gold-antique flex-shrink-0">{pillar.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-oxford mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {language === 'pt' ? pillar.titlePt : pillar.titleEn}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'pt' ? pillar.descriptionPt : pillar.descriptionEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Cycle */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-green-oxford mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('methodology.learningCycleTitle')}
          </h3>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            {t('methodology.learningCycleDesc')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {learningMethodsData.map((method, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{method.icon}</div>
                <p className="text-sm font-semibold text-gray-700">{language === 'pt' ? method.labelPt : method.labelEn}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-green-oxford/5 rounded-lg border-l-4 border-green-oxford">
            <p className="text-gray-700 leading-relaxed">
              {t('methodology.weeklyStructure')}
            </p>
          </div>
        </div>

        {/* Science Fair Videos */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-green-oxford mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('methodology.scienceFairTitle')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('methodology.scienceFairDesc')}
            </p>
          </div>

          <div className="flex justify-center">
            {scienceFairVideos.map((video, index) => (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-2xl w-full"
              >
                <div className="relative aspect-video bg-gray-200">
                  <img
                    src={video.thumbnail}
                    alt={language === 'pt' ? video.titlePt : video.titleEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="w-8 h-8 text-green-oxford" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-green-oxford group-hover:text-gold-antique transition-colors">
                    {language === 'pt' ? video.titlePt : video.titleEn}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{t('methodology.watchOnYoutube')}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-oxford to-green-salvia rounded-lg p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('methodology.ctaTitle')}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {t('methodology.ctaDesc')}
          </p>
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white text-green-oxford font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            {t('hero.preInscricao')}
          </a>
        </div>
      </div>
    </section>
  );
}
