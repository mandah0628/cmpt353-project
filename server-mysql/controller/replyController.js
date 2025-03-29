const {
    createReplyDb
} = require('../data/replyData')
const uploadImage = require('../utils/uploadImage')


const createReply = async (req,res) => {
    try {
        // extract data
        const userId = req.user.id;
        const image = req.file;

        // if there is an image file, upload to couchdb and get the id
        // if not, set it tonull
        const imageId = image ? await uploadImage(image) : null;

        // prepare reply data
        const replyData = {...req.body , imageId, userId};

        // create reply record in the replies table
        await createReplyDb(replyData);
    
        res.status(200);
        
    } catch (error) {
        console.error("Error creating reply:", error);
        res.status(500).json({message: "Server error"});
    }
}


module.exports = {
    createReply,
}