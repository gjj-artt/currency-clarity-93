
import React, { useEffect, useState } from 'react';

type CurrencySymbol = {
  symbol: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
};

const BackgroundText: React.FC = () => {
  const [symbols, setSymbols] = useState<CurrencySymbol[]>([]);

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
    
    // Create more currency symbols (increased from 15 to 25)
    const initialSymbols = Array.from({ length: 25 }, () => ({
      symbol: currencySymbols[Math.floor(Math.random() * currencySymbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2, // Between 2-5rem
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.5 + 0.2, // Random speed
      direction: Math.random() > 0.5 ? 1 : -1, // Random direction
    }));
    
    setSymbols(initialSymbols);
    
    // Animate the currency symbols
    const interval = setInterval(() => {
      setSymbols(prevSymbols => 
        prevSymbols.map(symbol => ({
          ...symbol,
          // Move the symbol up or down based on direction
          y: symbol.y + symbol.speed * symbol.direction,
          // If the symbol goes out of bounds, reverse direction or reset position
          direction: symbol.y <= 0 || symbol.y >= 100 ? -symbol.direction : symbol.direction,
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      {/* Main logo background */}
      <h1 className="text-[40vw] font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-br from-gray-800/10 via-gray-800/5 to-gray-600/5 
        select-none opacity-10 tracking-wider">
        CurrencySence
      </h1>
      
      {/* Decorative currency symbols - animated */}
      <div className="absolute inset-0">
        {symbols.map((symbol, index) => (
          <div 
            key={index}
            className={`absolute ${symbol.color} animate-bounce-subtle`}
            style={{
              left: `${symbol.x}%`,
              top: `${symbol.y}%`,
              fontSize: `${symbol.size}rem`,
              animationDelay: `${index * 0.2}s`,
              animationDuration: `${2 + symbol.speed}s`,
              opacity: 0.8, // Increased opacity from 0.7 to 0.8
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
