// Enhanced version with environment variables

require('dotenv').config();
const nodemailer = require('nodemailer');

// Load configuration from environment variables
const config = {
    useEthereal: process.env.USE_ETHEREAL === 'true' || true,
    gmail: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    recipient: process.env.RECIPIENT_EMAIL || 'albanokoby225@gmail.com'
};
