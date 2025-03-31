const mysqlPool = require('../config/mysql')


/**
 * Creates a new channel record in the db
 * @param {Object} channelData Object with the channel data with matching key names
 * @returns A promise that resolves into an object from the INSERT operation
 */
const createChannelDb = async (channelData) => {
    const {title, description, userId} = channelData;

    const query = `INSERT INTO channels (title,description,userId) VALUES (?,?,?)`;

    const [result] = await mysqlPool.execute(query, [title, description, userId]);
    return result;
}

/**
 * 
 * @returns A promise that resolves into an array of all the channel records
 */
const getAllChannelsDb = async () => {
    const query = `SELECT * FROM channels ORDER BY createdAt DESC`;

    const [channels] = await mysqlPool.execute(query);
    return channels;
}


module.exports = {
    createChannelDb, getAllChannelsDb
}