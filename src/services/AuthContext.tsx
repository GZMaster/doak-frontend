import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signup: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  verify: (otp: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (
    password: string,
    passwordConfirm: string,
    restToken: string
  ) => Promise<boolean>;
  checkTokenValidity: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => false,
  signup: async () => false,
  login: async () => false,
  verify: async () => false,
  logout: async () => false,
  forgotPassword: async () => false,
  resetPassword: async () => false,
  checkTokenValidity: async () => false,
});
