const Book = require('../models/book');
//get all post 
const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find()
        if(allBooks.length > 0){
            res.json({
                success: true,
                message: 'All books retrieved successfully',
                data: allBooks
            }) 
            }else{
                res.status(404).json({
                    success: false,
                    message: 'No books found'
                })
            }
        } catch (error) {
        console.log(error);
    }

}
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id
    const foundBook = await Book.findById(bookId) 
    if(foundBook) {
        res.json({
            success: true,
            message: 'Book retrieved successfully',
            data: foundBook
        });
        console.log(foundBook);
    }
    } catch (error) {
        console.log(error)
    }
}
const addNewBook = async (req, res) => {
    try {
        const newBook = req.body 
    const newCreatedBook = await Book.create(newBook);
    if(newCreatedBook){
        res.status(201).json({
            success: true,
            message: 'New book created successfully',
            data: newCreatedBook
        });
    }
    } catch (error) {
        console.log(error);
    } 

}
const updateBook = async (req, res) => {
    try {
        const  bookId = req.params.id
        const  newUpdateBank = req.body
        const  updatedBook = await Book.findByIdAndUpdate(bookId, newUpdateBank,{new: true})
        if(!updatedBook){
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
        console.log(updatedBook);
    } catch (error) {
        console.log(error)
    }
}
const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id 
        console.log(bookId)
    const deletedBook = await Book.findByIdAndDelete(bookId); 
    if(deletedBook) {
        res.json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBook
        });
        console.log(deletedBook);
    }
    } catch (error) {
        console.log(error)
    }
} 

module.exports = {getAllBooks,getBookById,addNewBook,updateBook,deleteBook}