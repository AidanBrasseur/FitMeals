const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String
});

const CategorySchema = new mongoose.Schema({
    name: String
});

const InstructionSchema = new mongoose.Schema({
    order: Number,
    instruction: String
});

const CommentSchema = new mongoose.Schema({
    username: String,
    userImage: String,
    content: String
});

const MacroSchema = new mongoose.Schema({
    protein: Number,
    carbs: Number,
    fats: Number
});

const RecipeSchema = new mongoose.Schema({
    authorFullName: String,
    authorUsername: String,
    rating: Number,
    title: String,
    subtitle: String,
    description: String,
    time: String,
    calories: Number,
    image: String,
    ingredients: [IngredientSchema],
    categories: [CategorySchema],
    instructions: [InstructionSchema],
    comments: [CommentSchema],
    macros: [MacroSchema]
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = { Recipe };