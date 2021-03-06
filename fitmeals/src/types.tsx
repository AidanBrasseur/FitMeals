export type RecipePreviewType =  {
    categories: [string],
    title: string,
    subtitle: string,
    time: string,
    calories: number,
    image: string,
    rating?: number,
    id: string,
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
    id: string,
    username: string,
    content: string,
    avatar?: string,
    isLiked?: boolean,
}

export type Macros = {
    protein: number, 
    carbs: number,
    fats: number
}
export type Instruction = {
    instruction: string,
    image: string,
}
export type Recipe = {
    id: string,
    author: string,
    authorId: string,
    authorAvatar?: string,
    authorUsername?: string,
    title: string,
    categories: string[],
    description: string,
    time: string,
    calories: number,
    subtitle: string,
    rating?: number,
    ingredients: Ingredient[],
    image: string,
    instructions: Instruction[],
    comments: Comment[],
    macros: Macros,
}
