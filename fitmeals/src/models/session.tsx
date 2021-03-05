export interface Session {
    isAuthenticated?: boolean;
    isAdmin? : boolean;
  }
  
  export const initialSession: Session = {}