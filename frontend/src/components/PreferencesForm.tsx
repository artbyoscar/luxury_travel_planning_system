import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PreferencesForm: React.FC = () => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const preferenceOptions = [
    'beach', 'mountain', 'city', 'countryside', 'island',
    'hiking', 'surfing', 'fine dining', 'shopping', 'sightseeing',
    'Italian', 'French', 'Asian', 'Mediterranean', 'Fusion',
    'luxury resort', 'boutique hotel', 'private villa', 'yacht',
    'relaxation', 'adventure', 'cultural', 'romantic', 'family-friendly'
  ];

  // Handle checkbox selection for preferences
  const handlePreferenceChange = (preference: string) => {
    setPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    console.log('Submitting preferences:', preferences);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const userRef = doc(db, 'Users', user.uid); // Firestore user reference
      console.log('Updating document with preferences:', preferences);
      await updateDoc(userRef, { preferences }); // Update Firestore document
      setError(null); // Clear error if successful
      navigate('/suggestions'); // Navigate after success
    } catch (error) {
      console.error('Failed to update preferences:', error);
      setError('Failed to update preferences. Please try again.');
    } finally {
      setLoading(false); // Clear loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Your Travel Preferences</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Error message display */}
      
      <fieldset>
        <legend>Travel Preferences</legend>
        {preferenceOptions.map(option => (
          <label key={option}>
            <input
              type="checkbox"
              checked={preferences.includes(option)}
              onChange={() => handlePreferenceChange(option)}
              aria-label={`Preference for ${option}`}
            />
            {option}
          </label>
        ))}
      </fieldset>
      
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Submit Preferences"}
      </button>
    </form>
  );
};

export default PreferencesForm;
