import React, { useState, useEffect } from 'react';

const VideoImageSection = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No media available</p>;
  }

  const currentItem = data[currentIndex];

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[400px] overflow-hidden rounded-lg bg-black">
      <div className="w-full h-full flex items-center justify-center">
        {currentItem.formate === 'image' ? (
          <img
            src={currentItem.url}
            alt={currentItem.content}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <video
            src={currentItem.url}
            autoPlay
            muted
            loop
            className="max-h-full max-w-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {data.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoImageSection;
