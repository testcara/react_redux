export interface AuthFormProps {
  onSubmit: (username: string, password: string) => void;
  buttonText: string;
  error?: string | null;
}

export interface UserProps {
    username: string;
    password: string;
}

export interface UserTabProps {
   isAuthenticated: boolean;
   user: UserProps;
   logout: ()=>void
}