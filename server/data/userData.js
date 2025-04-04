const mysqlPool = require('../config/mysql');


/**
 * Creates a user record in the users table
 * @param {Object} userData 
 * @returns A promise that resolves into an object with the user data
 */
const createUserDb = async (userData) => {
    const { name, email, password } = userData;

    const query = `
        INSERT INTO users (name,email,password)
        VALUES(?,?,?) 
    `;

    const result = await mysqlPool.execute(query , [name, email, password ]);
    return result;
}


/**
 * Finds a user record by the user's email.
 * @param {String} email The user's email.
 * @returns A promise that resolves into a user object, null if record is not found.
 */
const getUserByEmail = async (email) => {
    const query  = `SELECT * FROM users WHERE email = ? LIMIT 1`;
    const [rows] = await mysqlPool.execute(query,[email]);
    
    return rows.length > 0 ? rows[0] : null;
}



/**
 * Finds the user by the user's id.
 * @param {number} userId The user id.
 * @returns A promise that resolves into the user object. null if no record is found.
 */
const getUserByIdDb = async (userId) => {
    const query = `SELECT * FROM users WHERE id= ? LIMIT 1`
    const [users] = await mysqlPool.execute(query, [userId])

    return users.length > 0 ? users[0]: null;
}



const updateUserDb = async (userId, userData) => {
    const fields = Object.keys(userData);
    const values = Object.values(userData);

    const setClause = fields.map(field => `${field} = ?`).join(', ');

    const query = `UPDATE users SET ${setClause} WHERE id = ?`;

    await mysqlPool.execute(query, [...values, userId]);
}



module.exports = { createUserDb, getUserByEmail, getUserByIdDb };