import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Receipt,
  TrendingUp, Star, Users,
  Zap, Eye
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import { CustomerProfileDetail } from '../../components/admin/CustomerProfileDetail';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { usePlatform } from '../../store/PlatformContext';
import API from '../../api/baseurl';

export const CustomerDetailView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = usePlatform();
  const basePath = location.pathname.split('/').slice(0, 2).join('/');
  
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getBackPath = () => {
    if (location.pathname.includes('/super-admin/users/customers/')) return '/super-admin/users?tab=customers';
    if (location.pathname.includes('/admin/customers/')) return '/admin/customers';
    if (location.pathname.includes('/agent/customers/')) return '/agent/customers';
    if (location.pathname.includes('/agent/leads/')) return '/agent/leads';
    return basePath;
  };

  const getMockDetails = (uid: string, name: string = 'Customer') => {
    const num = parseInt(uid) || (uid.length > 0 ? uid.charCodeAt(0) : 0);
    const nominees = ['Karan Mehta', 'Priya Sharma', 'Rahul Verma', 'Sonia Singh', 'Amit Kumar'];
    const relations = ['Son', 'Spouse', 'Brother', 'Daughter', 'Father'];
    const banks = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra'];
    
    // Check if we have real policies for this name in our context
    const realPolicies = data.policies.filter(p => p.customerName === name);
    
    const displayPolicies = realPolicies.length > 0 ? realPolicies.map(p => ({
      id: p.id,
      policyNumber: p.policyNumber,
      type: p.type,
      premium: p.premium,
      status: p.status,
      period: `${p.startDate || '2023-05-01'} to ${p.endDate || '2024-05-01'}`,
      coverage: ['Accidental Cover', 'Death Benefit', 'Critical Illness'].slice(0, 2),
      benefits: ['Tax Savings', 'Cashless', 'No Claim Bonus'].slice(0, 2)
    })) : [
      {
        id: 2000 + num,
        policyNumber: `SG-LIFE-${7000 + num}`,
        type: 'Life Insurance',
        premium: `₹25,000`,
        status: 'Active',
        period: `2023-05-10 to 2024-05-10`,
        coverage: ['Death Benefit', 'Accidental Cover'],
        benefits: ['Tax Savings', 'Cashless']
      }
    ];

    return {
      nominee: {
        name: nominees[num % nominees.length],
        relation: relations[num % relations.length],
        dob: `${10 + (num % 20)} May ${1990 + (num % 20)}`
      },
      bankDetails: {
        bankName: banks[num % banks.length],
        accountNumber: `XXXX XXXX ${8000 + num}`,
        accountName: name,
        ifsc: `${banks[num % banks.length].substring(0, 4).toUpperCase()}000${1234 + num}`
      },
      portfolio: {
        activePolicies: displayPolicies.length,
        sumInsured: `₹${(num % 10 + 5) * 5},00,000`,
        premium: `₹${(num % 10 + 1) * 15},000`,
        tenure: `${(num % 5) + 1}.5 Years`
      },
      policies: displayPolicies
    };
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const decodedId = decodeURIComponent(id || '');
        // 1. Try to find in local data first (policies/leads)
        const lead = data.leads.find(l => String(l.id) === decodedId || l.name === decodedId);
        const policy = data.policies.find(p => String(p.id) === decodedId || p.customerName === decodedId);
        
        if (lead) {
          setCustomer({
            id: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            avatar: lead.name.charAt(0).toUpperCase(),
            status: 'Prospect'
          });
          setLoading(false);
          return;
        }

        if (policy) {
          const pName = (policy as any).customerName || (policy as any).customer || 'Customer';
          setCustomer({
            id: policy.id,
            name: pName,
            email: `${pName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
            phone: '+91 98765 43210',
            avatar: pName.charAt(0).toUpperCase(),
            status: 'Active'
          });
          setLoading(false);
          return;
        }

        // 2. Fallback to API
        const response = await API.get(`/admin/users`);
        const found = response.data.find((u: any) => String(u.id) === decodedId || u.full_name === decodedId);
        if (found) {
          const displayName = (found.full_name && found.full_name !== 'Anonymous') ? found.full_name : (found.email || found.mobile || 'Unknown User');
          setCustomer({
            ...found,
            name: displayName,
            avatar: displayName.charAt(0).toUpperCase(),
            phone: found.mobile || '+91 98765 43210',
            status: found.status || 'Active'
          });
        }
      } catch (err) {
        console.error("Failed to fetch customer", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id, data]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Intelligence...</p>
      </div>
    );
  }

  const displayName = customer?.name || (typeof id === 'string' ? decodeURIComponent(id) : 'Unknown Customer');
  const details = getMockDetails(id || '0', displayName);

  if (!customer && details.policies.length === 0) {
    return (
      <div className="p-20 text-center space-y-4">
        <Users className="w-16 h-16 text-slate-200 mx-auto" />
        <h2 className="text-xl font-black text-slate-900">Customer Not Found</h2>
        <button onClick={() => navigate(getBackPath())} className="text-teal-600 font-bold hover:underline">Back to Database</button>
      </div>
    );
  }

  const policyColumns = [
    {
      header: 'Policy Details',
      accessor: 'policyNumber',
      render: (val: string, row: any) => (
        <div>
          <p className="font-black text-slate-900 leading-none">{val}</p>
          <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{row.type}</p>
        </div>
      )
    },
    {
      header: 'Policy Period',
      accessor: 'period',
      render: (val: string) => <span className="text-[11px] font-bold text-slate-600">{val}</span>
    },
    {
      header: 'Coverage & Benefits',
      accessor: 'coverage',
      render: (val: string[], row: any) => (
        <div className="space-y-1">
          <div className="flex flex-wrap gap-1">
            {val.map((c, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-teal-50 text-teal-600 rounded text-[8px] font-black uppercase tracking-tight border border-teal-100">{c}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {row.benefits.map((b: string, i: number) => (
              <span key={i} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[8px] font-black uppercase tracking-tight border border-blue-100">{b}</span>
            ))}
          </div>
        </div>
      )
    },
    {
      header: 'Premium',
      accessor: 'premium',
      render: (val: string) => <span className="font-black text-slate-900">{val}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Active' || val === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
        )}>
          {val}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (val: string) => (
        <button 
          onClick={() => navigate(`${basePath}/policies/${val}`)}
          className="p-2 bg-slate-50 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
          title="View issuance details"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-20 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(getBackPath())} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-teal-600 transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Customer Intelligence</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Portfolio / UID-{customer?.id || id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
            <Zap className="w-4 h-4 text-teal-400" /> System Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-8">
          <CustomerProfileDetail 
            user={{
              name: customer?.name || displayName,
              email: customer?.email || `${displayName.toLowerCase().replace(' ', '.')}@email.com`,
              phone: customer?.phone || '+91 98765 43210',
              avatar: customer?.avatar || displayName.charAt(0).toUpperCase(),
              address: customer?.address,
              status: customer?.status
            }}
            nominee={details.nominee}
            bankDetails={details.bankDetails}
            showBankDetails={false} 
          />
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4">
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8 h-full">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <h4 className="text-sm font-black uppercase tracking-[0.2em]">Portfolio Overview</h4>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Active Policies', value: details.portfolio.activePolicies.toString().padStart(2, '0') },
                  { label: 'Total Sum Insured', value: details.portfolio.sumInsured },
                  { label: 'Total Premium (FY)', value: details.portfolio.premium },
                  { label: 'Loyalty Tenure', value: details.portfolio.tenure },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-teal-600 transition-colors text-[9px]">{row.label}</span>
                    <span className="text-xs font-black text-slate-900">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50/50 p-6 rounded-[1.5rem] border border-emerald-100 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm font-black text-sm border border-emerald-50">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1.5 text-[8px]">Lead Scoring</p>
                  <p className="text-sm font-black text-slate-900">{details.portfolio.activePolicies > 2 ? 'Highly Engaged' : details.portfolio.activePolicies > 0 ? 'Active Client' : 'New Member'}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* FULL WIDTH Table Below */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div>
               <h3 className="text-lg font-black text-slate-900 tracking-tight">Personal Policies</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Full breakdown of coverage and current status</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl">
               <Receipt className="w-5 h-5 text-slate-400" />
            </div>
         </div>
         <div className="p-0 overflow-x-auto">
            <PlatformTable 
               title="Coverage Ledger"
               description="Personal insurance policies and active coverage details"
               columns={policyColumns}
               data={details.policies}
               filterKey="status"
               filterOptions={['Active', 'Renewal Due', 'Expired', 'Reminder Sent']}
               pageSize={5}
            />
         </div>
      </div>
    </div>
  );
};
