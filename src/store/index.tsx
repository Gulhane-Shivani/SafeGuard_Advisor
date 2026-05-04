import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface AppState {
  user: any | null;
  plans: any[];
  isLoading: boolean;
}

interface AppContextType {
  state: AppState;
  setUser: (user: any) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return {
      user: isLoggedIn && savedUser ? JSON.parse(savedUser) : null,
      plans: [],
      isLoading: false,
    };
  });

  const setUser = (user: any) => {
    setState(prev => ({ ...prev, user }));
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    setState(prev => ({ ...prev, user: null }));
  };

  return (
    <AppContext.Provider value={{ state, setUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
