import { useState } from 'react';
import { useWhatsApp } from '@/contexts/WhatsAppContext';
import { MessageCircle, Power, Wifi, WifiOff } from 'lucide-react';

export default function Admin() {
  const { isEnabled, isOnline, toggleEnabled, toggleOnline } = useWhatsApp();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = 'sthomeschool2024'; // Mude para uma senha segura!

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Senha incorreta');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-oxford to-green-salvia flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-oxford rounded-full flex items-center justify-center">
              <MessageCircle size={32} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-green-oxford mb-2">
            Painel de Controle
          </h1>
          <p className="text-center text-gray-600 mb-6">
            WhatsApp - Saint Thomas Homeschool
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-oxford"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-oxford text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
            >
              Acessar Painel
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Painel protegido por senha
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-oxford rounded-full flex items-center justify-center">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-oxford">
                  Controle WhatsApp
                </h1>
                <p className="text-gray-600 text-sm">
                  Gerencie o botão flutuante do seu site
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Botão Habilitado/Desabilitado */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Power size={24} className={isEnabled ? 'text-green-500' : 'text-gray-400'} />
              <h2 className="text-lg font-semibold text-gray-800">
                Botão WhatsApp
              </h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-3">
                {isEnabled
                  ? '✅ Botão está ATIVO - Visitantes podem ver e clicar'
                  : '❌ Botão está INATIVO - Visitantes não veem o botão'}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isEnabled ? 'w-full bg-green-500' : 'w-0'
                  }`}
                />
              </div>
            </div>

            <button
              onClick={toggleEnabled}
              className={`w-full px-4 py-3 font-semibold rounded-lg transition-all ${
                isEnabled
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isEnabled ? 'Desativar Botão' : 'Ativar Botão'}
            </button>
          </div>

          {/* Status Online/Offline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              {isOnline ? (
                <Wifi size={24} className="text-green-500" />
              ) : (
                <WifiOff size={24} className="text-gray-400" />
              )}
              <h2 className="text-lg font-semibold text-gray-800">
                Status Online
              </h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-3">
                {isOnline
                  ? '🟢 Você está ONLINE - Botão mostra indicador pulsante'
                  : '🔴 Você está OFFLINE - Botão mostra indicador cinza'}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}
                />
                <span className="text-sm font-semibold text-gray-700">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            <button
              onClick={toggleOnline}
              className={`w-full px-4 py-3 font-semibold rounded-lg transition-all ${
                isOnline
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isOnline ? 'Marcar como Offline' : 'Marcar como Online'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Como funciona:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Botão Ativo:</strong> Visitantes veem o botão WhatsApp no site</li>
            <li>• <strong>Botão Inativo:</strong> Botão fica oculto (não aparece)</li>
            <li>• <strong>Online:</strong> Mostra indicador verde pulsante</li>
            <li>• <strong>Offline:</strong> Mostra indicador cinza (visitantes podem deixar recado)</li>
            <li>• As configurações são salvas automaticamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
