import { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    'nav.turmas': 'Turmas 2026',
    'nav.clube': 'Clube de Ciências',
    'nav.metodologia': 'Metodologia',
    'nav.sobre': 'Sobre',
    'nav.loja': 'Loja',
    'nav.preInscricao': 'Pré-Inscrição',

    'hero.bemVindo': 'Bem-vindo à',
    'hero.titulo': 'Saint Thomas Homeschool',
    'hero.citacao': '"O estudioso é aquele que leva aos demais o que ele compreendeu: a Verdade"',
    'hero.autor': '— Santo Tomás de Aquino',
    'hero.descricao': 'Educação personalizada em Matemática, Física, Química e Ciências para alunos em homeschool ou que frequentam a escola. Aprendizado baseado em experimentos, simulações e prática.',
    'hero.preInscricao': 'Pré-Inscrição',
    'hero.faleConosco': 'Fale Conosco',

    'courses.label': 'NOSSAS TURMAS',
    'courses.title': 'Conheça Nossos Cursos',
    'courses.subtitle': 'Educação de qualidade em Matemática, Física, Química e Ciências com metodologia inovadora e personalizada.',
    'courses.note': 'As turmas são interdisciplinares e permitem que alunos aprendam em pequenos grupos com acompanhamento individual.',

    'professors.label': 'QUEM SOMOS',
    'professors.title': 'Conheça Nossos Professores',
    'professors.description': 'Uma equipe de educadores com formação acadêmica de excelência, dedicados ao desenvolvimento integral de seus alunos.',
    'professors.giorgio.specialty': 'Matemática, Física e Ciências',
    'professors.giorgio.cred1': 'Doutor em Ciências pelo Instituto Tecnológico de Aeronáutica (ITA)',
    'professors.giorgio.cred2': 'Especialista em Educação Personalizada e ensino experimental',
    'professors.giorgio.cred3': 'Formação acadêmica em pesquisa científica de alto nível',
    'professors.victor.specialty': 'Química',
    'professors.victor.cred1': 'Pós-doutor em Química pela University of Kent, Inglaterra (2023)',
    'professors.victor.cred2': 'Doutor em Física e Astronomia pela UNIVAP (2018)',
    'professors.victor.cred3': 'Mestre em Físico-Química pela UnB (2011)',
    'professors.victor.cred4': 'Bacharel em Química pela UnB (2008)',
    'professors.lattesLink': 'Ver Currículo Lattes',
    'professors.philosophyTitle': 'Nossa Filosofia Educacional',
    'professors.philosophy1': 'Acreditamos que a verdadeira educação vai além da memorização de conceitos. Nossos professores trabalham juntos para proporcionar uma experiência de aprendizado significativa.',
    'professors.philosophy2': 'Com formação acadêmica de excelência e experiência em Educação Personalizada, estamos comprometidos em guiar nossos alunos não apenas para o sucesso acadêmico, mas para o desenvolvimento integral.',

    'club.title': 'Clube de Ciências',
    'club.subtitle': 'Feira de Ciências Anual',
    'club.description': 'Todo ano, nossos alunos de Ciências apresentam projetos na Feira de Ciências, aplicando na prática tudo o que aprenderam. Veja os resultados dos anos anteriores:',
    'club.label': 'CLUBE DE CIÊNCIAS',
    'club.feature1': 'Encontros Semanais',
    'club.feature1Desc': 'Sessões práticas toda semana com experimentos e projetos científicos.',
    'club.feature2': 'Mentoria Personalizada',
    'club.feature2Desc': 'Acompanhamento individual para desenvolver o potencial de cada aluno.',
    'club.feature3': 'Feira de Ciências Anual',
    'club.feature3Desc': 'Apresentação dos projetos para a comunidade escolar ao final do ano.',
    'club.cta': 'Inscreva-se no Clube de Ciências',

    'about.label': 'Nossa História',
    'about.title': 'Sobre a ST Homeschool',
    'about.originTitle': 'Como Tudo Começou',
    'about.origin1': 'A <strong>ST Homeschool</strong> surgiu no início de <strong>2022</strong>, quando o Prof. Giorgio começou a acompanhar três alunos homeschoolers de forma remota por videoconferência.',
    'about.origin2': 'No ano seguinte, em <strong>2023</strong>, o professor passou a se dedicar integralmente a famílias educadoras e aos alunos que estudam em casa ou que frequentam a escola mantendo as aulas personalizadas.',
    'about.origin3': 'Hoje, a ST Homeschool é referência em educação científica personalizada, atendendo famílias que buscam excelência acadêmica aliada a valores sólidos e acompanhamento dedicado.',
    'about.whySaintThomasTitle': 'Por que Saint Thomas?',
    'about.whySaintThomasDesc': 'Nosso nome se inspira em <strong>São Tomás de Aquino</strong>, o Doutor Angélico, que soube conciliar tão bem dois pilares fundamentais do conhecimento humano:',
    'about.faith': 'Fé',
    'about.faithDesc': 'A busca pela verdade transcendente, o cultivo de valores éticos e a formação integral do ser humano.',
    'about.reason': 'Razão',
    'about.reasonDesc': 'O rigor científico, a investigação metódica e a compreensão profunda das leis naturais através da ciência.',
    'about.harmony': 'Harmonia',
    'about.harmonyDesc': 'A integração entre fé e razão, reconhecendo que a verdade é una e que ciência e espiritualidade se complementam.',
    'about.aquinasQuote': '"A verdade é a conformidade do intelecto com a realidade."',
    'about.aquinasAttribution': '— Santo Tomás de Aquino',
    'about.philosophy3': 'A ST Homeschool resgata a visão tomista de que o conhecimento verdadeiro integra fé e razão, preparando o aluno não apenas para os desafios acadêmicos, mas para uma vida plena de significado.',
    'about.philosophyTitle': 'Nossa Filosofia Educacional',
    'about.philosophy1': 'Acreditamos que a verdadeira educação vai além da memorização de conceitos. Nossos professores trabalham juntos para proporcionar uma experiência de aprendizado significativa.',
    'about.philosophy2': 'Com formação acadêmica de excelência e experiência em Educação Personalizada, estamos comprometidos em guiar nossos alunos não apenas para o sucesso acadêmico, mas para o desenvolvimento integral.',

    'schedulePricing.label': 'HORÁRIOS E PREÇOS',
    'schedulePricing.title': 'Horários e Investimento',
    'schedulePricing.subtitle': 'Conheça nossos horários disponíveis e planos de investimento para 2026.',
    'schedulePricing.scheduleTab': 'Horários',
    'schedulePricing.pricingTab': 'Preços',
    'schedulePricing.legend': 'Legenda',
    'schedulePricing.mostPopular': 'Mais Popular',
    'schedulePricing.perMonth': '/mês',
    'schedulePricing.discount': 'de desconto',
    'schedulePricing.enroll': 'Pré-Inscrição',
    'schedulePricing.importantInfo': 'Informações Importantes',
    'schedulePricing.paymentMethods': 'Formas de Pagamento',
    'schedulePricing.platform': 'Plataforma',
    'schedulePricing.duration': 'Duração',
    'schedulePricing.startDate': 'Início das Aulas',
    'schedulePricing.individualMentoring': 'Mentoria Individual',
    'schedulePricing.ctaQuestion': 'Ainda tem dúvidas? Entre em contato conosco!',
    'schedulePricing.contactWhatsApp': 'Fale Conosco no WhatsApp',

    'faq.label': 'FAQ',
    'faq.titulo': 'Perguntas Frequentes',
    'faq.subtitle': 'Tire suas dúvidas sobre nossos cursos, horários e metodologia de ensino.',
    'faq.ctaQuestion': 'Ainda tem dúvidas? Entre em contato conosco!',

    'methodology.label': 'METODOLOGIA',
    'methodology.title': 'Nossa Metodologia',
    'methodology.subtitle': 'Uma abordagem pedagógica que une o melhor da tradição clássica com as necessidades contemporâneas da educação personalizada.',
    'methodology.learningCycleTitle': 'Ciclo de Aprendizagem',
    'methodology.learningCycleDesc': 'Nosso método de ensino segue um ciclo completo que garante a absorção e aplicação do conhecimento.',
    'methodology.weeklyStructure': 'Cada semana inclui aulas expositivas, atividades práticas, exercícios e discussões para consolidar o aprendizado. A estrutura semanal é planejada para manter o engajamento e garantir progresso contínuo.',
    'methodology.scienceFairTitle': 'Feira de Ciências',
    'methodology.scienceFairDesc': 'Veja os registros das nossas Feiras de Ciências e acompanhe o desenvolvimento dos nossos alunos.',
    'methodology.watchOnYoutube': 'Assista no YouTube',
    'methodology.ctaTitle': 'Pronto para Transformar a Educação do seu Filho?',
    'methodology.ctaDesc': 'Inscreva-se agora e garanta uma vaga em nossas turmas personalizadas.',

    'footer.direitos': 'ST Homeschool. Todos os direitos reservados.',
  },
  en: {
    'nav.turmas': 'Classes 2026',
    'nav.clube': 'Science Club',
    'nav.metodologia': 'Methodology',
    'nav.sobre': 'About',
    'nav.loja': 'Shop',
    'nav.preInscricao': 'Pre-Registration',
    'hero.bemVindo': 'Welcome to',
    'hero.titulo': 'Saint Thomas Homeschool',
    'hero.citacao': '"The scholar is the one who takes to others what he has understood: the Truth"',
    'hero.autor': '— Saint Thomas Aquinas',
    'hero.descricao': 'Personalized education in Mathematics, Physics, Chemistry and Science for homeschoolers or school students. Learning based on experiments, simulations and practice.',
    'hero.preInscricao': 'Pre-Registration',
    'hero.faleConosco': 'Contact Us',

    'courses.label': 'OUR CLASSES',
    'courses.title': 'Discover Our Courses',
    'courses.subtitle': 'Quality education in Mathematics, Physics, Chemistry and Science with innovative and personalized methodology.',
    'courses.note': 'Classes are interdisciplinary and allow students to learn in small groups with individual guidance.',

    'professors.label': 'WHO WE ARE',
    'professors.title': 'Meet Our Teachers',
    'professors.description': 'A team of educators with excellent academic training, dedicated to the integral development of their students.',
    'professors.giorgio.specialty': 'Mathematics, Physics and Science',
    'professors.giorgio.cred1': 'Doctor of Science from the Aeronautics Institute of Technology (ITA)',
    'professors.giorgio.cred2': 'Specialist in Personalized Education and experimental teaching',
    'professors.giorgio.cred3': 'Academic training in high-level scientific research',
    'professors.victor.specialty': 'Chemistry',
    'professors.victor.cred1': 'Post-Doctoral in Chemistry from University of Kent, England (2023)',
    'professors.victor.cred2': 'Doctor in Physics and Astronomy from UNIVAP (2018)',
    'professors.victor.cred3': 'Master in Physical Chemistry from UnB (2011)',
    'professors.victor.cred4': 'Bachelor in Chemistry from UnB (2008)',
    'professors.lattesLink': 'View Lattes Curriculum',
    'professors.philosophyTitle': 'Our Educational Philosophy',
    'professors.philosophy1': 'We believe that true education goes beyond memorizing concepts. Our teachers work together to provide a meaningful learning experience.',
    'professors.philosophy2': 'With excellent academic training and experience in Personalized Education, we are committed to guiding our students not only to academic success but to integral development.',

    'club.title': 'Science Club',
    'club.subtitle': 'Annual Science Fair',
    'club.description': 'Every year, our Science students present projects at the Science Fair, putting into practice everything they have learned. See the results from previous years:',
    'club.label': 'SCIENCE CLUB',
    'club.feature1': 'Weekly Meetings',
    'club.feature1Desc': 'Practical sessions every week with experiments and science projects.',
    'club.feature2': 'Personalized Mentoring',
    'club.feature2Desc': 'Individual guidance to develop each student\'s potential.',
    'club.feature3': 'Annual Science Fair',
    'club.feature3Desc': 'Project presentation to the school community at the end of the year.',
    'club.cta': 'Join the Science Club',

    'about.label': 'Our History',
    'about.title': 'About ST Homeschool',
    'about.originTitle': 'How It All Started',
    'about.origin1': '<strong>ST Homeschool</strong> emerged in early <strong>2022</strong>, when Prof. Giorgio began accompanying three homeschooling students remotely via videoconference.',
    'about.origin2': 'The following year, in <strong>2023</strong>, the teacher began dedicating himself fully to educational families and students who study at home or attend school while maintaining personalized classes.',
    'about.origin3': 'Today, ST Homeschool is a reference in personalized scientific education, serving families seeking academic excellence combined with solid values and dedicated guidance.',
    'about.whySaintThomasTitle': 'Why Saint Thomas?',
    'about.whySaintThomasDesc': 'Our name is inspired by <strong>Saint Thomas Aquinas</strong>, the Angelic Doctor, who so well reconciled two fundamental pillars of human knowledge:',
    'about.faith': 'Faith',
    'about.faithDesc': 'The search for transcendent truth, the cultivation of ethical values and the integral formation of the human being.',
    'about.reason': 'Reason',
    'about.reasonDesc': 'Scientific rigor, methodical investigation and deep understanding of natural laws through science.',
    'about.harmony': 'Harmony',
    'about.harmonyDesc': 'The integration of faith and reason, recognizing that truth is one and that science and spirituality complement each other.',
    'about.aquinasQuote': '"Truth is the conformity of the intellect with reality."',
    'about.aquinasAttribution': '— Saint Thomas Aquinas',
    'about.philosophy3': 'ST Homeschool rescues the Thomistic vision that true knowledge integrates faith and reason, preparing students not only for academic challenges, but for a life full of meaning.',
    'about.philosophyTitle': 'Our Educational Philosophy',
    'about.philosophy1': 'We believe that true education goes beyond memorizing concepts. Our teachers work together to provide a meaningful learning experience.',
    'about.philosophy2': 'With excellent academic training and experience in Personalized Education, we are committed to guiding our students not only to academic success but to integral development.',

    'schedulePricing.label': 'SCHEDULE AND PRICES',
    'schedulePricing.title': 'Schedule and Investment',
    'schedulePricing.subtitle': 'Check our available schedules and investment plans for 2026.',
    'schedulePricing.scheduleTab': 'Schedule',
    'schedulePricing.pricingTab': 'Pricing',
    'schedulePricing.legend': 'Legend',
    'schedulePricing.mostPopular': 'Most Popular',
    'schedulePricing.perMonth': '/month',
    'schedulePricing.discount': 'discount',
    'schedulePricing.enroll': 'Pre-Registration',
    'schedulePricing.importantInfo': 'Important Information',
    'schedulePricing.paymentMethods': 'Payment Methods',
    'schedulePricing.platform': 'Platform',
    'schedulePricing.duration': 'Duration',
    'schedulePricing.startDate': 'Start Date',
    'schedulePricing.individualMentoring': 'Individual Mentoring',
    'schedulePricing.ctaQuestion': 'Still have questions? Contact us!',
    'schedulePricing.contactWhatsApp': 'Contact us on WhatsApp',

    'faq.label': 'FAQ',
    'faq.titulo': 'Frequently Asked Questions',
    'faq.subtitle': 'Find answers about our courses, schedules and teaching methodology.',
    'faq.ctaQuestion': 'Still have questions? Get in touch!',

    'methodology.label': 'METHODOLOGY',
    'methodology.title': 'Our Methodology',
    'methodology.subtitle': 'A pedagogical approach that combines the best of classical tradition with the contemporary needs of personalized education.',
    'methodology.learningCycleTitle': 'Learning Cycle',
    'methodology.learningCycleDesc': 'Our teaching method follows a complete cycle that ensures the absorption and application of knowledge.',
    'methodology.weeklyStructure': 'Each week includes lectures, practical activities, exercises and discussions to consolidate learning. The weekly structure is designed to maintain engagement and ensure continuous progress.',
    'methodology.scienceFairTitle': 'Science Fair',
    'methodology.scienceFairDesc': 'Check out the records of our Science Fairs and follow the development of our students.',
    'methodology.watchOnYoutube': 'Watch on YouTube',
    'methodology.ctaTitle': 'Ready to Transform Your Child\'s Education?',
    'methodology.ctaDesc': 'Register now and secure a spot in our personalized classes.',

    'footer.direitos': 'ST Homeschool. All rights reserved.'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    const dict = translations[language] as Record<string, string>;
    return dict[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
