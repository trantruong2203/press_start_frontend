import { createContext } from 'react';
import type { UserResponse } from '../interface/UserResponse';

export interface AuthContextType {
  accountLogin: UserResponse | null;
  logout: () => void;
  getToken: () => Promise<void>;
}

export const ContextAuth = createContext<AuthContextType>({
  accountLogin: null,
  logout: () => { },
  getToken: async () => { },
}); 