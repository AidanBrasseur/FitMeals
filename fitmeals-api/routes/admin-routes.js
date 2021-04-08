// Creating the router
const router = require('express').Router();

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { User } = require('../models/user');
const { Recipe } = require('../models/recipe');

const log = console.log;

/*
POST: /admin/promote
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

/*
POST: /admin/ban
Ban a user from FitMeals
*/
router.post("/ban", (req, res) => {
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
                User.findOneAndUpdate({ username: req.body.username, isAdmin: false }, { isBanned: true }, { useFindAndModify: false }).then((promotedUser) => {
                    if (promotedUser) {
                        res.send({ success: true });
                    } else {
                        res.status(404).send({ success: false, error: "User not found (or is an admin)" });
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
PATCH: /admin/approve-recipe/:recipeid
Approve the recipe with the specified id
*/
router.patch("/approve-recipe/:recipeid", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Check if the user sending the request is a valid admin
    if (req.headers.authorization) {
        User.findOne({ authToken: req.headers.authorization }).then((user) => {
            // Promote if the requesting user is an admin
            if (user && user.isAdmin) {
                Recipe.findOneAndUpdate({ _id: req.params.recipeid }, { approved: true }, { useFindAndModify: false }).then((approvedRecipe) => {
                    if (approvedRecipe) {
                        res.send({ success: true });
                    } else {
                        res.status(404).send({ success: false, error: "Recipe not found" });
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
PATCH: /admin/reject-recipe/:recipeid
Reject the recipe with the specified id
*/
router.patch("/reject-recipe/:recipeid", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Check if the user sending the request is a valid admin
    if (req.headers.authorization) {
        User.findOne({ authToken: req.headers.authorization }).then((user) => {
            // Promote if the requesting user is an admin
            if (user && user.isAdmin) {
                Recipe.findOneAndUpdate({ _id: req.params.recipeid }, { approved: null }, { useFindAndModify: false }).then((rejectedRecipe) => {
                    if (rejectedRecipe) {
                        res.send({ success: true });
                    } else {
                        res.status(404).send({ success: false, error: "Recipe not found" });
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
Get: /admin/recipes
Gets currently under review recipe previews
*/
router.get("/recipes", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
    if (!req.headers.authorization) {
        res.status(403).send('Unauthorized to view this information')
        return
    }
    const requestUser = await User.findOne({ authToken: req.headers.authorization })
    if(!requestUser){
        res.status(404).send('This user could not be found')
        return
    }
    if(!requestUser.isAdmin){
        res.status(401).send("Unauthorized to view these recipes")
        return
    }
    const searchQuery = req.query.searchQuery
    const categoryQuery = req.query.categoryQuery
    try {
        let match = { approved: false }
        if (searchQuery) {
            match.$text = { $search: searchQuery }
        }
        if (categoryQuery) {
            match["categories.name"] = { $in: categoryQuery }
        }
        let sort = {}
        let search = {}
        if (!searchQuery) {
            sort = [['date', -1]]

        }
        else {
            sort = {
                score: { $meta: "textScore" }
            }
            search = { score: { $meta: "textScore" } }
        }
        let recipes = await Recipe.find(match, search).select("-description -__v -ingredients -instructions -comments -macros").sort(sort)
        recipes.filter(async (recipe) => {
            const user = await User.findById(recipe.user)
            return !user.isBanned
        })
        res.send(recipes)
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})

module.exports = router;