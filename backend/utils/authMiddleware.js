const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwtConfig.js');

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized : token tidak ada!' });
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized : format token salah' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden : Invalid token!' });
    }
    req.user = user;
    next();
  });
};

// REFRESH TOKEN
// const verifyToken = (token) => {
//   return jwt.verify(token, secretKey);
// };

module.exports = { authenticateToken };
