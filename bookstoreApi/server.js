require('dotenv').config();
const databaseConnection = require('./database/db');
const express = require('express'); 
const bookRoutes= require('./routes/book-routes');
const app = express();  
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/books', bookRoutes)
app.get('/', (req, res) => {
    res.send('Welcome to the home page')
    console.log('a response just came in')
})

//database connection
databaseConnection();
app.listen(port, (req, res) =>{
    console.log('listening on port 3000');
})