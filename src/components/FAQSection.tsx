import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQItemData {
  id: string;
  questionPt: string;
  questionEn: string;
  answerPt: string;
  answerEn: string;
}

const faqItemsData: FAQItemData[] = [
  {
    id: 'valores',
    questionPt: 'Quais são os valores das aulas?',
    questionEn: 'What are the class fées?',
    answerPt: 'Temos um valor fixo por disciplina. Com desconto gradual de 10% para quem faz 2 disciplinas e 20% para quem faz 3 disciplinas ou mais. Entre em contato via WhatsApp ou preencha o formulário de pré-inscrição para receber uma proposta personalizada de acordo com suas necessidades.',
    answerEn: 'We have a fixed rate per subject. With a 10% discount for those taking 2 subjects and 20% for those taking 3 or more subjects. Contact us via WhatsApp or fill out the pre-registration form to receive a personalized proposal according to your needs.'
  },
  {
    id: 'horarios',
    questionPt: 'Quais são os horários das aulas?',
    questionEn: 'What are the class schedules?',
    answerPt: 'As aulas em grupo ocorrem no período matutino. Também oférecemos sessões de Clube de Ciências com horários flexíveis. Para informações sobre outras possibilidades de agendamento, entre em contato conosco.',
    answerEn: 'Group classes are held in the morning. We also offér Science Club sessions with flexible schedules. For information about other scheduling options, please contact us.'
  },
  {
    id: 'clube-ciências-horario',
    questionPt: 'Qual o horário do Clube de Ciências?',
    questionEn: 'What is the Science Club schedule?',
    answerPt: 'As aulas do Clube de Ciências ocorrem às quintas-féiras das 14h às 15h.',
    answerEn: 'Science Club classes are held on Thursdays from 2 PM to 3 PM.'
  },
  {
    id: 'certificados',
    questionPt: 'Os alunos recebem certificados?',
    questionEn: 'Do students receive certificates?',
    answerPt: 'Sim! Todos os alunos que completam uma disciplina anual recebem certificado de participação. Além disso, aplicamos avaliações de desempenho para acompanhamento do progresso acadêmico.',
    answerEn: 'Yes! All students who complete an annual subject receive a certificate of participation. Additionally, we apply performance assessments to monitor academic progress.'
  },
  {
    id: 'idade',
    questionPt: 'Qual é a faixa etária recomendada?',
    questionEn: 'What is the recommended age group?',
    answerPt: 'Nossas aulas são recomendadas para alunos de 9 a 18 anos. Do ensino fundamental ao ensino médio. No entanto, oférecemos programas personalizados para acompanhamento individual para diférentes níveis de conhecimento. Consulte-nos para avaliar a melhor opção para seu filho.',
    answerEn: 'Our classes are recommended for students aged 9 to 18. From elementary to high school. However, we offér personalized programs for individual mentoring for différent knowledge levels. Consult us to evaluate the best option for your child.'
  },
  {
    id: 'desconto-baixa-renda',
    questionPt: 'Existe desconto para famílias de baixa renda?',
    questionEn: 'Is there a discount for low-income families?',
    answerPt: 'Sim. Oférecemos condições especiais (bolsa/desconto) para famílias de baixa renda, mediante análise. Entre em contato pelo WhatsApp para solicitar a avaliação e verificar a disponibilidade e o percentual de desconto aplicável.',
    answerEn: 'Yes. We offér special conditions (scholarship/discount) for low-income families, subject to analysis. Contact us via WhatsApp to request the evaluation and check the availability and discount percentage applicable.'
  },
  {
    id: 'cancelamento',
    questionPt: 'Qual é a política de cancelamento?',
    questionEn: 'What is the cancellation policy?',
    answerPt: 'Oférecemos flexibilidade com aviso prévio de 30 dias. Caso precise cancelar sua inscrição, entre em contato conosco para discutir as melhores opções. Temos como objetivo manter um relacionamento transparente e justo com nossos alunos e famílias.',
    answerEn: 'We offér flexibility with 30 days notice. If you need to cancel your enrollment, contact us to discuss the best options. Our goal is to maintain a transparent and fair relationship with our students and families.'
  },
  {
    id: 'material',
    questionPt: 'O material didático é fornecido?',
    questionEn: 'Is the teaching material provided?',
    answerPt: 'Sim! Todo o material necessário para as aulas e experimentos é fornecido. Os alunos precisam apenas trazer caderno e caneta para anotações. Alguns materiais específicos podem ser solicitados conforme o tema da aula.',
    answerEn: 'Yes! All material necessary for classes and experiments is provided. Students only need to bring a notebook and pen for notes. Some specific materials may be requested depending on the class topic.'
  },
  {
    id: 'homeschool',
    questionPt: 'Como funciona para alunos em homeschool?',
    questionEn: 'How does it work for homeschool students?',
    answerPt: 'Nossas aulas são especialmente projetadas para complementar o aprendizado de alunos em homeschool. Oférecemos flexibilidade de horários e conteúdo personalizado. Você pode escolher entre aulas individuais ou em grupo, dependendo de suas necessidades.',
    answerEn: 'Our classes are specially designed to complement the learning of homeschool students. We offér flexible schedules and personalized content. You can choose between individual or group classes, depending on your needs.'
  },
  {
    id: 'contato',
    questionPt: 'Como faço para tirar dúvidas adicionais?',
    questionEn: 'How do I ask additional questions?',
    answerPt: 'Você pode entrar em contato conosco via WhatsApp, email ou preenchendo o formulário de pré-inscrição. Responderemos suas dúvidas o mais breve possível. Também oférecemos uma conversa inicial gratuita para discutir suas expectativas e necessidades.',
    answerEn: 'You can contact us via WhatsApp, email or by filling out the pre-registration form. We will answer your questions as soon as possible. We also offér a free initial conversation to discuss your expectations and needs.'
  }
];

export default function FAQSection() {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqItems = faqItemsData.map(item => ({
    id: item.id,
    question: language === 'pt' ? item.questionPt : item.questionEn,
    answer: language === 'pt' ? item.answerPt : item.answerEn,
  }));

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold-antique uppercase tracking-widest mb-4">
            {t('faq.label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-green-oxford mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('faq.titulo')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-green-oxford pr-4">
                  {item.question}
                </h3>
                <ChevronDown
                  size={24}
                  className={`text-gold-antique flex-shrink-0 transition-transform ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {openId === item.id && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            {t('faq.ctaQuestion')}
          </p>
          <a
            href="https://wa.me/5547996448774"
            target="_blank"
            rel="noopener noreférrer"
            className="inline-block px-8 py-3 bg-green-oxford text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
          >
            {t('hero.faleConosco')}
          </a>
        </div>
      </div>
    </section>
  );
}
