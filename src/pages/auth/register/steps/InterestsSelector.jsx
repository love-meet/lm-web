import React, { useState, useEffect } from 'react';
import { Heart, Plus, X } from 'lucide-react';

const InterestsSelector = ({ label, selectedItems, onSelect, error }) => {
  const [customItem, setCustomItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const predefinedItems = [
    'Long-term partner', 'Short-term fun', 'Friends with benefits', 'Casual dating', 'Marriage', 'Hookups'
  ].filter((item, index, self) => self.indexOf(item) === index);

  const handleItemToggle = (item) => {
    // If the item is already selected, deselect it. Otherwise, select only this item.
    const newItems = selectedItems.includes(item) ? [] : [item];
    onSelect(newItems);
  };

  const handleAddCustomItem = () => {
    if (customItem.trim()) { // No need to check if already included, as it will replace
      onSelect([customItem.trim()]); // Select only the custom item
      setCustomItem('');
      setIsAdding(false);
    }
  };

  const handleRemoveItem = (item) => {
    onSelect(selectedItems.filter(i => i !== item));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-text-secondary">{label}</label>
        <span className={`text-xs ${selectedItems.length > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {selectedItems.length} selected
        </span>
      </div>
      
      {error && selectedItems.length === 0 && (
        <p className="text-red-400 text-sm -mt-2">{error}</p>
      )}

      {/* Selected Items */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-[var(--accent-pink)]/20 border border-[var(--accent-pink)]/30 rounded-full px-3 py-1.5"
            >
              <span className="text-sm">{item}</span>
              <button
                onClick={() => handleRemoveItem(item)}
                className="text-[var(--accent-pink)] hover:text-white ml-1"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Custom Item */}
      <div className="flex items-center gap-2">
        {isAdding ? (
          <>
            <input
              type="text"
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomItem()}
              placeholder="Add custom interest..."
              className="flex-1 input-styled"
              autoFocus
            />
            <button
              onClick={handleAddCustomItem}
              className="bg-[var(--accent-pink)] text-white p-2 rounded-lg hover:bg-[var(--accent-pink)]/80 transition-colors"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setCustomItem('');
              }}
              className="text-text-muted hover:text-white p-2"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 text-[var(--accent-pink)] hover:text-[var(--accent-pink)]/80 text-sm"
          >
            <Plus size={16} />
            <span>Add custom</span>
          </button>
        )}
      </div>

      {/* Predefined Items */}
      <div className="mt-4">
        <h4 className="text-text-secondary text-sm mb-2">Popular choices:</h4>
        <div className="flex flex-wrap gap-2">
          {predefinedItems
            .filter(item => !selectedItems.includes(item))
            .slice(0, 15)
            .map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemToggle(item)}
                className="px-3 py-1.5 text-sm rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--accent-pink)]/20 hover:border-[var(--accent-pink)]/50 border border-white/10 transition-colors"
              >
                {item}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InterestsSelector;
