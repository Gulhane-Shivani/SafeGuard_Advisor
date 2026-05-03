
export const PLATFORM_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
  CSR: 'CSR'
};

export const INITIAL_DATA = {
  users: [
    { id: 1, name: 'Admin One', email: 'admin@safeguard.com', role: 'SUPER_ADMIN', status: 'Active', branch: 'Main', avatar: 'AO' },
    { id: 2, name: 'John Agent', email: 'john@safeguard.com', role: 'AGENT', status: 'Active', branch: 'New York', avatar: 'JA' },
    { id: 3, name: 'Sarah Admin', email: 'sarah@safeguard.com', role: 'ADMIN', status: 'Active', branch: 'London', avatar: 'SA' },
    { id: 4, name: 'Mike CSR', email: 'mike@safeguard.com', role: 'CSR', status: 'Active', branch: 'Main', avatar: 'MC' },
  ],
  leads: [
    { id: 1, name: 'Robert Smith', email: 'robert@email.com', phone: '+1 234-567-8901', status: 'Hot', type: 'Life Insurance', source: 'Website', assignedTo: 2, createdAt: '2024-05-01' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', phone: '+1 234-567-8902', status: 'Warm', type: 'Health Insurance', source: 'Referral', assignedTo: 2, createdAt: '2024-05-02' },
    { id: 3, name: 'David Jones', email: 'david@email.com', phone: '+1 234-567-8903', status: 'Cold', type: 'Motor Insurance', source: 'LinkedIn', assignedTo: null, createdAt: '2024-05-03' },
  ],
  policies: [
    { id: 1, policyNumber: 'SG-LIFE-001', customerName: 'Alice Johnson', type: 'Life Insurance', status: 'Active', premium: '₹1,20,000', startDate: '2023-01-15', endDate: '2024-01-15', agentId: 2 },
    { id: 2, policyNumber: 'SG-HLTH-002', customerName: 'Bob Brown', type: 'Health Insurance', status: 'Renewal Due', premium: '₹80,000', startDate: '2023-05-20', endDate: '2024-05-20', agentId: 2 },
  ],
  claims: [
    { id: 1, claimNumber: 'CLM-2024-001', policyNumber: 'SG-LIFE-001', customerName: 'Alice Johnson', amount: '₹5,00,000', status: 'Pending', date: '2024-04-25', type: 'Accident' },
    { id: 2, claimNumber: 'CLM-2024-002', policyNumber: 'SG-HLTH-002', customerName: 'Bob Brown', amount: '₹1,20,000', status: 'Under Review', date: '2024-05-01', type: 'Medical' },
  ],
  products: [
    { id: 1, name: 'Life Term Shield', insurer: 'ICICI Lombard', category: 'Life', premium: '₹4,500/mo', commission: '15%' },
    { id: 2, name: 'Family Health Plus', insurer: 'Star Health', category: 'Health', premium: '₹7,200/mo', commission: '12%' },
  ],
  tickets: [
    { id: 1, ticketId: 'TKT-1001', customerName: 'Alice Johnson', subject: 'Policy document missing', status: 'Open', priority: 'High', date: '2024-05-03' },
    { id: 2, ticketId: 'TKT-1002', customerName: 'Bob Brown', subject: 'Premium payment issue', status: 'In Progress', priority: 'Medium', date: '2024-05-02' },
  ],
  tasks: [
    { id: 1, title: 'Call Robert Smith', date: '2024-05-04', type: 'Call', completed: false, agentId: 2 },
    { id: 2, title: 'Send quote to Emma', date: '2024-05-04', type: 'Email', completed: true, agentId: 2 },
  ],
  activityLogs: [
    { id: 1, user: 'John Agent', action: 'Called Lead: Robert Smith', time: '2 hours ago' },
    { id: 2, user: 'Sarah Admin', action: 'Approved Claim: CLM-2024-005', time: '4 hours ago' },
  ],
  commissions: [
    { id: 1, agentName: 'John Agent', amount: '₹37,500', status: 'Paid', date: '2024-04-30' },
    { id: 2, agentName: 'John Agent', amount: '₹23,000', status: 'Pending', date: '2024-05-02' },
  ]
};
