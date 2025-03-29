const jwt = require('jsonwebtoken');

/**
 * Validates a JWT's authenticity.
 * @param {Object} token The encrypted JWT.
 * @returns The decoded payload if JWT is valid.
 * Null if not valid.
 */
const verifyToken = (token) => {
    try {
      // verify the token authenticity
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;

    } catch (error) {
      return null;
    }
}

module.exports = verifyToken;