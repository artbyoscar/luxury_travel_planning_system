// frontend/src/components/Recommendations.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const fetchExperiences = async () => {
  const snapshot = await getDocs(collection(db, 'Experiences'));
  return snapshot.docs.map(doc => doc.data());
};

const recommendExperiences = (userPreferences, allExperiences) => {
  return allExperiences.filter(exp => 
    userPreferences.some(pref => exp.categories.includes(pref))
  );
};

const Recommendations = () => {
  const [experiences, setExperiences] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        // Fetch user preferences
        const userDoc = await getDocs(query(collection(db, 'Users'), where('uid', '==', user.uid)));
        const userPreferences = userDoc.docs[0]?.data().preferences || [];

        const allExperiences = await fetchExperiences();
        const recommended = recommendExperiences(userPreferences, allExperiences);
        setRecommendations(recommended);
      } catch (error) {
        console.error('Failed to fetch recommendations', error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h2>Recommended Experiences</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        recommendations.map((exp, index) => (
          <div key={index}>
            <h3>{exp.name}</h3>
            <p>{exp.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Recommendations;