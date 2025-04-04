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
 * Get a single channel record from the channels table.
 * @param {number} channelId The channel id.
 * @returns A promise that resolves into a channel object. null otherwise.
 */
const getChannelByIdDb = async (channelId) => {
    const query = `SELECT * FROM channels WHERE id = ?`;

    const [channel] = await mysqlPool.execute(query, [channelId]);

    return channel.length > 0 ? channel[0] : null ;
}



/**
 * Retrieves all channels from the channels table.
 * @returns A promise that resolves into an array of all the channel records
 */
const getAllChannelsDb = async () => {
    const query = `SELECT * FROM channels ORDER BY createdAt DESC`;

    const [channels] = await mysqlPool.execute(query);
    
    return channels;
}


module.exports = {
    createChannelDb, getAllChannelsDb, getChannelByIdDb
}