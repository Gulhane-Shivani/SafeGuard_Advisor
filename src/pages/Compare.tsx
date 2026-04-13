import React, { useState, useEffect } from 'react';
import { Filter, Search, Check, Info } from 'lucide-react';
import PlanCard from '../components/insurance/PlanCard';
import { cn } from '../utils/helpers';
import { useSearchParams } from 'react-router-dom';

const ALL_PLANS = [
  { id: 1,  title: 'Star Comprehensive',       type: 'health',     price: '799',   coverage: '5 Lakh',  rating: 4.5, claimRatio: '92%', insurer: 'Star Health Insurance', features: ['Cashless at 14,000+ Hospitals', 'No Room Rent Limit', 'AYUSH Cover Included'] },
  { id: 2,  title: 'Niva Bupa Reassure Family', type: 'health',     price: '1,499', coverage: '10 Lakh', rating: 4.6, claimRatio: '90%', insurer: 'Niva Bupa',             features: ['Family Floater Plan', 'No Pre-policy Checkup', 'OPD Cover Included'] },
  { id: 3,  title: 'LIC Tech Term',             type: 'life',       price: '1,199', coverage: '1 Crore', rating: 4.8, claimRatio: '98.7%', insurer: 'LIC of India',       features: ['1 Crore Sum Assured', '80C Tax Benefit', 'Critical Illness Rider'] , recommended: true },
  { id: 4,  title: 'HDFC Life Click 2 Protect', type: 'life',       price: '1,800', coverage: '2 Crore', rating: 4.9, claimRatio: '99.4%', insurer: 'HDFC Life',          features: ['2 Crore Cover', 'Return of Premium', 'Waiver of Premium'] },
  { id: 5,  title: 'Bajaj Allianz Comprehensive', type: 'car',      price: '499',   coverage: 'OD + TP', rating: 4.2, claimRatio: '89%', insurer: 'Bajaj Allianz',        features: ['Own Damage + Third Party', 'Zero Dep Cover', 'NCB up to 50%'] },
  { id: 6,  title: 'ICICI Lombard Private Car',  type: 'car',       price: '649',   coverage: 'OD + TP', rating: 4.4, claimRatio: '91%', insurer: 'ICICI Lombard',        features: ['Roadside Assistance', 'Engine Protect', 'Cashless Garages'] },
  { id: 7,  title: 'Tata AIA Smart Wealth',      type: 'investment', price: '2,500', coverage: '1 Crore', rating: 4.7, claimRatio: '98.5%', insurer: 'Tata AIA Life',     features: ['Market-Linked Returns', 'Life Cover', 'Partial Withdrawal'] },
  { id: 8,  title: 'Max Life Smart Secure',      type: 'life',       price: '950',  coverage: '75 Lakh', rating: 4.5, claimRatio: '99.2%', insurer: 'Max Life Insurance', features: ['75 Lakh Cover', 'Terminal Illness Benefit', 'Special Exit Value'] },
];

export const Compare: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [filterType, setFilterType] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('price-low');
  const [searchQuery, setSearchQuery] = useState('');

  // Update filter type if URL params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setFilterType(cat);
    }
  }, [searchParams]);

  const filteredPlans = ALL_PLANS.filter(plan => {
    const matchesType = filterType === 'all' || plan.type === filterType;
    const matchesSearch =
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.insurer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low')  return parseInt(a.price.replace(',', '')) - parseInt(b.price.replace(',', ''));
    if (sortBy === 'price-high') return parseInt(b.price.replace(',', '')) - parseInt(a.price.replace(',', ''));
    if (sortBy === 'rating')     return b.rating - a.rating;
    return 0;
  });

  const categories = [
    { key: 'all',        label: 'All Plans' },
    { key: 'health',     label: 'Health' },
    { key: 'life',       label: 'Life / Term' },
    { key: 'car',        label: 'Motor' },
    { key: 'investment', label: 'Investment' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Compare Insurance Plans</h1>
            <p className="text-slate-500">IRDAI-approved plans side-by-side — transparent and unbiased</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <input
                type="text"
                placeholder="Search by plan or insurer..."
                className="pl-12 pr-6 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all w-64"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 flex-wrap">
              {categories.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilterType(key)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                    filterType === key ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-6">
                <Filter className="w-5 h-5 text-teal-600" /> Filters
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Sort By</label>
                  <select
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="price-low">Premium: Low to High</option>
                    <option value="price-high">Premium: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Claim Settlement Ratio</label>
                  <div className="space-y-2">
                    {['95%+', '90%+', 'All Ratios'].map(label => (
                      <label key={label} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-teal-600" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Add-ons</label>
                  <div className="space-y-2">
                    {['Critical Illness', 'Zero Depreciation', 'AYUSH Cover', 'OPD Cover'].map(label => (
                      <label key={label} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-teal-600" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Tax Benefit</label>
                  <div className="space-y-2">
                    {['Section 80C', 'Section 80D'].map(label => (
                      <label key={label} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-teal-600" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-600 p-6 rounded-3xl text-white shadow-xl shadow-teal-600/20">
              <h3 className="font-bold mb-2">Confused? Talk to an Expert</h3>
              <p className="text-teal-100 text-sm mb-4">Our advisors help you free of cost — no spam, no commission calls.</p>
              <button className="w-full py-3 bg-white text-teal-600 rounded-xl font-bold hover:bg-teal-50 transition-all text-sm">
                Book Free Consultation
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPlans.map(plan => (
                  <div key={plan.id} className="flex flex-col gap-3">
                    <PlanCard
                      title={plan.title}
                      type={plan.type as any}
                      price={plan.price}
                      provider={plan.insurer}
                      features={plan.features}
                    />
                    <div className="flex items-center justify-between px-4 text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-1">
                        <Info className="w-3 h-3" /> Claim Ratio: <b className="text-slate-600 ml-0.5">{plan.claimRatio}</b>
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> Cover: <b className="text-slate-600 ml-0.5">{plan.coverage}</b>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-200 text-center">
                <p className="text-slate-400 font-medium">No plans found. Try resetting your filters.</p>
                <button
                  onClick={() => { setFilterType('all'); setSearchQuery(''); }}
                  className="mt-4 text-teal-600 font-bold underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
