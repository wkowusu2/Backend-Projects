const express = require('express');
const {loginUser, registerUser} = require('../controllers/auth-controllers');
const authMiddle = require('../middlewares/auth-middle')
const router = express.Router(); 


//register route
router.post('/register', registerUser)
//login route
router.post('/login', loginUser) 
router.get('/something', authMiddle, (req,res) => {
    res.json({message: 'This is a protected route'})
}) 

module.exports = router;