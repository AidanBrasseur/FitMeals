const router = require('express').Router();

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { Recipe } = require('../models/recipe');
const { User } = require('../models/user');
const { ObjectID } = require('mongodb')
/*
Post: /recipes/:id/comment
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
        const newComment = recipe.comments[recipe.comments.length - 1]
        res.send(newComment)
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})

/*
Post: /comments/:id/like
Adds or removes like from comment
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
        if (req.body.like) {
            modification.$addToSet = { 'comments.$.likes': requestUser._id }
        }
        else {
            modification.$pull = { 'comments.$.likes': requestUser._id }
        }

        const recipe = await Recipe.findOneAndUpdate({ comments: { $elemMatch: { _id: commentId } } }, modification, { useFindAndModify: false })
        res.sendStatus(200)
        return;
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})



module.exports = router;