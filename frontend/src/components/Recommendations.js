import { useState, useEffect } from 'react';
import { firestore } from '../firebaseConfig'; // Adjust the path as needed

const fetchExperiences = async () => {
  const snapshot = await firestore.collection('Experiences').get();
  return snapshot.docs.map(doc => doc.data());
};

const recommendExperiences = (userHistory, allExperiences) => {
    return allExperiences.filter(exp => userHistory.includes(exp.category));
  };

  const Recommendations = () => {
    const [experiences, setExperiences] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
  
    useEffect(() => {
      const getData = async () => {
        const allExperiences = await fetchExperiences();
        const userHistory = ['Luxury Hotel', 'Private Villa']; // Example user data
        const recommended = recommendExperiences(userHistory, allExperiences);
        setRecommendations(recommended);
      };
      getData();
    }, []);
  
    return (
      <div>
        <h2>Recommended Experiences</h2>
        {recommendations.map((exp, index) => (
          <div key={index}>
            <h3>{exp.name}</h3>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Recommendations;

  