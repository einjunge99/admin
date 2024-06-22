import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { useNotification } from "./notification";
import { getUser } from "../client/api";

const AuthContext = createContext<{
  user: User | null;
  error: unknown | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  error: null,
  loginWithGoogle: () => Promise.resolve(),
  loginWithEmailAndPassword: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState();

  const getUserMutation = useMutation({
    mutationFn: getUser,
    onSuccess: (user) => {
      setUser(user);
    },
    onError: (error) => {
      setError(error);
    },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      console.log("auth changed");
      if (userAuth) {
        getUserMutation.mutate(userAuth.uid);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loginWithGoogle,
        loginWithEmailAndPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
