import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'municipality_worker' | 'health_official' | 'community_volunteer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - in real app, this would call your API
    const mockUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      role,
      phone: '+91 9876543210',
      organization: role === 'municipality_worker' ? 'Municipal Corporation' : 'Health Department'
    };
    setUser(mockUser);
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    // Mock registration - in real app, this would call your API
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    delete (newUser as any).password;
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};