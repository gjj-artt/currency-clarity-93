
import React from 'react';

const BackgroundText: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      {/* Main logo background */}
      <h1 className="text-[30vw] font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-br from-gray-800/10 via-gray-800/5 to-gray-600/5 
        select-none opacity-10 tracking-wider">
        CurrencySence
      </h1>
      
      {/* Decorative currency symbols */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse-subtle">$</div>
        <div className="absolute top-1/3 right-1/4 text-7xl animate-pulse-subtle" style={{animationDelay: '0.5s'}}>€</div>
        <div className="absolute bottom-1/4 left-1/3 text-8xl animate-pulse-subtle" style={{animationDelay: '1s'}}>¥</div>
        <div className="absolute bottom-1/3 right-1/3 text-6xl animate-pulse-subtle" style={{animationDelay: '1.5s'}}>£</div>
        <div className="absolute top-1/2 left-1/2 text-7xl animate-pulse-subtle" style={{animationDelay: '2s'}}>₹</div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

export default BackgroundText;
