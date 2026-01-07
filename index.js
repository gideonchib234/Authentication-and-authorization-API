const express = require('express');
const app = express();
const PORT = process.env.PORT || 4500;
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./database/db');
const userRoutes = require('./Routes/route');

connectDB();

app.get('/', (req, res) => {
    res.send('Authentication and Authorization API is running');
})

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;