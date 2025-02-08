const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }, 
    password: {
        type: String,
        required: true,
        // minlength: 8,
    }, 
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, {timestamps: true}) 

const User = mongoose.model('User',UserSchema); 

module.exports = User;