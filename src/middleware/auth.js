const jwt = require('jsonwebtoken');
const User = require('../models/User');
const HttpException = require('../error-handlers/exception');
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];   
    }
    if (!token) {
       return next(new HttpException(401, "Not Authorized"));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new HttpException(401, "No User Found With this token"));
        }

        req.user = user;
        next();
        
    } catch (error) {
       next(new HttpException(401, "Not authorized"));
    }
   
    
}

module.exports = protect;