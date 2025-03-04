const Author = require('../models/Author')
const Book = require('../models/Book')

const createAuthor = async(req,res) => {
    try {
        const author = await Author.create(req.body)
    } catch (error) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "some error occurred "
        })
    }
}

module.exports = { createAuthor, createBook }