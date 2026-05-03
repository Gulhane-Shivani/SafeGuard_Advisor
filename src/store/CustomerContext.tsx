import React, { createContext, useContext, type ReactNode } from 'react';
import { useCustomerDashboard } from '../hooks/useCustomerDashboard';

interface CustomerContextType {
  data: any;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  addClaim: (newClaim: any) => void;
  addServiceRequest: (newRequest: any) => void;
  addLoan: (newLoan: any) => void;
  updateProfile: (updatedProfile: any) => void;
  updateNominee: (updatedNominee: any) => void;
  updateBankDetails: (updatedBank: any) => void;
  addSupportTicket: (newTicket: any) => void;
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
