import React, { useEffect, useRef } from 'react';
import { FaImage, FaTimes, FaHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PostTab = ({ selectedFiles, onFileSelect, onRemoveFile, onTextChange, text, onDone, previewUrls, isLoading }) => {
  return (
    <div className="space-y-6">
      {/* File Display Area */}
      {selectedFiles.length > 0 && (
        <div className="relative h-96 bg-gray-900 rounded-2xl overflow-hidden">
          {selectedFiles.length === 1 ? (
            // Single file display
            <div className="w-full h-full relative group">
              {selectedFiles[0].type === 'image' ? (
                <img 
                  src={previewUrls[0]} 
                  alt="Selected" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <video 
                  src={previewUrls[0]} 
                  controls 
                  className="w-full h-full object-contain"
                />
              )}
              <button
                onClick={() => onRemoveFile(0)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            // Multiple files with swiper
            <div className="w-full h-full">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="w-full h-full"
              >
                {selectedFiles.map((file, index) => (
                  <SwiperSlide key={index} className="relative group">
                    <div className="w-full h-full flex items-center justify-center">
                      {file.type === 'image' ? (
                        <img 
                          src={previewUrls[index]} 
                          alt={`Preview ${index}`} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <video 
                          src={previewUrls[index]} 
                          controls 
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveFile(index)}
                      className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 z-10"
                    >
                      <FaTimes />
                    </button>
                    <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {index + 1} of {selectedFiles.length}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      )}

      {/* File Selection - Empty State */}
      {selectedFiles.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[500px] bg-[#0a0e27] rounded-2xl">
          {/* Image Icon with Plus */}
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-[#4a5568] rounded-xl flex items-center justify-center">
              <FaImage className="text-5xl text-[#1a202c]" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#4a5568] rounded-full flex items-center justify-center border-4 border-[#0a0e27]">
              <span className="text-2xl text-[#1a202c] font-bold">+</span>
            </div>
          </div>
          
          <p className="text-gray-400 text-lg mb-8">Share a lovely moment</p>

          {/* Info Card */}
          <div className="bg-[#1a1f3a] border-l-4 border-blue-500 rounded-lg p-6 mx-4 max-w-md">
            <div className="flex items-start space-x-3 mb-4">
              <FaHeart className="text-blue-400 text-xl mt-1 flex-shrink-0" />
              <h3 className="text-white font-semibold text-lg">Ready for Your Close-Up?</h3>
            </div>
            
            <div className="space-y-3 text-gray-300 text-sm">
              <p>• Don't let love be blurry! A stunning, clear photo is your best wingman.</p>
              
              <p>• We're all about human connection, so let's see your lovely face! (Save the pet and sunset pics for later).</p>
              
              <p className="text-cyan-400 font-medium">
                • Keep it classy and let your personality shine. Revealing too much will get your account blocked, and we'd truly miss you!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Text Input */}
      {selectedFiles.length > 0 && (
        <div>
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Write a caption for your post..."
            className="w-full p-4 bg-[#12152b] text-white rounded-2xl text-lg resize-none border border-gray-700 focus:border-blue-500 focus:outline-none"
            rows="4"
          />
        </div>
      )}

      {/* Done Button */}
      {selectedFiles.length > 0 && (
        <div className="text-center">
          <button
            onClick={onDone}
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-lg font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Creating...' : 'Done'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostTab;