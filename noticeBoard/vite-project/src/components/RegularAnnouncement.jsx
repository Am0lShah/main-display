import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';


const RegularAnnouncement = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  
  const announcements = [
    "Breaking: New COVID-19 variant detected in multiple countries",
    "Sports: India wins the cricket series against Australia",
    "Technology: Apple announces new iPhone with advanced features",
    "Weather: Heavy rainfall expected in northern regions",
    "Politics: Cabinet reshuffle expected this week",
    "Business: Stock market reaches new all-time high"
  ];

  // const textNotices=useSelector((state)=>state.textData.TextNotice)

  // console.log(data);
  


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % data.length);
    }, 2000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Regular</h2>
        <h3 className="text-xl mb-8">Announcement</h3>
        
        <div className="h-32 flex items-center justify-center">
          <div 
            className="text-lg font-medium text-center px-4"
            style={{
              animation: 'slideUp 4s ease-in-out infinite'
            }}
          >
            {data[currentIndex]?.content}
          </div>
        </div>
      </div>
      
      {/* Indicator */}
      <div className="absolute bottom-4 flex space-x-2">
        {data.map((val, index) => <>
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        </>)}
      </div>
    </div>
  );
};

export default RegularAnnouncement; 