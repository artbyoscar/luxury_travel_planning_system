import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PreferencesForm: React.FC = () => {
  const [preferences, setPreferences] = useState<string[]>([]); // Array to hold selected preferences
  const [loading, setLoading] = useState<boolean>(false); // Tracks form submission status
  const [error, setError] = useState<string | null>(null); // Stores any error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message for the user
  const [validationError, setValidationError] = useState<string | null>(null); // Validation error message
  const navigate = useNavigate(); // Hook to navigate to other routes

  // Define travel preferences options
  const preferenceOptions = [
    'beach', 'mountain', 'city', 'countryside', 'island',
    'hiking', 'surfing', 'fine dining', 'shopping', 'sightseeing',
    'Italian', 'French', 'Asian', 'Mediterranean', 'Fusion',
    'luxury resort', 'boutique hotel', 'private villa', 'yacht',
    'relaxation', 'adventure', 'cultural', 'romantic', 'family-friendly'
  ];

  // Effect to track and log preferences changes
  useEffect(() => {
    console.log('Preferences updated:', preferences); // Logs the latest preferences state whenever preferences change
  }, [preferences]); // Dependencies ensure this runs whenever preferences array is updated

  // Handles checkbox selections and toggles the state for the selected preference
  const handlePreferenceChange = (preference: string) => {
    setPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference) // Remove preference if already selected
        : [...prev, preference] // Add preference if not already selected
    );
    setValidationError(null); // Clear validation error on user interaction
  };

  // Validation function to check if at least one preference is selected
  const validatePreferences = () => {
    if (preferences.length === 0) {
      setValidationError('Please select at least one preference before submitting.'); // Set validation error message
      return false; // Validation failed
    }
    return true; // Validation passed
  };

  // Handles form submission to save the preferences in Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior (e.g., page reload)
    setLoading(true); // Set loading state to true during the submission
    setError(null); // Clear any previous error
    setSuccessMessage(null); // Clear previous success message

    // Validate preferences before submission
    if (!validatePreferences()) {
      setLoading(false);
      return; // Exit if validation fails
    }

    try {
      // Check if the user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated'); // Throw error if user is not authenticated
      }

      // Reference to the Firestore document for the user
      const userRef = doc(db, 'Users', user.uid);
      console.log('Submitting preferences:', preferences); // Debugging log for submitted preferences

      // Update Firestore document with the selected preferences
      await updateDoc(userRef, { preferences });
      console.log('Document updated successfully'); // Debugging log for successful update

      // Set success message to inform the user of successful update
      setSuccessMessage('Preferences saved successfully!');

      // Optional: navigate to suggestions page after successful update (delayed for user feedback)
      setTimeout(() => {
        navigate('/suggestions');
      }, 1500); // Delay to allow user to see the success message

    } catch (error) {
      console.error('Failed to update preferences:', error); // Log error in console
      setError('Failed to update preferences. Please try again.'); // Set error message to display in UI
    } finally {
      setLoading(false); // Ensure the loading state is reset after completion
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Your Travel Preferences</h2>

      {/* Display success message if preferences were saved */}
      {successMessage && <div className="success-message" style={{ color: 'green' }}>{successMessage}</div>}

      {/* Display error message if there's any */}
      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

      {/* Display validation error if no preferences selected */}
      {validationError && <div className="validation-error" style={{ color: 'orange' }}>{validationError}</div>}

      <fieldset>
        <legend>Travel Preferences</legend>
        {/* Map through preference options and create a checkbox for each */}
        {preferenceOptions.map(option => (
          <label key={option}>
            <input
              type="checkbox"
              checked={preferences.includes(option)} // Checks if the option is in preferences array
              onChange={() => handlePreferenceChange(option)} // Calls the change handler for each checkbox
              aria-label={`Preference for ${option}`} // Accessibility: label for screen readers
            />
            {option} {/* Render the label text for each checkbox */}
          </label>
        ))}
      </fieldset>
      
      {/* Submit button, disabled when loading */}
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Submit Preferences"} {/* Conditional text depending on loading state */}
      </button>

      {/* Optional: Cancel button for UX improvement */}
      <button 
        type="button" 
        onClick={() => navigate('/')} 
        disabled={loading} 
        style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </form>
  );
};

export default PreferencesForm;
