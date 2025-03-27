
/**
 * Utility functions for haptic feedback
 */

export const triggerHapticFeedback = (intensity: number = 100): boolean => {
  if (!window.navigator || !window.navigator.vibrate) {
    return false;
  }
  
  try {
    // Convert intensity percentage to vibration duration (max 200ms)
    const duration = Math.floor((intensity / 100) * 200);
    
    // Vibrate with calculated duration
    window.navigator.vibrate(duration);
    return true;
  } catch (error) {
    console.error('Haptic feedback error:', error);
    return false;
  }
};

export const isHapticFeedbackSupported = (): boolean => {
  return !!window.navigator && !!window.navigator.vibrate;
};

// For more complex patterns
export const triggerHapticPattern = (pattern: number[]): boolean => {
  if (!window.navigator || !window.navigator.vibrate) {
    return false;
  }
  
  try {
    window.navigator.vibrate(pattern);
    return true;
  } catch (error) {
    console.error('Haptic pattern error:', error);
    return false;
  }
};

// Success pattern: short-pause-long
export const triggerSuccessHaptic = (): boolean => {
  return triggerHapticPattern([30, 30, 100]);
};

// Error pattern: long-pause-long
export const triggerErrorHaptic = (): boolean => {
  return triggerHapticPattern([100, 30, 100]);
};

// Alert pattern: three short pulses
export const triggerAlertHaptic = (): boolean => {
  return triggerHapticPattern([30, 30, 30, 30, 30]);
};
