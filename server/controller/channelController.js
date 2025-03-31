const {
    createChannelDb, getAllChannelsDb
} = require('../data/channelData')


// creates a new channel record in the channels table
const createChannel = async (req,res) => {
    try {
        const userId = req.user.id;
        const channelData = {...req.body, userId};

        const result = await createChannelDb(channelData);
        res.status(201).json({
            message:"Channel created", 
            channelId: result.insertId
        })

    } catch (error) {
        console.error("Error creating channel:", error);
        res.status(500).json({message: "Server error"});
    }
}



// gets all channel records from the channels table
const getAllChannels = async (params) => {
    try {
        const channels = await getAllChannelsDb();
        res.status(200).json({channels});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}



module.exports = {
    createChannel, getAllChannels
}