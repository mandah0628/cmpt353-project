const mysqlPool = require('../config/mysql');

/**
 * Creates a reply record in the replies table.
 * @param {Object} replyData The reply data with matching key names.
 * @returns The INSERT operation metadata object from a promise that reolves into an an array.
 */
const createReplyDb = async (replyData) => {
   const {id, postId, userId, parentReplyId, comment, imageUrl} = replyData;
   const values = [id, postId, userId, parentReplyId || null, comment, imageUrl || null];

   const query = `INSERT INTO replies (id, postId, userId, parentReplyId, comment, imageUrl) VALUES(?,?,?,?,?,?)`

   const [result] = await mysqlPool.execute(query, values);
   return result;
}


const createImageDb = async (params) => {
    
}

module.exports = {
    createReplyDb,

}