const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    inStock: Boolean,
    tags: [String]
}); 

const Product = mongoose.model('product',ProductSchema); 

module.exports = Product;