import React from 'react';

const SimpleLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce2"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default SimpleLoader;
