import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface AppState {
  user: any | null;
  plans: any[];
  isLoading: boolean;
}

interface AppContextType {
  state: AppState;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: null,
    plans: [],
    isLoading: false,
  });

  const login = async (_credentials: any) => {
    // Implement login logic
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null }));
  };

  return (
    <AppContext.Provider value={{ state, login, logout }}>
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
