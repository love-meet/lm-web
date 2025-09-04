import React from 'react';
import { FaPlus, FaImage, FaVideo } from 'react-icons/fa';

const FileUploadButton = ({ onFileSelect, activeTab, selectedFiles }) => {
  const getAcceptedFiles = () => {
    return "image/*,video/*";
  };

  const getMaxFiles = () => {
    return activeTab === 'story' ? 1 : 5;
  };

  const isDisabled = () => {
    if (activeTab === 'story' && selectedFiles.length >= 1) return true;
    if (activeTab === 'post') {
      if (selectedFiles.some(file => file.type === 'video')) return true;
      if (selectedFiles.length >= 5) return true;
    }
    return false;
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <label className={`
        relative group cursor-pointer block
        ${isDisabled() ? 'opacity-50 cursor-not-allowed' : ''}
      `}>
        <input
          type="file"
          accept={getAcceptedFiles()}
          multiple={activeTab === 'post'}
          onChange={onFileSelect}
          className="hidden"
          disabled={isDisabled()}
        />

        <div className="
          w-16 h-16 rounded-full 
          bg-gradient-to-r from-primary-cyan to-primary-purple
          flex items-center justify-center
          shadow-lg glow-cyan
          transform transition-all duration-300
          hover:scale-110 hover:glow-purple
          active:scale-95
        ">
          <FaPlus className="text-2xl text-white" />
        </div>

        {/* Tooltip */}
        <div className="
          absolute bottom-full right-0 mb-2 
          bg-gray-900 bg-opacity-90 backdrop-blur-sm
          px-3 py-2 rounded-lg
          opacity-0 group-hover:opacity-100
          transform translate-y-2 group-hover:translate-y-0
          transition-all duration-300
          pointer-events-none
          whitespace-nowrap
        ">
          <div className="text-white text-sm">
            {activeTab === 'story' 
              ? 'Add 1 image or video (30s max)'
              : 'Add up to 5 images or 1 video'
            }
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </label>
    </div>
  );
};

export default FileUploadButton;
