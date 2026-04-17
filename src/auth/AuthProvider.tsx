// auth/AuthProvider.tsx
import { useState } from "react";
import { AuthContext, type User, type Profile } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const savedToken = localStorage.getItem("vendor_token");
  const savedUser = localStorage.getItem("vendor_user");
  const savedProfile = localStorage.getItem("vendor_profile");

  let parsedUser: User | null = null;
  let parsedProfile: Profile | null = null;

  try {
    parsedUser = savedUser ? JSON.parse(savedUser) : null;
    parsedProfile = savedProfile ? JSON.parse(savedProfile) : null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("Invalid localStorage data, clearing...");
    localStorage.removeItem("vendor_user");
    localStorage.removeItem("vendor_profile");
    parsedUser = null;
    parsedProfile = null;
  }

  const [token, setToken] = useState<string | null>(savedToken);
  const [user, setUser] = useState<User | null>(parsedUser);
  const [profile, setProfile] = useState<Profile | null>(parsedProfile);

  const login = (newToken: string, newUser: User, newProfile: Profile) => {
    localStorage.setItem("vendor_token", newToken);
    localStorage.setItem("vendor_user", JSON.stringify(newUser));
    localStorage.setItem("vendor_profile", JSON.stringify(newProfile));

    setToken(newToken);
    setUser(newUser);
    setProfile(newProfile);
  };

  const logout = () => {
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("vendor_user");
    localStorage.removeItem("vendor_profile");

    setToken(null);
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};