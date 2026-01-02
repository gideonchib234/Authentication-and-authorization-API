const express = require('express');
const router = express.Router();
const { registerUser, LoginUser, ForgetPassword, ResetPassword, OTPverification, ResendOTP } = require('../controller/user-controller');  

router.post('/register', registerUser);
router.post('/login', LoginUser);
router.put('/forget-password', ForgetPassword);
router.put('/reset-password', ResetPassword);
router.put('/verify-email', OTPverification);
router.put('/resend-otp', ResendOTP);

module.exports = router;