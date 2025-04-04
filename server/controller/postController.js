const { 
    createPostDb, 
    getPostByIdDb, getAllPostsDb
} = require('../data/postData');

const { getAllPostRepliesDb } = require('../data/replyData');

const { getUserByIdDb } = require('../data/userData')


// creates a new post record in the posts table
const createPost = async (req,res) => {
    try {
        // 1) extract file
        const image = req.file;

        let imageBuffer, imageMimeType;
        // 2) if there is an image file, get the buffer and mimetype
        // set to null otherwise
        if (image) {
            imageBuffer = image.buffer;
            imageMimeType = image.mimetype;
        } else {
            imageBuffer = null;
            imageMimeType = null;
        }


        // 3) extract user id
        const userId = req.user.id;
        //4) createdAt
        const createdAt = new Date().toISOString();
        // 5) prepare the post data
        const postData = {...req.body, userId, image : imageBuffer, imageMimeType, createdAt};

        // create the record in the posts table
        const result = await createPostDb(postData);

        // 6) get the post id from the INSERT metadata
        const postId = result.insertId;

        res.status(200).json({postId});
        
    } catch (error) {
        console.error("Error creating post in db", error);
        res.status(500).json({message: "Server error"});
    }
}


// gets a post by its id from the posts table
// and its replies
const getPostById = async (req,res) => {
    try {
        // 1) extract the post id from the dynamic route parameter
        const { postId } = req.params;

        // 2) get post from db
        const post = await getPostByIdDb(postId);

        // 3) get replies without username and user's profile photo
        const repliesWithoutUsername = await getAllPostRepliesDb(postId);

        // 4) fetch the user info for each reply and 
        // add to each reply object
        const replies = await Promise.all(
            repliesWithoutUsername.map(async (reply) => {
                const user = await getUserByIdDb(reply.userId);
                const userName = user.name;
                const userImage = user.image;
                return {...reply, userName, userImage};
            })
        );

        // 6) extract post image 
        const postImage = post.image;
        // 7) if there is an image buffer, convert to base64 url string
        if (postImage) {
            const base64Image = Buffer.from(post.image).toString("base64");
            post.image = `data:${post.imageMimeType};base64,${base64Image}`;
        }

        // 8) get post user
        const user = await getUserByIdDb(post.userId);
        // 9) if there is an image buffer, convert to base64 url string
        if(user.image) {
            const base64Image = Buffer.from(user.image).toString("base64");
            user.image = `data:${user.imageMimeType};base64,${base64Image}`;
        }
        
        res.status(200).json({post, replies,user});
        
    } catch (error) {
        console.error("Error fetching post from db", error.message);
        res.status(500).json({message: "Server error"});
    }
}


// gets all posts for the channel by the channel id
const getAllPosts = async (req,res) => {
    try {
        // 1) extract channelId
        const { channelId } = req.params;
        // 2) fetch all posts for the channel from the posts table
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