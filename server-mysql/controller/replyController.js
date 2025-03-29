const {
    createReplyDb
} = require('../data/replyData')


const createReply = async (req,res) => {
    try {
        const userId = req.user.id;

        
    } catch (error) {
        console.error("Error creating reply:", error);
        res.status(500).json({message: "Server error"});
    }
}


module.exports = {

}