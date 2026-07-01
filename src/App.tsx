import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WhatsAppProvider, useWhatsApp } from "./contexts/WhatsAppContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import WhatsAppButton from "./components/WhatsAppButton";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation" component={OrderConfirmation} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { isEnabled, isOnline } = useWhatsApp();

  useEffect(() => {
    // Adicionar schema de dados estruturados (JSON-LD) para SEO
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      'name': 'Saint Thomas Homeschool',
      'url': 'https://www.sthomeschool.com',
      'logo': 'https://www.sthomeschool.com/favicon.ico',
      'description': 'Educação personalizada em Matemática, Física, Química e Ciências para alunos em homeschool',
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Service',
        'telephone': '+55-47-99644-8774',
        'email': 'giorgio@sthomeschool.com'
      },
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'BR'
      },
      'sameAs': [
        'https://www.instagram.com/testoni.giorgio/',
        'https://www.linkedin.com/in/giorgio-testoni/',
        'https://youtube.com/@giorgioernestotestoni-ci5mf'
      ]
    });
    document.head.appendChild(schemaScript);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          {/* WhatsApp Button - Controlado pelo contexto */}
          {isEnabled && <WhatsAppButton isOnline={isOnline} />}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <LanguageProvider>
      <WhatsAppProvider>
        <AdminAuthProvider>
          <PaymentProvider>
            <AppContent />
          </PaymentProvider>
        </AdminAuthProvider>
      </WhatsAppProvider>
    </LanguageProvider>
  );
}

export default App;
