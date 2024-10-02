const admin = require('firebase-admin');

admin.initializeApp();

exports.createBooking = async (req, res) => {
  const { userId, experienceId, bookingDate } = req.body;
  try {
    await admin.firestore().collection('Bookings').add({
      userId,
      experienceId,
      bookingDate: bookingDate || new Date(),
    });
    res.status(200).send('Booking created successfully');
  } catch (error) {
    res.status(500).send(`Error creating booking: ${error.message}`);
  }
};