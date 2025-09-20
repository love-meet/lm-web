import React, { useEffect, useRef } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PostTab = ({ selectedFiles, onFileSelect, onRemoveFSile, onTextChange, text, onDone, previewUrls, isLoading }) => {
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

      {/* File Selection Grid */}
      {selectedFiles.length === 0 && (
        <div className="text-center py-20">
          <FaImage className="mx-auto text-6xl text-gray-500 mb-4" />
          <p className="text-gray-400">No files selected for post</p>
        </div>
      )}

      {/* Text Input */}
      {selectedFiles.length > 0 && (
        <div>
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Write a caption for your post..."
            className="w-full p-4 input-styled bg-opacity-70 text-lg resize-none"
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
            className="button-primary text-lg font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Done'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostTab;
