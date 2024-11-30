
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";

interface AuthContextType {
  isGuest: boolean;
  setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserName: string;
  setCurrentUserName: React.Dispatch<React.SetStateAction<string>>;
  currentUserEmail: string;
  setCurrentUserEmail: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  user: any; // Replace 'any' with a specific Clerk user type if available
  signInWithGoogle: () => void;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // To delay rendering until state is loaded

  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const { signIn } = useSignIn();

  // Initialize state from localStorage in a client-side effect
  useEffect(() => {
    const storedIsGuest = localStorage.getItem("isGuest");
    const storedUserName = localStorage.getItem("currentUserName");
    const storedUserEmail = localStorage.getItem("currentUserEmail");

    setIsGuest(storedIsGuest ? JSON.parse(storedIsGuest) : false);
    setCurrentUserName(storedUserName || "Guest");
    setCurrentUserEmail(storedUserEmail || "");
    setIsInitialized(true);
  }, []);

  // Update localStorage when values change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("isGuest", JSON.stringify(isGuest));
      localStorage.setItem("currentUserName", currentUserName);
      localStorage.setItem("currentUserEmail", currentUserEmail);
    }
  }, [isGuest, currentUserName, currentUserEmail, isInitialized]);

  // Update state with Clerk user data if available
  useEffect(() => {
    if (clerkUser) {
      const name = clerkUser.firstName || "Guest";
      const email = clerkUser.emailAddresses[0]?.emailAddress || "";

      setCurrentUserName(name);
      setCurrentUserEmail(email);

      // Persist to localStorage
      localStorage.setItem("currentUserName", name);
      localStorage.setItem("currentUserEmail", email);
      localStorage.setItem("isGuest", JSON.stringify(false));
    }
  }, [clerkUser]);

  const signInWithGoogle = async () => {
    try {
      if (signIn) {
        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/feed",
        });
      }
    } catch (err: any) {
      console.error("Sign-in failed:", err);
      setError(err.message || "An error occurred during Google sign-in");
    }
  };

  const isAuthenticated = isSignedIn || isGuest;

  const contextValue: AuthContextType = {
    isGuest,
    setIsGuest,
    currentUserName,
    setCurrentUserName,
    currentUserEmail,
    setCurrentUserEmail,
    isAuthenticated,
    user: clerkUser,
    signInWithGoogle,
    isLoading: !isLoaded || !isInitialized, // Delay rendering until initialized
    error,
  };

  // Prevent rendering children until state is initialized
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
