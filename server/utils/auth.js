const jwt = require('jsonwebtoken');
const path = require ('path')
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const secret = process.env.JWT_SECRET;
const expiration = '48h';
const resetPasswordExpiration = '1h';

if (process.env.NODE_ENV === 'production' && !secret) {
    throw new Error("JWT_SECRET not set.");
}

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD
  }
});

module.exports = {
  signToken: function ({ userName, email, _id }) {
    const payload = { userName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  signNewPasswordToken: function ({ email }) {
    const payload = { email };
    return jwt.sign({ data: payload }, secret, { expiresIn: resetPasswordExpiration });
  },
  authMiddleware: function ({req}) { 
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        return req;
    }

    try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    } catch {
    console.log('Invalid token');
    }
    return req;
  },
  sendEmail: async function (email, link) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `Click on this link to reset your password: ${link}`
    };

    await transporter.sendMail(mailOptions);
  }
};