// Creating the Express app
const express = require('express')
const app = express();
app.use(express.json());

// Get the Mongoose instance
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');

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

	// Create a new user to be posted to the DB
	let user = new User({
		username: req.body.username,
		password: req.body.password,
		authToken: "TEMP_AUTH_TOKEN",
		fullname: req.body.fullname,
		email: req.body.email,
		profileImageURL: "TEMP_PROFILE_IMAGE_URL",
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