const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    authToken: String,
    fullname: String,
    email: String,
    profileImageURL: String,
    isAdmin: Boolean,
    isBanned: Boolean
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };