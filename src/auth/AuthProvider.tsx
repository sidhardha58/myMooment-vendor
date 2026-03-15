import { useState } from "react";
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const savedToken = localStorage.getItem("vendor_token");
  const savedUser = localStorage.getItem("vendor_user");

  // Safe JSON parsing
  let parsedUser: User | null = null;

  try {
    parsedUser = savedUser ? JSON.parse(savedUser) : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("Invalid user in localStorage, clearing it");
    localStorage.removeItem("vendor_user");
    parsedUser = null;
  }

  const [token, setToken] = useState<string | null>(savedToken);
  const [user, setUser] = useState<User | null>(parsedUser);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("vendor_token", newToken);
    localStorage.setItem("vendor_user", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("vendor_user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
