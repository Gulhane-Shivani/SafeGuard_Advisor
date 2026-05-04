
export const PLATFORM_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
  CSR: 'CSR'
};

export const INITIAL_DATA = {
  users: [
    { id: 1, name: 'Admin One', email: 'admin@safeguard.com', role: 'SUPER_ADMIN', status: 'Active', branch: 'Mumbai', avatar: 'AO' },
    { id: 2, name: 'Karan Agent', email: 'karan@safeguard.com', role: 'AGENT', status: 'Active', branch: 'Delhi', avatar: 'KA' },
    { id: 3, name: 'Anjali Admin', email: 'anjali@safeguard.com', role: 'ADMIN', status: 'Active', branch: 'Bangalore', avatar: 'AA' },
    { id: 4, name: 'Sanjay CSR', email: 'sanjay@safeguard.com', role: 'CSR', status: 'Active', branch: 'Mumbai', avatar: 'SC' },
  ],
  leads: [
    { id: 1, name: 'Amit Sharma', email: 'amit@email.com', phone: '+91 98765-43210', status: 'Hot', type: 'Life Insurance', source: 'Website', assignedTo: 2, createdAt: '2024-05-01' },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 98765-43211', status: 'Warm', type: 'Health Insurance', source: 'Referral', assignedTo: 2, createdAt: '2024-05-02' },
    { id: 3, name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+91 98765-43212', status: 'Cold', type: 'Motor Insurance', source: 'LinkedIn', assignedTo: null, createdAt: '2024-05-03' },
  ],
  policies: [
    { id: 1, policyNumber: 'SG-LIFE-001', customerName: 'Sunita Rao', type: 'Life Insurance', status: 'Active', premium: '₹1,20,000', startDate: '2023-01-15', endDate: '2024-01-15', agentId: 2 },
    { id: 2, policyNumber: 'SG-HLTH-002', customerName: 'Vijay Mehta', type: 'Health Insurance', status: 'Renewal Due', premium: '₹80,000', startDate: '2023-05-20', endDate: '2024-05-20', agentId: 2 },
  ],
  claims: [
    { id: 1, claimNumber: 'CLM-2024-001', policyNumber: 'SG-LIFE-001', customerName: 'Sunita Rao', amount: '₹5,00,000', status: 'Pending', date: '2024-04-25', type: 'Accident' },
    { id: 2, claimNumber: 'CLM-2024-002', policyNumber: 'SG-HLTH-002', customerName: 'Vijay Mehta', amount: '₹1,20,000', status: 'Under Review', date: '2024-05-01', type: 'Medical' },
  ],
  products: [
    { id: 1, name: 'Life Term Shield', insurer: 'ICICI Lombard', category: 'Life', premium: '₹4,500/mo', commission: '15%' },
    { id: 2, name: 'Family Health Plus', insurer: 'Star Health', category: 'Health', premium: '₹7,200/mo', commission: '12%' },
  ],
  tickets: [
    { id: 1, ticketId: 'TKT-1001', customerName: 'Sunita Rao', subject: 'Policy document missing', status: 'Open', priority: 'High', date: '2024-05-03' },
    { id: 2, ticketId: 'TKT-1002', customerName: 'Vijay Mehta', subject: 'Premium payment issue', status: 'In Progress', priority: 'Medium', date: '2024-05-02' },
  ],
  tasks: [
    { id: 1, title: 'Call Amit Sharma', date: '2024-05-04', type: 'Call', completed: false, agentId: 2 },
    { id: 2, title: 'Send quote to Priya', date: '2024-05-04', type: 'Email', completed: true, agentId: 2 },
  ],
  activityLogs: [
    { id: 1, user: 'Karan Agent', action: 'Called Lead: Amit Sharma', time: '2 hours ago' },
    { id: 2, user: 'Anjali Admin', action: 'Approved Claim: CLM-2024-005', time: '4 hours ago' },
  ],
  commissions: [
    { id: 1, agentName: 'Karan Agent', amount: '₹37,500', status: 'Paid', date: '2024-04-30' },
    { id: 2, agentName: 'Karan Agent', amount: '₹23,000', status: 'Pending', date: '2024-05-02' },
  ]
};
