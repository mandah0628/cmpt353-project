const bcrypt = require('bcrypt');


/**
 * Validate the password.
 * @param {String} hashedPassword The hashed password fetched from the db.
 * @param {String} password The password sent by the user from the login page.
 * @returns A promise that resolves into boolean value. True if password matches. False if not.
 */
const validatePassword = async (password, hashedPassword,) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = validatePassword;