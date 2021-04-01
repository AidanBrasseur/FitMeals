const mongoose = require('mongoose');

const SavedRecipeSchema = new mongoose.Schema({
    recipeId: mongoose.Types.ObjectId
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    authToken: String,
    fullname: String,
    email: String,
    image: String,
    rating: Number,
    savedRecipes: [SavedRecipeSchema],
    isAdmin: Boolean,
    isBanned: Boolean
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };