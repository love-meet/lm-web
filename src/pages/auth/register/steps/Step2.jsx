import React, { useState, useEffect } from 'react';
import { State, City } from 'country-state-city';

const Step2 = ({ formData, setFormData }) => {
  const [countrySearch, setCountrySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCountryDropdown(false);
      setShowStateDropdown(false);
      setShowCityDropdown(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Limited to Nigeria, Ghana, and Kenya
  const allowedCountries = [
    { id: 161, name: 'Nigeria', states: [] },
    { id: 82, name: 'Ghana', states: [] },
    { id: 113, name: 'Kenya', states: [] }
  ];

  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);

  const filteredCountries = allowedCountries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredStates = availableStates.filter(state =>
    state.name.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredCities = availableCities.filter(city =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCountrySelect = async (country) => {
    setFormData(prev => ({ ...prev, country: country.name, state: '', city: '' }));
    setCountrySearch(country.name);
    setStateSearch('');
    setCitySearch('');
    setShowCountryDropdown(false);
    setShowStateDropdown(false);
    setShowCityDropdown(false);
    
    // Get states for selected country
    const countryCode = country.name === 'Nigeria' ? 'NG' : country.name === 'Ghana' ? 'GH' : 'KE';
    const states = State.getStatesOfCountry(countryCode);
    setAvailableStates(states.map(s => ({ id: s.isoCode, name: s.name })));
  };

  const handleStateSelect = (state) => {
    setFormData(prev => ({ ...prev, state: state.name, city: '' }));
    setStateSearch(state.name);
    setCitySearch('');
    setShowStateDropdown(false);
    setShowCityDropdown(false);

    // Get cities for selected state
    const countryCode = formData.country === 'Nigeria' ? 'NG' : formData.country === 'Ghana' ? 'GH' : 'KE';
    const cities = City.getCitiesOfState(countryCode, state.id);
    setAvailableCities(cities.map(c => ({ id: c.name, name: c.name })));
  };

  const handleCitySelect = (city) => {
    setFormData(prev => ({ ...prev, city: city.name }));
    setCitySearch(city.name);
    setShowCityDropdown(false);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-white">🌍 Where Are You? 🌍</h2>
      <p className="text-text-muted text-center mb-6">Help us connect you with amazing people nearby! 🗺️</p>
      
      <div className="space-y-4">
        {/* Country Dropdown */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <label className="block mb-2 text-text-secondary">Country</label>
          <input
            type="text"
            value={countrySearch}
            onChange={(e) => {
              setCountrySearch(e.target.value);
              setShowCountryDropdown(true);
            }}
            onFocus={() => setShowCountryDropdown(true)}
            placeholder="Type to search countries..."
            className="input-styled w-full"
          />
          {showCountryDropdown && filteredCountries.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredCountries.map(country => (
                <div
                  key={country.id}
                  onClick={() => handleCountrySelect(country)}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                >
                  {country.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* State Dropdown */}
        {formData.country && (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <label className="block mb-2 text-text-secondary">State</label>
            <input
              type="text"
              value={stateSearch}
              onChange={(e) => {
                setStateSearch(e.target.value);
                setShowStateDropdown(true);
              }}
              onFocus={() => setShowStateDropdown(true)}
              placeholder="Type to search states..."
              className="input-styled w-full"
            />
            {showStateDropdown && filteredStates.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredStates.map(state => (
                  <div
                    key={state.id}
                    onClick={() => handleStateSelect(state)}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                  >
                    {state.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* City Dropdown */}
        {formData.state && (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <label className="block mb-2 text-text-secondary">City</label>
            <input
              type="text"
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setShowCityDropdown(true);
              }}
              onFocus={() => setShowCityDropdown(true)}
              placeholder="Type to search cities..."
              className="input-styled w-full"
            />
            {showCityDropdown && filteredCities.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredCities.map(city => (
                  <div
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;
