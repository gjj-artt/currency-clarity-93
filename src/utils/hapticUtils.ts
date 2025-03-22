
export const triggerHapticFeedback = (): boolean => {
  if (!window.navigator || !window.navigator.vibrate) {
    return false;
  }
  
  try {
    // Vibrate for 100ms
    window.navigator.vibrate(100);
    return true;
  } catch (error) {
    console.error('Haptic feedback error:', error);
    return false;
  }
};

export const isHapticFeedbackSupported = (): boolean => {
  return !!window.navigator && !!window.navigator.vibrate;
};
