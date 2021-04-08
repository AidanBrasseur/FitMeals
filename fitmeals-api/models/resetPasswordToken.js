const mongoose = require('mongoose');

const ResetPasswordTokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: String,
    expires: Date
});

const ResetPasswordToken = mongoose.model("ResetPasswordToken", ResetPasswordTokenSchema);

module.exports = { ResetPasswordToken };