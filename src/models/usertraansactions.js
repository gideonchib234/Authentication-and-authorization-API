const mongoose = require('mongoose');

const UserTransactionSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount : {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    transactiontype : {
        type: String,
        enum: ['credit', 'debit', 'transfer'],
        required: true,
    },
    transactionId : {
        type: String,
        required: true,
        unique: true,
    },
    Currency : {
        type: String,
        required: true,
        default: 'NGN',
    },
    balanceAfterTransaction : {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    balanceBeforeTransaction : {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    status :{
        type: String,
        enum: ['pending', 'completed', 'failed'],
        required: true,
    },
    description : {
        type: String,
        default: '',   
    }
},{ timestamps: true,
    versionKey: false

});

const UserTransaction = mongoose.model('UserTransaction', UserTransactionSchema);
module.exports = UserTransaction;