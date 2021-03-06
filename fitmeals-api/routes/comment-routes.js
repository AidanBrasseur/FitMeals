const router = require('express').Router();

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { Recipe } = require('../models/recipe');
const { User } = require('../models/user');
const { ObjectID } = require('mongodb')

const log = console.log;

/*
Post: /comments/recipes/:id
Posts a new comment to a recipe
*/
router.post("/recipes/:id", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
    const recipeId = req.params.id
    if (!ObjectID.isValid(recipeId)) {
        res.status(404).send('A recipe with that id could not be found')
        return;
    }
    const commentContent = req.body.comment
    if(!commentContent || commentContent === ""){
        res.status(400).send("You must submit some content with a comment")
        return;
    }
    try {
        if (!req.headers.authorization) {
            res.status(403).send('You must be logged in to comment')
            return
        }
        const requestUser = await User.findOne({ authToken: req.headers.authorization })
        if (!requestUser) {
            res.status(403).send('You must be logged in to comment')
            return
        }
        const comment = ({
            user: requestUser._id,
            content: commentContent,
            likes: [],
        })
        const recipe = await Recipe.findOneAndUpdate({ _id: recipeId }, { $push: { comments: comment } }, { new: true, useFindAndModify: false })
        if(!recipe){
            res.status(404).send('A recipe with that id could not be found')
            return;
        }
        const newComment = recipe.comments[recipe.comments.length - 1]
        res.send(newComment)
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})

/*
Delete: comments/recipes/:id/comments/:commentId
Deletes a comment from a recipe
*/
router.delete("/recipes/:id/comments/:commentId", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
    const recipeId = req.params.id
    const commentId = req.params.commentId
    if (!ObjectID.isValid(recipeId) || !ObjectID.isValid(commentId)) {
        res.status(404).send('A comment with that id could not be found')
        return;
    }
    try {
        if (!req.headers.authorization) {
            res.status(403).send('Unauthorized')
            return
        }
        const requestUser = await User.findOne({ authToken: req.headers.authorization })
        if (!requestUser) {
            res.status(403).send('Unauthorized')
            return
        }
        const recipe = await Recipe.findById(recipeId)
        if(!recipe){
            res.status(404).send('A recipe with that id could not be found')
            return;
        }
        const comment = recipe.comments.find(comment => comment._id == commentId)
        if(!comment){
            res.status(404).send('A comment with that id could not be found')
            return;
        }
        if(comment.user.toString() !== requestUser._id.toString() && !requestUser.isAdmin){
            res.status(403).send('Unauthorized')
            return
        }
        const newRecipe = await Recipe.findOneAndUpdate({ _id: recipeId }, { $pull: { comments: {_id: commentId} } }, { new: true, useFindAndModify: false })
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})

/*
Post: /comments/:id/like
Adds like to comment
*/
router.post("/:id/like", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
    const commentId = req.params.id
    if (!ObjectID.isValid(commentId)) {
        res.status(404).send('A comment with that id could not be found')
        return;
    }

    try {
        if (!req.headers.authorization) {
            res.status(403).send('You must be logged in to like a comment')
            return
        }
        const requestUser = await User.findOne({ authToken: req.headers.authorization })
        if (!requestUser) {
            res.status(403).send('You must be logged in to like a comment')
            return
        }

        let modification = {}
       
        modification.$addToSet = { 'comments.$.likes': requestUser._id }
       

        const recipe = await Recipe.findOneAndUpdate({ comments: { $elemMatch: { _id: commentId } } }, modification, { useFindAndModify: false })
        if(!recipe){
            res.status(404).send('A comment with that id could not be found')
            return;
        }
        res.sendStatus(200)
        return;
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})

/*
Post: /comments/:id/unlike
Removes like from comment
*/
router.post("/:id/unlike", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
    const commentId = req.params.id
    if (!ObjectID.isValid(commentId)) {
        res.status(404).send('A comment with that id could not be found')
        return;
    }

    try {
        if (!req.headers.authorization) {
            res.status(403).send('You must be logged in to like a comment')
            return
        }
        const requestUser = await User.findOne({ authToken: req.headers.authorization })
        if (!requestUser) {
            res.status(403).send('You must be logged in to like a comment')
            return
        }

        let modification = {}
        modification.$pull = { 'comments.$.likes': requestUser._id }
        
        const recipe = await Recipe.findOneAndUpdate({ comments: { $elemMatch: { _id: commentId } } }, modification, { useFindAndModify: false })
        if(!recipe){
            res.status(404).send('A comment with that id could not be found')
            return;
        }
        res.sendStatus(200)
        return;
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})





module.exports = router;