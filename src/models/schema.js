const mongoose = require('mongoose');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    Firstname:{
        type : String,
        required : true,
    },
    Lastname:{
        type : String,
        required : true,
    },
    Email : {
        type : String,
        required : true,
        unique : true,
    },
    Password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user',
    },
    isverified : {
        type : Boolean,
        default : false,
    },
    OTP : {
        type: String,
    }

}, {timestamps : true,
    versionKey : false
}
);

const User = mongoose.model('User', UserSchema);
module.exports = User;