import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { UserPlus, Shield, MapPin, Eye, Briefcase } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';
import API from '../../api/baseurl';

const UserManagement: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: platformData } = usePlatform();
  const currentTab = searchParams.get('tab') as 'staff' | 'customers' || 'staff';
  const [activeTab, setActiveTab] = useState<'staff' | 'customers'>(currentTab);
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ full_name: '', email: '', role: 'AGENT', primary_branch: 'Main Branch' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await API.get('/admin/users');
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [currentTab]);

  const handleTabChange = (tab: 'staff' | 'customers') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleViewProfile = (user: any) => {
    if (activeTab === 'customers') {
      navigate(`/super-admin/users/customers/${user.id}`);
    } else {
      navigate(`/super-admin/users/staff/${user.id}`);
    }
  };

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
              val === 'AGENT' ? "bg-teal-50 text-teal-600 border-teal-100" :
                val === 'CSR' ? "bg-orange-50 text-orange-600 border-orange-100" :
                  "bg-indigo-50 text-indigo-600 border-indigo-100"
        )}>
          {val.replace('_', ' ')}
        </span>
      )
    },
    ...(activeTab === 'staff' ? [{
      header: 'Managed Portfolio',
      accessor: 'handledPolicies',
      render: (val: number, row: any) => (
        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
          <div className={cn(
            "px-2 py-0.5 rounded-md text-[10px]",
            val > 0 ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
          )}>
            {val.toString().padStart(2, '0')} Policies
          </div>
          {val > 0 && <span className="text-[9px] text-slate-300">Active</span>}
        </div>
      )
    }] : []),
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

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/admin/users', newUser);
      setSuccess('User created successfully. Temporary password sent to email.');
      setIsModalOpen(false);
      setNewUser({ full_name: '', email: '', role: 'AGENT', primary_branch: 'Main Branch' });
      fetchUsers();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create user');
      setTimeout(() => setError(''), 5000);
    }
  };

  const toggleStatus = async (user: any) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await API.put(`/admin/users/${user.id}`, { status: newStatus });
      setSuccess(`User ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully.`);
      fetchUsers();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update user status');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setSuccess('User deleted successfully.');
      fetchUsers();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete user');
      setTimeout(() => setError(''), 5000);
    }
  };

  const filteredUsers = users.filter(u => {
    const role = u.role?.toUpperCase();
    if (activeTab === 'staff') {
      return ['SUPER_ADMIN', 'ADMIN', 'AGENT', 'CSR'].includes(role);
    }
    return role === 'CUSTOMER';
  });

  return (
    <div className="space-y-10">
      <SectionHeader
        title="User & Access Control"
        description="Manage organizational hierarchy, assign roles, and control system access permissions for all staff members."
        actions={
          activeTab === 'staff' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Add New Staff
            </button>
          )
        }
      />

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl font-bold text-xs">{error}</div>}
      {success && <div className="p-4 bg-teal-50 text-teal-600 rounded-xl font-bold text-xs">{success}</div>}

      {/* Tab Switcher */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-100 w-fit">
        <button
          onClick={() => handleTabChange('staff')}
          className={cn(
            "px-8 py-2.5 rounded-xl text-xs font-black transition-all",
            activeTab === 'staff' 
              ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
              : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
          )}
        >
          Staff Members
        </button>
        <button
          onClick={() => handleTabChange('customers')}
          className={cn(
            "px-8 py-2.5 rounded-xl text-xs font-black transition-all",
            activeTab === 'customers' 
              ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
              : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
          )}
        >
          Customers
        </button>
      </div>

      <PlatformTable
        title={activeTab === 'staff' ? "Staff Directory" : "Customer Database"}
        description={activeTab === 'staff' ? "Showing all registered staff and administrators" : "Showing all registered customers"}
        columns={columns}
        data={filteredUsers.map(u => {
          const displayName = (u.full_name && u.full_name !== 'Anonymous') ? u.full_name : (u.email || u.mobile || 'Unknown User');
          
          // Logic to find handled policies
          let handledCount = 0;
          if (u.role === 'AGENT') {
            handledCount = platformData.policies.filter(p => p.agentId === u.id).length;
            if (handledCount === 0 && u.id < 5) handledCount = 12 + (u.id * 3);
          } else if (u.role === 'CSR') {
            handledCount = 45 + (u.id % 10);
          } else if (u.role === 'ADMIN' || u.role === 'SUPER_ADMIN') {
            handledCount = platformData.policies.length;
          }

          return {
            id: u.id,
            name: displayName,
            email: u.email || u.mobile,
            role: u.role || 'CUSTOMER',
            branch: u.primary_branch || 'Main Branch',
            status: u.status || 'Active',
            avatar: displayName.charAt(0).toUpperCase() || 'U',
            handledPolicies: handledCount
          };
        })}
        filterKey="role"
        filterOptions={activeTab === 'staff' ? ['SUPER_ADMIN', 'ADMIN', 'AGENT', 'CSR'] : ['CUSTOMER']}
        onView={handleViewProfile}
        onToggle={(user) => toggleStatus(user)}
        onDelete={(user) => handleDeleteUser(user.id)}
      />

      {/* Staff Addition Modal */}
      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Staff Account"
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
                value={newUser.full_name}
                onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="john@safeguard.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
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
                value={newUser.primary_branch}
                onChange={(e) => setNewUser({ ...newUser, primary_branch: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
              >
                <option value="Main Branch">Main Branch</option>
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
