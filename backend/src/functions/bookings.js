// backend/src/functions/bookings.js

exports.createBooking = async (req, res) => {
  const { userId, experienceId, bookingDate } = req.body;
  try {
    // Since Firebase operations are now handled on the frontend,
    // this endpoint can be used for additional server-side processing
    // if needed in the future.

    // Placeholder response
    res.status(200).send('Booking creation is now handled on the frontend.');
  } catch (error) {
    res.status(500).send(`Error in booking process: ${error.message}`);
  }
};