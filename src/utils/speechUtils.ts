/**
 * Utility functions for speech synthesis
 */

let speechSynthesis: SpeechSynthesis | null = null;
let speechUtterance: SpeechSynthesisUtterance | null = null;

if (typeof window !== 'undefined') {
  speechSynthesis = window.speechSynthesis;
}

// Get all available voices
const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!speechSynthesis) return [];
  return speechSynthesis.getVoices();
};

// Find an Indian voice if available
const findIndianVoice = (): SpeechSynthesisVoice | null => {
  const voices = getAvailableVoices();
  
  // Look for Hindi or Indian English voices
  const indianVoice = voices.find(voice => 
    voice.lang.includes('hi-') || // Hindi
    voice.lang.includes('en-IN') || // Indian English
    voice.name.toLowerCase().includes('indian') ||
    voice.name.toLowerCase().includes('hindi')
  );
  
  return indianVoice || null;
};

export const speak = (text: string, rate = 1, pitch = 1, volume = 1, useIndianVoice = true): void => {
  if (!speechSynthesis) {
    console.error('Speech synthesis not supported');
    return;
  }
  
  // Stop any ongoing speech
  stopSpeaking();
  
  // Create a new utterance
  speechUtterance = new SpeechSynthesisUtterance(text);
  
  // Set properties
  speechUtterance.rate = rate;
  speechUtterance.pitch = pitch;
  speechUtterance.volume = volume;
  
  // Try to set Indian voice if requested
  if (useIndianVoice) {
    const indianVoice = findIndianVoice();
    if (indianVoice) {
      speechUtterance.voice = indianVoice;
    } else {
      // If no Indian voice is found, try to adjust parameters to simulate one
      speechUtterance.pitch = 1.2; // Slightly higher pitch
      speechUtterance.rate = 0.9; // Slightly slower rate
    }
  }
  
  // Speak
  speechSynthesis.speak(speechUtterance);
};

export const stopSpeaking = (): void => {
  if (!speechSynthesis) return;
  
  speechSynthesis.cancel();
  speechUtterance = null;
};

export const getVoices = (): SpeechSynthesisVoice[] => {
  if (!speechSynthesis) return [];
  return speechSynthesis.getVoices();
};

export const isSpeaking = (): boolean => {
  if (!speechSynthesis) return false;
  return speechSynthesis.speaking;
};

export const pauseSpeaking = (): void => {
  if (!speechSynthesis) return;
  speechSynthesis.pause();
};

export const resumeSpeaking = (): void => {
  if (!speechSynthesis) return;
  speechSynthesis.resume();
};

export const getVoicesByLanguage = (langCode: string): SpeechSynthesisVoice[] => {
  if (!speechSynthesis) return [];
  return getVoices().filter(voice => voice.lang.startsWith(langCode));
};

// Map app languages to language codes
export const languageToCode = {
  english: 'en',
  hindi: 'hi',
  tamil: 'ta',
  telugu: 'te',
  bengali: 'bn'
};

// Get a suitable voice for the given language
export const getVoiceForLanguage = (language: string): SpeechSynthesisVoice | null => {
  if (!speechSynthesis) return null;
  
  const langCode = languageToCode[language as keyof typeof languageToCode] || 'en';
  const voices = getVoicesByLanguage(langCode);
  
  if (voices.length > 0) {
    return voices[0]; // Return the first available voice for this language
  }
  
  return speechSynthesis.getVoices()[0]; // Fallback to first available voice
};
