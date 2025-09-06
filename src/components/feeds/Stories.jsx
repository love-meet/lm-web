import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trash, Plus, Send } from "lucide-react";


// Helper: format "time ago"
const formatTimeAgo = (timestamp) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// Fake stories for testing
const storiesData = [
  {
    id: 1,
    username: "alex",
    createdAt: Date.now() - 1000 * 60 * 5,
    slides: [
      { type: "image", url: "https://picsum.photos/400/700?random=1", caption: "Chillin' outside" },
      { type: "image", url: "https://picsum.photos/400/700?random=2", caption: "Another shot" }
    ]
  },
  {
    id: 2,
    username: "maria",
    createdAt: Date.now() - 1000 * 60 * 60,
    slides: [
      { type: "image", url: "https://picsum.photos/400/700?random=3", caption: "Coffee time" },
      { type: "image", url: "https://picsum.photos/400/700?random=4", caption: "Evening vibes" }
    ]
  }
];

// Reply Sent Modal
function ReplySentModal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded-full text-sm z-50"
    >
      Reply Sent!
    </motion.div>
  );
}

// Story Viewer
function StoryViewer({ story, onClose, onNext, onPrev, onNextFriend, isMyStory, onReplySent }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reply, setReply] = useState("");
  const replyInputRef = useRef(null);
 const [liked, setLiked] = useState(false);
 const [likeMessage, setLikeMessage] = useState("");


  const currentSlide = story.slides?.[slideIndex];

  useEffect(() => {
    if (isMyStory) return;
    setProgress(0);
    clearInterval(timerRef.current);

    if (!paused) {
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(timerRef.current);
            handleNext();
            return 0;
          }
          return p + 2;
        });
      }, 100);
    }

    return () => clearInterval(timerRef.current);
  }, [slideIndex, isMyStory, paused]);

  const handleNext = () => {
    if (story.slides && slideIndex < story.slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else {
      onPrev();
    }
  };

  const handleSendReply = () => {
    if (reply.trim()) {
      onReplySent();
      setReply("");
    }
  };

const handleLikeToggle = () => {
  setLiked(!liked);
};

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top progress + header */}
      <div className="absolute top-0 left-0 right-0 p-3">
        <div className="flex gap-1 mb-2">
          {story.slides?.map((_, i) => (
            <div key={i} className="flex-1 bg-gray-600 h-1 rounded overflow-hidden">
              {i < slideIndex && <div className="bg-pink-500 h-1 w-full" />}
              {i === slideIndex && !isMyStory && (
                <motion.div
                  className="bg-pink-500 h-1"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-white">
          <p className="font-medium">
            {story.username} · {formatTimeAgo(story.createdAt)}
          </p>
          <div className="flex items-center gap-3">
            {!isMyStory && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onNextFriend}
                className="px-3 py-1 bg-pink-600 text-sm rounded-lg"
              >
                Next post →
              </motion.button>
            )}
            <motion.button whileTap={{ scale: 0.8 }} onClick={onClose} className="text-lg">
              ✕
            </motion.button>
          </div>
        </div>
      </div>

      {/* Media Section */}
<motion.div
  className="flex-1 flex flex-col items-center justify-center w-full h-full"
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  onDragEnd={(e, info) => {
    if (info.offset.y < -50) {
      replyInputRef.current?.focus();
    } else if (info.offset.x < -100) {
      handleNext();
    } else if (info.offset.x > 100) {
      handlePrev();
    }
  }}
  onMouseDown={() => !paused && setPaused(true)}
  onMouseUp={() => setPaused(false)}
  onTouchStart={() => !paused && setPaused(true)}
  onTouchEnd={() => setPaused(false)}
>
  <AnimatePresence mode="wait">
    {currentSlide?.type === "image" ? (
      <motion.img
        key={currentSlide.url}
        src={currentSlide?.url || "/assets/default.jpg"}
        alt=""
        className="max-h-[70vh] w-full object-contain"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    ) : currentSlide?.type === "video" ? (
      <motion.video
        key={currentSlide.url}
        src={currentSlide?.url}
        autoPlay
        muted
        playsInline
        className="max-h-[70vh] w-full object-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    ) : (
      <p className="text-white">No content</p>
    )}
  </AnimatePresence>

  {/* Caption BELOW the image */}
  {currentSlide?.caption && (
    <motion.p
      className="mt-4 px-4 text-white text-lg italic text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {currentSlide.caption}
    </motion.p>
  )}
</motion.div>

      {/* Bottom UI */}
      <div className="absolute bottom-20 left-0 right-0">
        {/* Caption Bar (moved higher for visibility) */}
        {currentSlide?.caption && (
          <motion.div
            className="absolute left-0 right-0 bottom-36 px-4 py-3 text-white text-lg italic bg-gradient-to-t from-black/70 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentSlide.caption}
          </motion.div>
        )}

        {/* Reply Bar */}
        {!isMyStory && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-700 flex items-center gap-2 bg-black"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <input
              ref={replyInputRef}
              type="text"
              placeholder="Reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-full text-sm focus:outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSendReply}
              className="text-blue-400"
            >
              <Send size={20} />
            </motion.button>
            <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLikeToggle}
            className={`font-bold ${liked ? 'text-pink-500' : 'text-white'}`}
          >
            {liked ? '❤️' : '🤍'}
          </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
    

  );}

// Delete Modal
function DeleteModal({ onCancel, onConfirm }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 p-6 rounded-xl text-white max-w-sm w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-lg font-semibold mb-4">Delete Story?</h2>
        <p className="text-gray-400 mb-6">This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-700"
          >
            Cancel
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// My Stories Page
function MyStories({ myStories, onBack, onOpenStory, onDelete }) {
  const [showDelete, setShowDelete] = useState(null);

  return (
    <motion.div
      className="fixed inset-0 bg-black text-white z-50 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="flex items-center p-3 border-b border-gray-800">
        <motion.button whileTap={{ scale: 0.8 }} onClick={onBack} className="mr-3">
          <ArrowLeft />
        </motion.button>
        <h2 className="text-lg font-semibold">My Stories</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {myStories.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No stories yet.</p>
        ) : (
          myStories.map((story, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-between px-4 py-3 border-b border-gray-800"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onOpenStory(story)}
              >
                <img
                  src={story.slides?.[0]?.url || "/assets/default.jpg"}
                  alt="story"
                  className="w-14 h-14 rounded object-cover"
                />
                <div>
                  <p className="text-xs text-gray-400">
                    {formatTimeAgo(story.createdAt)} · 👁 {story.views || 0} · ❤️ {story.likes || 0}
                  </p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => setShowDelete(idx)}
                className="text-red-400"
              >
                <Trash />
              </motion.button>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {showDelete !== null && (
          <DeleteModal
            onCancel={() => setShowDelete(null)}
            onConfirm={() => {
              onDelete(showDelete);
              setShowDelete(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Add Story Preview
function AddStoryModal({ file, onClose, onPost }) {
  const [caption, setCaption] = useState("");
  if (!file) return null;
  const previewUrl = URL.createObjectURL(file);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header (tools removed) */}
      <div className="flex justify-between items-center p-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="text-white">
          <ArrowLeft size={24} />
        </motion.button>
      </div>

      {/* Main image preview */}
      <div className="flex-1 flex items-center justify-center p-2">
        <motion.img
          src={previewUrl}
          alt="preview"
          className="w-full h-full object-contain"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

{/* Footer with caption input and post button */}
<div className="absolute bottom-20 left-0 right-0 p-4 flex items-center gap-2 bg-black/50">
  <input
    type="text"
    placeholder="Add a caption..."
    value={caption}
    onChange={(e) => setCaption(e.target.value)}
    className="flex-1 bg-gray-800 text-white p-3 rounded-full text-sm placeholder-gray-400 focus:outline-none"
  />
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={() => onPost(previewUrl, caption)}
    className="bg-pink-500 text-white p-3 rounded-full"
  >
    <Send size={20} />
  </motion.button>
</div>
    </motion.div>
  );
}

// Main Stories
export default function Stories() {
  const [activeStory, setActiveStory] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [showMyStories, setShowMyStories] = useState(false);
  const [myStories, setMyStories] = useState(() => {
    const saved = localStorage.getItem("myStories");
    return saved ? JSON.parse(saved) : [];
  });
  const [addFile, setAddFile] = useState(null);
  const [replySent, setReplySent] = useState(false);

  useEffect(() => {
    localStorage.setItem("myStories", JSON.stringify(myStories));
  }, [myStories]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMyStories((prev) => prev.filter((s) => Date.now() - s.createdAt < 24 * 60 * 60 * 1000));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (replySent) {
      const timer = setTimeout(() => {
        setReplySent(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [replySent]);

  const allStories = [
    ...myStories.map((s, i) => ({ ...s, username: "You", id: `me-${i}` })),
    ...storiesData
  ];

  const handleDelete = (idx) => {
    setMyStories(myStories.filter((_, i) => i !== idx));
  };

  const handleAddStory = (url, caption) => {
    setMyStories([
      ...myStories,
      { slides: [{ url, caption, type: "image" }], views: 0, likes: 0, createdAt: Date.now() }
    ]);
    setAddFile(null);
  };

  const handleOpenStory = (story, idx) => {
    setActiveStory(story);
    setStoryIndex(idx);
  };

  const handleNextStory = () => {
    if (storyIndex < allStories.length - 1) {
      const nextIndex = storyIndex + 1;
      setStoryIndex(nextIndex);
      setActiveStory(allStories[nextIndex]);
    } else {
      setActiveStory(null);
    }
  };

  const handlePrevStory = () => {
    if (storyIndex > 0) {
      const prevIndex = storyIndex - 1;
      setStoryIndex(prevIndex);
      setActiveStory(allStories[prevIndex]);
    }
  };

  return (
    <>
      <div className="flex gap-4 overflow-x-auto p-2">
        <label className="flex flex-col items-center cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-blue-500 bg-gray-800"
          >
            <Plus className="text-white" />
          </motion.div>
          <p className="text-xs text-white mt-1">Add Story</p>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setAddFile(e.target.files[0])} />
        </label>

        {myStories.length > 0 && (
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMyStories(true)}
          >
            <img
              src={myStories[0].slides?.[0]?.url || "/assets/default.jpg"}
              alt="My Story"
              className="w-16 h-16 rounded-full border-2 border-green-500 object-cover"
            />
            <p className="text-xs text-white mt-1">Your Story</p>
          </motion.div>
        )}

        {storiesData.map((story, idx) => (
          <motion.div
            key={story.id}
            className="flex flex-col items-center cursor-pointer"
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOpenStory(story, idx + myStories.length)}
          >
            <img
              src={story.slides?.[0]?.url || "/assets/default.jpg"}
              alt={story.username}
              className="w-16 h-16 rounded-full border-2 border-pink-500 object-cover"
            />
            <p className="text-xs text-white mt-1">{story.username}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeStory && (
          <StoryViewer
            story={activeStory}
            isMyStory={activeStory.username === "You"}
            onClose={() => setActiveStory(null)}
            onNext={handleNextStory}
            onPrev={handlePrevStory}
            onNextFriend={() => {
              let nextFriendIndex = allStories.findIndex(
                (s, i) => i > storyIndex && s.username !== activeStory.username
              );
              if (nextFriendIndex !== -1) {
                setStoryIndex(nextFriendIndex);
                setActiveStory(allStories[nextFriendIndex]);
              } else {
                setActiveStory(null);
              }
            }}
            onReplySent={() => setReplySent(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMyStories && (
          <MyStories
            myStories={myStories}
            onBack={() => setShowMyStories(false)}
            onOpenStory={(s) => {
              const myStoryIndex = allStories.findIndex(story => story.id === s.id);
              handleOpenStory(s, myStoryIndex);
              setShowMyStories(false);
            }}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addFile && (
          <AddStoryModal file={addFile} onClose={() => setAddFile(null)} onPost={handleAddStory} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {replySent && <ReplySentModal />}
      </AnimatePresence>
    </>
  );
}