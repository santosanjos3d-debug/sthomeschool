import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setLanguage('pt')}
        className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
          language === 'pt'
            ? 'bg-green-oxford text-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
        title="Português"
      >
        PT
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
          language === 'en'
            ? 'bg-green-oxford text-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
