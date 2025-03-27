
import React, { useState } from 'react';
import { MessageCircle, DollarSign, Bell, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChatbotAccountant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const { toast } = useToast();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setHasNotification(false);
  };

  const showDemoMessage = () => {
    toast({
      title: "Finance Update",
      description: "USD/INR exchange rate has improved by 0.5% in the last 24 hours.",
      duration: 5000,
    });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chatbot window */}
      {isOpen && (
        <div className="w-80 bg-background border border-border rounded-lg shadow-lg animate-scale-in overflow-hidden">
          <div className="p-4 border-b border-border bg-primary/10 flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Financial Assistant
            </h3>
            <button 
              onClick={toggleChatbot} 
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 h-60 overflow-y-auto">
            <div className="glass-card p-3 mb-3 max-w-[80%] ml-auto">
              <p className="text-sm">How can I help with your finances today?</p>
            </div>
            <div className="glass-card p-3 mb-3 max-w-[80%]">
              <p className="text-sm">I can provide currency news, budget advice, and help identify currency denominations.</p>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <button 
              onClick={showDemoMessage} 
              className="w-full bg-primary text-primary-foreground rounded p-2 text-sm"
            >
              Get Latest Currency News
            </button>
          </div>
        </div>
      )}
      
      {/* Chatbot button */}
      <button
        onClick={toggleChatbot}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center chatbot-pulse relative"
        aria-label="Open financial assistant chatbot"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Notification indicator */}
        {hasNotification && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-background"></span>
        )}
      </button>
    </div>
  );
};

export default ChatbotAccountant;
