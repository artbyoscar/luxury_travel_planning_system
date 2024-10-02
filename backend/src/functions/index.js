// functions/index.js

const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendBookingConfirmation = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate((snap, context) => {
    const bookingData = snap.data();
    
    const msg = {
      to: bookingData.userEmail,
      from: 'noreply@luxurytravel.com',
      subject: 'Booking Confirmation',
      text: `Your booking for ${bookingData.destination} is confirmed.`,
    };
    
    return sgMail.send(msg);
  });