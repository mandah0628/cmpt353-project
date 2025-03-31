const express = require('express');
const router = express.Router()


// middleware imports
const checkFields = require('../middleware/checkFields');
const { createUser, loginUser } = require('../controller/userController');


//controller imports



// register route
router.post("/register", checkFields, createUser);

// login route
router.post("/login", checkFields, loginUser);

module.exports = router;