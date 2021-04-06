import { User, Recipe, Ingredient, Comment } from '../types';
export interface Session {
  user?: User,
}

export const initialSession: Session = {}