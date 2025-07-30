import React, { useState, useEffect } from 'react';

const ImportantNotice = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const noticeText = "Impeachment motion for Justice Yashwant Verma to be raised in Lok Sabha: Kiren Rijiju";
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => {
        // Reset position when text has scrolled completely
        if (prev <= -100) {
          return 0;
        }
        return prev - 1;
      });
    }, 50); // Speed of scrolling
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden h-14 flex items-center bg-gradient-to-r from-primary-dark to-primary-medium shadow-lg">
      <div className="flex items-center px-4">
        <div className="bg-primary-light rounded-full p-2 mr-3">
          <svg className="w-4 h-4 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div 
          className="whitespace-nowrap text-lg font-bold text-white"
          style={{ 
            transform: `translateX(${scrollPosition}px)`,
            transition: 'transform 0.05s linear'
          }}
        >
          {noticeText}
        </div>
      </div>
    </div>
  );
};

export default ImportantNotice; 