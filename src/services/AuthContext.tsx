import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  signup: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  signup: async () => false,
  login: async () => false,
  logout: async () => {
    // Make API call to logout endpoint
    const response = await fetch("/api/logout", { method: "POST" });

    if (response.ok) {
      return;
    }
  },
});
