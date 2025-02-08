require('dotenv').config()
const express = require('express');
const databaseConnection = require('./database/db-config');
const authRouter = require('./routes/auth-routes');
const homeRoute = require('./routes/home');
const adminRoute = require('./routes/admin');
const app = express()

app.use(express.json())
const port = process.env.PORT || 5000 
app.use('/api/auth', authRouter);
app.use('/api/home', homeRoute);
app.use('/api/admin', adminRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!')
}) 
databaseConnection()
app.listen(port, () => {
    console.log(`listening on ${port}`)
})