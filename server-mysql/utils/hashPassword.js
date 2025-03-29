const bcrypt = require('bcrypt');


/**
 * Hashes a password.
 * @param {String} password The unhashed password.
 * @returns A promise that resolves into a hashed password
 */
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

module.exports = hashPassword;