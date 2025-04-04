const { 
    createPostDb, 
    getPostByIdDb, getAllPostsDb
} = require('../data/postData');

const { getAllPostRepliesDb } = require('../data/replyData');

const { getUserByIdDb } = require('../data/userData')


// creates a new post record in the posts table
const createPost = async (req,res) => {
    try {
        // extract file
        const image = req.file;
        let imageBuffer, imageMimeType;
        if (image) {
            imageBuffer = image.buffer;
            imageMimeType = image.mimetype;
        } else {
            imageBuffer = null;
            imageMimeType = null;
        }


        // extract user id
        const userId = req.user.id;
        //createdAt
        const createdAt = new Date().toISOString();
        // prepare the post data
        const postData = {...req.body, userId, image : imageBuffer, imageMimeType, createdAt};

        // INSERT 
        const result = await createPostDb(postData);

        // get the post id from the INSERT metadata
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
        // extract the post id from the dynamic route parameter
        const { postId } = req.params;

        // get post from db
        const post = await getPostByIdDb(postId);

        // get replies without username and user's profile photo
        const repliesWithoutUsername = await getAllPostRepliesDb(postId);

        // adding a user name and user image keys
        const replies = await Promise.all(
            repliesWithoutUsername.map(async (reply) => {
                const user = await getUserByIdDb(reply.userId);
                const userName = user.name;
                const userImage = user.image;
                return {...reply, userName, userImage};
            })
        );

        // post image 
        const postImage = post.image;
        if (postImage) {
            const base64Image = Buffer.from(post.image).toString("base64");
            post.image = `data:${post.imageMimeType};base64,${base64Image}`;
        }

        // get post user
        const user = await getUserByIdDb(post.userId);
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