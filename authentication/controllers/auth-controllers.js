const User = require('../models/user');
const bcrypt = require('bcrypt');
//login 
const loginUser = async (req, res) => {
   try {
        res.send('Welcome')
        console.log('user logged in')
   } catch (error) {
      console.error(error);
   }
}
const registerUser = async (req, res) => {
    try {
        //extract the user details from the request object
        const {username,email,password,role} = req.body;
          const userExists = await User.findOne({$or:[{username},{email}]});
          if(userExists) {
            return res.status(400).json({message: 'User already exists. Change email or password'});
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