const {
    createChannelDb, getAllChannelsDb,
    getChannelByIdDb
} = require('../data/channelData')

const { getAllPostsDb } = require('../data/postData');



// creates a new channel record in the channels table
const createChannel = async (req,res) => {
    try {
        const userId = req.user.id;
        console.log(userId)
        const channelData = {...req.body, userId};

        console.log(channelData);
        const result = await createChannelDb(channelData);
        res.status(201).json({
            message:"Channel created", 
            channelId: result.insertId
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}




// get a single channel record from the channels table, along with all its posts
const getChannelById = async (req,res) => {
    try {
        const { channelId } = req.params;

        const channel = await getChannelByIdDb(channelId);

        if (!channel) {
            return res.status(500).json({message: "Error fetching channel info"});
        }

        const posts = await getAllPostsDb(channelId);

        res.status(200).json({channel, posts});

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}




// gets all channel records from the channels table
const getAllChannels = async (req,res) => {
    try {
        const channels = await getAllChannelsDb();
       
        res.status(200).json({channels});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}



module.exports = {
    createChannel, getAllChannels, getChannelById
}