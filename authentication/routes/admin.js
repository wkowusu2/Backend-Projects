 const express = require('express');
 const router = express.Router();
 const adminMiddleware = require('../middlewares/admin-middleware') 
const authMiddle = require('../middlewares/auth-middle')

 
 router.get('/welcome',authMiddle,adminMiddleware,(req, res) => {
     res.json({
         message: "welcome to the admin page" 
     })
 });
 
 module.exports = router;