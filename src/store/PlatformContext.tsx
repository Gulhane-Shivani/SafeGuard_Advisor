
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { INITIAL_DATA, PLATFORM_ROLES } from '../data/mockPlatformData';

interface PlatformContextType {
  data: typeof INITIAL_DATA;
  role: string;
  setRole: (role: string) => void;
  updateData: (key: keyof typeof INITIAL_DATA, newData: any) => void;
  addItem: (key: keyof typeof INITIAL_DATA, item: any) => void;
  removeItem: (key: keyof typeof INITIAL_DATA, id: number) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [role, setRole] = useState(PLATFORM_ROLES.SUPER_ADMIN);

  const updateData = (key: keyof typeof INITIAL_DATA, newData: any) => {
    setData(prev => ({
      ...prev,
      [key]: newData
    }));
  };

  const addItem = (key: keyof typeof INITIAL_DATA, item: any) => {
    setData(prev => ({
      ...prev,
      [key]: [...(prev[key] as any[]), { ...item, id: Math.max(0, ...(prev[key] as any[]).map(i => i.id)) + 1 }]
    }));
  };

  const removeItem = (key: keyof typeof INITIAL_DATA, id: number) => {
    setData(prev => ({
      ...prev,
      [key]: (prev[key] as any[]).filter(item => item.id !== id)
    }));
  };

  return (
    <PlatformContext.Provider value={{ data, role, setRole, updateData, addItem, removeItem }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
