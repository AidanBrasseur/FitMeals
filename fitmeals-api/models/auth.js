const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    emailName: String,
    emailPassword: String
}, { collection : 'auth' });

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = { Auth };