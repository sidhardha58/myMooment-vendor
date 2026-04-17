// auth/AuthContext.ts
import { createContext } from "react";

export interface User {
  id: string;
  role: string;
  email: string;
  phone_number: string;
}

export interface Profile {
  id: string;
  user_id: string;
  vendor_operational_status: string;
  display_name: string;
  full_name: string;
  // add other fields as needed
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  token: string | null;
  login: (token: string, user: User, profile: Profile) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);