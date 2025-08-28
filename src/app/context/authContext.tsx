"use client";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logOut: () => void;
};

const authContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // if (currentUser) {
      //   console.log("User authenticated:", currentUser.email);
      //   setUser(currentUser);
      // } else {
      //   console.log("User signed out");
      //   setUser(null);
      // }
    });

    return unSubscribe;
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
      // localStorage.getItem();
      setUser(null);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <authContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuthContext = () => useContext(authContext);
