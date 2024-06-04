const crypto = require('crypto');

// GENERATE RANDOM SECRET KEY
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = {
  secretKey: secretKey,
};
