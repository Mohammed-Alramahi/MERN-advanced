const express = require('express');
const router = express.Router();
const authorizeUser = require('../middleware/auth');

router.get("/", authorizeUser,(req, res, next) => {
    res.status(200).json({
        message:`Welcome ${req.user.userName} to the private area`
    });
})

module.exports = router;