import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Trash, Plus } from "lucide-react";

// Helper: format "time ago"
const formatTimeAgo = (timestamp) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000); // in seconds
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// Fake stories for testing (friends)
const storiesData = [
  {
    id: 1,
    username: "alex",
    createdAt: Date.now() - 1000 * 60 * 5, // 5 mins ago
    slides: [
      { type: "image", url: "https://picsum.photos/400/700?random=1" },
      { type: "image", url: "https://picsum.photos/400/700?random=2" }
    ]
  },
  {
    id: 2,
    username: "maria",
    createdAt: Date.now() - 1000 * 60 * 60, // 1 hour ago
    slides: [
      { type: "image", url: "https://picsum.photos/400/700?random=3" },
      { type: "image", url: "https://picsum.photos/400/700?random=4" }
    ]
  }
];

// Story Viewer
function StoryViewer({ story, onClose, onNext, onPrev, isMyStory }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  const currentSlide = story.slides[slideIndex];

  // Progress logic (disabled for my story)
  useEffect(() => {
    if (isMyStory) return;

    setProgress(0);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timerRef.current);
          handleNext();
          return 0;
        }
        return p + 2; // ~5s per slide
      });
    }, 100);

    return () => clearInterval(timerRef.current);
  }, [slideIndex, isMyStory]);

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      if (slideIndex < story.slides.length - 1) {
        setSlideIndex(slideIndex + 1);
      } else {
        onNext();
      }
      setAnimate(false);
    }, 200);
  };

  const handlePrev = () => {
    setAnimate(true);
    setTimeout(() => {
      if (slideIndex > 0) {
        setSlideIndex(slideIndex - 1);
      } else {
        onPrev();
      }
      setAnimate(false);
    }, 200);
  };

  // Tap zones
  const handleTap = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    if (y < 0.15) {
      onClose(); // top tap closes
    } else if (x < 0.5) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 p-3">
        <div className="flex gap-1 mb-2">
          {story.slides.map((_, i) => (
            <div key={i} className="flex-1 bg-gray-600 h-1 rounded overflow-hidden">
              {i < slideIndex && <div className="bg-pink-500 h-1 w-full" />}
              {i === slideIndex && !isMyStory && (
                <div
                  className="bg-pink-500 h-1"
                  style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-white">
          <p className="font-medium">
            {story.username} · {formatTimeAgo(story.createdAt)}
          </p>
          <button onClick={onClose}>✕</button>
        </div>
      </div>

      {/* Media */}
      <div
        className={`flex-1 flex items-center justify-center transition-all duration-300 ${
          animate ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleTap}
      >
        {currentSlide.type === "image" ? (
          <img
            src={currentSlide.url}
            alt=""
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <video
            src={currentSlide.url}
            autoPlay
            muted
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>

      {/* Bottom reply + like */}
      {!isMyStory && (
        <div className="p-3 border-t border-gray-700 flex items-center gap-3">
          <input
            type="text"
            placeholder="Reply..."
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm"
          />
          <button className="text-pink-500 font-bold">❤️</button>
        </div>
      )}
    </div>
  );
}

// My Stories Page
function MyStories({ myStories, onBack, onOpenStory, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black text-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-800">
        <button onClick={onBack} className="mr-3">
          <ArrowLeft />
        </button>
        <h2 className="text-lg font-semibold">My Stories</h2>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {myStories.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No stories yet.</p>
        ) : (
          myStories.map((story, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-3 border-b border-gray-800"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onOpenStory(story)}
              >
                <img
                  src={story.url}
                  alt="story"
                  className="w-14 h-14 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{story.caption || "No caption"}</p>
                  <p className="text-xs text-gray-400">
                    {formatTimeAgo(story.createdAt)} · 👁 {story.views || 0} · ❤️{" "}
                    {story.likes || 0}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("Delete this story?")) onDelete(idx);
                }}
                className="text-red-400"
              >
                <Trash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Add Story Preview
function AddStoryModal({ file, onClose, onPost }) {
  const [caption, setCaption] = useState("");
  if (!file) return null;
  const previewUrl = URL.createObjectURL(file);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-4 rounded-xl w-full max-w-sm">
        <img src={previewUrl} alt="preview" className="w-full rounded-lg mb-3" />
        <input
          type="text"
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-3 text-sm"
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onPost(previewUrl, caption)}
            className="px-4 py-2 rounded bg-pink-500 text-white"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Stories
export default function Stories() {
  const [activeStory, setActiveStory] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [showMyStories, setShowMyStories] = useState(false);
  const [myStories, setMyStories] = useState([]);
  const [addFile, setAddFile] = useState(null);

  // Auto-delete after 24h
  useEffect(() => {
    const interval = setInterval(() => {
      setMyStories((prev) =>
        prev.filter((s) => Date.now() - s.createdAt < 24 * 60 * 60 * 1000)
      );
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  const allStories = [
    ...myStories.map((s, i) => ({
      ...s,
      username: "You",
      slides: [s],
      id: `me-${i}`
    })),
    ...storiesData
  ];

  const handleDelete = (idx) => {
    setMyStories(myStories.filter((_, i) => i !== idx));
  };

  const handleAddStory = (url, caption) => {
    setMyStories([
      ...myStories,
      { url, caption, views: 0, likes: 0, type: "image", createdAt: Date.now() }
    ]);
    setAddFile(null);
  };

  return (
    <>
      {/* Stories Bar */}
      <div className="flex gap-4 overflow-x-auto p-2">
        {/* Add */}
        <label className="flex flex-col items-center cursor-pointer">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-blue-500 bg-gray-800">
            <Plus className="text-white" />
          </div>
          <p className="text-xs text-white mt-1">Add Story</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setAddFile(e.target.files[0])}
          />
        </label>

        {/* My Story */}
        {myStories.length > 0 && (
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setShowMyStories(true)}
          >
            <img
              src={myStories[0].url}
              alt="My Story"
              className="w-16 h-16 rounded-full border-2 border-green-500 object-cover"
            />
            <p className="text-xs text-white mt-1">Your Story</p>
          </div>
        )}

        {/* Others */}
        {storiesData.map((story, idx) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              setActiveStory(story);
              setStoryIndex(idx + myStories.length);
            }}
          >
            <img
              src={story.slides[0].url}
              alt={story.username}
              className="w-16 h-16 rounded-full border-2 border-pink-500 object-cover"
            />
            <p className="text-xs text-white mt-1">{story.username}</p>
          </div>
        ))}
      </div>

      {/* Viewer */}
      {activeStory && (
        <StoryViewer
          story={activeStory}
          isMyStory={activeStory.username === "You"}
          onClose={() => setActiveStory(null)}
          onNext={() => {
            if (storyIndex < allStories.length - 1) {
              setStoryIndex(storyIndex + 1);
              setActiveStory(allStories[storyIndex + 1]);
            } else {
              setActiveStory(null);
            }
          }}
          onPrev={() => {
            if (storyIndex > 0) {
              setStoryIndex(storyIndex - 1);
              setActiveStory(allStories[storyIndex - 1]);
            }
          }}
        />
      )}

      {/* My Stories Page */}
      {showMyStories && (
        <MyStories
          myStories={myStories}
          onBack={() => setShowMyStories(false)}
          onOpenStory={(s) => {
            setActiveStory({ username: "You", slides: [s], createdAt: s.createdAt });
            setShowMyStories(false);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* Add Story Modal */}
      {addFile && (
        <AddStoryModal
          file={addFile}
          onClose={() => setAddFile(null)}
          onPost={handleAddStory}
        />
      )}
    </>
  );
}
