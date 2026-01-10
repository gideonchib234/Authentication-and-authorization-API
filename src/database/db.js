const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/Database for students';


const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
module.exports = connectDB;