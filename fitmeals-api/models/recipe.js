const mongoose = require('mongoose');
const { User } = require('./user');

const ImageSchema = new mongoose.Schema({
    url: String,
    cloudinaryID: String,
    createdAt: String
});

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
    instruction: String,
    image: ImageSchema
});

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const MacroSchema = new mongoose.Schema({
    protein: Number,
    carbs: Number,
    fats: Number
});

const RecipeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    title: String,
    subtitle: String,
    description: String,
    time: String,
    calories: Number,
    image: ImageSchema,
    approved: Boolean,
    date: Date,
    ingredients: [IngredientSchema],
    categories: [CategorySchema],
    instructions: [InstructionSchema],
    comments: [CommentSchema],
    macros: MacroSchema
});
RecipeSchema.index({ title: 'text', subtitle: 'text', description: 'text', 'categories.name': 'text', 'instructions.instruction': 'text', 'comments.content': 'text' });
RecipeSchema.post("findOneAndDelete", document => {
    const recipeId = document._id
    User.find({ "savedRecipes.recipeId": recipeId }).then(users =>
        Promise.all(
            users.map(user =>
                User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedRecipes: { recipeId: recipeId } } },
                    { new: true, useFindAndModify: false }
                )
            )
        )
    );
})
const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = { Recipe };