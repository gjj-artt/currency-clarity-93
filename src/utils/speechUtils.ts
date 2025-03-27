
/**
 * Utility functions for speech synthesis
 */

let speechSynthesis: SpeechSynthesis | null = null;
let speechUtterance: SpeechSynthesisUtterance | null = null;

if (typeof window !== 'undefined') {
  speechSynthesis = window.speechSynthesis;
}

export const speak = (text: string, rate = 1, pitch = 1, volume = 1): void => {
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
