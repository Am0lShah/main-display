import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


const RegularAnnouncement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const announcements = [
    "Breaking: New COVID-19 variant detected in multiple countries",
    "Sports: India wins the cricket series against Australia",
    "Technology: Apple announces new iPhone with advanced features",
    "Weather: Heavy rainfall expected in northern regions",
    "Politics: Cabinet reshuffle expected this week",
    "Business: Stock market reaches new all-time high"
  ];

  const textNotices=useSelector((state)=>state.textData.TextNotice)




  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-primary-very-light to-primary-light">
      <div className="text-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-primary-light mb-6">
          <h2 className="text-3xl font-bold mb-2 text-primary-dark">Regular</h2>
          <h3 className="text-2xl text-primary-medium">Announcement</h3>
        </div>
        
        <div className="h-32 flex items-center justify-center bg-white rounded-xl p-6 shadow-lg border border-primary-light">
          <div 
            className="text-lg font-semibold text-center px-4 text-primary-dark"
            style={{
              animation: 'slideUp 4s ease-in-out infinite'
            }}
          >
            {announcements[currentIndex]}
          </div>
        </div>
      </div>
      
      {/* Indicator */}
      <div className="absolute bottom-4 flex space-x-2">
        {announcements.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary-dark scale-125' : 'bg-primary-light'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RegularAnnouncement; 