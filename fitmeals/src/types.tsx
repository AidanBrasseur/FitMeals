export type RecipePreviewType =  {
    category: string,
    title: string,
    subtitle: string,
    time: string,
    calories: number,
    image: string,
    rating?: number,
    id: number,
}

export type User = {
    name: string,
    email: string,
    authToken: string,
    username: string,
    isAdmin: boolean,
    image?: string,
}

export type Ingredient = {
    name: string,
    quantity: number,
    unit: string,
}
export type Macros = {
    protein: number, 
    carbs: number,
    fats: number
}

export type Recipe = {
    id: number,
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
    macros: Macros,
}