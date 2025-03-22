
import React, { useState } from 'react';
import { Smartphone, Glasses, Check } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const ModeToggle: React.FC = () => {
  const { mode, setMode, language } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  
  const translations = {
    mobileMode: {
      english: "Mobile Mode",
      hindi: "मोबाइल मोड",
      tamil: "மொபைல் முறை",
      telugu: "మొబైల్ మోడ్",
      bengali: "মোবাইল মোড"
    },
    wearableMode: {
      english: "Wearable Mode",
      hindi: "वियरेबल मोड",
      tamil: "அணியக்கூடிய முறை",
      telugu: "ధరించదగిన మోడ్",
      bengali: "পরিধানযোগ্য মোড"
    },
    selectMode: {
      english: "Select Mode",
      hindi: "मोड चुनें",
      tamil: "முறையைத் தேர்ந்தெடுக்கவும்",
      telugu: "మోడ్‌ని ఎంచుకోండి",
      bengali: "মোড নির্বাচন করুন"
    }
  };
  
  const getText = (key: keyof typeof translations) => {
    return translations[key][language as keyof typeof translations[keyof typeof translations]] || translations[key].english;
  };
  
  const handleModeChange = (newMode: 'mobile' | 'wearable') => {
    setMode(newMode);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        className="icon-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={getText('selectMode')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {mode === 'mobile' ? (
          <Smartphone className="h-6 w-6" />
        ) : (
          <Glasses className="h-6 w-6" />
        )}
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg glass-card z-10 animate-scale-in origin-top-right"
          role="listbox"
          aria-label="Available modes"
        >
          <div className="p-1">
            <button
              className={`
                w-full text-left px-3 py-2 rounded-md flex items-center justify-between
                ${mode === 'mobile' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                transition-colors duration-150 focus-visible-ring
              `}
              onClick={() => handleModeChange('mobile')}
              role="option"
              aria-selected={mode === 'mobile'}
            >
              <span className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                {getText('mobileMode')}
              </span>
              
              {mode === 'mobile' && (
                <Check className="h-4 w-4" />
              )}
            </button>
            
            <button
              className={`
                w-full text-left px-3 py-2 rounded-md flex items-center justify-between
                ${mode === 'wearable' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                transition-colors duration-150 focus-visible-ring
              `}
              onClick={() => handleModeChange('wearable')}
              role="option"
              aria-selected={mode === 'wearable'}
            >
              <span className="flex items-center gap-2">
                <Glasses className="h-4 w-4" />
                {getText('wearableMode')}
              </span>
              
              {mode === 'wearable' && (
                <Check className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeToggle;
