export interface User {
  name: string | null;
  photo: string | null;
  email: string | null;
  uid?: string;
  updateProfile?: ((args: any) => void) | undefined;
}
export type UserType = User | null;

export interface NavProp {
  user: UserType;
}

export interface ViewProp {
  user: UserType;
  children: React.ReactNode;
}
