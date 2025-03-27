import React from 'react';
import { 
  Camera, 
  Settings, 
  Info, 
  Globe, 
  Languages, 
  Volume2, 
  Vibrate,
  Eye
} from 'lucide-react';
import { AppProvider, useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import CameraView from '@/components/CameraView';
import LoadingIndicator from '@/components/LoadingIndicator';
import ResultDisplay from '@/components/ResultDisplay';
import ErrorDisplay from '@/components/ErrorDisplay';
import SettingsPanel from '@/components/SettingsPanel';
import AccessibilitySettings from '@/components/AccessibilitySettings';

const HomeContent: React.FC = () => {
  const { 
    language, 
    status, 
    mode, 
    startCamera, 
    goToHome,
    setStatus
  } = useAppContext();
  
  const translations = {
    welcomeTitle: {
      english: "Currency Identification",
      hindi: "मुद्रा पहचान",
      tamil: "நாணய அடையாளம்",
      telugu: "కరెన్సీ గుర్తింపు",
      bengali: "মুদ্রা শনাক্তকরণ"
    },
    welcomeMessage: {
      english: "Scan any Indian banknote to identify its denomination",
      hindi: "किसी भी भारतीय नोट को स्कैन करके उसका मूल्य पहचानें",
      tamil: "எந்த இந்திய நோட்டையும் ஸ்கேன் செய்து அதன் மதிப்பை அடையாளம் காணுங்கள்",
      telugu: "ఏదైనా భారతీయ బ్యాంకు నోటును స్కాన్ చేయండి",
      bengali: "যেকোন ভারতীয় ব্যাংক নোট স্ক্যান করে এর মূল্যমান চিহ্নিত করুন"
    },
    scanCurrency: {
      english: "Scan Currency",
      hindi: "मुद्रा स्कैन करें",
      tamil: "நாணயத்தை ஸ்கேன் செய்யவும்",
      telugu: "కరెన్సీని స్కాన్ చేయండి",
      bengali: "মুদ্রা স্ক্যান করুন"
    },
    settings: {
      english: "Settings",
      hindi: "सेटिंग्स",
      tamil: "அமைப்புகள்",
      telugu: "సెట్టింగులు",
      bengali: "সেটিংস"
    },
    about: {
      english: "About",
      hindi: "के बारे में",
      tamil: "பற்றி",
      telugu: "గురించి",
      bengali: "সম্পর্কে"
    },
    accessibility: {
      english: "Accessibility",
      hindi: "पहुंच",
      tamil: "அணுகல்",
      telugu: "అందుబాటు",
      bengali: "অ্যাক্সেসযোগ্যতা"
    },
    offline: {
      english: "Offline Mode",
      hindi: "ऑफलाइन मोड",
      tamil: "ஆஃப்லைன் பயன்முறை",
      telugu: "ఆఫ్‌లైన్ మోడ్",
      bengali: "অফলাইন মোড"
    },
    voice: {
      english: "Voice Feedback",
      hindi: "आवाज प्रतिक्रिया",
      tamil: "குரல் கருத்து",
      telugu: "వాయిస్ ఫీడ్‌బ్యాక్",
      bengali: "ভয়েস ফিডব্যাক"
    },
    vibration: {
      english: "Vibration",
      hindi: "कंपन",
      tamil: "அதிர்வு",
      telugu: "కంపనం",
      bengali: "কম্পন"
    }
  };
  
  const getText = (key: keyof typeof translations) => {
    return translations[key][language as keyof typeof translations[keyof typeof translations]] || translations[key].english;
  };
  
  const handleOpenSettings = () => {
    setStatus('settings');
  };
  
  const handleOpenAccessibility = () => {
    setStatus('accessibility');
  };
  
  if (mode === 'wearable' && status === 'idle') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 animate-fade-in">
        <div 
          className="glass-card bg-black/40 border-white/20 p-6 rounded-full mb-4 animate-pulse-subtle cursor-pointer hover:bg-black/50 transition-colors"
          onClick={() => {
            goToHome();
          }}
          role="button"
          aria-label="Go to home page"
        >
          <span className="text-white text-2xl font-bold">CurrencySence</span>
        </div>
        
        <button
          onClick={startCamera}
          className="wearable-button group relative overflow-hidden animate-scale-in"
          aria-label={getText('scanCurrency')}
        >
          <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
          <div className="flex flex-col items-center">
            <Camera className="h-10 w-10 mb-2" />
            <span className="text-gradient">{getText('scanCurrency')}</span>
          </div>
        </button>
        
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleOpenSettings}
            className="p-4 rounded-full bg-black/40 border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 focus-visible-ring"
            aria-label={getText('settings')}
          >
            <Settings className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleOpenAccessibility}
            className="p-4 rounded-full bg-black/40 border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 focus-visible-ring"
            aria-label={getText('accessibility')}
          >
            <Eye className="h-6 w-6" />
          </button>
          
          <button
            onClick={() => {/* Show info */}}
            className="p-4 rounded-full bg-black/40 border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 focus-visible-ring"
            aria-label={getText('about')}
          >
            <Info className="h-6 w-6" />
          </button>
        </div>
      </div>
    );
  }
  
  if (status === 'settings') {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <SettingsPanel />
        </main>
      </div>
    );
  }
  
  if (status === 'accessibility') {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <AccessibilitySettings />
        </main>
      </div>
    );
  }
  
  if (status === 'camera') {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <CameraView />
        </main>
      </div>
    );
  }
  
  if (status === 'processing') {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <LoadingIndicator />
        </main>
      </div>
    );
  }
  
  if (status === 'result') {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <ResultDisplay />
        </main>
      </div>
    );
  }
  
  if (status === 'error') {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <ErrorDisplay />
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="glass-card p-8 max-w-md w-full rounded-lg animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {getText('welcomeTitle')}
          </h1>
          
          <p className="text-lg text-center mb-6 text-muted-foreground italic">
            Empowering Financial Independence for the Visually Impaired
          </p>
          
          <div className="flex flex-col gap-4">
            <button
              onClick={startCamera}
              className="primary-button flex items-center justify-center gap-2"
              aria-label={getText('scanCurrency')}
            >
              <Camera className="h-6 w-6" />
              {getText('scanCurrency')}
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleOpenSettings}
                className="secondary-button flex items-center justify-center gap-2"
                aria-label={getText('settings')}
              >
                <Settings className="h-6 w-6" />
                {getText('settings')}
              </button>
              
              <button
                onClick={handleOpenAccessibility}
                className="secondary-button flex items-center justify-center gap-2"
                aria-label={getText('accessibility')}
              >
                <Eye className="h-6 w-6" />
                {getText('accessibility')}
              </button>
            </div>
            
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{getText('offline')}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  );
};

export default Index;
