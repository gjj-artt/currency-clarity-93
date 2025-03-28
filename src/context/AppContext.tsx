
import React, { createContext, useContext, useState, useEffect } from 'react';
import { speak, stopSpeaking } from '@/utils/speechUtils';
import { triggerHapticFeedback } from '@/utils/hapticUtils';
import { checkOnlineStatus, saveToLocalStorage, getFromLocalStorage } from '@/utils/offlineUtils';
import { toast } from 'sonner';

type AppMode = 'mobile' | 'wearable';
type AppLanguage = 'english' | 'hindi' | 'tamil' | 'telugu' | 'bengali';
type AppStatus = 'idle' | 'camera' | 'processing' | 'result' | 'error' | 'settings' | 'accessibility';

interface AppContextType {
  // Mode and language
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Status and result management
  status: AppStatus;
  setStatus: (status: AppStatus) => void;
  result: string | null;
  setResult: (result: string | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  
  // Camera and navigation
  imageSrc: string | null;
  setImageSrc: (src: string | null) => void;
  startCamera: () => void;
  goToHome: () => void;
  
  // Offline status
  isOnline: boolean;
  refreshOnlineStatus: () => Promise<boolean>;
  
  // Accessibility actions
  announceResult: (text: string) => void;
  
  // Translation helper
  getTranslation: (key: string) => string;
}

const defaultContext: AppContextType = {
  mode: 'mobile',
  setMode: () => {},
  language: 'english',
  setLanguage: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
  
  status: 'idle',
  setStatus: () => {},
  result: null,
  setResult: () => {},
  error: null,
  setError: () => {},
  
  imageSrc: null,
  setImageSrc: () => {},
  startCamera: () => {},
  goToHome: () => {},
  
  isOnline: true,
  refreshOnlineStatus: async () => true,
  
  announceResult: () => {},
  getTranslation: () => '',
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [mode, setMode] = useState<AppMode>(() => 
    getFromLocalStorage('mode', 'mobile') as AppMode
  );
  const [language, setLanguage] = useState<AppLanguage>(() => 
    getFromLocalStorage('language', 'english') as AppLanguage
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => 
    getFromLocalStorage('darkMode', window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const [status, setStatus] = useState<AppStatus>('idle');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  
  // Translations
  const translations: Record<string, Record<string, string>> = {
    camera_ready: {
      english: "Camera is ready. Position the banknote in the frame and tap to capture.",
      hindi: "कैमरा तैयार है। नोट को फ्रेम में रखें और कैप्चर करने के लिए टैप करें।",
      tamil: "கேமரா தயாராக உள்ளது. நோட்டை பிரேமில் வைத்து தட்டவும்.",
      telugu: "కెమెరా సిద్ధంగా ఉంది. నోటును ఫ్రేమ్‌లో ఉంచి, క్యాప్చర్ చేయడానికి తాకండి.",
      bengali: "ক্যামেরা প্রস্তুত। নোটটি ফ্রেমে রাখুন এবং ক্যাপচার করতে ট্যাপ করুন।"
    },
    processing: {
      english: "Processing the image. Please wait.",
      hindi: "छवि प्रोसेस हो रही है। कृपया प्रतीक्षा करें।",
      tamil: "படத்தை செயலாக்குகிறது. தயவுசெய்து காத்திருக்கவும்.",
      telugu: "చిత్రాన్ని ప్రాసెస్ చేస్తున్నాము. దయచేసి వేచి ఉండండి.",
      bengali: "ছবি প্রসেস করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।"
    },
    result_prefix: {
      english: "The banknote is identified as",
      hindi: "नोट की पहचान हुई है",
      tamil: "நோட்டு அடையாளம் காணப்பட்டது",
      telugu: "నోటు గుర్తించబడింది",
      bengali: "নোটটি চিহ্নিত করা হয়েছে"
    },
    offline_message: {
      english: "You are offline. Some features may be limited.",
      hindi: "आप ऑफलाइन हैं। कुछ सुविधाएँ सीमित हो सकती हैं।",
      tamil: "நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். சில அம்சங்கள் வரம்புக்குட்பட்டவை.",
      telugu: "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. కొన్ని ఫీచర్లు పరిమితం కావచ్చు.",
      bengali: "আপনি অফলাইন আছেন। কিছু বৈশিষ্ট্য সীমিত হতে পারে।"
    },
    back_online: {
      english: "You are back online.",
      hindi: "आप फिर से ऑनलाइन हैं।",
      tamil: "நீங்கள் மீண்டும் ஆன்லைனில் உள்ளீர்கள்.",
      telugu: "మీరు తిరిగి ఆన్‌లైన్‌లో ఉన్నారు.",
      bengali: "আপনি আবার অনলাইনে আছেন।"
    },
    error_message: {
      english: "An error occurred. Please try again.",
      hindi: "एक त्रुटि हुई। कृपया पुन: प्रयास करें।",
      tamil: "பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
      telugu: "లోపం సంభవించింది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
      bengali: "একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
    },
    language_changed: {
      english: "Language changed to English",
      hindi: "भाषा हिंदी में बदल गई है",
      tamil: "மொழி தமிழுக்கு மாற்றப்பட்டது",
      telugu: "భాష తెలుగుకు మార్చబడింది",
      bengali: "ভাষা বাংলায় পরিবর্তন করা হয়েছে"
    }
  };
  
  // Initialize dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Check online status on mount and set up listener
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        speak(getTranslation('offline_message'));
      } else if (status !== 'idle') {
        speak(getTranslation('back_online'));
      }
    };
    
    handleOnlineStatusChange();
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, [status]);
  
  // Effect for language change
  useEffect(() => {
    // Notify user of language change
    if (language) {
      toast.success(getTranslation('language_changed'));
    }
  }, [language]);
  
  // Save settings to localStorage
  useEffect(() => {
    saveToLocalStorage('mode', mode);
    saveToLocalStorage('language', language);
    saveToLocalStorage('darkMode', isDarkMode);
  }, [mode, language, isDarkMode]);
  
  // Announce status changes for accessibility
  useEffect(() => {
    if (status === 'camera') {
      speak(getTranslation('camera_ready'));
    } else if (status === 'processing') {
      speak(getTranslation('processing'));
    }
  }, [status]);
  
  // Translations
  const getTranslation = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.english || key;
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const startCamera = () => {
    setStatus('camera');
    setResult(null);
    setError(null);
  };
  
  const goToHome = () => {
    setStatus('idle');
    setResult(null);
    setError(null);
    setImageSrc(null);
  };
  
  const refreshOnlineStatus = async (): Promise<boolean> => {
    const online = await checkOnlineStatus();
    setIsOnline(online);
    return online;
  };
  
  const announceResult = (text: string) => {
    const fullText = `${getTranslation('result_prefix')} ${text}`;
    speak(fullText);
    triggerHapticFeedback();
  };
  
  // Handle language change
  const handleLanguageChange = (newLanguage: AppLanguage) => {
    setLanguage(newLanguage);
    toast.success(getTranslation('language_changed'));
  };
  
  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);
  
  const contextValue: AppContextType = {
    mode,
    setMode,
    language,
    setLanguage: handleLanguageChange,
    isDarkMode,
    toggleDarkMode,
    
    status,
    setStatus,
    result,
    setResult,
    error,
    setError,
    
    imageSrc,
    setImageSrc,
    startCamera,
    goToHome,
    
    isOnline,
    refreshOnlineStatus,
    
    announceResult,
    getTranslation,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
