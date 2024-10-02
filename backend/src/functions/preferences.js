// backend/src/functions/preferences.js

exports.updateUserPreferences = async (req, res) => {
  const { userId, preferences } = req.body;
  try {
    // User preferences are now updated directly from the frontend using Firestore.
    // This endpoint can be reserved for server-side processing or logging if needed.

    // Placeholder response
    res.status(200).send('User preferences update is now handled on the frontend.');
  } catch (error) {
    res.status(500).send(`Error in updating user preferences: ${error.message}`);
  }
};