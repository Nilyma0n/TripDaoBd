export interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  phone?: string | null;
  role?: string;
  profile_image?: string | null;
  is_verified?: boolean;
}

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string, rememberMe: boolean) => void;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}
