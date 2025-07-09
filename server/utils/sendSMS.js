// Mock SMS sender utility
const sendSMS = (phone, message) => {
  // Integrate with real SMS API in production
  console.log(`SMS sent to ${phone}: ${message}`);
};

module.exports = sendSMS; 