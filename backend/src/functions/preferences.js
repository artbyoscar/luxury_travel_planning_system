const admin = require('firebase-admin');

admin.initializeApp();

exports.updateUserPreferences = async (req, res) => {
  const { userId, preferences } = req.body;
  try {
    await admin.firestore().collection('Users').doc(userId).update({ preferences });
    res.status(200).send('Preferences updated successfully');
  } catch (error) {
    res.status(500).send(`Error updating preferences: ${error.message}`);
  }
};