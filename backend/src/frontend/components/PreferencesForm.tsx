// src/frontend/components/PreferencesForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PreferencesForm: React.FC = () => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const history = useHistory();

  const preferenceOptions = [
    'beach', 'mountain', 'city', 'countryside', 'island',
    'hiking', 'surfing', 'fine dining', 'shopping', 'sightseeing',
    'Italian', 'French', 'Asian', 'Mediterranean', 'Fusion',
    'luxury resort', 'boutique hotel', 'private villa', 'yacht',
    'relaxation', 'adventure', 'cultural', 'romantic', 'family-friendly'
  ];

  const handlePreferenceChange = (preference: string) => {
    setPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/preferences', { preferences }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      history.push('/suggestions');
    } catch (error) {
      console.error('Failed to update preferences', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Your Travel Preferences</h2>
      {preferenceOptions.map(option => (
        <label key={option}>
          <input
            type="checkbox"
            checked={preferences.includes(option)}
            onChange={() => handlePreferenceChange(option)}
          />
          {option}
        </label>
      ))}
      <button type="submit">Submit Preferences</button>
    </form>
  );
};

export default PreferencesForm;