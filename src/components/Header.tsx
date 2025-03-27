
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import ModeToggle from './ModeToggle';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, goToHome } = useAppContext();
  
  return (
    <header className="glass-card p-4 md:p-6 flex justify-between items-center animate-slide-down">
      <div className="flex items-center gap-2">
        <button 
          onClick={goToHome}
          className="focus-visible-ring flex items-center gap-2"
          aria-label="Go to home"
        >
          <img 
            src="/lovable-uploads/3221996f-11c6-43b9-84a3-21e5509b07a8.png" 
            alt="CurrencySence Logo" 
            className="h-15 md:h-18 w-auto" // Increased by 1.5x
          />
          <span className="text-2xl md:text-3xl font-bold hidden md:inline">CurrencySence</span>
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
