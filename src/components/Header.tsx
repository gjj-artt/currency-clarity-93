
import React from 'react';
import { Moon, Sun, Settings, Languages } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import ModeToggle from './ModeToggle';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, status, goToHome } = useAppContext();
  
  return (
    <header className="glass-card p-4 md:p-6 flex justify-between items-center animate-slide-down">
      <div>
        <button 
          onClick={goToHome}
          className="focus-visible-ring text-xl md:text-2xl font-bold"
          aria-label="Go to home"
        >
          CurrencySence
        </button>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <button
          className="icon-button"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </button>
        
        <LanguageSelector />
        
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
