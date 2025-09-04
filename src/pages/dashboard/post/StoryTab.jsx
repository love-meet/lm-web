import React from 'react';
import { FaVideo, FaImage } from 'react-icons/fa';

const StoryTab = ({ selectedFiles, onFileSelect, onRemoveFile, onTextChange, text, onDone, previewUrls, isLoading }) => {
  return (
    <div className="space-y-6">
      {/* File Display Area */}
      {selectedFiles.length > 0 && (
        <div className="relative h-96 bg-gray-900 rounded-2xl overflow-hidden">
          <div className="w-full h-full">
            {selectedFiles[0].type === 'image' ? (
              <img 
                src={previewUrls[0]} 
                alt="Story preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <video 
                src={previewUrls[0]} 
                controls 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}

      {/* Text Input */}
      {selectedFiles.length > 0 && (
        <div>
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Add a caption to your story..."
            className="w-full p-4 input-styled bg-opacity-70 text-lg resize-none"
            rows="3"
          />
        </div>
      )}

      {/* Empty State */}
      {selectedFiles.length === 0 && (
        <div className="text-center py-20">
          <div className="flex justify-center space-x-4 mb-4">
            <FaImage className="text-4xl text-gray-500" />
            <FaVideo className="text-4xl text-gray-500" />
          </div>
          <p className="text-gray-400">No files selected for story</p>
          <p className="text-sm text-gray-500 mt-2">1 image or 1 video (max 30 seconds)</p>
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

export default StoryTab;
