// Creating the Express app
const express = require('express')
const app = express();

// Get the Mongoose instance
const { mongoose } = require('./db/mongoose');

// Running the Express app
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});