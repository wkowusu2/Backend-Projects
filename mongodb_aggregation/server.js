require('dotenv').config()
const express = require('express'); 
const mongoose = require('mongoose'); 
const product = require('./routes/product-route')

const app = express(); 
app.use(express.json());
app.use('/products', product)
const port = process.env.PORT || 5000; 

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("database connected successfully")
})
.catch(()=>{
    console.log("some error occurred")
});

app.get('/', (req,res) => {
    res.json({
        success: true, 
        message: 'Welcome to the home page'
    })
})
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})