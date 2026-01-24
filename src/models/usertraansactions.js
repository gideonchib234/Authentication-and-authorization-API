const mongoose = require('mongoose');

const UserTransactionSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount : {
        type: Number,
        required: true,
    },
    transactiontype : {
        type: String,
        enum: ['credit', 'debit', 'transfer'],
        required: true,
    }
})