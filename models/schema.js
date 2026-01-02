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
    isverified : {
        type : Boolean,
        default : false,
    }

}, {timestamps : true,
    versionKey : false
}
);

const User = mongoose.model(UserSchema);
module.exports = User;