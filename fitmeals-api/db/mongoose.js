// Creating the instance of Mongoose (connected to MongoDB Atlas)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = { mongoose }