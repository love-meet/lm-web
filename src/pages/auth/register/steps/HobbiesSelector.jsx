import React, { useState, useEffect } from 'react';
import { Heart, Plus, X } from 'lucide-react';

const HobbiesSelector = ({ label, selectedItems, onSelect, minRequired, error }) => {
  const [customItem, setCustomItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const predefinedItems = [
    'Travel', 'Music', 'Movies', 'Reading', 'Sports', 'Cooking', 'Dancing', 'Art',
    'Photography', 'Gaming', 'Fitness', 'Yoga', 'Hiking', 'Swimming', 'Running',
    'Cycling', 'Food & Dining', 'Wine Tasting', 'Coffee', 'Books', 'Writing',
    'Technology', 'Programming', 'Design', 'Fashion', 'Shopping', 'Traveling',
    'Adventure', 'Nature', 'Camping', 'Fishing', 'Skiing', 'Snowboarding',
    'Surfing', 'Diving', 'Skateboarding', 'Basketball', 'Soccer', 'Tennis',
    'Golf', 'Baseball', 'Volleyball', 'Badminton', 'Table Tennis', 'Chess',
    'Board Games', 'Card Games', 'Puzzles', 'Drawing', 'Painting', 'Sculpting',
    'Pottery', 'Knitting', 'Sewing', 'DIY', 'Gardening', 'Fishing', 'Hunting',
    'Bird Watching', 'Stargazing', 'Astronomy', 'Astrology', 'Psychology',
    'Philosophy', 'History', 'Politics', 'Economics', 'Business', 'Finance',
    'Investing', 'Cryptocurrency', 'Blockchain', 'AI', 'Machine Learning',
    'Data Science', 'Robotics', 'Drones', 'RC Cars', 'Model Building',
    'Collecting', 'Antiques', 'Vintage', 'Cars', 'Motorcycles', 'Bicycles',
    'Scooters', 'Skateboards', 'Roller Skates', 'Ice Skating', 'Hockey',
    'Figure Skating', 'Gymnastics', 'Martial Arts', 'Boxing', 'Wrestling',
    'MMA', 'Judo', 'Karate', 'Taekwondo', 'Kung Fu', 'Aikido', 'Jiu-Jitsu',
    'Krav Maga', 'Kickboxing', 'Muay Thai', 'Capoeira', 'Fencing', 'Archery',
    'Shooting', 'Horseback Riding', 'Polo', 'Golf', 'Tennis', 'Badminton',
    'Table Tennis', 'Squash', 'Racquetball', 'Lacrosse', 'Rugby', 'Football',
    'American Football', 'Cricket', 'Baseball', 'Softball', 'Volleyball',
    'Beach Volleyball', 'Handball', 'Water Polo', 'Swimming', 'Diving',
    'Synchronized Swimming', 'Water Aerobics', 'Water Polo', 'Canoeing',
    'Kayaking', 'Rowing', 'Sailing', 'Windsurfing', 'Kitesurfing', 'Surfing',
    'Bodyboarding', 'Stand Up Paddling', 'Wakeboarding', 'Water Skiing',
    'Jet Skiing', 'Scuba Diving', 'Snorkeling', 'Free Diving', 'Spearfishing',
    'Fishing', 'Sailing', 'Yachting', 'Boating', 'Kayaking', 'Canoeing',
    'Rafting', 'Stand Up Paddling', 'Kitesurfing', 'Windsurfing', 'Surfing',
    'Bodyboarding', 'Wakeboarding', 'Water Skiing', 'Jet Skiing', 'Scuba Diving',
    'Snorkeling', 'Free Diving', 'Spearfishing', 'Fishing', 'Sailing',
    'Yachting', 'Boating', 'Kayaking', 'Canoeing', 'Rafting', 'Hiking',
    'Backpacking', 'Camping', 'Rock Climbing', 'Mountain Climbing',
    'Mountaineering', 'Bouldering', 'Ice Climbing', 'Canyoneering', 'Caving',
    'Spelunking', 'Horseback Riding', 'Trail Running', 'Orienteering',
    'Geocaching', 'Bird Watching', 'Wildlife Watching', 'Stargazing',
    'Astronomy', 'Astrophotography', 'Meteorology', 'Storm Chasing',
    'Ghost Hunting', 'Paranormal Investigation', 'Urban Exploration',
    'Graffiti', 'Street Art', 'Photography', 'Videography', 'Filmmaking',
    'Animation', '3D Modeling', '3D Printing', 'Laser Cutting', 'CNC Machining',
    'Woodworking', 'Metalworking', 'Blacksmithing', 'Jewelry Making',
    'Glass Blowing', 'Pottery', 'Ceramics', 'Sculpting', 'Painting', 'Drawing',
    'Sketching', 'Illustration', 'Graphic Design', 'Web Design', 'UI/UX Design',
    'Game Design', 'Level Design', 'Character Design', 'Concept Art',
    'Digital Art', 'Pixel Art', 'Vector Art', 'Calligraphy', 'Hand Lettering',
    'Typography', 'Printmaking', 'Bookbinding', 'Paper Crafts', 'Origami',
    'Quilling', 'Scrapbooking', 'Card Making', 'Junk Journaling', 'Bullet Journaling',
    'Handwriting', 'Fountain Pens', 'Calligraphy', 'Hand Lettering', 'Drawing',
    'Sketching', 'Painting', 'Watercolor', 'Acrylic', 'Oil Painting',
    'Gouache', 'Tempera', 'Encaustic', 'Fresco', 'Mural', 'Graffiti',
    'Street Art', 'Stencil Art', 'Sticker Art', 'Wheatpasting', 'Mosaic',
    'Collage', 'Assemblage', 'Installation Art', 'Performance Art',
    'Conceptual Art', 'Digital Art', '3D Art', 'NFT Art', 'Generative Art',
    'Algorithmic Art', 'Fractal Art', 'Data Visualization', 'Information Design',
    'Infographic Design', 'Motion Graphics', 'Animation', '2D Animation',
    '3D Animation', 'Stop Motion', 'Claymation', 'Puppetry', 'Masks',
    'Costume Design', 'Fashion Design', 'Sewing', 'Knitting', 'Crocheting',
    'Embroidery', 'Cross Stitch', 'Needlepoint', 'Quilting', 'Felting',
    'Spinning', 'Weaving', 'Basketry', 'Leatherworking', 'Bookbinding',
    'Paper Making', 'Printmaking', 'Screen Printing', 'Block Printing',
    'Letterpress', 'Etching', 'Engraving', 'Woodcut', 'Linocut', 'Monotype',
    'Collagraph', 'Photogravure', 'Cyanotype', 'Gum Bichromate', 'Platinum Palladium',
    'Albumen', 'Salted Paper', 'Van Dyke Brown', 'Kallitype', 'Ziatype',
    'Argyrotype', 'Chrysotype', 'Mordancage', 'Bromoil', 'Carbon Print',
    'Gum Print', 'Oil Print', 'Carbro', 'Bromoil Transfer', 'Gum Bichromate',
    'Platinum Palladium', 'Albumen', 'Salted Paper', 'Van Dyke Brown',
    'Kallitype', 'Ziatype', 'Argyrotype', 'Chrysotype', 'Mordancage',
    'Bromoil', 'Carbon Print', 'Gum Print', 'Oil Print', 'Carbro',
    'Bromoil Transfer', 'Gum Bichromate', 'Platinum Palladium', 'Albumen',
    'Salted Paper', 'Van Dyke Brown', 'Kallitype', 'Ziatype', 'Argyrotype',
    'Chrysotype', 'Mordancage', 'Bromoil', 'Carbon Print', 'Gum Print',
    'Oil Print', 'Carbro', 'Bromoil Transfer', 'Gum Bichromate',
    'Platinum Palladium', 'Albumen', 'Salted Paper', 'Van Dyke Brown',
    'Kallitype', 'Ziatype', 'Argyrotype', 'Chrysotype', 'Mordancage',
    'Bromoil', 'Carbon Print', 'Gum Print', 'Oil Print', 'Carbro',
    'Bromoil Transfer', 'Gum Bichromate', 'Platinum Palladium', 'Albumen',
    'Salted Paper', 'Van Dyke Brown', 'Kallitype', 'Ziatype', 'Argyrotype',
    'Chrysotype', 'Mordancage', 'Bromoil', 'Carbon Print', 'Gum Print',
    'Oil Print', 'Carbro', 'Bromoil Transfer', 'Gum Bichromate',
    'Platinum Palladium', 'Albumen', 'Salted Paper', 'Van Dyke Brown',
    'Kallitype', 'Ziatype', 'Argyrotype', 'Chrysotype', 'Mordancage',
    'Bromoil', 'Carbon Print', 'Gum Print', 'Oil Print', 'Carbro',
    'Bromoil Transfer'
  ].filter((item, index, self) => self.indexOf(item) === index);

  const handleItemToggle = (item) => {
    const newItems = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];
    onSelect(newItems);
  };

  const handleAddCustomItem = () => {
    if (customItem.trim() && !selectedItems.includes(customItem.trim())) {
      onSelect([...selectedItems, customItem.trim()]);
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
        <span className={`text-xs ${selectedItems.length >= minRequired ? 'text-green-400' : 'text-red-400'}`}>
          {selectedItems.length}/{minRequired} selected
        </span>
      </div>
      
      {error && selectedItems.length < minRequired && (
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

export default HobbiesSelector;
