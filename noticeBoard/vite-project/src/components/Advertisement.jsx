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
    <div className="overflow-hidden h-12 flex items-center">
      <div 
        className="whitespace-nowrap text-lg font-semibold"
        style={{ 
          transform: `translateX(${scrollPosition}px)`,
          transition: 'transform 0.05s linear'
        }}
      >
        {adTexts[currentAdIndex]}
      </div>
    </div>
  );
};

export default Advertisement; 