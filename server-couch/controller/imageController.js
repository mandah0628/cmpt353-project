const uploadImage = async (req,res) => {
    try {
        
    } catch (error) {
        console.error("Error uploading reply image to couchdb", error);
        res.status(500).json({message: "Couchdb error"});
    }
}


const getAllReplyImages = async (req,res) => {
    try {
        
    } catch (error) {
        console.error("Error fetching reply images from couchdb", error);
        res.status(500).json({message: "Couchdb error"});
    }
}


module.exports = {
    uploadImage,
    getAllReplyImages
}