import type { AuthUser } from "./AuthContext.types";

export const readAuthFromStorage = (): { user: AuthUser | null; token: string | null } => {
  const rawUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!rawUser || !token) {
    return { user: null, token: null };
  }

  try {
    return { user: JSON.parse(rawUser) as AuthUser, token };
  } catch {
    return { user: null, token: null };
  }
};

export const writeAuthToStorage = (
  user: AuthUser,
  token: string,
  rememberMe: boolean
) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  const store = rememberMe ? localStorage : sessionStorage;
  store.setItem("token", token);
  store.setItem("user", JSON.stringify(user));
};

export const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
