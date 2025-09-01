import React, { useState } from 'react';

const TagInput = ({ label, tags, setTags, error, minRequired }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <div>
      <label className="block mb-2 text-text-secondary">{label}</label>
      <div className={`input-styled flex flex-wrap items-center gap-2 ${error ? 'border-red-500' : ''}`}>
        {tags.map(tag => (
          <div key={tag} className="flex items-center gap-2 bg-accent-pink/50 text-white px-3 py-1 rounded-full text-sm">
            {tag}
            <button onClick={() => removeTag(tag)} className="text-white hover:text-red-300">&times;</button>
          </div>
        ))}
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="Type and press Enter..."
          className="bg-transparent flex-grow focus:outline-none"
        />
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-text-muted"
        style={{
          color: tags.length >= minRequired ? 'green' : 'red'
        }}>
          {tags.length}/{minRequired} minimum
        </span>
        {error && tags.length != minRequired  && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default TagInput;
