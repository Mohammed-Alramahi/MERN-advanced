const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];   
    }
    if (!token) {
       return next("Not authorized");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return next("No User Found With this token");
        }

        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
   
    
}

module.exports = protect;