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
    'hero.descricao': 'Educação personalizada em Matemática, Física, Química e Ciências para alunos em homeschool ou que frequentam a escola. Aprendizado baseado em experimentos, simulações e prática, sob a orientação do Prof. Giorgio Testoni, Doutor em Ciências pelo Instituto Tecnológico de Aeronáutica (ITA).',
    'hero.preInscricao': 'Pré-Inscrição',
    'hero.faleConosco': 'Fale Conosco',

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
    'professors.philosophy1': 'Acreditamos que a verdadeira educação vai além da memorização de conceitos. Nossos professores trabalham juntos para proporcionar uma experiência de aprendizado que combina rigor científico com abordagem humanizada, permitindo que cada aluno desenvolva sua compreensão profunda e capacidade de aplicação prática do conhecimento.',
    'professors.philosophy2': 'Com formação acadêmica de excelência e experiência em Educação Personalizada, estamos comprometidos em guiar nossos alunos não apenas para o sucesso acadêmico, mas para o desenvolvimento integral como pensadores críticos e cidadãos conscientes.',

        'club.title': 'Clube de Ciências',
    'club.subtitle': 'Feira de Ciências Anual',
    'club.description': 'Todo ano, nossos alunos de Ciências apresentam projetos na Feira de Ciências, aplicando na prática tudo o que aprenderam. Veja os resultados dos anos anteriores:',

    'about.label': 'Nossa História',
    'about.title': 'Sobre a ST Homeschool',
    'about.originTitle': 'Como Tudo Começou',
    'about.origin1': 'A <strong>ST Homeschool</strong> surgiu no início de <strong>2022</strong>, quando o Prof. Giorgio começou a acompanhar três alunos homeschoolers de forma remota por videochamada. O que começou como uma iniciativa modesta rapidamente se transformou em uma missão educacional.',
    'about.origin2': 'No ano seguinte, em <strong>2023</strong>, o professor passou a se dedicar integralmente a famílias educadoras e aos alunos que estudam em casa ou que frequentam a escola mas desejam complementar sua formação. Assim surgiram as turmas de <strong>Ciências, Matemática e Física</strong>, cada uma com uma metodologia única baseada em experimentos, simulações e prática constante.',
    'about.origin3': 'Hoje, a ST Homeschool é referência em educação científica personalizada, atendendo famílias que buscam excelência acadêmica aliada a valores sólidos e acompanhamento individual.',
    'about.whySaintThomasTitle': 'Por que Saint Thomas?',
    'about.whySaintThomasDesc': 'Nosso nome se inspira em <strong>São Tomás de Aquino</strong>, o Doutor Angélico, que soube conciliar tão bem dois pilares fundamentais do conhecimento humano: <strong>fé e razão</strong>.',
    'about.faith': 'Fé',
    'about.faithDesc': 'A busca pela verdade transcendente, o cultivo de valores éticos e a formação integral do ser humano.',
    'about.reason': 'Razão',
    'about.reasonDesc': 'O rigor científico, a investigação metódica e a compreensão profunda das leis naturais através da ciência.'
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
    'hero.descricao': 'Personalized education in Mathematics, Physics, Chemistry and Science for homeschoolers or school students. Learning based on experiments, simulations and practice, under the guidance of Prof. Giorgio Testoni, PhD in Science from ITA.',
    'hero.preInscricao': 'Pre-Registration',
    'hero.faleConosco': 'Contact Us'
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
