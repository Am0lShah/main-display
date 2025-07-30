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
    <div className="overflow-hidden h-12 flex items-center">
      <div 
        className="whitespace-nowrap text-xl font-bold"
        style={{ 
          transform: `translateX(${scrollPosition}px)`,
          transition: 'transform 0.05s linear'
        }}
      >
        {noticeText}
      </div>
    </div>
  );
};

export default ImportantNotice; 