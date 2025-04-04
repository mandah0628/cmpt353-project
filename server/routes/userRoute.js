const express = require('express');
const router = express.Router()
const multer = require('multer');

// middleware imports
const checkFields = require('../middleware/checkFields');
const authMiddleware = require('../middleware/authMiddleware')

const storage = multer.memoryStorage();
const upload = multer({storage})

//controller imports
const { createUser, loginUser, logoutUser, getUserById } = require('../controller/userController');


// register route
router.post("/register", checkFields, createUser);

// login route
router.post("/login", checkFields, loginUser);

//logout route
router.post("/logout", logoutUser);

// get user by id
router.get("/get-user", authMiddleware, getUserById)

// update user route
router.purge("/update-user", authMiddleware, upload.single("image"), checkFields, update)

module.exports = router;