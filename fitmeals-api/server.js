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
POST: /register
Adds a new user to the FitMeals DB
*/
app.post("/register", (req, res) => {
	// Check for a valid mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send({ success: false, error: "Internal server error" });
		return;
	}

	// Checking for a valid body
	if (!(Object.keys(req.body).length == 2 && "fullname" in req.body && "email" in req.body)) {
		res.status(400).send({ success: false, error: "Bad request" });
		return;
	}

	// Getting the encoded username/password info and hashing the password
	const decoded = Buffer.from(req.headers.authorization, 'base64').toString('ascii');
	const newUsername = decoded.substring(0, decoded.indexOf(":"));
	const textPassword = decoded.substring(decoded.indexOf(":") + 1, decoded.length);

	// Registering the user if there is no duplicate username or email (first checking username)
	User.findOne({ username: newUsername }).then((user) => {
		if (user != null) {
			res.status(409).send({ success: false, error: "Username already exists" });
		} else {
			// Checking for a duplicate email
			User.findOne({ email: req.body.email }).then((user) => {
				if (user != null) {
					res.status(409).send({ success: false, error: "Email already exists" });
				} else {
					// Generating an auth token and password hash
					const newAuthToken = uuidv4();
					const hash = bcrypt.hashSync(textPassword, 10);

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
						res.status(201).send({ success: true });
					}).catch((error) => {
						console.log(error);
						res.status(500).send({ success: false, error: "Internal server error" });
					});
				}
			}).catch((error) => {
				console.log(error);
				res.status(500).send({ success: false, error: "Internal server error" });
			});
		}
	}).catch((error) => {
		console.log(error);
		res.status(500).send({ success: false, error: "Internal server error" });
	});
});

/*
POST: /login
Login to FitMeals
*/
app.post("/login", (req, res) => {
	// Check for a valid mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send({ success: false, error: "Internal server error" });
		return;
	}

	// Getting the encoded username/password info and hashing the password
	const decoded = Buffer.from(req.headers.authorization, 'base64').toString('ascii');
	const inputUsername = decoded.substring(0, decoded.indexOf(":"));
	const textPassword = decoded.substring(decoded.indexOf(":") + 1, decoded.length);

	// Try to find the correct user
	User.findOne({ username: inputUsername }).then((user) => {
		if (user == null) {
			res.status(404).send({ success: false, error: "User not found" });
			return;
		}
		// Checking if the password is correct and sending user info if it is
		if (bcrypt.compareSync(textPassword, user.password)) {
			res.send({
				success: true,
				user: {
					username: user.username,
					authToken: user.authToken,
					fullname: user.fullname,
					email: user.email,
					profileImageURL: user.profileImageURL,
					isAdmin: user.isAdmin
				}
			});
		} else {
			res.status(404).send({ success: false, error: "User not found" });
		}
	}).catch((error) => {
		console.log(error);
		res.status(500).send({ success: false, error: "Internal server error" });
	});
});

// Running the Express app
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});