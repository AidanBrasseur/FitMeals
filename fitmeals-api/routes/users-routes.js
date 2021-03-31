// Creating the router
const router = require('express').Router();

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { User } = require('../models/user');

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

module.exports = router;