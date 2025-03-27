
import React from 'react';

const BackgroundText: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <h1 className="text-[30vw] font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-br from-gray-800/10 via-gray-800/5 to-gray-600/5 
        select-none opacity-10 tracking-wider">
        CurrencySence
      </h1>
    </div>
  );
};

export default BackgroundText;
