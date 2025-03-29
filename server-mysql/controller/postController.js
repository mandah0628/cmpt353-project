const { 
    createPostDb, 
    getPostByIdDb, getAllPostsDb
} = require('../data/postData')

const { getAllPostRepliesDb } = require('../data/replyData')


// creates a new post record in the posts table
const createPost = async (req,res) => {
    try {
        // extract user id
        const userId = req.user.id;
        // prepare the post data
        const postData = {...req.body, userId};

        // INSERT metadata
        const result = await createPostDb(postData);

        // get the post id from the INSERT metadata
        const postId = result.insertId;

        res.status(200).json({postId});
        
    } catch (error) {
        console.error("Error creating post in db", error.message);
        res.status(500).json({message: "Server error"});
    }
}


// gets a post by its id from the posts table
// and its replies
const getPostById = async (req,res) => {
    try {
        // extract the post id from the dynamic route parameter
        const { postId } = req.params;

        const post = await getPostByIdDb(postId);

        const replies = await getAllPostRepliesDb(postId);

        res.status(200).json({post, replies});
        
    } catch (error) {
        console.error("Error fetching post from db", error.message);
        res.status(500).json({message: "Server error"});
    }
}


// gets all post for the channel by the channel id
const getAllPosts = async (req,res) => {
    try {
        const { channelId } = req.params;

        const posts = await getAllPostsDb(channelId);

        res.status(200).json({posts});

    } catch (error) {
        console.error("Error fetching post from db", error.message);
        res.status(500).json({message: "Server error"});
    }
    
}


module.exports = {
    createPost,
    getPostById, getAllPosts
}