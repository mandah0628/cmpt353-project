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
const { createReply } = require('../controller/replyController')


// create reply route
router.post("/create-reply", authMiddleware, upload.single("image"), createReply);



module.exports = router;