const express = require('express');
const router = express.Router(); 
const {getAllBooks,getBookById,updateBook,deleteBook,addNewBook} = require('../controllers/book-controllers')

//creating all the routes 
router.get('/', (req, res) => {
    res.json({
        message: "api/books reached" 
    })
})
router.get('/get',getAllBooks)
router.get('/get/:id',getBookById)
router.post('/add',addNewBook)
router.patch('/update/:id',updateBook)
router.delete('/delete/:id',deleteBook) 

module.exports = router;