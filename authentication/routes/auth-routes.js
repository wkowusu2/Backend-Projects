const express = require('express');
const {loginUser, registerUser} = require('../controllers/auth-controllers');
const router = express.Router(); 

//register route
router.post('/register', registerUser)
//login route
router.post('/login', loginUser) 

module.exports = router;