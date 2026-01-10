const User = require('../models/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { Firstname, Lastname, Email, Password } = req.body;
    try{
        if(!Firstname || !Lastname || !Email || !Password){
            return res.status(400).json({message : 'All fields are required'});
        }
        const user = await User.findOne({Email});
        if(user){
            return res.status(400).json({message : 'User already exists'});
        }
        
        const hashedPassword = await bcrypt.hash(Password, 10);
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const Otpexpiry = new Date(Date.now() + 10 * 60 * 1000);
        const newUser = new User({
            Firstname,
            Lastname,
            Email,
            Password : hashedPassword,
            OTP,
            OtpExpiry : Otpexpiry

    })
    await newUser.save()

    await SendEmail(
        Email, 
        'Verify your email', 
        `Your OTP is ${OTP}. 
        It will expire in 10 minutes.`); 

    return res.status(201).json({message : 'User registered succesfully'});
    
}catch (error) {
        console.error('Error during user registration:', error);
         return res.status(500).json({message: 'Internal Server error'});

}
};

const LoginUser = async (req, res) => {
    const {Email, Password} = req.body;
    try{
        if(!Email || !Password){
            return res.status(400).json({message : 'All fields are required'});
        }
        const user = await User.findOne({Email});  
        if(!user){
            return res.status(404).json({message : 'User not found'});
        }   
        if(!user.isverified){
            return res.status(401).json({message : 'Verify your email to login'})
        }
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if(!isPasswordValid){
            return res.status(401).json({message : 'Invalid credentials'});
        }  

        const token = await jwt.sign ({userId : user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn : '1d'});
        return res.status(200).json({message : 'Login successful', token});
    }catch (error) {
        console.error('Error during user login:', error);
         return res.status(500).json({message: 'Internal Server error'});
    }
}

const ForgetPassword = async (req, res) => {
    const {Email} = req.body;
    try{
        if(!Email){
            return res.status(400).json({message : 'Email is required'});
        }
        const user = await User.findOne({Email});
        if(!user){
            return res.status(400).json({message : 'User not found'});

        }
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        user.OTP = OTP;
        await user.save();
        await SendEmail(
            Email,
            'Password Reset OTP',
            `Your OTP for password reset is ${OTP}.
             It will expire in 10 minutes.`
        );
        return res.status(200).json({message : 'OTP sent to your email', OTP});
    }catch (error) {
        console.error('Error during forget password process:', error);
         return res.status(500).json({message: 'Internal Server error'});
    }
}
const ResetPassword = async (req, res) => {
    const {OTP, newpassword} = req.body;
    try {
        if(!OTP, newpassword){
            return res.status(400).json({message : 'All fields are required'});
        }
        const user = await User.findOne({OTP});
        if(!user){
            return res.status(400).json({message : 'Invalid OTP'});
        }
        const hashedPaassword = await bcrypt.hash(newpassword, 10);
        user.Password = hashedPaassword;
        user.OTP = null;
        await user.save();
        return res.status(200).json({message : 'Password reset successful'});
        
    } catch (error) {
        console.error('Error during password reset process:', error);   
        return res.status(500).json({message: 'Internal Server error'});    
    }
}
const OTPverification = async (req, res) => {
    const {OTP} = req.body
    try{
        if(!OTP){
            return res.status(400).json({message: 'Otp is required'});

        }
        const user = await User.findOne({OTP});
        if(!user){
            return res.status(400).json({message : 'Invalid OTP'});
        }
         if(user.OtpExpiry < new Date()){
                return res.status(400).json({message: 'Otp has expired'});
            }else{
                user.isverified = true;
                user.OTP = null;
                user.OtpExpiry = null;
                await user.save();
                return res.status(200).json({message: 'Email verified successfully'});
            }

    }catch (error) {
        console.error('Error during OTP verification process:', error);   
        return res.status(500).json({message: 'Internal Server error'});
}
};
const ResendOTP = async (req, res) => {
    const {Email} = req.body;
    try{
        if(!Email){
            return res.status(400).json({message: 'Email is required'});
        }
        const user = await User.findOne({Email});
        if(!user){
            return res.status(404).json({message : 'User not found'});
        }
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        user.OTP = OTP;
        await user.save();
        return res.status(201).json({message : 'OTP resent successfully', OTP});    
    }catch (error) {
        console.error('Error during resending OTP process:', error);   
        return res.status(500).json({message: 'Internal Server error'});
    }
}
 const getAllUsers = async (req, res) => {
    const {userId} = req.user;
    try {
        const adminUser = await User.findById(userId);
        if(adminUser.role !== 'admin'){
            return res.status(403).json({message: 'Access denied. Admins only'});
        }
        const users = await User.find().select('-Password -OTP -OtpExpiry');
        return res.status(200).json({users});
    }catch (error) {
        console.error('Error fetching users:', error);   
        return res.status(500).json({message: 'Internal Server error'});
    }

 }
module.exports = { registerUser, LoginUser, ResetPassword, ForgetPassword, OTPverification, ResendOTP };