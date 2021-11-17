const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please Enter the User Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter the Email"],
        unique:[true,"This user is already signed up!"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select:false
    },
    image: {
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire:Date
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePasswords = async function (password) {
    console.log(password);
    return await bcrypt.compare(password,this.password);
}

module.exports = mongoose.model("User", UserSchema);