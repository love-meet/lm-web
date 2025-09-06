import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';

export default function MediaSection({ post }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenType, setFullscreenType] = useState(null);
  const [fullscreenSrc, setFullscreenSrc] = useState('');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);

  const openFullscreen = (type, src) => {
    setFullscreenType(type);
    setFullscreenSrc(src);
    setFullscreen(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    setFullscreenSrc('');
    setFullscreenType(null);
    if (videoRef.current) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  const handleVideoPlayPause = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(percent || 0);
    }
  };

  const handleVideoSeek = (e) => {
    if (videoRef.current) {
      const rect = e.target.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  // Fullscreen modal
  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[9999]">
        <button
          className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white"
          onClick={closeFullscreen}
        >
          <X size={32} />
        </button>
        {fullscreenType === 'image' ? (
          <img src={fullscreenSrc} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
        ) : (
          <video
            src={fullscreenSrc}
            controls
            autoPlay
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        )}
      </div>
    );
  }

  // Main media
  return (
    <div className="w-full flex items-center justify-center">
      {post.media?.length > 0 && post.media[0].fileType === 'video' ? (
        <div className="relative w-full flex flex-col items-center">
          <video
            ref={videoRef}
            src={post.media[0].data}
            className="w-full max-h-[400px] rounded-lg bg-black"
            onClick={() => openFullscreen('video', post.media[0].data)}
            onTimeUpdate={handleVideoProgress}
            controls={false}
            onLoadedData={() => setVideoPlaying(false)}
          />
          {/* Custom Controls */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {!videoPlaying && (
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                className="cursor-pointer pointer-events-auto"
                onClick={e => {
                  e.stopPropagation();
                  handleVideoPlayPause();
                }}
                style={{ zIndex: 2 }}
              >
                <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.4)" />
                <polygon points="26,20 50,32 26,44" fill="#fff" />
              </svg>
            )}
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center px-4">
            <div
              className="w-full h-2 bg-gray-700 rounded cursor-pointer"
              onClick={handleVideoSeek}
            >
              <div
                className="h-2 bg-pink-500 rounded"
                style={{ width: `${videoProgress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        post.media?.length > 0 && post.media[0].fileType === 'image' && (
          <img
            src={post.media[0].data}
            alt=""
            className="w-full max-h-[400px] rounded-lg object-contain cursor-pointer"
            onClick={() => openFullscreen('image', post.media[0].data)}
          />
        )
      )}
    </div>
  );
}