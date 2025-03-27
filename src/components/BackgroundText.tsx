
import React from 'react';

const BackgroundText: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <h1 className="text-[20vw] font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-600/20 to-gray-800/10 select-none opacity-20">
        CurrencySence
      </h1>
    </div>
  );
};

export default BackgroundText;
