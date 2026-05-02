import React, { createContext, useContext, ReactNode } from 'react';
import { useCustomerDashboard } from '../hooks/useCustomerDashboard';

interface CustomerContextType {
  data: any;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dashboard = useCustomerDashboard();
  return (
    <CustomerContext.Provider value={dashboard}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
