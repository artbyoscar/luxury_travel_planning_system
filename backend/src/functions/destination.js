const admin = require('firebase-admin');
admin.initializeApp();

exports.suggestDestinations = async (req, res) => {
  const { userPreferences } = req.body;

  try {
    const snapshot = await admin.firestore().collection('Destinations').get();
    const destinations = snapshot.docs
      .map(doc => doc.data())
      .filter(dest => userPreferences.some(pref => dest.activities.includes(pref)));
    
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).send(`Error fetching destinations: ${error.message}`);
  }
};