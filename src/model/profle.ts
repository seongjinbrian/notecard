export interface User {
    name: string | null;
    photo: string | null;
    email: string | null;
    uid?: string;
    updateProfile?: ((args:any) => void) | undefined
  }
  export type UserType = User | null;