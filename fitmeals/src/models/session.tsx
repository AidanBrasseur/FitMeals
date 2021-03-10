import { User, Recipe, Ingredient, Comment } from '../types';
export interface Session {
  user?: User,
  approvedRecipes: Recipe[],
  underReviewRecipes: Recipe[],
  userRecipes: Recipe[],
}

let ingredients = [{ name: 'sugar', quantity: 4, unit: 'cups' } as Ingredient, { name: 'Cheese', quantity: 400, unit: 'g' } as Ingredient]
let instructions = ['do thing 1', 'do thing 2']
let comments = [{ username: 'mrbean55', content: 'this is amazing' } as Comment, { username: 'mrbean55', content: 'wow' } as Comment]
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

const recipes = [
  {
    id: 1,
    author: "Rowan Atkinson",
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
    comments: comments
  } as Recipe,
  {
    id: 2,
    rating: 3.5,
    title: "World's Best Pizza",
    subtitle: 'Super duper healthy pizza',
    description: 'Super duper healthy pizza',
    time: '15-20min',
    calories: 700,
    image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg",
    ingredients: ingredients,
    categories: ['Pizza', 'Cheese', 'Italian', 'Unhealthy'],
    instructions: instructions,
    comments: comments
  } as Recipe,
  {
    id: 3,
    rating: 4.3,
    title: 'Healthy Pasta',
    subtitle: 'Super duper healthy pasta',
    description: 'Super duper healthy pasta',
    time: '20-30min',
    calories: 400,
    image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg",
    ingredients: ingredients,
    categories: ['Pasta'],
    instructions: instructions,
    comments: comments
  } as Recipe,
  {
    id: 4,
    rating: 3.1,
    title: 'Grilled Tuna',
    subtitle: 'Super duper healthy fish',
    description: 'Super duper healthy fish',
    time: '10-20min',
    calories: 500,
    image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg",
    ingredients: ingredients,
    categories: ['Fish'],
    instructions: instructions,
    comments: comments
  } as Recipe,
  {
    id: 5,
    rating: 4.7,
    title: 'Healthy Salad',
    subtitle: 'Super duper healthy salad',
    description: 'Super duper healthy salad',
    time: '10-20min',
    calories: 200,
    image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg",
    ingredients: ingredients,
    categories: ['Salads'],
    instructions: instructions,
    comments: comments
  } as Recipe,
  {
    id: 6,
    rating: 4.1,
    title: 'Healthy Burger',
    subtitle: 'Super duper healthy burger',
    description: 'Super duper healthy burger',
    time: '20-30min',
    calories: 1000,
    image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg",
    ingredients: ingredients,
    categories: ['Burgers'],
    instructions: instructions,
    comments: comments
  } as Recipe,
]


export const initialSession: Session = {
  approvedRecipes: recipes,
  underReviewRecipes: recipes,
  userRecipes: recipes,

}