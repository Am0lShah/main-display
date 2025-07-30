import React, { useState, useEffect } from 'react';

const Advertisement = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const adTexts = [
    "Special Offer: Get 50% off on all electronics this week!",
    "New Restaurant Opening: Taste the best cuisine in town",
    "Limited Time Deal: Book your vacation now and save big!",
    "Flash Sale: Designer clothes at unbelievable prices",
    "Don't Miss Out: Premium subscription at half price"
  ];
  
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPosition(prev => {
        if (prev <= -100) {
          return 0;
        }
        return prev - 1;
      });
    }, 50);

    const adChangeInterval = setInterval(() => {
      setCurrentAdIndex(prev => (prev + 1) % adTexts.length);
    }, 8000); // Change ad every 8 seconds

    return () => {
      clearInterval(scrollInterval);
      clearInterval(adChangeInterval);
    };
  }, [adTexts.length]);

  return (
    <div className="overflow-hidden h-14 flex items-center bg-gradient-to-r from-primary-light to-primary-very-light shadow-lg border-t border-primary-medium">
      <div className="flex items-center px-4">
        <div className="bg-primary-medium rounded-full p-2 mr-3">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        </div>
        <div 
          className="whitespace-nowrap text-lg font-semibold text-primary-dark"
          style={{ 
            transform: `translateX(${scrollPosition}px)`,
            transition: 'transform 0.05s linear'
          }}
        >
          {adTexts[currentAdIndex]}
        </div>
      </div>
    </div>
  );
};

export default Advertisement; 