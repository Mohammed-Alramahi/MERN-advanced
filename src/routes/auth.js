const express = require('express');

const router = express.Router();
const {register, login, forgotPassword,resetPassword} = require('../controllers/auth');


router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);
module.exports = router;