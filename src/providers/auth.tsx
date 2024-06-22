import { createContext, useContext, useEffect, useState } from "react";
import "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { User as AuthUser, signInWithEmailAndPassword } from "firebase/auth";
import { getUser } from "../client/api";

type User = {
  authProvider: string;
  displayName: string;
  email: string;
  role?: "admin";
  uid: string;
};

const AuthContext = createContext<{
  isLoading: boolean;
  user: User | null;
  error: unknown | null;
  loginWithGoogle: () => void;
  loginWithEmailAndPassword: (email: string, password: string) => void;
  logout: () => void;
  deleteAccount: () => void;
}>({
  isLoading: false,
  user: null,
  error: null,
  loginWithGoogle: () => {},
  loginWithEmailAndPassword: () => {},
  logout: () => {},
  deleteAccount: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (error) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 500);
  };

  const getUserMutation = useMutation({
    mutationFn: getUser,
    onSuccess: (user) => {
      setUser(user);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setIsLoading(false);
      setAuthUser(authUser);
      if (authUser) {
        getUserMutation.mutate(authUser.uid);
      } else {
        setUser(null);
        logout();
      }
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider).catch(handleError);
  };

  const loginWithEmailAndPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).catch(handleError);
  };

  const deleteAccount = () => {
    authUser?.delete();
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: getUserMutation.isPending || isLoading,
        user,
        error,
        loginWithGoogle,
        loginWithEmailAndPassword,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
