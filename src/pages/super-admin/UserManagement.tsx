
import React, { useState } from 'react';
import { UserPlus, Shield, MapPin } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const UserManagement: React.FC = () => {
  const { data, addItem, removeItem } = usePlatform();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'AGENT', branch: 'Main' });

  const columns = [
    { 
      header: 'User', 
      accessor: 'name',
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500 shadow-inner">
            {row.avatar}
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">{val}</p>
            <p className="text-[10px] text-slate-400 font-bold">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      header: 'Role', 
      accessor: 'role',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'SUPER_ADMIN' ? "bg-purple-50 text-purple-600 border-purple-100" :
          val === 'ADMIN' ? "bg-blue-50 text-blue-600 border-blue-100" :
          val === 'AGENT' ? "bg-teal-50 text-teal-600 border-teal-100" : "bg-orange-50 text-orange-600 border-orange-100"
        )}>
          {val.replace('_', ' ')}
        </span>
      )
    },
    { 
      header: 'Branch', 
      accessor: 'branch',
      render: (val: string) => (
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-slate-400" /> {val}
        </div>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <div className="flex items-center gap-1.5">
          <div className={cn("w-1.5 h-1.5 rounded-full", val === 'Active' ? "bg-emerald-500" : "bg-slate-300")} />
          <span className="text-xs font-bold text-slate-700">{val}</span>
        </div>
      )
    }
  ];

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addItem('users', { ...newUser, avatar: newUser.name.charAt(0).toUpperCase(), status: 'Active' });
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', role: 'AGENT', branch: 'Main' });
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="User & Access Control" 
        description="Manage organizational hierarchy, assign roles, and control system access permissions for all staff members."
        actions={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Add New User
          </button>
        }
      />

      <PlatformTable 
        title="Active Users"
        description="Showing all registered staff and administrators"
        columns={columns}
        data={data.users}
        onEdit={(user) => console.log('Edit', user)}
        onDelete={(user) => removeItem('users', user.id)}
      />

      <PlatformModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New User Account"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-all uppercase tracking-widest">Cancel</button>
            <button onClick={handleAddUser} className="px-8 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 uppercase tracking-widest">Create Account</button>
          </>
        }
      >
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" 
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="John Doe" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="john@safeguard.com" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Role</label>
              <select 
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
              >
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Admin</option>
                <option value="CSR">CSR</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Branch</label>
              <select 
                value={newUser.branch}
                onChange={(e) => setNewUser({...newUser, branch: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
              >
                <option value="Main">Main Branch</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Singapore">Singapore</option>
              </select>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex gap-4">
             <Shield className="w-6 h-6 text-amber-600 shrink-0" />
             <div>
               <p className="text-xs font-black text-amber-900 mb-1 uppercase tracking-tight">Security Note</p>
               <p className="text-xs text-amber-700 font-medium leading-relaxed">Temporary password will be sent to the user's email. They will be required to change it upon first login.</p>
             </div>
          </div>
        </form>
      </PlatformModal>
    </div>
  );
};

export default UserManagement;
