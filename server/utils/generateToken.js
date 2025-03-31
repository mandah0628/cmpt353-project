const jwt = require('jsonwebtoken');


/**
 * Generates a JWT that is valid for an hour.
 * @param {number} userId The user id to generate the jwt for.
 * @returns A JWT.
 */
const generateToken = (userId) => {
    const token = jwt.sign(
        { id :  userId},
        process.env.JWT_SECRET,
        { expiresIn: "1h" } 
    );

    return token;
}

module.exports = generateToken;
