import React, { useState, useRef } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';

export default function Post() {
  const [postType, setPostType] = useState('post'); // 'post' or 'status'
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[var(--primary-cyan)]">Create a new {postType}</h1>

        {/* Post Type Selection */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setPostType('post')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              postType === 'post'
                ? 'bg-[var(--primary-cyan)] text-gray-900 shadow-lg'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Post
          </button>
          <button
            onClick={() => setPostType('status')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              postType === 'status'
                ? 'bg-[var(--accent-pink)] text-gray-900 shadow-lg'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Status
          </button>
        </div>

        {/* Post Creation Form */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-xl">
          {/* Image Upload */}
          {!selectedImage && (
            <div
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-500 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-all duration-300"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <FaImage className="mx-auto text-5xl text-gray-500 mb-4" />
              <p className="text-gray-400">Click to upload an image</p>
            </div>
          )}

          {/* Image Preview and Text Area */}
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto rounded-lg mb-4"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
              >
                <FaTimes />
              </button>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder={`What's on your mind?`}
                className="w-full p-4 bg-gray-900 bg-opacity-70 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-cyan)] transition-all duration-300"
                rows="4"
                disabled={!selectedImage}
              ></textarea>
            </div>
          )}

          {/* Post Button */}
          <div className="mt-6 text-right">
            <button
              className="bg-[var(--primary-cyan)] text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-opacity-80 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={!selectedImage || !postText}
            >
              Create {postType}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}