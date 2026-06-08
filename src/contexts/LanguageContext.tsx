import { createContext, useContext, useState, useEff&eacute;ct } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções
const translations = {
  pt: {
    'nav.turmas': 'Turmas 2026',
    'nav.clube': 'Clube de Ci&ecirc;ncias',
    'nav.metodologia': 'Metodologia',
    'nav.sobre': 'Sobre',
    'nav.loja': 'Loja',
    'nav.preInscricao': 'Pr&eacute;-Inscrição',
    
    'hero.bemVindo': 'Bem-vindo à',
    'hero.titulo': 'Saint Thomas Homeschool',
    'hero.citacao': '"O estudioso &eacute; aquele que leva aos demais o que ele compreendeu: a Verdade"',
    'hero.autor': '— Santo Tomás de Aquino',
    'hero.descricao': 'Educação personalizada em Matem&aacute;tica, F&iacute;sica, Qu&iacute;mica e Ci&ecirc;ncias para alunos em homeschool ou que frequentam a escola. Aprendizado baseado em experimentos, simula&ccedil;&otilde;es e pr&aacute;tica, sob a orientação do Prof. Giorgio Testoni, Doutor em Ci&ecirc;ncias pelo Instituto Tecnol&oacute;gico de Aeronáutica (ITA).',
    'hero.preInscricao': 'Pr&eacute;-Inscrição',
    'hero.faleConosco': 'Fale Conosco',
    
    'faq.titulo': 'Perguntas Frequentes',
    'faq.q1': 'Quais são os valores das aulas?',
    'faq.a1': 'Temos um valor fixo por disciplina. Com desconto gradual de 10% pra quem faz 2 disciplinas e 20% pra quem faz 3 disciplinas ou mais. Entre em contato via WhatsApp ou preencha o formulário de pr&eacute;-inscrição para receber uma proposta personalizada de acordo com suas necessidades.',
    'faq.q2': 'Quais são os horários das aulas?',
    'faq.a2': 'As aulas em grupo ocorrem no período matutino. Tamb&eacute;m oferecemos sessões de Clube de Ci&ecirc;ncias com horários flexíveis. Para informações sobre outras possibilidades de agendamento, entre em contato conosco.',
    'faq.q3': 'Qual o horário do Clube de Ci&ecirc;ncias?',
    'faq.a3': 'As aulas do Clube de Ci&ecirc;ncias ocorrem às quintas-feiras das 14 h às 15 h.',
    'faq.q4': 'Os alunos recebem certificados?',
    'faq.a4': 'Sim! Todos os alunos que completam uma disciplina anual recebem certificado de participação. Al&eacute;m disso, aplicamos avaliações de desempenho para acompanhamento do progresso acad&ecirc;mico.',
    'faq.q5': 'Qual &eacute; a faixa etária recomendada?',
    'faq.a5': 'Nossas aulas são recomendadas para alunos de 9 a 18 anos. Do ensino fundamental ao ensino m&eacute;dio. No entanto, oferecemos programas personalizados para acompanhamento individual para dif&eacute;rentes níveis de conhecimento. Consulte-nos para avaliar a melhor opção para seu filho.',
    'faq.q6': 'Existe desconto para famílias de baixa renda?',
    'faq.a6': 'Sim. Of&eacute;recemos condições especiais (bolsa/desconto) para famílias de baixa renda, mediante análise. Entre em contato pelo WhatsApp para solicitar a avaliação e verificar a disponibilidade e o percentual de desconto aplicável.',
    
    'courses.label': 'Programas Educacionais',
    'courses.title': 'Turmas 2026',
    'courses.subtitle': 'Cursos estruturados para dif&eacute;rentes faixas etárias, com turmas divididas por conteúdo e nível de desenvolvimento.',
    'courses.note': 'Turmas divididas por conteúdo e faixas etárias para garantir aprendizado adequado ao nível de cada aluno.',
    
    'club.label': 'Comunidade de Aprendizagem',
    'club.title': 'Clube de Ci&ecirc;ncias',
    'club.description': 'Venha fazer parte do nosso Clube de Ci&ecirc;ncias! Um espaço de descoberta, colaboração e diversão onde alunos de 9 a 13 anos se reúnem semanalmente para explorar o mundo da ciência atrav&eacute;s de experimentos práticos e atividades interativas.',
    'club.feature1': 'Encontros Semanais',
    'club.feature1Desc': 'Reuniões regulares para manter o entusiasmo e a continuidade do aprendizado.',
    'club.feature2': 'Faixa Etária: 9 a 13 anos',
    'club.feature2Desc': 'Atividades adequadas ao desenvolvimento cognitivo e interesse dos alunos.',
    'club.feature3': 'Início em Fevereiro',
    'club.feature3Desc': 'Inscrições abertas para o próximo ciclo de atividades.',
    'club.cta': 'Inscreva-se Agora',
    
    'methodology.label': 'Como Funciona',
    'methodology.title': 'Nossa Metodologia',
    'methodology.subtitle': 'Uma abordagem pedagógica fundamentada na Educa&ccedil;&atilde;o Personalizada de Victor Garcia Hoz e na Educação Clássica, onde o aluno e protagonista do proprio aprendizado.',
    'methodology.learningCycleTitle': 'O Ciclo de Aprendizagem Ativa',
    'methodology.learningCycleDesc': 'Assistir aula n&atilde;o &eacute; estudar. Para que o aprendizado realmente ocorra, o aluno precisa engajar-se ativamente atraves de múltiplas formas de interacao com o conteudo:',
    'methodology.weeklyStructure': 'Estrutura Semanal: Aulas expositivas, leituras em PDF, listas de exercícios e orientação para desenvolvimento do hábito de estudo. O aluno aprende a ser autonomo e responsavel pelo proprio progresso acad&ecirc;mico.',
    'methodology.scienceFairTitle': 'Feira de Ci&ecirc;ncias Anual',
    'methodology.scienceFairDesc': 'Todo ano, nossos alunos de Ci&ecirc;ncias apresentam projetos na Feira de Ci&ecirc;ncias, aplicando na pr&aacute;tica tudo o que aprenderam. Veja os resultados dos anos anteriores:',
    'methodology.watchOnYoutube': 'Clique para assistir no YouTube',
    'methodology.ctaTitle': 'Pronto para Começar?',
    'methodology.ctaDesc': 'Entre em contato conosco para conhecer mais sobre nossas turmas e como podemos ajudar no desenvolvimento acad&ecirc;mico do seu filho.',
    
    'professors.label': 'QUEM SOMOS',
    'professors.title': 'Conheça Nossos Professores',
    'professors.description': 'Uma equipe de educadores com forma&ccedil;&atilde;o acad&ecirc;mica de excel&ecirc;ncia, dedicados ao desenvolvimento integral de seus alunos.',
    'professors.giorgio.specialty': 'Matem&aacute;tica, F&iacute;sica e Ci&ecirc;ncias',
    'professors.giorgio.cred1': 'Doutor em Ci&ecirc;ncias pelo Instituto Tecnol&oacute;gico de Aeronáutica (ITA)',
    'professors.giorgio.cred2': 'Especialista em Educa&ccedil;&atilde;o Personalizada e ensino experimental',
    'professors.giorgio.cred3': 'Formação acad&ecirc;mica em pesquisa científica de alto nível',
    'professors.victor.specialty': 'Qu&iacute;mica',
    'professors.victor.cred1': 'P&oacute;s-doutor em Qu&iacute;mica pela University of Kent, Inglaterra (2023)',
    'professors.victor.cred2': 'Doutor em F&iacute;sica e Astronomia pela UNIVAP (2018)',
    'professors.victor.cred3': 'Mestre em Fisico-Qu&iacute;mica pela UnB (2011)',
    'professors.victor.cred4': 'Bacharel em Qu&iacute;mica pela UnB (2008)',
    'professors.lattesLink': 'Ver Curr&iacute;culo Lattes',
    'professors.philosophyTitle': 'Nossa Filosofia Educacional',
    'professors.philosophy1': 'Acreditamos que a verdadeira educação vai al&eacute;m da memorização de conceitos. Nossos professores trabalham juntos para proporcionar uma experi&ecirc;ncia de aprendizado que combina rigor científico com abordagem humanizada, permitindo que cada aluno desenvolva sua compreens&atilde;o profunda e capacidade de aplicação pr&aacute;tica do conhecimento.',
    'professors.philosophy2': 'Com forma&ccedil;&atilde;o acad&ecirc;mica de excel&ecirc;ncia e experi&ecirc;ncia em Educa&ccedil;&atilde;o Personalizada, estamos comprometidos em guiar nossos alunos n&atilde;o apenas para o sucesso acad&ecirc;mico, mas para o desenvolvimento integral como pensadores cr&iacute;ticos e cidad&atilde;os conscientes.',
        'about.label': 'Nossa Hist&oacute;ria',
    'about.title': 'Sobre a ST Homeschool',
    'about.originTitle': 'Como Tudo Come&ccedil;ou',
    'about.origin1': 'A <strong>ST Homeschool</strong> surgiu no in&iacute;cio de <strong>2022</strong>, quando o Prof. Giorgio começou a acompanhar tr&ecirc;s alunos homeschoolers de forma remota por videochamada. O que começou como uma iniciativa modesta rapidamente se transformou em uma miss&atilde;o educacional.',
    'about.origin2': 'No ano seguinte, em <strong>2023</strong>, o professor passou a se dedicar integralmente a famílias educadoras e aos alunos que estudam em casa ou que frequentam a escola mas desejam complementar sua formação. Assim surgiram as turmas de <strong>Ci&ecirc;ncias, Matem&aacute;tica e F&iacute;sica</strong>, cada uma com uma metodologia &uacute;nica baseada em experimentos, simula&ccedil;&otilde;es e pr&aacute;tica constante.',
    'about.origin3': 'Hoje, a ST Homeschool &eacute; referência em educação científica personalizada, atendendo famílias que buscam excel&ecirc;ncia acad&ecirc;mica aliada a valores sólidos e acompanhamento individual.',
    'about.whySaintThomasTitle': 'Por que Saint Thomas?',
    'about.whySaintThomasDesc': 'Nosso nome se inspira em <strong>S&atilde;o Tom&aacute;s de Aquino</strong>, o Doutor Ang&eacute;lico, que soube conciliar tão bem dois pilares fundamentais do conhecimento humano: <strong>f&eacute; e raz&atilde;o</strong>.',
    'about.faith': 'F&eacute;',
    'about.faithDesc': 'A busca pela verdade transcendente, o cultivo de valores &eacute;ticos e a formação integral do ser humano.',
    'about.reason': 'Razão',
    'about.reasonDesc': 'O rigor científico, a investigação met&oacute;dica e a compreens&atilde;o profunda das leis naturais atrav&eacute;s da ciência.',
    'about.harmony': 'Harmonia',
    'about.harmonyDesc': 'A s&iacute;ntese perfeita: &eacute; poss&iacute;vel cultivar a f&eacute; sendo um cientista, e ser um cientista sem abandonar a f&eacute;.',
    'about.aquinasQuote': 'A verdade n&atilde;o pode contradizer a verdade. Aquilo que e conhecido pela raz&atilde;o n&atilde;o pode estar em desacordo com aquilo que &eacute; revelado pela f&eacute;.',
    'about.aquinasAttribution': '— S&atilde;o Tom&aacute;s de Aquino, Suma Teológica',
    'about.philosophyTitle': 'Nossa Filosofia Educacional',
    'about.philosophy1': 'Assim como <strong>S&atilde;o Tom&aacute;s de Aquino</strong> demonstrou que f&eacute; e raz&atilde;o n&atilde;o são opostas, mas complementares, acreditamos que a educação científica deve formar n&atilde;o apenas mentes brilhantes, mas tambem <strong>pessoas íntegras</strong>.',
    'about.philosophy2': 'Na ST Homeschool, ensinamos que a ciência n&atilde;o &eacute; uma ameaça a f&eacute;, mas sim uma ferramenta para compreender a ordem e a beleza da criacao. Cada experimento, cada formula, cada lei da fisica revela a <strong>racionalidade do universo</strong> e convida o estudante a contemplar a verdade com admiracao e reverencia.',
    'about.philosophy3': 'Nosso compromisso e formar <strong>cientistas virtuosos</strong>: jovens que dominam o metodo cientifico, mas que tambem cultivam a humildade, a honestidade intelectual e o respeito pela verdade — valores que S&atilde;o Tom&aacute;s de Aquino defendeu ao longo de toda a sua vida.',
    
    'footer.direitos': '© 2026 Saint Thomas Homeschool. Todos os direitos reservados.',
    
    'schedulePricing.label': 'Informações Práticas',
    'schedulePricing.title': 'Horários e Valores',
    'schedulePricing.subtitle': 'Aulas de 1 hora semanal via Google Meet, com flexibilidade de horários para se adequar à sua rotina.',
    'schedulePricing.scheduleTab': 'Horários',
    'schedulePricing.pricingTab': 'Valores',
    'schedulePricing.legend': 'Legenda',
    'schedulePricing.mostPopular': 'MAIS POPULAR',
    'schedulePricing.perMonth': 'por mês (12 parcelas)',
    'schedulePricing.discount': 'de desconto',
    'schedulePricing.enroll': 'Inscrever-se',
    'schedulePricing.importantInfo': 'ℹ️ Informações Importantes',
    'schedulePricing.paymentMethods': 'Formas de Pagamento',
    'schedulePricing.platform': 'Plataforma',
    'schedulePricing.duration': 'Duração',
    'schedulePricing.startDate': 'Início das Aulas',
    'schedulePricing.individualMentoring': 'Acompanhamento Individual',
    'schedulePricing.ctaQuestion': 'Dúvidas sobre horários ou valores?',
    'schedulePricing.contactWhatsApp': 'Fale Conosco via WhatsApp',
    
    'faq.label': 'Dúvidas Frequentes',
    'faq.subtitle': 'Encontre respostas para as perguntas mais comuns sobre nossos programas, valores e políticas.',
    'faq.ctaQuestion': 'Não encontrou sua pergunta?',
    
    'shop.label': 'Loja Educacional',
    'shop.title': 'Loja de Produtos 3D',
    'shop.subtitle': 'Explore nossa coleção de produtos educacionais feitos em impressão 3D. Modelos anatômicos, peças de robótica e muito mais para complementar seu aprendizado.',
    'shop.educationalProducts': 'Produtos Educacionais',
    'shop.educationalProductsDesc': 'Modelos 3D de alta qualidade para ciências, biologia, anatomia e robótica educacional.',
    'shop.qualityMaterials': 'Materiais de Qualidade',
    'shop.qualityMaterialsDesc': 'Impressão 3D profissional com acabamento refinado e durabilidade garantida.',
    'shop.securePayment': 'Pagamento Seguro',
    'shop.securePaymentDesc': 'Múltiplas formas de pagamento: PIX, cartão de cr&eacute;dito e outras opções seguras.'
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
    'hero.citacao': '"The scholar is one who brings to others what he has understood: the Truth"',
    'hero.autor': '— Saint Thomas Aquinas',
    'hero.descricao': 'Personalized education in Mathematics, Physics, Chemistry and Sciences for homeschool students or those attending traditional school. Learning based on experiments, simulations and practice, under the guidance of Prof. Giorgio Testoni, PhD in Sciences from the Aeronautics Institute of Technology (ITA).',
    'hero.preInscricao': 'Pre-Registration',
    'hero.faleConosco': 'Contact Us',
    
    'faq.titulo': 'Frequently Asked Questions',
    'faq.q1': 'What are the class f&eacute;es?',
    'faq.a1': 'We have a fixed rate per subject. With a 10% discount for those taking 2 subjects and 20% for those taking 3 or more subjects. Contact us via WhatsApp or fill out the pre-registration form to receive a personalized proposal according to your needs.',
    'faq.q2': 'What are the class schedules?',
    'faq.a2': 'Group classes are held in the morning. We also off&eacute;r Science Club sessions with flexible schedules. For information about other scheduling options, please contact us.',
    'faq.q3': 'What is the Science Club schedule?',
    'faq.a3': 'Science Club classes are held on Thursdays from 2 PM to 3 PM.',
    'faq.q4': 'Do students receive certificates?',
    'faq.a4': 'Yes! All students who complete an annual subject receive a certificate of participation. Additionally, we apply performance assessments to monitor academic progress.',
    'faq.q5': 'What is the recommended age group?',
    'faq.a5': 'Our classes are recommended for students aged 9 to 18. From elementary to high school. However, we off&eacute;r personalized programs for individual mentoring for diff&eacute;rent knowledge levels. Consult us to evaluate the best option for your child.',
    'faq.q6': 'Is there a discount for low-income families?',
    'faq.a6': 'Yes. We off&eacute;r special conditions (scholarship/discount) for low-income families, subject to analysis. Contact us via WhatsApp to request the evaluation and check the availability and discount percentage applicable.',
    
    'courses.label': 'Educational Programs',
    'courses.title': 'Classes 2026',
    'courses.subtitle': 'Structured courses for diff&eacute;rent age groups, with classes divided by content and development level.',
    'courses.note': 'Classes divided by content and age groups to ensure learning appropriate to each student\'s level.',
    
    'club.label': 'Learning Community',
    'club.title': 'Science Club',
    'club.description': 'Join our Science Club! A space for discovery, collaboration and fun where students aged 9 to 13 meet weekly to explore the world of science through hands-on experiments and interactive activities.',
    'club.feature1': 'Weekly Meetings',
    'club.feature1Desc': 'Regular meetings to maintain enthusiasm and continuity of learning.',
    'club.feature2': 'Age Group: 9 to 13 years',
    'club.feature2Desc': 'Activities appropriate to students\' cognitive development and interests.',
    'club.feature3': 'Starting in F&eacute;bruary',
    'club.feature3Desc': 'Registrations open for the next cycle of activities.',
    'club.cta': 'Register Now',
    
    'methodology.label': 'How It Works',
    'methodology.title': 'Our Methodology',
    'methodology.subtitle': 'A pedagógical approach based on Victor Garcia Hoz Personalized Education and Clássical Education, where the student is the protagonist of their own learning.',
    'methodology.learningCycleTitle': 'The Active Learning Cycle',
    'methodology.learningCycleDesc': 'Attending class is not studying. For learning to truly occur, students must actively engage through multiple forms of interaction with the content:',
    'methodology.weeklyStructure': 'Weekly Structure: Expository classes, PDF readings, exercise lists and guidance for developing study habits. Students learn to be autonomous and responsible for their own academic progress.',
    'methodology.scienceFairTitle': 'Annual Science Fair',
    'methodology.scienceFairDesc': 'Every year, our Science students present projects at the Science Fair, applying in practice everything they have learned. See the results from previous years:',
    'methodology.watchOnYoutube': 'Click to watch on YouTube',
    'methodology.ctaTitle': 'Ready to Get Started?',
    'methodology.ctaDesc': 'Contact us to learn more about our classes and how we can help with your childs academic development.',
    
    'professors.label': 'WHO WE ARE',
    'professors.title': 'Our Prof&eacute;ssors',
    'professors.description': 'A team of educators with excellent academic training, dedicated to the integral development of their students.',
    'professors.giorgio.specialty': 'Mathematics, Physics and Sciences',
    'professors.giorgio.cred1': 'PhD in Sciences from the Aeronautics Institute of Technology (ITA)',
    'professors.giorgio.cred2': 'Specialist in personalized education and experimental teaching',
    'professors.giorgio.cred3': 'Academic training in high-level scientific research',
    'professors.victor.specialty': 'Chemistry',
    'professors.victor.cred1': 'Post-doctorate in Chemistry from University of Kent, England (2023)',
    'professors.victor.cred2': 'PhD in Physics and Astronomy from UNIVAP (2018)',
    'professors.victor.cred3': 'Master in Physical Chemistry from UnB (2011)',
    'professors.victor.cred4': 'Bachelor in Chemistry from UnB (2008)',
    'professors.lattesLink': 'View Lattes CV',
    'professors.philosophyTitle': 'Our Educational Philosophy',
    'professors.philosophy1': 'We believe that true education goes beyond memorizing concepts. Our professors work together to provide a learning experience that combines scientific rigor with a humanized approach, allowing each student to develop deep understanding and the ability to apply knowledge in practice.',
    'professors.philosophy2': 'With excellent academic training and experience in personalized education, we are committed to guiding our students not only toward academic success, but toward integral development as critical thinkers and conscious citizens.',
        'about.label': 'Our Story',
    'about.title': 'About ST Homeschool',
    'about.originTitle': 'How It All Started',
    'about.origin1': '<strong>ST Homeschool</strong> emerged in early <strong>2022</strong>, when Prof. Giorgio began mentoring three homeschool students remotely via video call. What started as a modest initiative quickly transformed into an educational mission.',
    'about.origin2': 'The following year, in <strong>2023</strong>, the professor dedicated himself fully to educating families and students studying at home or attending traditional school while seeking to complement their education. Thus, classes in <strong>Sciences, Mathematics, and Physics</strong> were born, each with a unique methodology based on experiments, simulations, and constant practice.',
    'about.origin3': 'Today, ST Homeschool is a ref&eacute;rence in personalized scientific education, serving families seeking academic excellence combined with solid values and individual mentoring.',
    'about.whySaintThomasTitle': 'Why Saint Thomas?',
    'about.whySaintThomasDesc': 'Our name is inspired by <strong>Saint Thomas Aquinas</strong>, the Doctor Angelicus, who so well reconciled two fundamental pillars of human knowledge: <strong>faith and reason</strong>.',
    'about.faith': 'Faith',
    'about.faithDesc': 'The pursuit of transcendent truth, the cultivation of ethical values, and the integral formation of the human being.',
    'about.reason': 'Reason',
    'about.reasonDesc': 'Scientific rigor, methodical investigation, and deep understanding of natural laws through science.',
    'about.harmony': 'Harmony',
    'about.harmonyDesc': 'The perf&eacute;ct synthesis: it is possible to cultivate faith while being a scientist, and to be a scientist without abandoning faith.',
    'about.aquinasQuote': 'Truth cannot contradict truth. That which is known by reason cannot be in disagreement with that which is revealed by faith.',
    'about.aquinasAttribution': '— Saint Thomas Aquinas, Summa Theologiae',
    'about.philosophyTitle': 'Our Educational Philosophy',
    'about.philosophy1': 'Just as <strong>Saint Thomas Aquinas</strong> demonstrated that faith and reason are not opposites but complementary, we believe that scientific education should form not only brilliant minds, but also <strong>virtuous people</strong>.',
    'about.philosophy2': 'At ST Homeschool, we teach that science is not a threat to faith, but rather a tool for understanding the order and beauty of creation. Each experiment, each formula, each law of physics reveals the <strong>rationality of the universe</strong> and invites students to contemplate truth with wonder and reverence.',
    'about.philosophy3': 'Our commitment is to form <strong>virtuous scientists</strong>: young people who master the scientific method, but who also cultivate humility, intellectual honesty, and respect for truth — values that Saint Thomas Aquinas championed throughout his lif&eacute;.',
    
    'footer.direitos': '© 2026 Saint Thomas Homeschool. All rights reserved.',
    
    'schedulePricing.label': 'Practical Information',
    'schedulePricing.title': 'Schedules and Pricing',
    'schedulePricing.subtitle': '1-hour classes per week via Google Meet, with flexible schedules to fit your routine.',
    'schedulePricing.scheduleTab': 'Schedules',
    'schedulePricing.pricingTab': 'Pricing',
    'schedulePricing.legend': 'Legend',
    'schedulePricing.mostPopular': 'MOST POPULAR',
    'schedulePricing.perMonth': 'per month (12 installments)',
    'schedulePricing.discount': 'discount',
    'schedulePricing.enroll': 'Enroll',
    'schedulePricing.importantInfo': 'ℹ️ Important Information',
    'schedulePricing.paymentMethods': 'Payment Methods',
    'schedulePricing.platform': 'Platform',
    'schedulePricing.duration': 'Duration',
    'schedulePricing.startDate': 'Class Start Date',
    'schedulePricing.individualMentoring': 'Individual Mentoring',
    'schedulePricing.ctaQuestion': 'Questions about schedules or pricing?',
    'schedulePricing.contactWhatsApp': 'Contact Us via WhatsApp',
    
    'faq.label': 'Frequently Asked Questions',
    'faq.subtitle': 'Find answers to common questions about our programs, pricing, and policies.',
    'faq.ctaQuestion': 'Didn\'t find your question?',
    
    'shop.label': 'Educational Shop',
    'shop.title': '3D Products Shop',
    'shop.subtitle': 'Explore our collection of educational products made with 3D printing. Anatomical models, robotics parts and much more to complement your learning.',
    'shop.educationalProducts': 'Educational Products',
    'shop.educationalProductsDesc': 'High-quality 3D models for sciences, biology, anatomy and educational robotics.',
    'shop.qualityMaterials': 'Quality Materials',
    'shop.qualityMaterialsDesc': 'Prof&eacute;ssional 3D printing with refined finish and guaranteed durability.',
    'shop.securePayment': 'Secure Payment',
    'shop.securePaymentDesc': 'Multiple payment methods: PIX, credit card and other secure options.'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  // Carregar idioma do localStorage ao montar
  useEff&eacute;ct(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
