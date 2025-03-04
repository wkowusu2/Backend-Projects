const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: String,
    //making a reference from the Author Model to the Book module
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}) 

const Book = mongoose.model('book', BookSchema); 

module.exports = Book;