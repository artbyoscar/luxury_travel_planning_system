const admin = require('firebase-admin');
admin.initializeApp();

exports.createItinerary = async (req, res) => {
  const { userId, activities, destinations, startDate, endDate, totalBudget } = req.body;

  try {
    const itineraryRef = await admin.firestore().collection('Itineraries').add({
      userId,
      activities,
      destinations,
      startDate,
      endDate,
      totalBudget
    });
    res.status(200).send(`Itinerary created with ID: ${itineraryRef.id}`);
  } catch (error) {
    res.status(500).send(`Error creating itinerary: ${error.message}`);
  }
};