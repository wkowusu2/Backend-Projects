 const express = require('express');
 const router = express.Router(); 
 
 router.get('/welcome',(req, res) => {
     res.json({
         message: "welcome to the admin page" 
     })
 });
 
 module.exports = router;