
let speechSynthesis: SpeechSynthesis | null = null;
let speechUtterance: SpeechSynthesisUtterance | null = null;

if (typeof window !== 'undefined') {
  speechSynthesis = window.speechSynthesis;
}

export const speak = (text: string, rate = 1, pitch = 1): void => {
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
  speechUtterance.volume = 1;
  
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
