
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const ErrorDisplay: React.FC = () => {
  const { language, error, startCamera, goToHome } = useAppContext();
  
  const translations = {
    errorTitle: {
      english: "Error Occurred",
      hindi: "त्रुटि हुई",
      tamil: "பிழை ஏற்பட்டது",
      telugu: "లోపం సంభవించింది",
      bengali: "ত্রুটি ঘটেছে"
    },
    tryAgain: {
      english: "Try Again",
      hindi: "पुनः प्रयास करें",
      tamil: "மீண்டும் முயற்சிக்கவும்",
      telugu: "మళ్లీ ప్రయత్నించండి",
      bengali: "আবার চেষ্টা করুন"
    },
    backToHome: {
      english: "Back to Home",
      hindi: "होम पर वापस जाएं",
      tamil: "முகப்புக்குத் திரும்பு",
      telugu: "హోమ్‌కు తిరిగి వెళ్ళండి",
      bengali: "হোমে ফিরে যান"
    },
    defaultError: {
      english: "We couldn't process your request. Please try again.",
      hindi: "हम आपके अनुरोध को संसाधित नहीं कर सके। कृपया पुन: प्रयास करें।",
      tamil: "உங்கள் கோரிக்கையை எங்களால் செயலாக்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
      telugu: "మేము మీ అభ్యర్థనను ప్రాసెస్ చేయలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.",
      bengali: "আমরা আপনার অনুরোধ প্রক্রিয়া করতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।"
    }
  };
  
  const getText = (key: keyof typeof translations) => {
    return translations[key][language as keyof typeof translations[keyof typeof translations]] || translations[key].english;
  };
  
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="glass-card p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">{getText('errorTitle')}</h2>
        
        <p className="text-center mb-8">
          {error || getText('defaultError')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={startCamera}
            className="primary-button flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            {getText('tryAgain')}
          </button>
          
          <button
            onClick={goToHome}
            className="secondary-button"
          >
            {getText('backToHome')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
