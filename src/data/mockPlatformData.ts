
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
    { id: 1, name: 'Amit Sharma', email: 'amit@email.com', phone: '+91 98765-43210', status: 'Active', type: 'Life Insurance', source: 'Website', assignedTo: 2, createdAt: '2026-05-01' },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 98765-43211', status: 'Pending', type: 'Health Insurance', source: 'Referral', assignedTo: 2, createdAt: '2026-05-02' },
    { id: 3, name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+91 98765-43212', status: 'Expired', type: 'Motor Insurance', source: 'LinkedIn', assignedTo: null, createdAt: '2026-05-03' },
    { id: 4, name: 'Sanjay Dutt', email: 'sanjay.d@email.com', phone: '+91 98765-43213', status: 'Active', type: 'Health Insurance', source: 'Website', assignedTo: 2, createdAt: '2026-05-04' },
    { id: 5, name: 'Alia Bhatt', email: 'alia.b@email.com', phone: '+91 98765-43214', status: 'Renewal Due', type: 'Life Insurance', source: 'Referral', assignedTo: 2, createdAt: '2026-05-05' },
    { id: 6, name: 'Ranbir Kapoor', email: 'ranbir.k@email.com', phone: '+91 98765-43215', status: 'Pending', type: 'Motor Insurance', source: 'Social Media', assignedTo: 2, createdAt: '2026-05-01' },
  ],
  policies: [
    { id: 1, policyNumber: 'SG-LIFE-001', customerName: 'Sunita Rao', type: 'Life Insurance', status: 'Active', premium: '₹1,20,000', startDate: '2026-05-01', endDate: '2027-05-01', agentId: 2 },
    { id: 2, policyNumber: 'SG-HLTH-002', customerName: 'Vijay Mehta', type: 'Health Insurance', status: 'Renewal Due', premium: '₹80,000', startDate: '2026-05-02', endDate: '2027-05-02', agentId: 2 },
    { id: 3, policyNumber: 'SG-MOTR-003', customerName: 'Ramesh Patel', type: 'Motor Insurance', status: 'Expired', premium: '₹15,000', startDate: '2026-04-10', endDate: '2027-04-10', agentId: 2 },
    { id: 4, policyNumber: 'SG-LIFE-004', customerName: 'Anjali Desai', type: 'Life Insurance', status: 'Pending', premium: '₹95,000', startDate: '2026-05-03', endDate: '2027-05-03', agentId: 2 },
    { id: 5, policyNumber: 'SG-HLTH-005', customerName: 'Kunal Kapoor', type: 'Health Insurance', status: 'Renewal Due', premium: '₹45,000', startDate: '2026-05-04', endDate: '2027-05-04', agentId: 2 },
    { id: 6, policyNumber: 'SG-MOTR-006', customerName: 'Simran Singh', type: 'Motor Insurance', status: 'Active', premium: '₹22,000', startDate: '2026-02-10', endDate: '2027-02-10', agentId: 3 },
    { id: 7, policyNumber: 'SG-LIFE-007', customerName: 'Priya Patel', type: 'Life Insurance', status: 'Pending', premium: '₹1,50,000', startDate: '2026-04-12', endDate: '2027-04-12', agentId: 3 },
  ],
  claims: [
    { id: 1, claimNumber: 'CLM-2024-001', policyNumber: 'SG-LIFE-001', customerName: 'Sunita Rao', amount: '₹5,00,000', status: 'Pending', date: '2026-05-01', type: 'Accident' },
    { id: 2, claimNumber: 'CLM-2024-002', policyNumber: 'SG-HLTH-002', customerName: 'Vijay Mehta', amount: '₹1,20,000', status: 'Under Review', date: '2026-05-02', type: 'Medical' },
    { id: 3, claimNumber: 'CLM-2024-003', policyNumber: 'SG-MOTR-003', customerName: 'Ramesh Patel', amount: '₹35,000', status: 'Approved', date: '2026-04-20', type: 'Accident' },
    { id: 4, claimNumber: 'CLM-2024-004', policyNumber: 'SG-LIFE-004', customerName: 'Anjali Desai', amount: '₹10,00,000', status: 'Rejected', date: '2026-03-15', type: 'Death' },
    { id: 5, claimNumber: 'CLM-2024-005', policyNumber: 'SG-HLTH-005', customerName: 'Kunal Kapoor', amount: '₹45,000', status: 'Pending', date: '2026-05-04', type: 'Medical' },
  ],
  products: [
    { id: 1, name: 'Life Term Shield', insurer: 'ICICI Lombard', category: 'Life', premium: '₹4,500/mo', commission: '15%' },
    { id: 2, name: 'Family Health Plus', insurer: 'Star Health', category: 'Health', premium: '₹7,200/mo', commission: '12%' },
  ],
  tickets: [
    { id: 1, ticketId: 'TKT-1001', customerName: 'Sunita Rao', subject: 'Policy document missing', status: 'Open', priority: 'High', date: '2026-05-03' },
    { id: 2, ticketId: 'TKT-1002', customerName: 'Vijay Mehta', subject: 'Premium payment issue', status: 'In Progress', priority: 'Medium', date: '2026-05-02' },
    { id: 3, ticketId: 'TKT-1003', customerName: 'Ramesh Patel', subject: 'Claim status update', status: 'Closed', priority: 'Low', date: '2026-04-28' },
    { id: 4, ticketId: 'TKT-1004', customerName: 'Anjali Desai', subject: 'Nominee change request', status: 'Open', priority: 'Medium', date: '2026-05-04' },
    { id: 5, ticketId: 'TKT-1005', customerName: 'Kunal Kapoor', subject: 'Address update', status: 'Resolved', priority: 'Low', date: '2026-05-01' },
  ],
  tasks: [
    { id: 1, title: 'Call Amit Sharma', date: '2026-05-04', type: 'Call', completed: false, agentId: 2 },
    { id: 2, title: 'Send quote to Priya', date: '2026-05-04', type: 'Email', completed: true, agentId: 2 },
    { id: 3, title: 'Follow up on Claim CLM-2024-001', date: '2026-05-05', type: 'Call', completed: false, agentId: 4 },
    { id: 4, title: 'Verify documents for Kunal', date: '2026-05-05', type: 'Review', completed: false, agentId: 4 },
    { id: 5, title: 'Schedule meeting with Sanjay', date: '2026-05-06', type: 'Meeting', completed: false, agentId: 2 },
    { id: 6, title: 'Send renewal reminder to Vijay', date: '2026-05-06', type: 'Email', completed: false, agentId: 2 },
  ],
  activityLogs: [
    { id: 1, user: 'Karan Agent', action: 'Called Lead: Amit Sharma', time: '2 hours ago' },
    { id: 2, user: 'Anjali Admin', action: 'Approved Claim: CLM-2024-005', time: '4 hours ago' },
    { id: 3, user: 'Sanjay CSR', action: 'Resolved Ticket: TKT-1005', time: '5 hours ago' },
    { id: 4, user: 'Sanjay CSR', action: 'Updated Policy: SG-MOTR-003', time: '1 day ago' },
  ],
  commissions: [
    { id: 1, agentName: 'Karan Agent', amount: '₹37,500', status: 'Paid', date: '2026-04-30' },
    { id: 2, agentName: 'Karan Agent', amount: '₹23,000', status: 'Pending', date: '2026-05-02' },
    { id: 3, agentName: 'Karan Agent', amount: '₹12,500', status: 'Pending', date: '2026-05-05' },
    { id: 4, agentName: 'Karan Agent', amount: '₹45,000', status: 'Paid', date: '2026-03-31' },
    { id: 5, agentName: 'Karan Agent', amount: '₹18,000', status: 'Paid', date: '2026-02-28' },
  ]
};
