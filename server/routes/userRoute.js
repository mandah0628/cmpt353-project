const express = require('express');
const router = express.Router()


// middleware imports
const checkFields = require('../middleware/checkFields');
const { createUser, loginUser, logoutUser } = require('../controller/userController');


//controller imports



// register route
router.post("/register", checkFields, createUser);

// login route
router.post("/login", checkFields, loginUser);

//logout route
router.post("/logout", logoutUser);

module.exports = router;