const User = require("../models/User");
const jwt = require('jsonwebtoken');
const sendMail = require("../utils/mailer");


exports.register = async (req, res, next) => {
    const { userName, email, password, image } = req.body;
    const user = await User.create({ userName, email, password, image });
    await user.save();
    sendToken(user, 201, res);
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            success: false,
            error: "Please Provide all creds"
        })
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.status(400).json({
                success: false,
                error: "Invalid Credintials"
            })
        }
        else {
           const isMatched = await user.comparePasswords(password);
            isMatched ? sendToken(user, 200, res) : res.status(404).json({
                success: false,
                error:"Invalid Credintials"
            });
        }  
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                error: "Invalid Credintials"
            })
        }
        const resetToken = await user.getResetPasswordToken();
        await user.save();
        const resetUrl = `${process.env.HOST}/resetpassword/${resetToken}`;
        
        const message = `
        <h1>Password Reset Request</h1>
        <p>Hello ${user.userName} your password reset link is: </p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        
        sendMail({ to:user.email,subject:"Password Reset Request",text:message })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.resetPassword = async (req, res, next) => {
    res.send("another sad");
}


// Upon Successful Login, or register send a token to the user
const sendToken = async (user, statusCode, res) => {
    let token;
    token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(statusCode).json({
        success: true,
        token
    })
}