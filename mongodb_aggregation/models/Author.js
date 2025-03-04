const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name: String,
    bio: String,
}) 

const Author = mongoose.model('author', AuthorSchema); 

module.exports = Author;