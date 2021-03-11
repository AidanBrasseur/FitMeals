import { User, Recipe, Ingredient, Comment } from '../types';
export interface Session {
  user?: User,
  approvedRecipes: Recipe[],
  underReviewRecipes: Recipe[],
  userRecipes: Recipe[],
  savedRecipes: Recipe[]
}
let comments = [{ username: 'nedflanders', content: 'Hi-diddly-ho this is fan-diddly-tastic!', avatar: "http://cdn.pastemagazine.com/www/articles/2015/09/22/Ned-Flanders-ned-flanders-37176770-1024-768.png" } as Comment]
const salmonIngredients = [
  {
    name: "Salmon Fillets",
    quantity: 2,
    unit: ""
  } as Ingredient,
  {
    name: "Garlic Cloves",
    quantity: 2,
    unit: ""
  } as Ingredient,
  {
    name: "Lemon",
    quantity: 1,
    unit: ""
  } as Ingredient,
  {
    name: "Butter",
    quantity: 2,
    unit: "Cups"
  } as Ingredient
]
const macros = {
  protein: 50,
  carbs: 80,
  fats: 35
}

const recipes = [
  {
    id: 0,
    author: "Mr. Bean",
    rating: 4.5,
    title: 'Grilled Salmon',
    subtitle: 'Super duper healthy fish',
    description: "There's no healthier, easier, or faster summer entree than a perfect piece of grilled salmon. This 15-minute recipe is a staple in our regular dinner routine, and I'm so excited to share my tips with you today! Aside from pizza and spaghetti, I'd say that this particular grilled salmon recipe is one of the meals that I prepare most frequently for my family. It's my easy go-to when I feel like we need something nutritious, but I don't want to spend much time in the kitchen. Every boy in my house will clean his plate -- no questions asked -- which is certainly not always the case with other dinners that I serve. Any mom that's trying to please a family of 5 opinionated eaters can understand that it's a true GEM when you find a healthy recipe that appeals to the whole crew!",
    time: '10-20min',
    calories: 500,
    image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg",
    ingredients: salmonIngredients,
    categories: ['Fish'],
    instructions: ["Take the salmon out", "Cook it with garlic and lemon", "Now you have Salmon"],
    comments: comments,
    macros: macros
  } as Recipe,
  {
    id: 1,
    author: "Mr. Bean",
    rating: 4.3,
    title: "World's Best Pizza",
    subtitle: 'Super duper healthy pizza',
    description: 'Your search for the best homemade margherita pizza (made in a standard oven with everyday ingredients) is over! You’ll want to make this homemade pizza recipe over and over again.',
    time: '15-20min',
    calories: 400,
    image: "https://universityhealthnews.com/media/ispizzahealthy.jpg",
    ingredients: [
      { name: "All-purpose flour", quantity: 300, unit: "grams" } as Ingredient,
      { name: "Sugar", quantity: 1, unit: "teaspoon" } as Ingredient,
      { name: "Salt", quantity: 3 / 4, unit: "teaspoon" } as Ingredient,
      { name: "Crushed tomatoes", quantity: 1, unit: "cup" } as Ingredient,
      { name: "Crushed garlic cloves", quantity: 3, unit: "" } as Ingredient,
      { name: "Finely grated Parmigiano-Reggiano cheese", quantity: 3, unit: "tablespoons" } as Ingredient,
      { name: "Mozzarella cheese", quantity: 7, unit: "ounces" } as Ingredient,
      { name: "Fresh basil leaves", quantity: 6, unit: "" } as Ingredient
    ],
    categories: ['Pizza', 'Cheese', 'Italian'],
    instructions: ["Make the pizza dough", "Assemble the pizza by spreading the dough, adding the sauce and then the cheese/toppings", "Cook pizza in oven"],
    comments: comments,
    macros: macros
  } as Recipe,
  {
    id: 2,
    author: "Captain Hook",
    rating: 3.5,
    title: "Chickpea Salad",
    subtitle: 'Super duper healthy salad',
    description: 'Chickpea salad with tomatoes, cucumber and avocado is literally the easiest salad you can throw together in 15 minutes. Tasty, healthy, easy to make - there is nothing better than this!',
    time: '15-20min',
    calories: 235,
    image: "https://ifoodreal.com/wp-content/uploads/2020/05/chickpea-salad-11.jpg",
    ingredients: [
      { name: "Chickpeas", quantity: 1, unit: "cup" } as Ingredient,
      { name: "Chopped vegetables (cucumber, tomatoes)", quantity: 1, unit: "bowl" } as Ingredient,
      { name: "Avocado", quantity: 1, unit: "" } as Ingredient,
      { name: "Olive oil", quantity: 1, unit: "teaspoon" } as Ingredient,
      { name: "Lemon", quantity: 1, unit: "" } as Ingredient,
    ],
    categories: ['Salad', 'Vegetarian'],
    instructions: ["Dice avocado", "Make salad dressing by whisking the olive oil, lemon juice and salt/pepper", "Combine all ingredients into a bowl and stir gently"],
    comments: comments,
    macros: macros
  } as Recipe,
  {
    id: 3,
    author: "Det. James Carter",
    rating: 3.4,
    title: "Quinoa Salad",
    subtitle: 'Super duper healthy quinoa salad',
    description: 'Mediterranean quinoa salad with olives, feta and veggies is a marriage of quinoa and Greek salad. Lasts in the fridge for a few days making it perfect for work lunches!',
    time: '15-20min',
    calories: 235,
    image: "https://ifoodreal.com/wp-content/uploads/2017/10/mediterranean-quinoa-salad-7.jpg",
    ingredients: [
      { name: "Quinoa", quantity: 2, unit: "cups" } as Ingredient,
      { name: "Chopped vegetables (cucumber, tomatoes)", quantity: 1, unit: "bowl" } as Ingredient,
      { name: "Olives", quantity: 1, unit: "small bowl" } as Ingredient,
      { name: "Feta cheese", quantity: 1, unit: "block" } as Ingredient,
      { name: "Olive oil", quantity: 2, unit: "teaspoons" } as Ingredient,
    ],
    categories: ['Salad', 'Vegetarian'],
    instructions: ["Cook quinoa", "Add chopped vegetables and olives into bowl", "Crumble cheese into bowl and drizzle with olive oil", "Add cooked quinoa and mix"],
    comments: comments,
    macros: macros
  } as Recipe
]


export const initialSession: Session = {
  approvedRecipes: recipes,
  underReviewRecipes: recipes,
  userRecipes: [recipes[0], recipes[1]],
  savedRecipes: [recipes[3]]
}