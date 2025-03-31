const express = require('express');
const router = express.Router();

// middleware imports
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage})
// controller imports
const { uploadImage, getAllReplyImages } = require('../controller/imageController')

// upload image to couchdb route
router.post("/upload-image", upload.single("image"), uploadImage);

// fetch all reply images belonging to a post
router.get("/get-images", getAllReplyImages);


module.exports = router;