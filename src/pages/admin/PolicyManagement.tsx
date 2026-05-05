import React, { useState } from 'react';
import { 
  Shield, Clock, 
  Download, AlertCircle,
  Activity,
  FileText
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const PolicyManagement: React.FC = () => {
  const { data, updateData } = usePlatform();
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<any>(null);
  const [newPolicy, setNewPolicy] = useState({
    policyNumber: '',
    customerName: '',
    type: 'Health Insurance',
    premium: '',
    status: 'Active',
    endDate: '2024-12-31'
  });

  const columns = [
    { 
      header: 'Policy Details', 
      accessor: 'policyNumber',
      render: (val: string, row: any) => (
        <div>
          <p className="text-sm font-black text-slate-900">{val}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{row.type}</p>
        </div>
      )
    },
    { header: 'Customer', accessor: 'customerName' },
    { 
      header: 'Premium', 
      accessor: 'premium',
      render: (val: string) => <span className="text-sm font-black text-slate-900">{val}</span>
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
          val === 'Renewal Due' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-red-50 text-red-600 border-red-100"
        )}>
          {val}
        </span>
      )
    },
    { 
      header: 'Expiry Date', 
      accessor: 'endDate',
      render: (val: string) => (
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-300" /> {val}
        </div>
      )
    }
  ];

  const filteredPolicies = filter === 'All' ? data.policies : data.policies.filter(p => p.status === filter);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('SafeGuard Advisor - Policy Portfolio', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} | Filter: ${filter}`, 14, 30);

    const tableData = filteredPolicies.map(p => [
      p.policyNumber,
      p.customerName,
      p.type,
      p.premium,
      p.status,
      p.endDate
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['Policy #', 'Customer', 'Type', 'Premium', 'Status', 'Expiry Date']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [20, 158, 136] },
      styles: { fontSize: 9 }
    });

    doc.save(`SafeGuard_Policies_${filter}_${Date.now()}.pdf`);
  };

  const handleSavePolicy = () => {
    if (editingPolicy) {
      const updated = data.policies.map(p => p.id === editingPolicy.id ? { ...editingPolicy } : p);
      updateData('policies', updated);
    } else {
      const added = [...data.policies, { ...newPolicy, id: Date.now() }];
      updateData('policies', added);
    }
    setIsModalOpen(false);
    setEditingPolicy(null);
  };

  const handleExecuteReminders = () => {
    const renewalCount = data.policies.filter(p => p.status === 'Renewal Due').length;
    alert(`Success: ${renewalCount} renewal reminders have been queued for execution via SMS, Email, and WhatsApp.`);
  };

  const handleDeletePolicy = (id: number) => {
    if (window.confirm('Are you sure you want to delete this policy? This action cannot be undone.')) {
      const updated = data.policies.filter(p => p.id !== id);
      updateData('policies', updated);
    }
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Policy Lifecycle Management" 
        description="Monitor active policies, track upcoming renewals, and manage policy servicing operations for all branch customers."
        actions={
          <div className="flex items-center gap-3">
             <div className="flex bg-white border border-slate-200 rounded-xl p-1">
                {['All', 'Active', 'Renewal Due'].map(f => (
                   <button 
                     key={f} 
                     onClick={() => setFilter(f)}
                     className={cn(
                        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all",
                        filter === f ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:text-slate-900"
                     )}
                   >
                     {f}
                   </button>
                ))}
             </div>
             <button 
              onClick={() => {
                setEditingPolicy(null);
                setIsModalOpen(true);
              }}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 flex items-center gap-2"
            >
                <Shield className="w-4 h-4" /> New Policy
             </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
            { label: 'Active Policies', value: data.policies.filter(p => p.status === 'Active').length, icon: Shield, color: 'text-teal-600', bg: 'bg-teal-50' },
            { label: 'Renewals Pending', value: data.policies.filter(p => p.status === 'Renewal Due').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Lapsed Policies', value: '4', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Retention Rate', value: '94.2%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-teal-100 transition-all">
               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-inner", stat.bg, stat.color)}>
                  <stat.icon className="w-6 h-6" />
               </div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
               <p className="text-2xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
            </div>
         ))}
      </div>

      <PlatformTable 
        title="Insurance Portfolio"
        description={`Showing ${filter} policies for the current branch`}
        columns={columns}
        data={filteredPolicies}
        filterKey="status"
        filterOptions={['Active', 'Renewal Due', 'Reminder Sent']}
        onEdit={(policy) => {
          setEditingPolicy(policy);
          setIsModalOpen(true);
        }}
        onDelete={(policy) => handleDeletePolicy(policy.id)}
        actions={
           <button 
            onClick={handleExportPDF}
            className="px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all flex items-center gap-2"
          >
              <Download className="w-3.5 h-3.5" /> Export
           </button>
        }
      />

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
               <h3 className="text-2xl font-black mb-4">Bulk Renewal Reminder</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                  Send automated renewal reminders to all <strong>{data.policies.filter(p => p.status === 'Renewal Due').length} customers</strong> whose policies are due for renewal this month. Reminders will be sent via Email, SMS, and WhatsApp.
               </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <button 
                onClick={() => setIsTemplateModalOpen(true)}
                className="flex-grow md:flex-none px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all border border-white/10"
              >
                  Preview Templates
               </button>
               <button 
                onClick={handleExecuteReminders}
                className="flex-grow md:flex-none px-8 py-4 bg-teal-500 text-white rounded-2xl font-bold text-sm hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20"
              >
                  Execute Reminders
               </button>
            </div>
         </div>
         <Clock className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 pointer-events-none group-hover:scale-110 transition-all duration-1000" />
      </div>

      {/* Policy Modal */}
      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPolicy ? "Edit Policy Details" : "Issue New Policy"}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Policy Number</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-500 transition-colors"
                value={editingPolicy ? editingPolicy.policyNumber : newPolicy.policyNumber}
                onChange={(e) => editingPolicy ? setEditingPolicy({...editingPolicy, policyNumber: e.target.value}) : setNewPolicy({...newPolicy, policyNumber: e.target.value})}
                placeholder="SG-HLTH-001"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-500 transition-colors"
                value={editingPolicy ? editingPolicy.customerName : newPolicy.customerName}
                onChange={(e) => editingPolicy ? setEditingPolicy({...editingPolicy, customerName: e.target.value}) : setNewPolicy({...newPolicy, customerName: e.target.value})}
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Policy Type</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-500 transition-colors appearance-none"
                value={editingPolicy ? editingPolicy.type : newPolicy.type}
                onChange={(e) => editingPolicy ? setEditingPolicy({...editingPolicy, type: e.target.value}) : setNewPolicy({...newPolicy, type: e.target.value})}
              >
                <option>Health Insurance</option>
                <option>Motor Insurance</option>
                <option>Life Insurance</option>
                <option>Home Insurance</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Premium (₹)</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-500 transition-colors"
                value={editingPolicy ? editingPolicy.premium : newPolicy.premium}
                onChange={(e) => editingPolicy ? setEditingPolicy({...editingPolicy, premium: e.target.value}) : setNewPolicy({...newPolicy, premium: e.target.value})}
                placeholder="80,000"
              />
            </div>
          </div>

          <button 
            onClick={handleSavePolicy}
            className="w-full py-4 bg-teal-600 text-white rounded-2xl font-black text-sm hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20"
          >
            {editingPolicy ? "Save Changes" : "Create Policy"}
          </button>
        </div>
      </PlatformModal>

      {/* Template Modal */}
      <PlatformModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="Renewal Reminder Template"
      >
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 font-mono text-xs text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900 mb-4">Subject: Action Required: Your Policy [Policy#] is due for renewal</p>
            <p>Dear [Customer Name],</p>
            <br />
            <p>Your [Policy Type] with SafeGuard Advisor is set to expire on [Expiry Date]. To ensure continuous coverage and avoid any lapse in benefits, please renew your policy at your earliest convenience.</p>
            <br />
            <p>Policy Number: [Policy#]</p>
            <p>Renewal Premium: ₹[Amount]</p>
            <br />
            <p>Click here to renew instantly: [Payment Link]</p>
            <br />
            <p>Regards,</p>
            <p>SafeGuard Advisor Team</p>
          </div>
          <div className="flex gap-3">
             <div className="flex-grow p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                   <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest">Multi-Channel Delivery</p>
                   <p className="text-[10px] text-blue-600 font-bold">Email, WhatsApp & SMS Enabled</p>
                </div>
             </div>
             <button className="px-6 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800">
                Edit Template
             </button>
          </div>
        </div>
      </PlatformModal>
    </div>
  );
};

export default PolicyManagement;
