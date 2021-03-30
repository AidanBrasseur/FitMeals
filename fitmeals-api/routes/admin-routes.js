// Creating the router
const router = require('express').Router();

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { User } = require('../models/user');

/*
POST: /promote
Promotes a user to admin
*/
router.post("/promote", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Checking for a valid body
    if (!(Object.keys(req.body).length == 1 && "username" in req.body)) {
        res.status(400).send({ success: false, error: "Bad request" });
        return;
    }

    // Check if the user sending the request is a valid admin
    if (req.headers.authorization) {
        User.findOne({ authToken: req.headers.authorization }).then((user) => {
            // Promote if the requesting user is an admin
            if (user && user.isAdmin) {
                User.findOneAndUpdate({ username: req.body.username }, { isAdmin: true }, { useFindAndModify: false }).then((promotedUser) => {
                    if (promotedUser) {
                        res.send({ success: true });
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