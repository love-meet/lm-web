import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSwiper = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden">
        <img 
          src={images[0]?.data} 
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-100 md:h-96 rounded-xl overflow-hidden">
      {/* Image Stack - 3D Effect */}
      <div className="relative w-full h-full">
        {images.map((image, index) => {
          const offset = index - currentIndex;
          const isActive = index === currentIndex;
          
          return (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{
                transform: `
                  translateX(${offset * 100}%) 
                  translateZ(${isActive ? 0 : -50}px) 
                  scale(${isActive ? 1 : 0.9})
                `,
                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                opacity: Math.abs(offset) > 1 ? 0 : 1,
              }}
            >
              <img 
                src={image} 
                alt={`Post ${index + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
              {/* Overlay for non-active images */}
              {!isActive && (
                <div className="absolute inset-0 bg-black/20 rounded-xl" />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 z-20 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageSwiper;
