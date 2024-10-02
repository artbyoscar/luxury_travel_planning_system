// functions/index.js

const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendBookingConfirmation = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const bookingData = snap.data();

    if (!bookingData || !bookingData.userEmail || !bookingData.destination) {
      console.error('Invalid booking data', bookingData);
      return null;
    }

    const msg = {
      to: bookingData.userEmail,
      from: 'noreply@luxurytravel.com',
      subject: 'Booking Confirmation',
      text: `Your booking for ${bookingData.destination} is confirmed.`,
    };

    try {
      await sgMail.send(msg);
      console.log('Booking confirmation email sent to:', bookingData.userEmail);
    } catch (error) {
      console.error('Error sending email:', error);
    }
    
    return null;
  });