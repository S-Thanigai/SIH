import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'as', name: 'অসমীয়া' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{t('language')}</span>
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${
                i18n.language === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};