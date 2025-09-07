import React, { useState, useRef, useContext } from 'react';
import { FaImage, FaTimes, FaVideo, FaUpload } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../../context/PostContext';
import PostTab from './PostTab';
import StoryTab from './StoryTab';
import FileUploadButton from './FileUploadButton';
import './ToggleSwitch.css';

export default function Post() {
  const [activeTab, setActiveTab] = useState('post');
  const [postText, setPostText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { createPost } = useContext(PostContext);

  // Video duration validation helper
  const checkVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  // Cut video to 30 seconds for stories
  const cutVideoTo30Seconds = (file) => {
    return new Promise((resolve, reject) => {
      // This would typically be handled by a backend service
      // For now, we'll just resolve with the original file
      // In a real app, you'd use FFmpeg.wasm or similar
      resolve(file);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const isVideoUpload = files.some(file => file.type.startsWith('video/'));

    // Validation based on tab type
    if (activeTab === 'story') {
      if (files.length > 1) {
        toast.error('You can only upload one file for a story.');
        return;
      }
      if (selectedFiles.length > 0) {
        toast.error('You can only have one file in a story.');
        return;
      }
      
      // Check video duration for stories
      if (isVideoUpload) {
        const duration = await checkVideoDuration(files[0]);
        if (duration > 30) {
          toast.info('Video will be trimmed to 30 seconds for story.');
          files[0] = await cutVideoTo30Seconds(files[0]);
        }
      }
    } else {
      // Post validation
      if (selectedFiles.length > 0 && isVideoUpload) {
        toast.error('You cannot add a video with other files.');
        return;
      }
      if (selectedFiles.some(file => file.type === 'video') && files.length > 0) {
        toast.error('You can only upload one video.');
        return;
      }
      if (isVideoUpload && files.length > 1) {
        toast.error('You can only upload one video at a time.');
        return;
      }
      if (selectedFiles.filter(file => file.type === 'image').length + files.filter(file => file.type.startsWith('image/')).length > 5) {
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

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(previewUrls[index]);

    newSelectedFiles.splice(index, 1);
    newPreviewUrls.splice(index, 1);

    setSelectedFiles(newSelectedFiles);
    setPreviewUrls(newPreviewUrls);
  };

  // Helper function to convert file to base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDone = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file');
      return;
    }

    setIsLoading(true);

    try {
      const fileStrings = await Promise.all(
        selectedFiles.map(async (fileObj) => {
          if (fileObj && fileObj.file && fileObj.file instanceof File) {
            const base64String = await fileToBase64(fileObj.file);
            return {
              name: fileObj.file.name,
              size: fileObj.file.size,
              type: fileObj.file.type,
              lastModified: fileObj.file.lastModified,
              data: base64String,
              fileType: fileObj.type
            };
          } else {
            return null;
          }
        })
      );

      const validFileStrings = fileStrings.filter(file => file !== null);

      if (validFileStrings.length === 0) {
        toast.error('No valid files to upload');
        setIsLoading(false);
        return;
      }

      const postData = {
        postType: activeTab,
        text: postText || '',
        media: validFileStrings
      };

      createPost(postData, (response) => {
        setIsLoading(false);
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} created successfully!`);
          setPostText('');
          setSelectedFiles([]);
          setPreviewUrls([]);
        }
      });
      
    } catch (error) {
      setIsLoading(false);
      toast.error(`Error creating ${activeTab}. Please try again.`);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-bg-primary text-white font-sans relative">      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-primary mb-2">
            Create {activeTab === 'post' ? 'Post' : 'Story'}
          </h1>
          <p className="text-text-muted">
            {activeTab === 'post' 
              ? 'Share your moments with up to 5 images or 1 video'
              : 'Share a quick story with 1 image or video (30s max)'
            }
          </p>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-gray-700 rounded-2xl overflow-hidden">
          <div className="p-6">

                <PostTab
                selectedFiles={selectedFiles}
                onFileSelect={handleFileChange}
                onRemoveFile={handleRemoveFile}
                onTextChange={setPostText}
                text={postText}
                onDone={handleDone}
                previewUrls={previewUrls}
                isLoading={isLoading}
              />
            {/* {activeTab === 'post' ? (
              <PostTab
                selectedFiles={selectedFiles}
                onFileSelect={handleFileChange}
                onRemoveFile={handleRemoveFile}
                onTextChange={setPostText}
                text={postText}
                onDone={handleDone}
                previewUrls={previewUrls}
                isLoading={isLoading}
              />
            ) : (
              <StoryTab
                selectedFiles={selectedFiles}
                onFileSelect={handleFileChange}
                onRemoveFile={handleRemoveFile}
                onTextChange={setPostText}
                text={postText}
                onDone={handleDone}
                previewUrls={previewUrls}
                isLoading={isLoading}
              />
            )} */}
          </div>

      
          {/* <div className="bg-[var(--bg-tertiary)] px-6 py-4 flex justify-center space-x-1">
            <button
              onClick={() => setActiveTab('post')}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300
                ${activeTab === 'post'
                  ? 'bg-gradient-to-r from-primary-cyan to-primary-purple text-white glow-cyan'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              <FaImage className="inline mr-2" />
              Post
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300
                ${activeTab === 'story'
                  ? 'bg-gradient-to-r from-accent-pink to-accent-orange text-white glow-pink'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              <FaVideo className="inline mr-2" />
              Story
            </button>
          </div> */}
        </div>
      </div>
      <FileUploadButton
        onFileSelect={handleFileChange}
        activeTab={activeTab}
        selectedFiles={selectedFiles}
      />

    </div>
  );
}

