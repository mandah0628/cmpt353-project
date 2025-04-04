const {
    createReplyDb,
    getAllPostRepliesDb
} = require('../data/replyData');

const { getUserByIdDb } = require('../data/userData');



// creates a reply record in the 'replies' table
const createReply = async (req,res) => {
    try {
        // 1) extract data
        const userId = req.user.id;
        const image = req.file;

        // 3) if there is an image file, get the binary data and mimetype
        const imageBuffer = image ? image.buffer : null;
        const imageMimeType = image ? image.mimetype : null;
        const parentReplyId = req.body.parentReplyId ? req.body.parentReplyId : null;

        // 4) createdAt
        const createdAt = new Date().toISOString();

        // 5) prepare reply data
        const replyData = {...req.body , image : imageBuffer, userId, imageMimeType, parentReplyId, createdAt};

        // 6) create reply record in the replies table
        await createReplyDb(replyData);
    
        res.status(200).send("OK");
        
    } catch (error) {
        console.error("Error creating reply:", error);
        res.status(500).json({message: "Server error"});
    }
}



// gets all reply records from the 'replies' table associated with the post
const getAllReplies = async (req,res) => {
    try {
        // 1) extract data
        const {postId} = req.params;

        // 2) fetch replies
        const replies = await getAllPostRepliesDb(postId);

        // 3) converts the binary image data to base64 urls
        const formattedReplies = replies.map((reply => {
            if(reply.image) {
                const base64Image = Buffer.from(reply.image).toString("base64");

                return { ...reply, image: `data:${reply.imageMimeType};base64,${base64Image}` };
            } else {
                return reply;
            }
        }));

        // 4) add the user name to each reply
        const repliesWithUsername = await Promise.all(
                formattedReplies.map(async (reply) => {
                    const userName = await getUserByIdDb(reply.userId);
                    return {...reply, userName};
        }));

        res.status(200).json({repliesWithUsername});

    } catch (error) {
        console.error("Error fetching replies:", error);
        res.status(500).json({message: "Server error"});
    }
    
}


module.exports = {
    createReply,
    getAllReplies
}