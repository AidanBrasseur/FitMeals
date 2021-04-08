// Creating the router
const router = require('express').Router();

// Config file
const config = require('../config');

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { User } = require('../models/user');
const { Auth } = require('../models/auth');
const { ResetPasswordToken } = require('../models/resetPasswordToken');

// Additional library requirements
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const log = console.log;

/*
POST: /auth/register
Adds a new user to the FitMeals DB
*/
router.post("/register", (req, res) => {
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

    // Getting the encoded username/password info and checking validity
    const decoded = Buffer.from(req.headers.authorization, 'base64').toString('ascii');
    if ((decoded.match(/:/g) || []).length > 1) {
        res.status(400).send({ success: false, error: "Bad request - Invalid username or password" });
        return;
    }
    const newUsername = decoded.substring(0, decoded.indexOf(":"));
    const textPassword = decoded.substring(decoded.indexOf(":") + 1, decoded.length);

    // Making sure there weren't any extra colons
    if (textPassword.includes(":")) {
        res.status(400).send({ success: false, error: "Bad request: Invalid username or password" });
        return;
    }

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
                        image: {
                            url: "https://res.cloudinary.com/dsra1nu4c/image/upload/v1617920616/abstract-green-gradient-bs_mtqkuk.jpg",
                            cloudinaryID: "abstract-green-gradient-bs_mtqkuk",
                            created_at: new Date()
                        },
                        rating: 0.0,
                        savedRecipes: [],
                        isAdmin: false,
                        isBanned: false
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
POST: /auth/login
Login to FitMeals
*/
router.post("/login", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Getting the encoded username/password info and checking validity
    const decoded = Buffer.from(req.headers.authorization, 'base64').toString('ascii');
    if ((decoded.match(/:/g) || []).length > 1) {
        res.status(400).send({ success: false, error: "Bad request - Invalid username or password" });
        return;
    }
    const inputUsername = decoded.substring(0, decoded.indexOf(":"));
    const textPassword = decoded.substring(decoded.indexOf(":") + 1, decoded.length);

    // Try to find the correct user
    User.findOne({ username: inputUsername }).then((user) => {
        if (user == null) {
            res.status(404).send({ success: false, error: "User not found" });
            return;
        }
        // Checking if the user is banned
        if (user.isBanned) {
            res.status(401).send({ success: false, error: "User banned" });
            return;
        }
        // Checking if the password is correct and sending user info if it is
        if (bcrypt.compareSync(textPassword, user.password)) {
            res.send({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    authToken: user.authToken,
                    fullname: user.fullname,
                    email: user.email,
                    image: user.image,
                    isAdmin: user.isAdmin,
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

/*
POST: /auth/login-authtoken
Login to FitMeals with an authtoken instead of username/password
*/
router.post("/login-authtoken", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Try to find the correct user
    if (req.headers.authorization) {
        User.findOne({ authToken: req.headers.authorization }).then((user) => {
            if (user == null) {
                res.status(404).send({ success: false, error: "User not found" });
                return;
            }
            // Checking if the user is banned
            if (user.isBanned) {
                res.status(401).send({ success: false, error: "User banned" });
                return;
            }
            // Sending the user info
            res.send({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    authToken: user.authToken,
                    fullname: user.fullname,
                    email: user.email,
                    image: user.image,
                    isAdmin: user.isAdmin,
                }
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal server error" });
        });
    } else {
        res.status(401).send({ success: false, error: "Unauthorized" });
    }
});

/*
PATCH: /auth/change-password
Change a user's password assuming they know their old password
*/
router.patch("/change-password", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Getting the encoded authToken/username/password info and checking validity
    const decoded = Buffer.from(req.headers.authorization, 'base64').toString('ascii');
    if ((decoded.match(/:/g) || []).length > 2) {
        res.status(400).send({ success: false, error: "Bad request - Invalid username or password" });
        return;
    }
    const userAuthToken = decoded.substring(0, decoded.indexOf(":"));
    const decoded2 = decoded.substring(decoded.indexOf(":") + 1, decoded.length);
    const oldPassword = decoded2.substring(0, decoded2.indexOf(":"));
    const newPassword = decoded2.substring(decoded2.indexOf(":") + 1, decoded2.length)

    // Try to find the correct user
    User.findOne({ authToken: userAuthToken }).then((user) => {
        if (user == null) {
            res.status(404).send({ success: false, error: "User not found" });
            return;
        }
        // Checking if the password is correct and changing the password
        if (bcrypt.compareSync(oldPassword, user.password)) {
            const hash = bcrypt.hashSync(newPassword, 10);
            user.password = hash;
            // Saving the user to the DB
            user.save().then((result) => {
                res.status(201).send({ success: true });
            }).catch((error) => {
                console.log(error);
                res.status(500).send({ success: false, error: "Internal server error" });
            });
        } else {
            res.status(404).send({ success: false, error: "User not found" });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ success: false, error: "Internal server error" });
    });
});

/*
POST: /auth/forgot-password
Send an email for password reset when a user forgets it
*/
router.post("/forgot-password", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Check if the email or username is given in the body
    if (!("username" in req.body || "email" in req.body)) {
        res.status(400).send({ success: false, error: "Bad request" });
        return;
    }
    
    // Getting the email credentials
    Auth.findById("606a6d20d41301e5181aef0f").then((emailInfo) => {
        // Getting the user and sending the email
        if ("username" in req.body) {
            User.findOne({ username: req.body.username }).then((user) => {
                if (user) {
                    // Generate token
                    let tempToken = uuidv4();
                    let currentTime = new Date();
                    sendForgotPasswordEmail(emailInfo.emailName, emailInfo.emailPassword, user.email, tempToken);
                    // Create a temporary token entry in DB for resetting the password
                    let token = new ResetPasswordToken({
                        user: user._id,
                        token: tempToken,
                        expires: new Date(currentTime.getTime() + 600000)
                    });
                    // Saving the user to the DB
                    token.save().then((result) => {
                        res.send({ success: true });
                    }).catch((error) => {
                        console.log(error);
                        res.status(500).send({ success: false, error: "Internal server error" });
                    });                    
                } else {
                    res.status(404).send({ success: false, error: "User not found" });
                    return;
                }
            })
        } else {
            User.findOne({ email: req.body.email }).then((user) => {
                if (user) {
                    sendForgotPasswordEmail(emailInfo.emailName, emailInfo.emailPassword, user.email);
                    res.send({ success: true });
                } else {
                    res.status(404).send({ success: false, error: "User not found" });
                    return;
                }
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ success: false, error: "Internal server error" });
    });
});

/*
POST: /forgot-password/reset
Reset a forgotten password
*/
router.post("/forgot-password/reset", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Getting the encoded temp token and new password are in the correct format
    const decoded = Buffer.from(req.headers.authorization, 'base64').toString('ascii');
    if ((decoded.match(/:/g) || []).length > 1) {
        res.status(400).send({ success: false, error: "Bad request" });
        return;
    }
    const tempToken = decoded.substring(0, decoded.indexOf(":"));
    const newPassword = decoded.substring(decoded.indexOf(":") + 1, decoded.length);

    // Try to find the correct temp token
    ResetPasswordToken.findOne({ token: tempToken }).then((result) => {
        // Checking if a token was found
        if (result == null) {
            res.status(404).send({ success: false, error: "Invalid token" });
            return;
        }
        // Checking if the token is expired
        if (new Date() - result.expires > 600000) {
            res.status(403).send({ success: false, error: "Token expired" });
        } else {
            // Updating the user's password
            User.findByIdAndUpdate(result.user, { password: bcrypt.hashSync(newPassword, 10) }, { useFindAndModify: false }).then((user => {
                if (user) {
                    res.send({ success: true });
                } else {
                    res.send({ success: true });
                }
            })).catch((error) => {
                console.log(error);
                res.status(500).send({ success: false, error: "Internal server error" });
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ success: false, error: "Internal server error" });
    });
});

// Helper function: Send forgot password email
function sendForgotPasswordEmail(emailName, password, recipient, token) {
    // Creating the email transporter 
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secure: false,
        port: 587,
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
            user: emailName,
            pass: password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Setting the email content
    let mailOptions = {
        from: `"FitMeals Admin" <${emailName}>`,
        to: recipient,
        subject: 'FitMeals Password Reset',
        html: `
        <b>Hello!</b><br>
        <br>
        You're getting this email because we received a request to reset the password of your account. To reset your password, click the link below:<br><br>
        <a href="${config.fitmealsHost.url + "reset-password/" + token}">Click here to reset your password.</a><br><br>
        If you did not request a password reset, please ignore this email.<br><br>
        <b>The FitMeals Team</b>
        `
    };

    // Sending the email
    transporter.sendMail(mailOptions).then((info) => {
        console.log(info.response);
    }).catch((error) => {
        console.log(error);
    });
}

// Exporting the routes
module.exports = router;