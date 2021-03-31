const router = require('express').Router();

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { Recipe } = require('../models/recipe');
const { User } = require('../models/user');
const { ObjectID } = require('mongodb')
const upload = require('../middleware/upload');
// const  multer  = require('multer')
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, )
//     }, 
//     filename: function(req, file, cb){

//     }
// });

// const upload = multer({ dest: 'uploads/' });
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
    const searchQuery = req.searchQuery
    try {
        let match = { approved: true, $text: { $search: searchQuery } }
        if (!searchQuery) {
            match = { approved: true }
        }
        const recipes = await Recipe.find(match, "-description -__v -ingredients -instructions -comments -macros").sort([['date', -1]])
        recipes.filter(async (recipe) => {
            const user = await User.findById(recipe.user)
            return !user.isBanned
        })
        res.send(recipes)
    } catch (error) {
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
        const recipe = await Recipe.find({ approved: true, _id: req.params.id }, "-__v")
        res.send(recipe)
    } catch (error) {
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
                const requestUser = User.findOne({ authToken: req.headers.authorization })
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
        const searchQuery = req.searchQuery

        let match = { user: userId }
        if (searchQuery) {
            match.$text = { $search: searchQuery }
        }
        if (userId != user._id) {
            match.approved = true
        }
        const recipes = await Recipe.find(match, "-description -__v -ingredients -instructions -comments -macros").sort([['date', -1]])
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
    } catch(error){
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

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}



module.exports = router;