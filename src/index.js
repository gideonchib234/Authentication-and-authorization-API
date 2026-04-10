const express = require('express');
const app = express();
const PORT = process.env.PORT || 4500;
const morgan = require('morgan');
require('dotenv').config({ path: '../.env' });
const connectDB = require('./database/db');
const userRoutes = require('./Routes/route');
const walletRoutes = require('./Routes/walletRoutes');

connectDB();

app.get('/', (req, res) => {
    res.send('Authentication and Authorization API is running');
})

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;