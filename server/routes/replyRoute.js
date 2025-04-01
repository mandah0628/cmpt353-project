const express = require('express');
const router = express.Router();
const multer = require('multer');


// middleware imports
const checkFields  = require('../middleware/checkFields');
const authMiddleware = require('../middleware/authMiddleware');
// middleware for multipart form data
const storage = multer.memoryStorage();
const upload = multer({storage})


// controller imports
const { createReply, getAllReplies } = require('../controller/replyController')


// route to create a reply 
router.post("/create-reply", authMiddleware, upload.single("image"), checkFields, createReply);

// route to get all replies for a post by the post id
router.get("/get-replies/:postId", getAllReplies);


module.exports = router;