// Creating the router
const router = require('express').Router();

// Config file
const config = require('../config');

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { User } = require('../models/user');

// Upload image libraries and middleware
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

const log = console.log;

/*
GET: /users/:username
Get info about the user with the specified username
*/
router.get("/:username", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Checking for valid auth token
    if (req.headers.authorization) {
        User.findOne({ authToken: req.headers.authorization }).then((user) => {
            if (user && !user.isBanned) {
                // Returning the user info
                User.findOne({ username: req.params.username }).then((requestedUser) => {
                    if (requestedUser) {
                        res.send({
                            success: true,
                            user: {
                                username: requestedUser.username,
                                fullname: requestedUser.fullname,
                                rating: requestedUser.rating,
                            }
                        });
                    } else {
                        res.status(404).send({ success: false, error: "User not found" });
                    }
                }).catch((error) => {
                    console.log(error);
                    res.status(500).send({ success: false, error: "Internal server error" });
                });
            } else {
                res.status(401).send({ success: false, error: "Unauthorized" });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal server error" });
        });
    } else {
        res.status(401).send({ success: false, error: "Unauthorized" });
    }
});

/*
PATCH: /users/:username
Update full name and/or email for the user with the given username
*/
router.patch("/:username", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Check for a valid body (either just full name, just email or both full name and email)
    if (!((Object.keys(req.body).length == 1 && "fullname" in req.body) || (Object.keys(req.body).length == 1 && "email" in req.body) || (Object.keys(req.body).length == 2 && "fullname" in req.body && "email" in req.body))) {
        res.status(400).send({ success: false, error: "Bad request" });
        return;
    }

    // Update the user's info if the username and auth token belong to the same user
    if (req.headers.authorization) {
        User.findOne({ username: req.params.username, authToken: req.headers.authorization }).then((user) => {
            if (user) {
                if ("fullname" in req.body) {
                    user.fullname = req.body.fullname;
                }
                if ("email" in req.body) {
                    user.email = req.body.email;
                }
                // Saving the user to the DB
                user.save().then((result) => {
                    res.send({ success: true });
                }).catch((error) => {
                    console.log(error);
                    res.status(500).send({ success: false, error: "Internal server error" });
                });
            } else {
                res.status(404).send({ success: false, error: "User not found or username and auth token do not match a user" });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal server error" });
        });
    } else {
        res.status(401).send({ success: false, error: "Unauthorized" });
    }
});

/*
PATCH: /users/update-pic/:username
Update the profile picture of the user with the given username
*/
router.patch("/update-pic/:username", multipartMiddleware, (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Update the user's info if the username and auth token belong to the same user
    if (req.headers.authorization) {
        User.findOne({ username: req.params.username, authToken: req.headers.authorization }).then((user) => {
            if (user) {
                // Uploading the picture to storage and updating the user's image property      
                cloudinary.uploader.upload(req.files.image.path, (result) => {
                    user.image = {
                        url: result.url,
                        cloudinaryID: result.public_id,
                        created_at: new Date()
                    }
                    // Saving the user to the DB
                    user.save().then((result) => {
                        res.send({ success: true });
                    }).catch((error) => {
                        console.log(error);
                        res.status(500).send({ success: false, error: "Internal server error" });
                    });
                });
            } else {
                res.status(404).send({ success: false, error: "User not found or username and auth token do not match a user" });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal server error" });
        });
    } else {
        res.status(401).send({ success: false, error: "Unauthorized" });
    }
});

module.exports = router;