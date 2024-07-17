import { AuthContextType, AuthProviderProps } from "@/types";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticating, setIsAuthenticating }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used with a AuthProvider");
  }
  return context;
}
