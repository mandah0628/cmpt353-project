const {
    createReplyDb,
    getAllPostRepliesDb
} = require('../data/replyData')


// creates a reply record in the 'replies' table
const createReply = async (req,res) => {
    try {
        // extract data
        const userId = req.user.id;
        const image = req.file;

        // if there is an image file, get the binary data
        const imageBuffer = image ? image.buffer : null;

        // prepare reply data
        const replyData = {...req.body , image : imageBuffer, userId};

        // create reply record in the replies table
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
        // extract data
        const {postId} = req.params;

        // fetch replies
        const replies = await getAllPostRepliesDb(postId);

        const formattedReplies = replies.map((reply => {
            if(reply.image) {
                const base64Image = Buffer.from(reply.image).toString("base64");

                return { ...reply, image: `data:${reply.imageMimeType};base64,${base64Image}` };
            } else {
                return reply;
            }
        }));

        res.status(200).json({formattedReplies});

    } catch (error) {
        console.error("Error fetching replies:", error);
        res.status(500).json({message: "Server error"});
    }
    
}


module.exports = {
    createReply,
    getAllReplies
}