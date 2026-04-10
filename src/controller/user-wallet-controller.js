const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Wallet = require('../models/user-wallet-schema');
const UserTransaction = require('../models/usertraansactions');

const createWallet = async (req, res) => {
try {
    const {userId} = req.user;
    const {PhoneNumber} = req.body;
if(!userId || !PhoneNumber){
    return res.status(400).json({message : 'UserId and PhoneNumber are required'});
}
const ExistingWallet = await Wallet.findOne({userId});
if(!ExistingWallet){
    return res.status(400).json({message : 'Wallet already exists for this user'});

};
const normalizedPhoneNumber = PhoneNumber.replace(/^(\+234|0)/, '');
await ExistingWallet.PhoneNumber === PhoneNumber;
await ExistingWallet.save();

const newWallet = new Wallet({
    userId: userId,
    AccountNumber: normalizedPhoneNumber,
    balance: 0,
    currency: 'NGN',
});
await newWallet.save();
return res.status(201).json({message : 'Wallet created successfully', wallet: newWallet});

}catch (error) {
    console.error('Error during wallet creation process:', error);   
    return res.status(500).json({message: 'Internal Server error'});
}
};

const getAllWallets = async (req, res) => {
    try {
        const wallets = await Wallet.find().populate('userId', 'Firstname Lastname Email PhoneNumber'); 
        return res.status(200).json({wallets});
    } catch (error) {
        console.error('Error fetching wallets:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}
module.exports = {
    createWallet,
    getAllWallets,
};