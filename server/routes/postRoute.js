const express = require('express');
const router = express.Router();
const multer = require('multer');


// middleware imports
const authMiddleware = require('../middleware/authMiddleware');
const checkFields = require('../middleware/checkFields')
const storage = multer.memoryStorage();
const upload = multer({storage});



//controller imports
const { createPost, getPostById, getAllPosts } = require('../controller/postController')


// create a post route
router.post("/create-post", authMiddleware, upload.single("image"), checkFields, createPost);
// get a post by its id route
router.get("/get-post/:postId", getPostById);
// get all posts for a channel by its id route
router.get("/channel/:channelId", getAllPosts);

module.exports = router;