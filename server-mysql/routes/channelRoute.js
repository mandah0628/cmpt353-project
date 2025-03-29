const express = require('express');
const router = express.Router();

// middleware imports
const authMiddleware = require('../middleware/authMiddleware');
const checkFields = require('../middleware/checkFields')


// controller imports
const { createChannel, getAllChannels } = require('../controller/channelController');


//route to create a channel
router.post("/create-channel", authMiddleware, checkFields, createChannel);

// route to get all the channels
router.get("/get-channels", getAllChannels);


module.exports = router;