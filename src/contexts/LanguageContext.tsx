import { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções com entidades HTML para garantir acentuação
const translations = {
  pt: {
    'nav.turmas': 'Turmas 2026',
    'nav.clube': 'Clube de Ciências',
    'nav.metodologia': 'Metodologia',
    'nav.sobre': 'Sobre',
    'nav.loja': 'Loja',
    'nav.preInscricao': 'Pré-Inscrição',

    'hero.bemVindo': 'Bem-vindo &agrave;',
    'hero.titulo': 'Saint Thomas Homeschool',
    'hero.citacao': '"O estudioso &eacute; aquele que leva aos demais o que ele compreendeu: a Verdade"',
    'hero.autor': '— Santo Tom&aacute;s de Aquino',
    'hero.descricao': 'Educa&ccedil;&atilde;o personalizada em Matem&aacute;tica, F&iacute;sica, Qu&iacute;mica e Ci&ecirc;ncias para alunos em homeschool ou que frequentam a escola. Aprendizado baseado em experimentos, simula&ccedil;&otilde;es e pr&aacute;tica, sob a orienta&ccedil;&atilde;o do Prof. Giorgio Testoni, Doutor em Ci&ecirc;ncias pelo Instituto Tecnol&oacute;gico de Aeron&aacute;utica (ITA).',
    'hero.preInscricao': 'Pr&eacute;-Inscri&ccedil;&atilde;o',
    'hero.faleConosco': 'Fale Conosco',

    'professors.label': 'QUEM SOMOS',
    'professors.title': 'Conhe&ccedil;a Nossos Professores',
    'professors.description': 'Uma equipe de educadores com forma&ccedil;&atilde;o acad&ecirc;mica de excel&ecirc;ncia, dedicados ao desenvolvimento integral de seus alunos.',
    'professors.giorgio.specialty': 'Matem&aacute;tica, F&iacute;sica e Ci&ecirc;ncias',
    'professors.giorgio.cred1': 'Doutor em Ci&ecirc;ncias pelo Instituto Tecnol&oacute;gico de Aeron&aacute;utica (ITA)',
    'professors.giorgio.cred2': 'Especialista em Educa&ccedil;&atilde;o Personalizada e ensino experimental',
    'professors.giorgio.cred3': 'Forma&ccedil;&atilde;o acad&ecirc;mica em pesquisa cient&iacute;fica de alto n&iacute;vel',
    'professors.victor.specialty': 'Qu&iacute;mica',
    'professors.victor.cred1': 'P&oacute;s-doutor em Qu&iacute;mica pela University of Kent, Inglaterra (2023)',
    'professors.victor.cred2': 'Doutor em F&iacute;sica e Astronomia pela UNIVAP (2018)',
    'professors.victor.cred3': 'Mestre em F&iacute;sico-Qu&iacute;mica pela UnB (2011)',
    'professors.victor.cred4': 'Bacharel em Qu&iacute;mica pela UnB (2008)',
    'professors.lattesLink': 'Ver Curr&iacute;culo Lattes',
    'professors.philosophyTitle': 'Nossa Filosofia Educacional',
    'professors.philosophy1': 'Acreditamos que a verdadeira educa&ccedil;&atilde;o vai al&eacute;m da memoriza&ccedil;&atilde;o de conceitos. Nossos professores trabalham juntos para proporcionar uma experi&ecirc;ncia de aprendizado que combina rigor cient&iacute;fico com abordagem humanizada, permitindo que cada aluno desenvolva sua compreens&atilde;o profunda e capacidade de aplica&ccedil;&atilde;o pr&aacute;tica do conhecimento.',
    'professors.philosophy2': 'Com forma&ccedil;&atilde;o acad&ecirc;mica de excel&ecirc;ncia e experi&ecirc;ncia em Educa&ccedil;&atilde;o Personalizada, estamos comprometidos em guiar nossos alunos n&atilde;o apenas para o sucesso acad&ecirc;mico, mas para o desenvolvimento integral como pensadores cr&iacute;ticos e cidad&atilde;os conscientes.',

    'club.title': 'Clube de Ci&ecirc;ncias',
    'club.subtitle': 'Feira de Ci&ecirc;ncias Anual',
    'club.description': 'Todo ano, nossos alunos de Ci&ecirc;ncias apresentam projetos na Feira de Ci&ecirc;ncias, aplicando na pr&aacute;tica tudo o que aprenderam. Veja os resultados dos anos anteriores:',

    'about.label': 'Nossa Hist&oacute;ria',
    'about.title': 'Sobre a ST Homeschool',
    'about.originTitle': 'Como Tudo Come&ccedil;ou',
    'about.origin1': 'A <strong>ST Homeschool</strong> surgiu no in&iacute;cio de <strong>2022</strong>, quando o Prof. Giorgio come&ccedil;ou a acompanhar tr&ecirc;s alunos homeschoolers de forma remota por videochamada. O que come&ccedil;ou como uma iniciativa modesta rapidamente se transformou em uma miss&atilde;o educacional.',
    'about.origin2': 'No ano seguinte, em <strong>2023</strong>, o professor passou a se dedicar integralmente a fam&iacute;lias educadoras e aos alunos que estudam em casa ou que frequentam a escola mas desejam complementar sua forma&ccedil;&atilde;o. Assim surgiram as turmas de <strong>Ci&ecirc;ncias, Matem&aacute;tica e F&iacute;sica</strong>, cada uma com uma metodologia &uacute;nica baseada em experimentos, simula&ccedil;&otilde;es e pr&aacute;tica constante.',
    'about.origin3': 'Hoje, a ST Homeschool &eacute; refer&ecirc;ncia em educa&ccedil;&atilde;o cient&iacute;fica personalizada, atendendo fam&iacute;lias que buscam excel&ecirc;ncia acad&ecirc;mica aliada a valores s&oacute;lidos e acompanhamento individual.',
    'about.whySaintThomasTitle': 'Por que Saint Thomas?',
    'about.whySaintThomasDesc': 'Nosso nome se inspira em <strong>S&atilde;o Tom&aacute;s de Aquino</strong>, o Doutor Ang&eacute;lico, que soube conciliar t&atilde;o bem dois pilares fundamentais do conhecimento humano: <strong>f&eacute; e raz&atilde;o</strong>.',
    'about.faith': 'F&eacute;',
    'about.faithDesc': 'A busca pela verdade transcendente, o cultivo de valores &eacute;ticos e a forma&ccedil;&atilde;o integral do ser humano.',
    'about.reason': 'Raz&atilde;o',
    'about.reasonDesc': 'O rigor cient&iacute;fico, a investiga&ccedil;&atilde;o met&oacute;dica e a compreens&atilde;o profunda das leis naturais atrav&eacute;s da ci&ecirc;ncia.'
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
