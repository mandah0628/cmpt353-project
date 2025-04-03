const mysqlPool = require('../config/mysql');


/**
 * Creates a post record in the posts table.
 * @param {Object} postData The post data with matching key names. 
 * @returns The operation metadata object from a promise that reolves into an an array.
 */
const createPostDb = async (postData) => {
    const { title, description, userId, channelId } = postData;

    const query = `INSERT INTO posts (title, description, userId, channelId) VALUES(?,?,?,?)`;

    const [result] = await mysqlPool.execute(query, [title, description, userId, channelId]);
    
    return result;
}




/**
 * Gets a post data from the posts table by its id.
 * @param {number} postId The post id.
 * @returns A promis that resolves into a post data object if record is found. Undefined in not.
 */
const getPostByIdDb = async (postId) => {
    const query =`SELECT * FROM posts WHERE id = ?`;

    // extract the post object
    const [posts] = await mysqlPool.execute(query, [postId]);

    // return the post object if record is found
    // null if no record is found
    return posts.length > 0 ? posts[0] : null;
}



/**
 * Get all posts for a channel by the channel id.
 * @param {number} channelId The channel id.
 * @returns A promise that resolves into an array of posts. If no record is found, an empty array.
 */
const getAllPostsDb = async (channelId) => {
    const query = `SELECT * FROM posts WHERE channelId = ? ORDER BY createdAt DESC`;

    const [posts] = await mysqlPool.execute(query, [channelId]);
    
    return posts;
};



module.exports = {
    createPostDb, 
    getPostByIdDb, getAllPostsDb
}