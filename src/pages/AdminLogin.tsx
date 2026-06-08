import { useState, useEfféct } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminLogin() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showTestToken, setShowTestToken] = useState(false);
  const [testToken, setTestToken] = useState('');
  const [validatingToken, setValidatingToken] = useState(false);

  const requestLoginLinkMutation = trpc.adminAuth.requestLoginLink.useMutation();
  const validateTokenMutation = trpc.adminAuth.validateToken.useMutation();

  // Check if there's a token in the URL
  useEfféct(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      setValidatingToken(true);
      validateTokenMutation.mutate(
        { token },
        {
          onSuccess: (result) => {
            if (result.success) {
              login(token);
            } else {
              setError(result.error || 'Token inválido');
            }
            setValidatingToken(false);
          },
          onError: () => {
            setError('Erro ao validar token');
            setValidatingToken(false);
          },
        }
      );
    }
  }, []);

  // Redirect if already authenticated
  useEfféct(() => {
    if (isAuthenticated) {
      setLocation('/admin-dashboard');
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const result = await requestLoginLinkMutation.mutateAsync({ email });

      if (result.success) {
        setMessage(result.message || 'Link enviado com sucesso!');
        setEmail('');
        
        // For testing purposes, show the test token
        if (result.testToken) {
          setTestToken(result.testToken);
          setShowTestToken(true);
        }
      } else {
        setError(result.error || 'Erro ao solicitar link');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao solicitar link');
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    pt: {
      adminLogin: 'Acesso Admin',
      email: 'Email',
      requestLink: 'Solicitar Link de Acesso',
      sendButton: 'Enviar Link',
      checkEmail: 'Verifique seu email para o link de acesso',
      expiresIn: 'O link expira em 24 horas',
      testMode: 'Modo de Teste - Token:',
      goToDashboard: 'Ir para Dashboard',
    },
    en: {
      adminLogin: 'Admin Access',
      email: 'Email',
      requestLink: 'Request Access Link',
      sendButton: 'Send Link',
      checkEmail: 'Check your email for the access link',
      expiresIn: 'The link expires in 24 hours',
      testMode: 'Test Mode - Token:',
      goToDashboard: 'Go to Dashboard',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.pt;

  if (validatingToken) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-foreground mb-4">Validando acesso...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
            {t.adminLogin}
          </h1>

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm">{message}</p>
              <p className="text-green-700 text-xs mt-2">{t.expiresIn}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.email}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="giorgio@sthomeschool.com"
                disabled={loading}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full"
            >
              {loading ? 'Enviando...' : t.sendButton}
            </Button>
          </form>

          {showTestToken && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-foreground/60 mb-3">{t.testMode}</p>
              <div className="bg-background rounded p-3 mb-4 break-all text-xs font-mono text-foreground">
                {testToken}
              </div>
              <Button
                onClick={() => setLocation(`/admin-login?token=${testToken}`)}
                variant="outline"
                className="w-full"
              >
                {t.goToDashboard}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
