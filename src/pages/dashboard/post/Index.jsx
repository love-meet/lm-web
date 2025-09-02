 import React, { useState, useRef } from 'react';
import { FaImage, FaTimes, FaVideo, FaUpload } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';
import './ToggleSwitch.css';

export default function Post() {
  const [postType, setPostType] = useState('post');
  const [postText, setPostText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (postType === 'status') {
      if (files.length > 1 || selectedFiles.length > 0) {
        toast.error('You can only upload one file for a status.');
        return;
      }
    } else {
      const hasVideo = selectedFiles.some(file => file.type === 'video') || files.some(file => file.type.startsWith('video/'));
      const hasImage = selectedFiles.some(file => file.type === 'image') || files.some(file => file.type.startsWith('image/'));

      if ((hasVideo && files.some(file => file.type.startsWith('image/'))) || (hasImage && files.some(file => file.type.startsWith('video/')))) {
        toast.error('You can only upload images or a single video, not both.');
        return;
      }

      if (hasVideo && files.length > 0) {
        toast.error('You can only upload one video.');
        return;
      }

      if (files.some(file => file.type.startsWith('video/')) && files.length > 1) {
        toast.error('You can only upload one video.');
        return;
      }

      if (selectedFiles.length + files.length > 5 && !hasVideo) {
        toast.error('You can only upload a maximum of 5 images.');
        return;
      }
    }

    const newFiles = files.map(file => ({
      file,
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));

    const newPreviewUrls = files.map(file => URL.createObjectURL(file));

    setSelectedFiles([...selectedFiles, ...newFiles]);
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const handleRemoveFile = (index) => {
    const newSelectedFiles = [...selectedFiles];
    const newPreviewUrls = [...previewUrls];

    newSelectedFiles.splice(index, 1);
    newPreviewUrls.splice(index, 1);

    setSelectedFiles(newSelectedFiles);
    setPreviewUrls(newPreviewUrls);

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(previewUrls[index]);
  };

  const isUploadDisabled = () => {
    if (postType === 'status' && selectedFiles.length > 0) return true;
    if (postType === 'post') {
      if (selectedFiles.some(file => file.type === 'video')) return true;
      if (selectedFiles.filter(file => file.type === 'image').length >= 5) return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-bg-primary text-white p-4 font-sans">
      <div className="max-w-3xl mx-auto  bg-[var(--bg-secondary)] border border-gray-700 p-6 rounded-2xl">
        <div className="flex justify-center mb-8">
          <label className="toggle-switch">
            <div className={`toggle-switch-slider ${postType === 'post' ? '' : 'status'}`}></div>
            <button className="toggle-switch-text toggle-switch-text-post" onClick={()=> setPostType('post')}>Post</button>
            <button className="toggle-switch-text toggle-switch-text-status" onClick={()=> setPostType('status')}>Status</button>
          </label>
        </div>

        {/* Post Creation Form */}
        <div className="space-y-6">
          {/* File Upload */}
          {!isUploadDisabled() && (
            <div
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-primary-cyan transition-all duration-300 bg-gray-800 bg-opacity-40"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,video/*"
                multiple
                disabled={isUploadDisabled()}
              />
              <FaUpload className="mx-auto text-6xl text-gray-500 mb-4 animate-bounce" />
              <p className="text-text-muted text-lg">
                {postType === 'post' ? 'Upload up to 5 images or 1 video' : 'Upload one image or video'}
              </p>
              <p className="text-sm text-gray-600">Click here to select files</p>
            </div>
          )}

          {/* File Previews */}
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group animate-fadeIn">
                  {selectedFiles[index].type === 'image' ? (
                    <img src={url} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg shadow-lg" />
                  ) : (
                    <video src={url} controls className="w-full h-32 object-cover rounded-lg shadow-lg" />
                  )}
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Text Area */}
          {selectedFiles.length > 0 && (
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={`What's on your mind?`}
              className="w-full p-4 input-styled bg-opacity-70 text-lg"
              rows="5"
            ></textarea>
          )}

          {/* Post Button */}
          <div className="text-center pt-4">
            <button
              className="button-primary text-lg font-bold py-4 px-12 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedFiles.length === 0 || !postText}
            >
              Create {postType}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}