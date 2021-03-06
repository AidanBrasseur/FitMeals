import { User } from '../types';
export interface Session {
  user?: User
}

export const initialSession: Session = {}