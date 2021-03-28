// Creating the Express app
const express = require('express')
const app = express();
app.use(express.json());

// Get the Mongoose instance
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');

// Additional library requirements
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

/*
GET: /users
Get all the users of FitMeals
*/
app.get("/users", (req, res) => {
	// Check for a valid mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}

	// Return all the users
	User.find().then((users) => {
		res.send({ users: users });
	}).catch((error) => {
		log(error);
		res.status(500).send("Internal Server Error");
	});
});

/*
POST: /users
Adds a new user to the FitMeals DB
*/
app.post("/users", (req, res) => {
	// Check for a valid mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	}

	// Getting the encoded username/password info and hashing the password
	const decoded = Buffer.from(req.headers.authorization, 'base64').toString('ascii');
	const newUsername = decoded.substring(0, decoded.indexOf(":"));
	const textPassword = decoded.substring(decoded.indexOf(":") + 1, decoded.length);
	const hash = bcrypt.hashSync(textPassword, 10);

	// Generating an auth token
	const newAuthToken = uuidv4();

	// Create a new user to be posted to the DB
	let user = new User({
		username: newUsername,
		password: hash,
		authToken: newAuthToken,
		fullname: req.body.fullname,
		email: req.body.email,
		profileImageURL: "https://www.clipartmax.com/png/middle/15-153139_big-image-login-icon-with-transparent-background.png",
		isAdmin: false
	}); 

	// Saving the user to the DB
	user.save().then((result) => {
		res.send(result);
	}).catch((error) => {
		console.log(error);
		res.status(500).send("Internal Server Error");
	});
});

// Running the Express app
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});