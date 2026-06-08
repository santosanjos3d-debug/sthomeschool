import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CoursesSection from '@/components/CoursesSection';
import ScienceClubSection from '@/components/ScienceClubSection';
import MethodologySection from '@/components/MethodologySection';
import ProfessorsSection from '@/components/ProfessorsSection';
import SchedulePricingSection from '@/components/SchedulePricingSection';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

/**
 * Home Page - Saint Thomas Homeschool
 * 
 * Design Philosophy: Elegância Clássica com Toque Moderno
 * - Paleta de cores: Verde Oxford, Verde Sálvia, Dourado Antigo
 * - Tipografia: Playfair Display (títulos), Montserrat (corpo)
 * - Layout assimétrico com seções bem definidas
 * - Foco em conversão e experiência do usuário
 */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <CoursesSection />
        <ScienceClubSection />
        <MethodologySection />
        <ProfessorsSection />
        <SchedulePricingSection />
        <AboutSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
