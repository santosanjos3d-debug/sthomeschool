/**
 * About Proféssor Section Component
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Destaque para credenciais acadêmicas
 * - Verde Oxford para transmitir autoridade
 * - Tipografia Playfair Display para nomes e títulos
 * - Foco em confiança e expertise
 */

export default function AboutProféssor() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gold-antique uppercase tracking-widest mb-2">
              Quem Somos
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-green-oxford mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sobre o Proféssor
            </h2>
          </div>

          {/* Proféssor Card */}
          <div className="card-elegant mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-green-oxford to-green-salvia rounded-lg flex items-center justify-center text-white text-5xl font-bold">
                  G
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-green-oxford mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Prof. Giorgio Ernesto Testoni
                </h3>
                <p className="text-lg font-semibold text-gold-antique mb-4">
                  Doutor em Ciências
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Giorgio Ernesto Testoni é um educador apaixonado pela excelência acadêmica e pelo desenvolvimento integral de seus alunos. 
                  Com formação de pós-graduação no Instituto Tecnológico de Aeronáutica (ITA), um dos mais prestigiados institutos de pesquisa e educação do Brasil, 
                  Giorgio traz uma perspectiva única que combina rigor científico com abordagem humanizada.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Sua experiência em educação personalizada permite que ele adapte o ensino às necessidades individuais de cada aluno, 
                  garantindo que todos alcancem seu potencial máximo. Giorgio acredita que a verdadeira educação vai além da memorização de conceitos, 
                  envolvendo a compreensão profunda e a aplicação prática do conhecimento.
                </p>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl mb-3">🎓</div>
              <h4 className="font-semibold text-green-oxford mb-2">Formação Acadêmica</h4>
              <p className="text-sm text-gray-600">Doutor em Ciências pelo ITA</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl mb-3">🔬</div>
              <h4 className="font-semibold text-green-oxford mb-2">Experiência</h4>
              <p className="text-sm text-gray-600">Educação personalizada e ensino experimental</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl mb-3">👥</div>
              <h4 className="font-semibold text-green-oxford mb-2">Filosofia</h4>
              <p className="text-sm text-gray-600">Aprendizado baseado em compreensão profunda</p>
            </div>
          </div>

          {/* Lattes Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-3">
              Para mais informações sobre a formação acadêmica e pesquisa:
            </p>
            <a
              href="https://lattes.cnpq.br/9048545328091154"
              target="_blank"
              rel="noopener noreférrer"
              className="inline-block text-gold-antique font-semibold hover:text-green-oxford transition-colors"
            >
              Currículo Lattes →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
