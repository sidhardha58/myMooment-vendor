import { createContext } from "react";

export interface User {
  vendor_operational_status: string;
  id: string;
  name: string;
  status: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
