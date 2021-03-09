import { User, Recipe, Ingredient } from '../types';
export interface Session {
  user?: User,
  approvedRecipes: Recipe[],
  underReviewRecipes: Recipe[],
  userRecipes: Recipe[],
}

let ingredients = [{ name: 'sugar', quantity: 4, unit: 'cups' } as Ingredient, { name: 'Cheese', quantity: 400, unit: 'g' } as Ingredient]
let instructions = ['do thing 1', 'do thing 2']

const recipes = [
  {
    id: 1,
    rating: 4.5,
    title: 'Grilled Salmon',
    subtitle: 'Super duper healthy fish',
    description: 'Super duper healthy fish',
    time: '10-20min',
    calories: 500,
    image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg",
    ingredients: ingredients,
    categories: ['Fish'],
    instructions: instructions
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
    instructions: instructions
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
    instructions: instructions
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
    instructions: instructions
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
    instructions: instructions
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
    instructions: instructions
  } as Recipe,
]


export const initialSession: Session = {
  approvedRecipes: recipes,
  underReviewRecipes: recipes,
  userRecipes: recipes,

}