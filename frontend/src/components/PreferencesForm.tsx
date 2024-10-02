// frontend/src/components/PreferencesForm.tsx
import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
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
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const userRef = doc(db, 'Users', user.uid);
      await updateDoc(userRef, { preferences });
      history.push('/suggestions');
    } catch (error) {
      console.error('Failed to update preferences', error);
      alert('Failed to update preferences. Please try again.');
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