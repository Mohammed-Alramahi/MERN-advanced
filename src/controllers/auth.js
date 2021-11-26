const User = require("../models/User");
const jwt = require('jsonwebtoken');
const sendMail = require("../utils/mailer");


exports.register = async (req, res, next) => {
    const { userName, email, password, image, gender } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            error: "User Already exists"
        })
    }

    try {
        const user = await User.create({ userName, email, password, image, gender });
        await user.save();
        sendToken(user, 201, res);
    }

    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body)
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
                error: "Invalid Credintials"
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

        sendMail({ to: user.email, subject: "Password Reset Request", text: message })

        res.status(202).json({
            success: true,
            message: "check email for reset link"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = req.params.resetToken;

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPassowrdExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "Invalid Reset Token"
            })
        }

        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            message: "Passowrd Updated Successfully"
        })
    }

    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
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