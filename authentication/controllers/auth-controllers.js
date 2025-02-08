const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//login 
const loginUser = async (req, res) => {
   try {
        const {username,password} = req.body; 
        //validating username
        const validUsername = await User.findOne({username}); 
        if(!validUsername) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username'});
        }
        //validating password
        const matchPassword = bcrypt.compare(password, validUsername.password)
        if(!matchPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'});
        }
        
        //creating user token
            const token = jwt.sign({id: validUsername._id,
            username: validUsername.username,
            role: validUsername.role
        }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({
            success: true,
            message: 'User logged in successfully',
            token: token
        });

   } catch (error) {
      console.error(error);
   }
}
const registerUser = async (req, res) => {
    try {
        //extract the user details from the request object
        const {username,email,password,role} = req.body;
          const userExists = await User.findOne({$or:[{username: username},{email: email}]});
          if(userExists) {
            return res.status(400).json({message: 'User already exists. Change email or username'});
          } 

          //hashing the password
          //generate salt 
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt); 

          //create new user object
          const newUser = new User({username, email, password: hashedPassword, role: role || 'user'});
          //save the user to the database
          await newUser.save();

          if(newUser){
             res.status(201).json({
                success: true,
                message: 'User registered successfully',
            });
            console.log(newUser);
          }else{
            res.status(400).json({
                success: false,
                message: 'User registration failed',
            });
          }
          
    } catch (error) {
       console.error(error);
    }
}

module.exports = {loginUser, registerUser}