const router = require('express').Router();

// Get the Mongoose instance and models
const { mongoose } = require('../db/mongoose');
const { Recipe } = require('../models/recipe');
const { User } = require('../models/user');

/*
Get: /recipes
Gets currently approved recipe preview 
*/
router.get("/recipes", async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }  
    const searchQuery = req.searchQuery
    try{
        const recipes = await Recipe.find({approved: {$eq: true}}, "-description -__v -ingredients -instructions -comments -macros")
        recipes.filter((recipe)=> {
            const user = await User.findOne({_id: recipe.user})
            return !user.isBanned
        })
        res.send(recipes)
    }catch(error){
        res.status(500).send({ success: false, error: "Internal server error" });
        return;
    }
})