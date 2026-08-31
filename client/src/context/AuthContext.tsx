import {
  useCallback,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

import { readAuthFromStorage, writeAuthToStorage, clearAuthStorage } from "./authStorage";
import type { AuthUser } from "./AuthContext.types";

// =====================================================
// TYPES
// =====================================================

import { AuthContext } from "./AuthContextObject";

// =====================================================
// STORAGE HELPERS
// =====================================================
// "Remember me" -> localStorage (survives browser close)
// otherwise      -> sessionStorage (cleared on tab close)
// Both are cleared on every write so a stale copy can't
// linger in the other storage.

// storage helpers are in ./authStorage

// =====================================================
// PROVIDER
// =====================================================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // initialize from storage synchronously to avoid setState-in-effect
  const [user, setUser] = useState<AuthUser | null>(() => readAuthFromStorage().user);
  const [token, setToken] = useState<string | null>(() => readAuthFromStorage().token);
  const [isLoading] = useState(false);

  // Stay in sync if the user logs in/out in another tab.
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user" || e.key === null) {
        const { user: storedUser, token: storedToken } = readAuthFromStorage();
        setUser(storedUser);
        setToken(storedToken);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = useCallback(
    (newUser: AuthUser, newToken: string, rememberMe: boolean) => {
      writeAuthToStorage(newUser, newToken, rememberMe);
      setUser(newUser);
      setToken(newToken);
    },
    []
  );

  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback((updatedUser: AuthUser) => {
    setUser(updatedUser);

    // Keep whichever storage is currently holding the session in sync.
    const userData = JSON.stringify(updatedUser);
    if (localStorage.getItem("user")) {
      localStorage.setItem("user", userData);
    }
    if (sessionStorage.getItem("user")) {
      sessionStorage.setItem("user", userData);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: Boolean(user && token),
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};