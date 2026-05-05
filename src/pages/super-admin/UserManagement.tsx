import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, MapPin, Edit } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { cn } from '../../utils/helpers';
import API from '../../api/baseurl';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ full_name: '', email: '', role: 'AGENT', primary_branch: 'Main Branch' });
  const [editingUser, setEditingUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await API.get('/admin/users');
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch users');
    } finally {
      // Fetch complete
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put(`/admin/users/${editingUser.id}`, {
        full_name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        primary_branch: editingUser.branch
      });
      setSuccess('User updated successfully.');
      setIsEditModalOpen(false);
      setEditingUser(null);
      fetchUsers();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update user');
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

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl font-bold text-xs">{error}</div>}
      {success && <div className="p-4 bg-teal-50 text-teal-600 rounded-xl font-bold text-xs">{success}</div>}

      <PlatformTable
        title="Active Users"
        description="Showing all registered staff and administrators"
        columns={columns}
        data={users.map(u => {
          const displayName = (u.full_name && u.full_name !== 'Anonymous') ? u.full_name : (u.email || u.mobile || 'Unknown User');
          return {
            id: u.id,
            name: displayName,
            email: u.email || u.mobile,
            role: u.role || 'CUSTOMER',
            branch: u.primary_branch || 'Main Branch',
            status: u.status || 'Active',
            avatar: displayName.charAt(0).toUpperCase() || 'U'
          };
        })}
        filterKey="role"
        filterOptions={['SUPER_ADMIN', 'ADMIN', 'AGENT', 'CSR', 'CUSTOMER']}
        onEdit={(user) => {
          setEditingUser(user);
          setIsEditModalOpen(true);
        }}
        onDelete={(user) => handleDeleteUser(user.id)}
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
                <option value="CUSTOMER">Customer</option>
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

      <PlatformModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User Account"
        footer={
          <>
            <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-all uppercase tracking-widest">Cancel</button>
            <button onClick={handleUpdateUser} className="px-8 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 uppercase tracking-widest">Save Changes</button>
          </>
        }
      >
        {editingUser && (
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                >
                  <option value="AGENT">Agent</option>
                  <option value="ADMIN">Admin</option>
                  <option value="CSR">CSR</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="CUSTOMER">Customer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Branch</label>
                <select
                  value={editingUser.branch}
                  onChange={(e) => setEditingUser({ ...editingUser, branch: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                >
                  <option value="Main Branch">Main Branch</option>
                  <option value="New York">New York</option>
                  <option value="London">London</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>
          </form>
        )}
      </PlatformModal>
    </div>
  );
};

export default UserManagement;
