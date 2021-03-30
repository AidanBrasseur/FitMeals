const router = require('express').Router();

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { Recipe } = require('../models/recipe');
const { User } = require('../models/user');
const { ObjectID } = require('mongodb');

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
        if(categoryQuery){
            match.categories = {$in: categoryQuery}
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
        let requestUser = undefined
        if (req.headers.authorization) {
            requestUser = User.findOne({ authToken: req.headers.authorization })
        }
        const recipe = await Recipe.find({ approved: true, _id: req.params.id }, "-__v")
        const user = await User.findById(recipe.user)
        recipe.user = user
        let fullComments = []
        recipe.comments.forEach(async comment => {
            const commentUser = await User.findById(comment.user)
            if(!commentUser.isBanned){
                let isLiked = false
                if(requestUser){
                   for(let i = 0; i < comment.likes.length; i++){
                      if(comment.likes[i] == requestUser._id){
                          isLiked = true
                          break;
                      }
                    }
                }
                fullComments.push({content: comment.content, userImage: commentUser.userImage, username: commentUser.username, userFullName: commentUser.userFullName, numLikes: comment.likes.length, isLiked: isLiked})
            }
        });
        recipe.comments = fullComments
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
        const searchQuery = req.body.searchQuery
        const categoryQuery = req.body.categoryQuery

        let match = { user: userId }
        if (searchQuery) {
            match.$text = { $search: searchQuery }
        }
        if (userId != user._id) {
            match.approved = true
        }
        if(categoryQuery){
            match.categories = {$in: categoryQuery}
        }
        const recipes = await Recipe.find(match, "-description -__v -ingredients -instructions -comments -macros").sort([['date', -1]])
        res.send(recipes)
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})

module.exports = router;