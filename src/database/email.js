const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const SendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,  
        to,
        subject,
        text,
    };
    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', to);
    }catch (error) {
        console.error('Error sending email to', to, error);
    }};

    module.exports = SendEmail;