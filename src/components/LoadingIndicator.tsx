
import React from 'react';
import { useAppContext } from '@/context/AppContext';

const LoadingIndicator: React.FC = () => {
  const { language } = useAppContext();
  
  const translations = {
    processing: {
      english: "Processing Image",
      hindi: "छवि प्रोसेस हो रही है",
      tamil: "படத்தை செயலாக்குகிறது",
      telugu: "చిత్రాన్ని ప్రాసెస్ చేస్తోంది",
      bengali: "ছবি প্রসেস করা হচ্ছে"
    },
    wait: {
      english: "Please wait while we identify the banknote",
      hindi: "कृपया प्रतीक्षा करें जबकि हम नोट की पहचान करते हैं",
      tamil: "நோட்டை அடையாளம் காணும் வரை காத்திருக்கவும்",
      telugu: "మేము నోటును గుర్తించే వరకు దయచేసి వేచి ఉండండి",
      bengali: "অনুগ্রহ করে অপেক্ষা করুন যখন আমরা নোটটি চিহ্নিত করি"
    }
  };
  
  const getText = (key: keyof typeof translations) => {
    return translations[key][language as keyof typeof translations[keyof typeof translations]] || translations[key].english;
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-64 animate-fade-in">
      <div className="glass-card p-8 flex flex-col items-center max-w-md w-full">
        <div className="relative flex justify-center items-center mb-6">
          <div className="absolute w-16 h-16 border-4 border-primary rounded-full opacity-30"></div>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">{getText('processing')}</h2>
        <p className="text-muted-foreground text-center">{getText('wait')}</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
