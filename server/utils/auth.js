const jwt = require('jsonwebtoken');
const path = require ('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const secret = process.env.JWT_SECRET;
const expiration = '48h';

if (process.env.NODE_ENV === 'production' && !secret) {
    throw new Error("JWT_SECRET not set.");
}

module.exports = {
  signToken: function ({ userName, email, _id }) {
    const payload = { userName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
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
  }
};