const express = require('express');
const router = express.Router();

// contoller import
const checkToken = require('../controller/authController')

// check token authenticity route
router.post("/check-token", checkToken);

module.exports = router;