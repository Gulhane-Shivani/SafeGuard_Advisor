import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, HeartPulse, Car, Home, Download, Search } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { CUSTOMER_DATA } from '../../data/mockCustomerData';
import { cn } from '../../utils/helpers';

const CustomerPolicies: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const data = CUSTOMER_DATA;

  const filtered = data.policies.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.provider.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const policyIcon = (type: string) => {
    if (type.includes('Health')) return <HeartPulse className="w-8 h-8" />;
    if (type.includes('Life'))   return <Shield className="w-8 h-8" />;
    if (type.includes('Motor'))  return <Car className="w-8 h-8" />;
    return <Home className="w-8 h-8" />;
  };

  const policyColor = (type: string) => {
    if (type.includes('Health')) return 'bg-red-50 text-red-600';
    if (type.includes('Life'))   return 'bg-blue-50 text-blue-600';
    if (type.includes('Motor'))  return 'bg-orange-50 text-orange-600';
    return 'bg-slate-50 text-slate-600';
  };

  return (
    <CustomerLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Policies</h1>
            <p className="text-slate-500 text-sm mt-1">Manage all your insurance policies in one place.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search policies..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 w-full"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {['All', 'Active', 'Renewal Due', 'Expired'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                filter === f ? 'bg-teal-600 text-white shadow' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Policy Cards */}
        <div className="space-y-4">
          {filtered.map(policy => (
            <div key={policy.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-teal-200 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shrink-0', policyColor(policy.type))}>
                    {policyIcon(policy.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-lg font-bold text-slate-900">{policy.title}</h3>
                      <span className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full font-bold',
                        policy.status === 'Active'       ? 'bg-teal-50 text-teal-600' :
                        policy.status === 'Renewal Due'  ? 'bg-orange-50 text-orange-600' :
                                                           'bg-slate-100 text-slate-500'
                      )}>
                        {policy.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{policy.id} • {policy.provider}</p>
                    <div className="flex flex-wrap gap-6 mt-3 text-xs">
                      <div><span className="text-slate-400">Type:</span> <span className="font-bold text-slate-700 ml-1">{policy.type}</span></div>
                      <div><span className="text-slate-400">Sum Assured:</span> <span className="font-bold text-slate-700 ml-1">{policy.sumAssured}</span></div>
                      <div><span className="text-slate-400">Premium:</span> <span className="font-bold text-slate-700 ml-1">{policy.premium}/mo</span></div>
                      <div><span className="text-slate-400">Due:</span> <span className="font-bold text-slate-700 ml-1">{policy.dueDate}</span></div>
                      <div><span className="text-slate-400">Start:</span> <span className="font-bold text-slate-700 ml-1">{policy.startDate}</span></div>
                      <div><span className="text-slate-400">End:</span> <span className="font-bold text-slate-700 ml-1">{policy.endDate}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:flex-col xl:flex-row shrink-0">
                  <button
                    onClick={() => navigate('/customer/policies/' + policy.id)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  {policy.status === 'Renewal Due' && (
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors">
                      Renew Now
                    </button>
                  )}
                  {policy.status === 'Active' && (
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-colors">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">No policies found.</p>
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerPolicies;
