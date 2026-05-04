import { useState, useEffect } from 'react';
import { useAppStore } from '../store';

// High-fidelity Mock Data for Customer Portal
const MOCK_DATA = {
  profile: {
    name: "Prashant Kumar",
    email: "test@example.com",
    phone: "+91 98765 43210",
    dob: "15 May 1992",
    address: "Flat 402, Green Glen Layout, Bellandur, Bangalore - 560103",
  },
  nominee: {
    name: "Sneha Kumar",
    relation: "Spouse",
    dob: "10 Jun 1994"
  },
  bankDetails: {
    bankName: "HDFC Bank",
    accountNumber: "**** 5562",
    accountName: "Prashant Kumar",
    ifsc: "HDFC0001234"
  },
  stats: {
    activePolicies: 3,
    totalCoverage: "₹75,00,000",
    monthlyPremium: "₹2,497",
    pendingClaims: 1
  },
  policies: [
    {
      id: "7",
      policy_number: "LIC-8829-9923",
      title: "LIC Tech Term Plan",
      provider: "LIC of India",
      type: "Life Insurance",
      status: "Active",
      premium: "₹1,199",
      due_date: "12 Jan 2025",
      start_date: "12 Jan 2024",
      end_date: "12 Jan 2044",
      coverage: ["Death Benefit", "Terminal Illness", "Accidental Death Rider"],
      benefits: ["High sum assured at low premium", "Tax benefits under 80C", "Pure risk cover"],
      nominee: "Sneha Kumar"
    },
    {
      id: "8",
      policy_number: "STAR-7721-0023",
      title: "Star Comprehensive Health",
      provider: "Star Health Insurance",
      type: "Health Insurance",
      status: "Active",
      premium: "₹799",
      due_date: "05 Aug 2025",
      start_date: "05 Aug 2023",
      end_date: "05 Aug 2024",
      coverage: ["Hospitalization", "Day Care Procedures", "Pre/Post Hospitalization"],
      benefits: ["Cashless treatment at 12000+ hospitals", "No claim bonus", "Restore benefit"],
      nominee: "Sneha Kumar"
    },
    {
      id: "9",
      policy_number: "BAJAJ-4422-1100",
      title: "Bajaj Allianz Car Insurance",
      provider: "Bajaj Allianz",
      type: "Motor Insurance",
      status: "Renewal Due",
      premium: "₹499",
      due_date: "05 Nov 2024",
      start_date: "05 Nov 2023",
      end_date: "05 Nov 2024",
      coverage: ["Third Party Liability", "Own Damage", "Personal Accident"],
      benefits: ["Cashless garages", "24x7 roadside assistance", "Easy claim settlement"],
      nominee: "Sneha Kumar"
    }
  ],
  claims: [
    {
      id: 1,
      claim_number: "CLM-99283",
      policy_title: "Star Comprehensive Health",
      status: "Under Review",
      date: "15 Mar 2024",
      amount: "₹45,000",
      type: "Cashless",
      hospital: "Apollo Hospital, Bangalore",
      reason: "Viral Fever & Dehydration"
    },
    {
      id: 2,
      claim_number: "CLM-45129",
      policy_title: "HDFC ERGO Optima Restore",
      status: "Settled",
      date: "10 Jan 2024",
      amount: "₹1,25,000",
      type: "Reimbursement",
      hospital: "Fortis Hospital, Mumbai",
      reason: "Surgery Settlement"
    }
  ],
  serviceRequests: [
    {
      id: 1,
      ticket_id: "SR-1029",
      subject: "Address Change Request",
      status: "In Progress",
      date: "20 Mar 2024",
      priority: "Medium",
      description: "Moving to a new apartment in the same area."
    }
  ],
  notifications: [
    { id: 1, title: "Premium Due", message: "Your LIC Tech Term Plan premium is due in 10 days.", unread: true, time: "2h ago" },
    { id: 2, title: "Claim Update", message: "Your claim CLM-99283 is currently under review.", unread: true, time: "5h ago" },
    { id: 3, title: "Welcome", message: "Welcome to SafeGuard Advisor! Explore your policies.", unread: false, time: "1d ago" }
  ],
  payments: [
    { id: "TXN-88291", policy: "LIC Tech Term Plan", amount: "₹1,199", date: "12 Jan 2024", status: "SUCCESS", method: "UPI" },
    { id: "TXN-77210", policy: "Star Comprehensive Health", amount: "₹799", date: "05 Aug 2023", status: "SUCCESS", method: "Debit Card" }
  ],
  loans: [
    {
      id: "LN-88210",
      policy: "LIC Tech Term Plan",
      amount: "₹50,000",
      date: "05 Feb 2024",
      status: "Disbursed",
      tenure: "12 Months",
      rate: "9% p.a."
    }
  ],
  supportTickets: [
    { id: 'TKT-9912', subject: 'Policy Renewal Query', status: 'Resolved', date: '10 Apr 2024' },
    { id: 'TKT-1002', subject: 'Document Verification', status: 'In Progress', date: '25 Apr 2024' },
  ]
};

export const useCustomerDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAppStore();
  const { user } = state;

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const storedPoliciesStr = localStorage.getItem('purchasedPolicies');
      const storedPolicies = storedPoliciesStr ? JSON.parse(storedPoliciesStr) : [];
      
      let totalPremiumVal = 2497;
      let totalCoverageVal = 7500000;
      
      storedPolicies.forEach((p: any) => {
        const premiumNum = parseInt(p.premium.replace(/[^0-9]/g, '')) || 0;
        totalPremiumVal += premiumNum;
        totalCoverageVal += 1000000; // Adding 10 Lakh per new policy for demo
      });
      
      setData({
        ...MOCK_DATA,
        profile: {
          ...MOCK_DATA.profile,
          name: user?.name || MOCK_DATA.profile.name,
          email: user?.email || MOCK_DATA.profile.email,
        },
        policies: [...storedPolicies, ...MOCK_DATA.policies],
        stats: {
          totalPolicies: MOCK_DATA.stats.activePolicies + storedPolicies.length,
          totalSumAssured: `₹${totalCoverageVal.toLocaleString('en-IN')}`,
          totalPremium: `₹${totalPremiumVal.toLocaleString('en-IN')}`,
          pendingClaims: MOCK_DATA.stats.pendingClaims
        }
      });
      setError(null);
    } catch (err: any) {
      setError('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const addClaim = (newClaim: any) => {
    setData((prev: any) => ({
      ...prev,
      claims: [newClaim, ...prev.claims]
    }));
  };

  const addServiceRequest = (newRequest: any) => {
    setData((prev: any) => ({
      ...prev,
      serviceRequests: [newRequest, ...prev.serviceRequests]
    }));
  };

  const addLoan = (newLoan: any) => {
    setData((prev: any) => ({
      ...prev,
      loans: [newLoan, ...(prev.loans || [])]
    }));
  };

  const updateProfile = (updatedProfile: any) => {
    setData((prev: any) => ({
      ...prev,
      profile: { ...prev.profile, ...updatedProfile }
    }));
  };

  const updateNominee = (updatedNominee: any) => {
    setData((prev: any) => ({
      ...prev,
      nominee: { ...prev.nominee, ...updatedNominee }
    }));
  };

  const updateBankDetails = (updatedBank: any) => {
    setData((prev: any) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, ...updatedBank }
    }));
  };

  const addSupportTicket = (newTicket: any) => {
    setData((prev: any) => ({
      ...prev,
      supportTickets: [newTicket, ...(prev.supportTickets || [])]
    }));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return { data, loading, error, refresh: fetchDashboard, addClaim, addServiceRequest, addLoan, updateProfile, updateNominee, updateBankDetails, addSupportTicket };
};
