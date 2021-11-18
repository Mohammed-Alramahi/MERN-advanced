const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Please Enter the User Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter the Email"],
        unique: [true, "This user is already signed up!"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    image: {
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
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
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * (60 * 1000);

    return resetToken;
}

module.exports = model("User", UserSchema);