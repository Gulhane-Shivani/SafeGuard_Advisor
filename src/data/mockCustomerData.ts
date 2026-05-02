export const CUSTOMER_DATA = {
  name: "Prashant Kumar",
  id: "CUST-98765",
  email: "prashant.k@example.com",
  phone: "+91 98765 43210",
  address: "123, Green Valley, HSR Layout, Bangalore - 560102",
  dob: "15 May 1988",
  bankDetails: {
    accountName: "Prashant Kumar",
    accountNumber: "XXXXXXXX4567",
    bankName: "HDFC Bank",
    ifsc: "HDFC0001234"
  },
  nominee: {
    name: "Sneha Kumar",
    relation: "Spouse",
    dob: "20 Oct 1990"
  },
  stats: {
    totalPolicies: 4,
    totalSumAssured: "₹1.5 Crore",
    totalPremium: "₹3,450/mo",
    activePolicies: 3,
    pendingClaims: 1,
    upcomingRenewals: 2
  },
  policies: [
    {
      id: "POL-LIC-2023001",
      title: "LIC Tech Term Plan",
      type: "Life Insurance",
      provider: "LIC of India",
      sumAssured: "₹1 Crore",
      premium: "₹1,199",
      dueDate: "12 Dec 2024",
      status: "Active",
      startDate: "12 Dec 2023",
      endDate: "12 Dec 2053",
      coverage: ["Death Benefit", "Terminal Illness Cover", "Tax Benefits u/s 80C"],
      benefits: ["Life Cover up to 80 years", "Flexible Premium Payment", "High Sum Assured Rebates"],
      cashValue: "₹0 (Term Plan)",
      surrenderValue: "₹0",
      loanEligibility: "No"
    },
    {
      id: "POL-STR-2022087",
      title: "Star Comprehensive Health",
      type: "Health Insurance",
      provider: "Star Health Insurance",
      sumAssured: "₹5 Lakh",
      premium: "₹799",
      dueDate: "20 Jan 2025",
      status: "Active",
      startDate: "20 Jan 2022",
      endDate: "19 Jan 2025",
      coverage: ["Hospitalization", "Day Care Procedures", "Road Ambulance", "Pre/Post Hospitalization"],
      benefits: ["No Claim Bonus", "Automatic Restoration", "Health Checkup Coverage"],
      nominee: "Sneha Kumar (Spouse)"
    },
    {
      id: "POL-BAJ-2024019",
      title: "Bajaj Allianz Car Insurance",
      type: "Motor Insurance",
      provider: "Bajaj Allianz",
      sumAssured: "IDV: ₹6.5 Lakh",
      premium: "₹499",
      dueDate: "05 Nov 2024",
      status: "Renewal Due",
      startDate: "06 Nov 2023",
      endDate: "05 Nov 2024",
      coverage: ["Third Party Liability", "Own Damage", "Zero Depreciation", "Key Replacement"],
      benefits: ["24x7 Roadside Assistance", "Cashless Repair at 4000+ Garages"]
    },
    {
      id: "POL-HDFC-2021005",
      title: "HDFC Ergo Home Insurance",
      type: "Property Insurance",
      provider: "HDFC Ergo",
      sumAssured: "₹50 Lakh",
      premium: "₹250",
      dueDate: "15 Aug 2024",
      status: "Expired",
      startDate: "15 Aug 2021",
      endDate: "14 Aug 2024",
      coverage: ["Fire & Allied Perils", "Burglary", "Earthquake"],
      benefits: ["Comprehensive Protection", "Easy Claims Process"]
    }
  ],
  claims: [
    {
      id: "CLM-20241024",
      policyId: "POL-STR-2022087",
      policyName: "Star Comprehensive Health",
      date: "24 Oct 2024",
      amount: "₹45,000",
      status: "Under Review",
      type: "Cashless",
      hospital: "Apollo Hospital, Bangalore"
    },
    {
      id: "CLM-20230512",
      policyId: "POL-BAJ-2024019",
      policyName: "Bajaj Allianz Car Insurance",
      date: "12 May 2023",
      amount: "₹12,500",
      status: "Settled",
      type: "Reimbursement",
      reason: "Accidental Damage"
    }
  ],
  payments: [
    { id: "PAY-9901", date: "12 Dec 2023", amount: "₹14,388", policy: "LIC Tech Term Plan", status: "Success", method: "Credit Card" },
    { id: "PAY-8822", date: "20 Jan 2024", amount: "₹9,588", policy: "Star Comprehensive Health", status: "Success", method: "UPI" },
    { id: "PAY-7733", date: "06 Nov 2023", amount: "₹5,988", policy: "Bajaj Allianz Car Insurance", status: "Success", method: "Net Banking" }
  ],
  serviceRequests: [
    { id: "SR-5512", type: "Address Change", date: "10 Feb 2024", status: "Completed", description: "Updated residential address" },
    { id: "SR-6678", type: "Nominee Update", date: "25 Apr 2024", status: "In Progress", description: "Changing nominee to Sneha Kumar" }
  ],
  notifications: [
    { id: 1, title: "Renewal Alert", message: "Your Motor Insurance expires in 3 days.", time: "2 hours ago", unread: true },
    { id: 2, title: "Claim Update", message: "Claim CLM-20241024 is now under medical review.", time: "1 day ago", unread: false },
    { id: 3, title: "Premium Received", message: "Thank you for your premium payment for LIC Term Plan.", time: "1 week ago", unread: false }
  ]
};
