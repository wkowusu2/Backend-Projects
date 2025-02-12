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
        }, process.env.JWT_SECRET, {expiresIn: '24h'});
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

const changePassword = async (req,res) => {
    try {
        //extract the userID from the request
    const userID = req.user.id; 
    //extract the old and new password from the request body
    const {oldPassword, newPassword} = req.body; 
    // console.log(oldPassword, newPassword);
    //find the user by ID
    const userValid = await User.findById(userID);
    // console.log(userValid);
    if(!userValid){
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    //check if the old password is correct 
    const oldPassFromDb = await bcrypt.compare(oldPassword, userValid.password);
    console.log(oldPassFromDb)
    if(!oldPassFromDb){
        return res.status(401).json({ 
            success: false,
            message: 'Old password does not match',
        });
    }else{
        //hash the new password
        console.log('pass matching')
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        //update the user's password
        userValid.password = hashedPassword;
        await userValid.save();
        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });
    }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while changing password',
            error: error,
        })
    }

}

module.exports = {loginUser, registerUser,changePassword}