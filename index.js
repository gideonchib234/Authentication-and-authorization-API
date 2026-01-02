const express = require('express');
const App = express();
const PORT = process.env.PORT || 4500;
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./database/db');
const userRoutes = require('./Routes/route');

connectDB();

App.get('/', (req, res) => {
    res.send('Authentication and Authorization API is running');
})

App.use(express.json());
App.use(morgan('dev'));
App.use('/api/users', userRoutes);


App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = App;
