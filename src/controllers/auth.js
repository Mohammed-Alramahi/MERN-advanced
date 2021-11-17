const UserModel = require("../models/User");
const jwt = require('jsonwebtoken');


exports.register = async (req, res, next) => {
    const { userName, email, password, image } = req.body;
    const user = await UserModel.create({ userName, email, password, image });
    user.save();
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
        const user = await UserModel.findOne({ email }).select("+password");
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
    res.send("another sad");
}

exports.resetPassword = async (req, res, next) => {
    res.send("another sad");
}

const sendToken = async (user, statusCode, res) => {
    let token;
    token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(statusCode).json({
        success: true,
        token
    })
}