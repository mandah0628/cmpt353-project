const mysqlPool = require('../config/mysql');

/**
 * Creates a reply record in the replies table.
 * @param {Object} replyData The reply data with matching key names.
 * @returns The INSERT operation metadata object from a promise that reolves into an an array.
 */
const createReplyDb = async (replyData) => {
   const {id, postId, userId, parentReplyId, comment, imageId} = replyData;
   const values = [id, postId, userId, parentReplyId || null, comment, imageId || null];

   const query = `INSERT INTO replies (id, postId, userId, parentReplyId, comment, imageId) VALUES(?,?,?,?,?,?)`

   const [result] = await mysqlPool.execute(query, values);
   return result;
}


/**
 * Fetches all replies from the replies table that's associated with the post id
 * @param {number} postId The post id.
 * @returns A promise that resolves into an array of replies if records are found.
 * Empty array if no records are found.
 */
const getAllPostRepliesDb = async (postId) => {
    const query = `SELETC * FROM replies WHERE postId = ? ORDER BY createdAt DESC`;
    const [replies] = await mysqlPool.execute(query, [postId] );

    return replies;
}

module.exports = {
    createReplyDb,
    getAllPostRepliesDb
}