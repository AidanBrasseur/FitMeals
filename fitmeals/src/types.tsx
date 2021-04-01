export type RecipePreviewType =  {
    categories: [string],
    title: string,
    subtitle: string,
    time: string,
    calories: number,
    image: string,
    rating?: number,
    id: number,
}

export type User = {
    id: string,
    name: string,
    email: string,
    authToken: string,
    username: string,
    isAdmin: boolean,
    image?: string,
}

export type Ingredient = {
    name: string,
    quantity?: number,
    unit: string,
}

export type Comment = {
    username: string,
    content: string,
    avatar: string
}

export type Macros = {
    protein: number, 
    carbs: number,
    fats: number
}

export type Recipe = {
    id: number,
    author: string,
    title: string,
    categories: string[],
    description: string,
    time: string,
    calories: number,
    subtitle: string,
    rating?: number,
    ingredients: Ingredient[],
    image: string,
    instructions: string[],
    comments: Comment[],
    macros: Macros,
}
