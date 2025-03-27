
import React, { useState } from 'react';
import { Languages, Check, Globe } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { id: 'english', name: 'English', nativeName: 'English' },
    { id: 'hindi', name: 'Hindi', nativeName: 'हिन्दी' },
    { id: 'tamil', name: 'Tamil', nativeName: 'தமிழ்' },
    { id: 'telugu', name: 'Telugu', nativeName: 'తెలుగు' },
    { id: 'bengali', name: 'Bengali', nativeName: 'বাংলা' }
  ];
  
  const handleLanguageChange = (langId: string) => {
    setLanguage(langId as any);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        className="icon-button relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Translate website"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {language === 'english' ? 'EN' : 
           language === 'hindi' ? 'HI' : 
           language === 'tamil' ? 'TA' : 
           language === 'telugu' ? 'TE' : 'BN'}
        </span>
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg glass-card overflow-hidden z-10 animate-scale-in origin-top-right"
          role="listbox"
          aria-label="Available languages"
        >
          <div className="p-1">
            {languages.map((lang) => (
              <button
                key={lang.id}
                className={`
                  w-full text-left px-3 py-2 rounded-md flex items-center justify-between
                  ${language === lang.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                  transition-colors duration-150 focus-visible-ring
                `}
                onClick={() => handleLanguageChange(lang.id)}
                role="option"
                aria-selected={language === lang.id}
              >
                <span className="flex items-center gap-2">
                  {lang.nativeName}
                  <span className="text-xs opacity-70">({lang.name})</span>
                </span>
                
                {language === lang.id && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
