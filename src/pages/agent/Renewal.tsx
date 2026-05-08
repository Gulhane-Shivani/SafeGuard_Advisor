import React, { useState } from 'react';
import { 
  Shield, 
  Clock, 
  HeartPulse, 
  Car, 
  Home, 
  AlertCircle,
  Search as SearchIcon // Alias to avoid conflict if needed
} from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

// import { CUSTOMER_DATA } from '../../data/mockCustomerData'; // Mock data for customer portal

// Helper function to style status badges
const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Active':
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case 'Pending':
      return "bg-blue-50 text-blue-600 border-blue-100";
    case 'Renewal Due':
      return "bg-orange-50 text-orange-600 border-orange-100";
    case 'Expired':
      return "bg-rose-50 text-rose-600 border-rose-100";
    default:
      return "bg-slate-50 text-slate-400 border-slate-100";
  }
};

const RenewalPage: React.FC = () => {
  const { data, updateData } = usePlatform();
  // const navigate = useNavigate();
  const [selectedPolicyForRenewal, setSelectedPolicyForRenewal] = useState<any>(null);
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Define status filters
  // const statusFilters = ['All', 'Active', 'Renewal Due', 'Expired'];
  const [policyFilter, setPolicyFilter] = useState('All');

  const agentId = 2; // Mocking logged in agent

  // Form State
  const [renewalDate, setRenewalDate] = useState('');
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});

  // Filter policies based on renewal status and search term
  const renewalPolicies = data.policies.filter((policy: any) => {
    const isMyPolicy = policy.agentId === agentId;
    const matchesFilter = policyFilter === 'All' || policy.status === policyFilter;
    // ONLY show Renewal Due or Expired
    const isRelevantForRenewal = policy.status === 'Renewal Due' || policy.status === 'Expired'; 
    const matchesSearch = (policy.policyNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          policy.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          policy.type.toLowerCase().includes(searchTerm.toLowerCase()));

    return isMyPolicy && matchesFilter && isRelevantForRenewal && matchesSearch;
  });

  const stats = [
    { label: 'Renewal Due', value: renewalPolicies.filter(p => p.status === 'Renewal Due').length, color: 'text-orange-600', bg: 'bg-orange-50', icon: Clock },
    { label: 'Active Policies', value: data.policies.filter(p => p.agentId === agentId && p.status === 'Active').length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Shield },
    { label: 'Expired', value: renewalPolicies.filter(p => p.status === 'Expired').length, color: 'text-rose-600', bg: 'bg-rose-50', icon: AlertCircle },
  ];

  const handleRenewPolicy = (policy: any) => {
    setSelectedPolicyForRenewal(policy);
    setRenewalDate(new Date().toISOString().split('T')[0]); // Default to today
    setIsPaymentDone(false);
    setFormErrors({});
    setIsRenewalModalOpen(true);
  };

  const handleRenewAction = () => {
    const errors: any = {};
    if (!renewalDate) errors.date = 'Please select a renewal date';
    if (!isPaymentDone) errors.payment = 'Payment confirmation is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updatedPolicies = data.policies.map(p => 
      p.id === selectedPolicyForRenewal.id ? 
        { 
          ...p, 
          status: 'Active',
          endDate: new Date(new Date(renewalDate).setFullYear(new Date(renewalDate).getFullYear() + 1)).toISOString().split('T')[0]
        } : p
    );
    updateData('policies', updatedPolicies);
    setIsRenewalModalOpen(false);
    setSelectedPolicyForRenewal(null);
  };

  const getPolicyTypeIcon = (type: string) => {
    if (type.includes('Health')) return <HeartPulse className="w-6 h-6" />;
    if (type.includes('Life')) return <Shield className="w-6 h-6" />;
    if (type.includes('Motor')) return <Car className="w-6 h-6" />;
    return <Home className="w-6 h-6" />;
  };

  return (
    <div className="space-y-10 pb-20">
      <SectionHeader 
        title="Policy Renewals" 
        description="Monitor and manage upcoming policy renewals to maintain client coverage and earn commissions."
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          <h3 className="text-lg font-bold text-slate-900">Filter by Status:</h3>
          <div className="flex flex-wrap gap-2">
            {['All', 'Renewal Due', 'Expired'].map(filter => (
              <button
                key={filter}
                onClick={() => setPolicyFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  policyFilter === filter
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search policies..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Renewal Policies Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm">
        <PlatformTable 
          title="Renewal Pipeline"
          description="Policies requiring attention for renewal"
          columns={[
            { 
              header: 'Policy Details', 
              accessor: 'type',
              render: (val: string, row: any) => (
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                    row.type.includes('Health') ? "bg-red-50 text-red-600" :
                    row.type.includes('Life') ? "bg-blue-50 text-blue-600" :
                    row.type.includes('Motor') ? "bg-orange-50 text-orange-600" : "bg-slate-50 text-slate-600"
                  )}>
                    {getPolicyTypeIcon(row.type)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{val}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{row.policyNumber}</p>
                  </div>
                </div>
              )
            },
            { header: 'Customer', accessor: 'customerName' },
            { 
              header: 'Expiry Date', 
              accessor: 'endDate',
              render: (val: string) => <span className="font-bold text-slate-700">{val}</span>
            },
            { 
              header: 'Premium', 
              accessor: 'premium',
              render: (val: string) => <span className="font-bold text-slate-700">{val}</span>
            },
            { 
              header: 'Status', 
              accessor: 'status',
              render: (val: string) => (
                <span className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 w-max",
                  getStatusBadgeClass(val)
                )}>
                  {val === 'Renewal Due' && <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />}
                  {val}
                </span>
              )
            },
            {
              header: 'Action',
              accessor: 'id',
              render: (_val: string, row: any) => (
                <button 
                  onClick={() => handleRenewPolicy(row)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                >
                  Renew
                </button>
              )
            }
          ]}
          data={renewalPolicies}
          filterKey="status"
        />
      </div>

      {/* Renewal Confirmation Modal */}
      <PlatformModal
        isOpen={isRenewalModalOpen}
        onClose={() => setIsRenewalModalOpen(false)}
        title={`Policy Renewal: ${selectedPolicyForRenewal?.policyNumber}`}
      >
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
             <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Policy Holder</span>
                <span className="text-sm font-black text-slate-900">{selectedPolicyForRenewal?.customerName}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Premium Amount</span>
                <span className="text-sm font-black text-teal-600">{selectedPolicyForRenewal?.premium}</span>
             </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">Renewal Date</label>
              <input 
                type="date" 
                className={cn(
                  "w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all",
                  formErrors.date ? "border-rose-500 focus:ring-rose-500/10" : "border-slate-200 focus:ring-teal-500/10"
                )}
                value={renewalDate}
                onChange={(e) => setRenewalDate(e.target.value)}
              />
              {formErrors.date && <p className="text-[10px] text-rose-500 font-bold mt-1 uppercase tracking-wider">{formErrors.date}</p>}
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50/50 border border-orange-100 rounded-2xl">
              <input 
                type="checkbox" 
                id="paymentConfirm"
                className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                checked={isPaymentDone}
                onChange={(e) => setIsPaymentDone(e.target.checked)}
              />
              <label htmlFor="paymentConfirm" className="text-xs font-bold text-slate-600 leading-relaxed cursor-pointer">
                I confirm that the renewal premium has been received and verified for this policy.
              </label>
            </div>
            {formErrors.payment && <p className="text-[10px] text-rose-500 font-bold mt-1 uppercase tracking-wider ml-7">{formErrors.payment}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => setIsRenewalModalOpen(false)}
              className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleRenewAction}
              className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all text-sm shadow-lg shadow-teal-600/20"
            >
              Complete Renewal
            </button>
          </div>
        </div>
      </PlatformModal>
    </div>
  );
};

export default RenewalPage;
