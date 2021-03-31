const router = require('express').Router();

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { Recipe } = require('../models/recipe');
const { User } = require('../models/user');

const { ObjectID } = require('mongodb')
const upload = require('../middleware/upload');


/*
Get: /recipes
Gets currently approved recipe preview 
*/
router.get("/", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
    const searchQuery = req.body.searchQuery
    const categoryQuery = req.body.categoryQuery
    try {
        let match = { approved: true }
        if (searchQuery) {
            match.$text = { $search: searchQuery }
        }
        if (categoryQuery) {
            match.categories = { $in: categoryQuery }
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
        console.log(recipes)
        res.send(recipes)
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})

/*
Get: /recipes/categories
Gets current number of recipes in each category
*/
router.get("/categories", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
    try {
        const categoryOperators = [{
            $unwind: '$categories'
        },
        {
            $group: {
                _id: '$categories.name',
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                approved: true
            }
        }]
        const categoryCounts = await Recipe.aggregate(categoryOperators)
        res.send(categoryCounts)
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})

/*
Get: /recipes/:id
Gets detailed recipe information by id
*/
router.get("/:id", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
    try {
        let requestUser = undefined
        if (req.headers.authorization) {
            requestUser = User.findOne({ authToken: req.headers.authorization })
        }
        const recipe = await Recipe.findOne({ approved: true, _id: req.params.id }, "-__v")
        const user = await User.findOne({ _id: recipe.user }, "-password -authToken -email -isAdmin -__v")
        recipe.user = user
        let fullComments = []
        for (let i = 0; i < recipe.comments.length; i++) {
            let comment = recipe.comments[i]
            const commentUser = await User.findOne({ _id: comment.user })
            if (!commentUser.isBanned) {
                let isLiked = false
                if (requestUser) {
                    for (let i = 0; i < comment.likes.length; i++) {
                        if (comment.likes[i] == requestUser._id) {
                            isLiked = true
                            break;
                        }
                    }
                }
                fullComments.push({ commentId: comment._id, userId: commentUser._id, content: comment.content, userImage: commentUser.profileImageURL, username: commentUser.username, userFullName: commentUser.fullname, numLikes: comment.likes.length, isLiked: isLiked })
            }
        };
        let recipeObj = recipe.toObject()
        recipeObj.comments = fullComments
        res.send(recipeObj)
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})

/*
Get: /recipes/users/:id
Gets list of recipes for a given user
*/
router.get("/users/:id", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
    const userId = req.params.id
    if (!ObjectID.isValid(userId)) {
        res.status(404).send('A user with that id could not be found')
        return;
    }
    try {
        const user = await User.findById(userId)
        if (!user) {
            res.status(404).send('A user with that id could not be found')
        }
        if (user.isBanned) {
            if (req.headers.authorization) {
                const requestUser = await User.findOne({ authToken: req.headers.authorization })
                if (!requestUser.isAdmin) {
                    res.status(403).send('This user account has been banned')
                    return
                }
            }
            else {
                res.status(403).send('This user account has been banned')
                return
            }
        }
        const searchQuery = req.body.searchQuery
        const categoryQuery = req.body.categoryQuery

        let match = { user: userId }
        if (searchQuery) {
            match.$text = { $search: searchQuery }
        }
        if (userId != user._id) {
            match.approved = true
        }
        if (categoryQuery) {
            match.categories = { $in: categoryQuery }
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
        console.log(recipes)
        res.send(recipes)
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})


router.post('/', async (req, res) => {
    // Add code here
    // check mongoose connection established.

    try {
        await upload(req, res)
    } catch (error) {
        console.log(error)
        res.send('Error when trying to upload image');
        return;
    }

    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    console.log(req.file);

    // Create a new restaurant using the restaurant mongoose model
    // const restaurant = new Restaurant({
    // 	name: req.body.name,
    // 	description: req.body.description,
    // 	reservations: []
    // })

    const user = await User.findOne({ authToken: req.headers.authorization });
    if (!user) {
        res.status(401).send({ success: false, error: "Unauthorized" });
        return;
    }


    console.log(user);
    console.log(JSON.parse(req.body.instructions))

    const recipe = new Recipe({
        user: user._id,
        rating: req.body.rating,
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        time: req.body.time,
        calories: req.body.calories,
        image: req.file.id,
        approved: false,
        date: Date.now(),
        ingredients: req.body.ingredients ? JSON.parse(req.body.ingredients) : [],
        categories: req.body.categories ? JSON.parse(req.body.categories) : [],
        instructions: req.body.instructions ? JSON.parse(req.body.instructions) : [],
        comments: [],
        macros: req.body.macros
    })

    // Save restuarant to the database
    try {
        const result = await recipe.save()
        res.send(recipe)
    } catch (error) {
        console.log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }

})

/*
POST: /recipes/save/:id
Save the recipe with the given ID
*/
router.post("/save/:recipeid", (req, res) => {
    // Check for a valid mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }

    // Find the user to save this recipe to
    if (req.headers.authorization) {
        User.findOne({ authToken: req.headers.authorization }).then((user) => {
            if (user) {
                // Find the recipe and add it to the user's saved recipes collection
                Recipe.findOne({ _id: req.params.recipeid }).then((recipe) => {
                    if (recipe) {
                        user.savedRecipes.push({ recipeId: recipe._id });
                        user.save().then(() => {
                            res.send({ success: true });
                        }).catch((error) => {
                            console.log(error);
                            res.status(500).send({ success: false, error: "Internal server error" });
                        });
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

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}



module.exports = router;