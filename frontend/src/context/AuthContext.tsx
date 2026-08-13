import React, { createContext, useContext, useState } from 'react';

interface AuthUser {
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('media_club_admin_token'));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('media_club_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('media_club_admin_token', newToken);
    localStorage.setItem('media_club_admin_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('media_club_admin_token');
    localStorage.removeItem('media_club_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
