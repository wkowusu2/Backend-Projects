const mongoose =require('mongoose'); 

const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'], 
        trim: true,
        maxLength: [100, 'title should be 100 characters or less']
    },
    author:{
        type: String,
        required: [true, 'author name is required'], 
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'Year of publication is required'],
        min: [1000, 'Year should be after 1000'],
        max: [new Date().getFullYear(), 'Year should be before the current year']
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 
const Book = mongoose.model('Book',BookSchema); 

module.exports = Book;