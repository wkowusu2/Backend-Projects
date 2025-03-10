const mongoose = require('mongoose');
const databaseConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection failed', error);
        process.exit(1);
    }
} 

module.exports = databaseConnection;