import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Shield, CheckCircle2, 
  Download, History, Receipt,
  TrendingUp, Star, Users, MapPin, Mail, Phone,
  ExternalLink, Zap, Briefcase
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import { CustomerProfileDetail } from '../../components/admin/CustomerProfileDetail';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { usePlatform } from '../../store/PlatformContext';
import API from '../../api/baseurl';

export const CustomerDetailView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: platformData } = usePlatform();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getMockDetails = (uid: string) => {
    const num = parseInt(uid) || 0;
    const nominees = ['Karan Mehta', 'Priya Sharma', 'Rahul Verma', 'Sonia Singh', 'Amit Kumar'];
    const relations = ['Son', 'Spouse', 'Brother', 'Daughter', 'Father'];
    const banks = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra'];
    
    const isNewUser = num > 10;
    const activePoliciesCount = isNewUser ? 0 : (num % 5) + 1;

    const mockPolicies = isNewUser ? [] : Array.from({ length: activePoliciesCount }).map((_, i) => ({
      id: 2000 + i + num,
      policyNumber: `SG-${['LIFE', 'HLTH', 'MOTR', 'INVS'][i % 4]}-${7000 + i + num}`,
      type: ['Life Insurance', 'Health Insurance', 'Motor Insurance', 'Investment'][i % 4],
      premium: `₹${(10 + (i % 5)) * 1000}`,
      status: i % 3 === 0 ? 'Renewal Due' : 'Active'
    }));

    return {
      nominee: {
        name: nominees[num % nominees.length],
        relation: relations[num % relations.length],
        dob: `${10 + (num % 20)} May ${1990 + (num % 20)}`
      },
      bankDetails: {
        bankName: banks[num % banks.length],
        accountNumber: `XXXX XXXX ${8000 + num}`,
        accountName: customer?.name || 'Customer Name',
        ifsc: `${banks[num % banks.length].substring(0, 4).toUpperCase()}000${1234 + num}`
      },
      portfolio: {
        activePolicies: activePoliciesCount,
        sumInsured: activePoliciesCount > 0 ? `₹${(num % 10 + 5) * 5},00,000` : '₹0',
        premium: activePoliciesCount > 0 ? `₹${(num % 10 + 1) * 15},000` : '₹0',
        tenure: activePoliciesCount > 0 ? `${(num % 5) + 1}.5 Years` : 'New Member'
      },
      policies: mockPolicies
    };
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await API.get(`/admin/users`);
        const found = response.data.find((u: any) => String(u.id) === String(id));
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
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-20 text-center space-y-4">
        <Users className="w-16 h-16 text-slate-200 mx-auto" />
        <h2 className="text-xl font-black text-slate-900">Customer Not Found</h2>
        <button onClick={() => navigate('/super-admin/users?tab=customers')} className="text-teal-600 font-bold hover:underline">Back to Database</button>
      </div>
    );
  }

  const details = getMockDetails(id || '0');

  const policyColumns = [
    {
      header: 'Policy ID',
      accessor: 'policyNumber',
      render: (val: string) => <span className="font-black text-slate-900">{val}</span>
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (val: string) => (
        <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          {val}
        </span>
      )
    },
    {
      header: 'Premium',
      accessor: 'premium',
      render: (val: string) => <span className="font-black text-teal-600">{val}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (val: string) => (
        <div className="flex items-center gap-1.5">
          <div className={cn("w-1.5 h-1.5 rounded-full", val === 'Active' ? "bg-emerald-500" : val === 'Renewal Due' ? "bg-orange-500" : "bg-red-500")} />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">{val}</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/super-admin/users?tab=customers')} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-teal-600 transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Customer Intelligence</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Portfolio / UID-{customer.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
            <Zap className="w-4 h-4 text-teal-400" /> System Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Profile Section */}
        <div className="col-span-8">
          <CustomerProfileDetail 
            user={{
              name: customer.name,
              email: customer.email,
              phone: customer.phone,
              avatar: customer.avatar,
              address: customer.address,
              status: customer.status
            }}
            nominee={details.nominee}
            bankDetails={details.bankDetails}
            showBankDetails={false} 
          />
        </div>

        {/* Intelligence Sidebar */}
        <div className="col-span-4">
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
         <div className="p-0">
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
