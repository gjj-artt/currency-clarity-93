
import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, CameraOff, RefreshCw } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const CameraView: React.FC = () => {
  const { setImageSrc, setStatus, isOnline, language, refreshOnlineStatus, goToHome } = useAppContext();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const translations = {
    takePhoto: {
      english: "Capture Banknote",
      hindi: "नोट कैप्चर करें",
      tamil: "நோட்டை கைப்பற்று",
      telugu: "నోటును క్యాప్చర్ చేయండి",
      bengali: "নোট ক্যাপচার করুন"
    },
    cancel: {
      english: "Cancel",
      hindi: "रद्द करें",
      tamil: "ரத்து செய்",
      telugu: "రద్దు చేయండి",
      bengali: "বাতিল করুন"
    },
    cameraError: {
      english: "Camera access denied. Please check your permissions.",
      hindi: "कैमरा एक्सेस अस्वीकृत। कृपया अपनी अनुमतियों की जांच करें।",
      tamil: "கேமரா அணுகல் மறுக்கப்பட்டது. உங்கள் அனுமதிகளை சரிபார்க்கவும்.",
      telugu: "కెమెరా యాక్సెస్ నిరాకరించబడింది. దయచేసి మీ అనుమతులను తనిఖీ చేయండి.",
      bengali: "ক্যামেরা অ্যাক্সেস অস্বীকার করা হয়েছে। আপনার অনুমতিগুলি পরীক্ষা করুন।"
    },
    tryAgain: {
      english: "Try Again",
      hindi: "पुनः प्रयास करें",
      tamil: "மீண்டும் முயற்சி செய்யுங்கள்",
      telugu: "మళ్ళీ ప్రయత్నించండి",
      bengali: "আবার চেষ্টা করুন"
    },
    offline: {
      english: "You are offline. Camera may still work, but identification will be done when online.",
      hindi: "आप ऑफलाइन हैं। कैमरा अभी भी काम कर सकता है, लेकिन पहचान ऑनलाइन होने पर की जाएगी।",
      tamil: "நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். கேமரா இன்னும் வேலை செய்யலாம், ஆனால் அடையாளம் ஆன்லைனில் இருக்கும்போது செய்யப்படும்.",
      telugu: "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. కెమెరా ఇప్పటికీ పని చేయవచ్చు, కానీ గుర్తింపు ఆన్‌లైన్‌లో ఉన్నప్పుడు చేయబడుతుంది.",
      bengali: "আপনি অফলাইন আছেন। ক্যামেরা এখনও কাজ করতে পারে, তবে অনলাইনে থাকাকালীন শনাক্তকরণ করা হবে।"
    },
    refreshStatus: {
      english: "Refresh Status",
      hindi: "स्थिति रीफ्रेश करें",
      tamil: "நிலையை புதுப்பிக்கவும்",
      telugu: "స్థితిని రిఫ్రెష్ చేయండి",
      bengali: "স্ট্যাটাস রিফ্রেশ করুন"
    }
  };
  
  const getText = (key: keyof typeof translations) => {
    return translations[key][language as keyof typeof translations[keyof typeof translations]] || translations[key].english;
  };
  
  useEffect(() => {
    let mounted = true;
    
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        
        if (mounted) {
          setStream(mediaStream);
          setCameraError(null);
          
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        }
      } catch (error) {
        console.error('Camera access error:', error);
        if (mounted) {
          setCameraError(getText('cameraError'));
        }
      }
    };
    
    startCamera();
    
    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image as data URL
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Stop the camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    // Update app state
    setImageSrc(imageData);
    setStatus('processing');
    
    // Simulate AI processing (for demo)
    setTimeout(() => {
      // In a real app, this would be replaced with actual API call to the backend
      const randomAmount = Math.random() > 0.5 
        ? "500 Rupees" 
        : Math.random() > 0.5 
          ? "100 Rupees" 
          : "1000 Rupees";
      
      setStatus('result');
      // This would be set based on the AI response in a real app
      // setResult(randomAmount);
    }, 2000);
  };
  
  const handleRetry = async () => {
    setCameraError(null);
    
    // Close previous stream if exists
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    // Try to initialize camera again
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera retry error:', error);
      setCameraError(getText('cameraError'));
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      <div className="relative w-full max-w-2xl aspect-[4/3] rounded-lg overflow-hidden glass-card">
        {cameraError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4">
            <CameraOff className="w-16 h-16 text-destructive mb-4" />
            <p className="text-xl font-semibold">{cameraError}</p>
            <button 
              onClick={handleRetry}
              className="primary-button mt-4 flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              {getText('tryAgain')}
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            {!isOnline && (
              <div className="absolute top-0 left-0 right-0 bg-destructive/90 text-destructive-foreground p-3 text-center">
                <p>{getText('offline')}</p>
                <button
                  onClick={() => refreshOnlineStatus()}
                  className="underline font-medium mt-1 focus-visible-ring"
                >
                  {getText('refreshStatus')}
                </button>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between">
              <button 
                onClick={goToHome}
                className="secondary-button flex items-center gap-2"
                aria-label={getText('cancel')}
              >
                <X className="w-5 h-5" />
                {getText('cancel')}
              </button>
              
              <button 
                onClick={captureImage}
                className="primary-button flex items-center gap-2"
                aria-label={getText('takePhoto')}
              >
                <Camera className="w-5 h-5" />
                {getText('takePhoto')}
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraView;
