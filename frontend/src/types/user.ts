interface User {
  _id?: string;
  email: string;
  username?: string;
  password: string;
  confirmPassword?: string;
}

interface UserState {
  loading?: boolean;
  error?: string;
  user?: User | null;
  isAuthenticated?: boolean;
  isRegistered?: boolean;
  clearError: () => void;
  register: (formData: User) => void;
  login: (formData: User) => void;
  logout: () => void;
  loadUser: () => void;
}

export type { User, UserState };
