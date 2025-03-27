
import React, { useEffect } from 'react';
import { ArrowLeft, VolumeX, Volume2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { speak, stopSpeaking } from '@/utils/speechUtils';

const ResultDisplay: React.FC = () => {
  const { 
    language, 
    goToHome, 
    imageSrc, 
    result, 
    announceResult,
    startCamera 
  } = useAppContext();
  
  const translations = {
    identified: {
      english: "Banknote Identified",
      hindi: "नोट की पहचान हो गई है",
      tamil: "நோட்டு அடையாளம் காணப்பட்டது",
      telugu: "నోటు గుర్తించబడింది",
      bengali: "নোট চিহ্নিত করা হয়েছে"
    },
    denomination: {
      english: "Denomination",
      hindi: "मूल्यवर्ग",
      tamil: "மதிப்பு",
      telugu: "విలువ",
      bengali: "মূল্যমান"
    },
    tryAgain: {
      english: "Scan Another",
      hindi: "एक और स्कैन करें",
      tamil: "மற்றொன்றை ஸ்கேன் செய்யவும்",
      telugu: "మరొకదాన్ని స్కాన్ చేయండి",
      bengali: "আরেকটি স্ক্যান করুন"
    },
    back: {
      english: "Back to Home",
      hindi: "होम पर वापस जाएं",
      tamil: "முகப்புக்குத் திரும்பு",
      telugu: "హోమ్‌కు తిరిగి వెళ్ళండి",
      bengali: "হোমে ফিরে যান"
    },
    speakAgain: {
      english: "Speak Result",
      hindi: "परिणाम बोलें",
      tamil: "முடிவைப் பேசுங்கள்",
      telugu: "ఫలితాన్ని మాట్లాడండి",
      bengali: "ফলাফল বলুন"
    },
    mute: {
      english: "Mute",
      hindi: "म्यूट करें",
      tamil: "முடக்கு",
      telugu: "మ్యూట్",
      bengali: "নীরব করুন"
    }
  };
  
  const getText = (key: keyof typeof translations) => {
    return translations[key][language as keyof typeof translations[keyof typeof translations]] || translations[key].english;
  };
  
  // Mock result for demonstration purposes
  const displayResult = result || "₹500";
  
  useEffect(() => {
    // In a real app, result would come from the backend AI analysis
    // For demo, we'll announce the mock result
    if (result) {
      announceResult(displayResult);
    }
    
    // Clean up
    return () => {
      stopSpeaking();
    };
  }, []);
  
  const handleSpeakResult = () => {
    announceResult(displayResult);
  };
  
  const handleMute = () => {
    stopSpeaking();
  };
  
  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in">
      <div className="glass-card p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{getText('identified')}</h2>
        
        {imageSrc && (
          <div className="mb-6 relative rounded-lg overflow-hidden">
            <img 
              src={imageSrc} 
              alt="Captured banknote" 
              className="w-full h-auto object-contain"
              style={{ maxHeight: '250px' }}
            />
          </div>
        )}
        
        <div className="mb-8">
          <h3 className="text-lg text-muted-foreground mb-2">{getText('denomination')}</h3>
          <div className="text-4xl md:text-5xl font-bold text-primary">{displayResult}</div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-between">
          <button
            onClick={goToHome}
            className="secondary-button flex items-center gap-2"
            aria-label={getText('back')}
          >
            <ArrowLeft className="h-5 w-5" />
            {getText('back')}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleSpeakResult}
              className="secondary-button flex items-center gap-2"
              aria-label={getText('speakAgain')}
            >
              <Volume2 className="h-5 w-5" />
              {getText('speakAgain')}
            </button>
            
            <button
              onClick={handleMute}
              className="icon-button"
              aria-label={getText('mute')}
            >
              <VolumeX className="h-5 w-5" />
            </button>
          </div>
          
          <button
            onClick={startCamera}
            className="primary-button"
            aria-label={getText('tryAgain')}
          >
            {getText('tryAgain')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
