import React, { useState, useEffect } from 'react';

const VideoImageSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const mediaItems = [
    { type: 'image', src: '/media/image1.png', alt: 'Image 1' },
    { type: 'image', src: '/media/image2.jpg', alt: 'Image 2' },
    { type: 'video', src: '/media/video1.mp4', alt: 'Video 1' },
    { type: 'video', src: '/media/video2.mp4', alt: 'Video 2' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % mediaItems.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [mediaItems.length]);

  const currentItem = mediaItems[currentIndex];

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-primary-very-light to-primary-light relative">
      <div className="max-w-full max-h-full bg-white rounded-2xl p-4 shadow-xl border-2 border-primary-light">
        {currentItem.type === 'image' ? (
          <img 
            src={currentItem.src} 
            alt={currentItem.alt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        ) : (
          <video 
            src={currentItem.src} 
            autoPlay 
            muted 
            loop
            className="max-w-full max-h-full object-contain rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      
      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {mediaItems.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
              index === currentIndex ? 'bg-primary-dark scale-125' : 'bg-primary-light'
            }`}
          />
        ))}
      </div>
      
      {/* Media type indicator */}
      <div className="absolute top-6 right-6 bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        {currentItem.type === 'image' ? '📷 Image' : '🎥 Video'}
      </div>
    </div>
  );
};

export default VideoImageSection; 