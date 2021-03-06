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