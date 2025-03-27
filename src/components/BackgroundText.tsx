
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';

type CurrencySymbol = {
  symbol: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
};

const BackgroundText: React.FC = () => {
  const [symbols, setSymbols] = useState<CurrencySymbol[]>([]);
  const { language } = useAppContext();

  // Get translated background text based on selected language
  const getBackgroundText = () => {
    const translations = {
      english: "CurrencySence",
      hindi: "करेंसीसेंस",
      tamil: "கரன்சிசென்ஸ்",
      telugu: "కరెన్సీసెన్స్",
      bengali: "কারেন্সিসেন্স"
    };
    
    return translations[language as keyof typeof translations] || translations.english;
  };

  useEffect(() => {
    // More vibrant colors for currency symbols
    const colors = [
      'text-blue-500', 'text-green-500', 'text-purple-500', 
      'text-pink-500', 'text-yellow-500', 'text-teal-500',
      'text-indigo-500', 'text-orange-500', 'text-red-400',
      'text-emerald-500', 'text-fuchsia-500', 'text-rose-500',
      'text-amber-500', 'text-lime-500', 'text-cyan-500'
    ];
    
    const currencySymbols = ['$', '€', '¥', '£', '₹', '₽', '₩', '₺', '₦', '₫', '฿', '₴', '₱', '₲', '₸'];
    
    // Create more currency symbols
    const initialSymbols = Array.from({ length: 25 }, () => ({
      symbol: currencySymbols[Math.floor(Math.random() * currencySymbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2, // Between 2-5rem
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.4, // Random horizontal speed
      speedY: (Math.random() - 0.5) * 0.4, // Random vertical speed
    }));
    
    setSymbols(initialSymbols);
    
    // Animate the currency symbols to jump around
    const interval = setInterval(() => {
      setSymbols(prevSymbols => 
        prevSymbols.map(symbol => {
          // Calculate new position
          let newX = symbol.x + symbol.speedX;
          let newY = symbol.y + symbol.speedY;
          let newSpeedX = symbol.speedX;
          let newSpeedY = symbol.speedY;
          
          // Bounce off edges
          if (newX <= 0 || newX >= 100) {
            newSpeedX = -newSpeedX;
            newX = Math.max(0, Math.min(100, newX));
          }
          
          if (newY <= 0 || newY >= 100) {
            newSpeedY = -newSpeedY;
            newY = Math.max(0, Math.min(100, newY));
          }
          
          return {
            ...symbol,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        })
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      {/* Main logo background - sized appropriately */}
      <h1 className="text-[20vw] font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-br from-gray-800/10 via-gray-800/5 to-gray-600/5 
        select-none opacity-10 tracking-wider">
        {getBackgroundText()}
      </h1>
      
      {/* Decorative currency symbols - continuously jumping */}
      <div className="absolute inset-0">
        {symbols.map((symbol, index) => (
          <div 
            key={index}
            className={`absolute ${symbol.color} transition-transform`}
            style={{
              left: `${symbol.x}%`,
              top: `${symbol.y}%`,
              fontSize: `${symbol.size}rem`,
              opacity: 0.8,
              transform: `translate(-50%, -50%)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            {symbol.symbol}
          </div>
        ))}
      </div>
      
      {/* More vibrant gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
      
      {/* Additional colorful gradient accents */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-teal-500/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/5 to-transparent"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

export default BackgroundText;
