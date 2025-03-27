
import React, { useState } from 'react';
import { Volume2, Vibrate, Languages, Globe, ArrowLeft } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { speak, stopSpeaking } from '@/utils/speechUtils';
import { isHapticFeedbackSupported, triggerHapticFeedback } from '@/utils/hapticUtils';

const AccessibilitySettings: React.FC = () => {
  const { 
    language, 
    setStatus,
    isDarkMode 
  } = useAppContext();
  
  // Local state for accessibility settings
  const [voiceVolume, setVoiceVolume] = useState(80);
  const [voiceSpeed, setVoiceSpeed] = useState(50);
  const [vibrationIntensity, setVibrationIntensity] = useState(70);
  const [isOfflineMode, setIsOfflineMode] = useState(true);
  
  const translations = {
    accessibility: {
      english: "Accessibility Settings",
      hindi: "पहुंच सेटिंग्स",
      tamil: "அணுகல் அமைப்புகள்",
      telugu: "అందుబాటు సెట్టింగులు",
      bengali: "অ্যাক্সেসযোগ্যতা সেটিংস"
    },
    voiceSettings: {
      english: "Voice Feedback",
      hindi: "आवाज प्रतिक्रिया",
      tamil: "குரல் கருத்து",
      telugu: "వాయిస్ ఫీడ్‌బ్యాక్",
      bengali: "ভয়েস ফিডব্যাক"
    },
    voiceVolume: {
      english: "Volume",
      hindi: "आवाज़",
      tamil: "தொனி",
      telugu: "వాల్యూమ్",
      bengali: "ভলিউম"
    },
    voiceSpeed: {
      english: "Speech Rate",
      hindi: "बोलने की गति",
      tamil: "பேச்சு வேகம்",
      telugu: "ప్రసంగం రేటు",
      bengali: "বাক হার"
    },
    vibrationSettings: {
      english: "Vibration Feedback",
      hindi: "कंपन प्रतिक्रिया",
      tamil: "அதிர்வு பின்னூட்டம்",
      telugu: "వైబ్రేషన్ ఫీడ్‌బ్యాక్",
      bengali: "কম্পন প্রতিক্রিয়া"
    },
    vibrationIntensity: {
      english: "Vibration Intensity",
      hindi: "कंपन तीव्रता",
      tamil: "அதிர்வு தீவிரம்",
      telugu: "కంపన తీవ్రత",
      bengali: "কম্পন তীব্রতা"
    },
    testVoice: {
      english: "Test Voice",
      hindi: "आवाज का परीक्षण करें",
      tamil: "குரலை சோதிக்கவும்",
      telugu: "వాయిస్‌ని పరీక్షించండి",
      bengali: "ভয়েস পরীক্ষা করুন"
    },
    testVibration: {
      english: "Test Vibration",
      hindi: "कंपन का परीक्षण करें",
      tamil: "அதிர்வை சோதிக்கவும்",
      telugu: "వైబ్రేషన్‌ని పరీక్షించండి",
      bengali: "কম্পন পরীক্ষা করুন"
    },
    offlineMode: {
      english: "Offline Mode",
      hindi: "ऑफलाइन मोड",
      tamil: "ஆஃப்லைன் பயன்முறை",
      telugu: "ఆఫ్‌లైన్ మోడ్",
      bengali: "অফলাইন মোড"
    },
    back: {
      english: "Back",
      hindi: "वापस",
      tamil: "பின்செல்",
      telugu: "వెనుకకు",
      bengali: "পিছনে"
    },
    notSupported: {
      english: "Not supported on this device",
      hindi: "इस डिवाइस पर समर्थित नहीं है",
      tamil: "இந்த சாதனத்தில் ஆதரிக்கப்படவில்லை",
      telugu: "ఈ పరికరంలో మద్దతు లేదు",
      bengali: "এই ডিভাইসে সমর্থিত নয়"
    }
  };
  
  const getText = (key: keyof typeof translations) => {
    return translations[key][language as keyof typeof translations[keyof typeof translations]] || translations[key].english;
  };
  
  const handleGoBack = () => {
    setStatus('idle');
  };
  
  const handleTestVoice = () => {
    // Calculate speed as a ratio where 50% = 1.0 (normal speed)
    const speedRatio = voiceSpeed / 50;
    const testMessage = getText('voiceSettings');
    speak(testMessage, speedRatio);
  };
  
  const handleTestVibration = () => {
    // We would need to update the hapticUtils to support intensity
    // For now we'll just call the basic function
    triggerHapticFeedback();
  };
  
  const hapticSupported = isHapticFeedbackSupported();
  
  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in">
      <div className="glass-card p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={handleGoBack}
            className="icon-button mr-2"
            aria-label={getText('back')}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold">{getText('accessibility')}</h2>
        </div>
        
        <div className="space-y-6">
          {/* Voice Settings */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              {getText('voiceSettings')}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex justify-between mb-2">
                  <span>{getText('voiceVolume')}</span>
                  <span>{voiceVolume}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={voiceVolume} 
                  onChange={(e) => setVoiceVolume(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              
              <div>
                <label className="flex justify-between mb-2">
                  <span>{getText('voiceSpeed')}</span>
                  <span>{voiceSpeed}%</span>
                </label>
                <input 
                  type="range" 
                  min="25" 
                  max="200" 
                  value={voiceSpeed} 
                  onChange={(e) => setVoiceSpeed(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              
              <button
                onClick={handleTestVoice}
                className="secondary-button w-full"
              >
                {getText('testVoice')}
              </button>
            </div>
          </div>
          
          {/* Vibration Settings */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Vibrate className="h-5 w-5" />
              {getText('vibrationSettings')}
            </h3>
            
            {hapticSupported ? (
              <div className="space-y-4">
                <div>
                  <label className="flex justify-between mb-2">
                    <span>{getText('vibrationIntensity')}</span>
                    <span>{vibrationIntensity}%</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={vibrationIntensity} 
                    onChange={(e) => setVibrationIntensity(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
                
                <button
                  onClick={handleTestVibration}
                  className="secondary-button w-full"
                >
                  {getText('testVibration')}
                </button>
              </div>
            ) : (
              <div className="p-4 bg-secondary/50 rounded-lg text-muted-foreground text-center">
                {getText('notSupported')}
              </div>
            )}
          </div>
          
          {/* Offline Mode */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {getText('offlineMode')}
            </h3>
            
            <label className="flex items-center justify-between cursor-pointer">
              <span>{getText('offlineMode')}</span>
              <div className="relative inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={isOfflineMode} 
                  onChange={() => setIsOfflineMode(!isOfflineMode)} 
                  className="sr-only peer"
                />
                <div className={`
                  w-11 h-6 bg-gray-200 rounded-full peer 
                  dark:bg-gray-700 peer-checked:after:translate-x-full 
                  peer-checked:after:border-white after:content-[''] 
                  after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all 
                  dark:border-gray-600 peer-checked:bg-primary
                `}></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
