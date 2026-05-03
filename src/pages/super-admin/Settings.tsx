
import React, { useState } from 'react';
import { Shield, Landmark, Plus, Percent, Mail, MessageSquare } from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const MasterSettings: React.FC = () => {
  const { data, addItem, updateData, removeItem } = usePlatform();
  const [activeTab, setActiveTab] = useState('products');
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [productForm, setProductForm] = useState({
    name: '',
    insurer: '',
    category: 'Life',
    premium: '',
    commission: ''
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setProductForm({ name: '', insurer: '', category: 'Life', premium: '', commission: '' });
    setIsProductModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setIsEditing(true);
    setEditingId(product.id);
    setProductForm({
      name: product.name,
      insurer: product.insurer,
      category: product.category,
      premium: product.premium.replace('$', ''),
      commission: product.commission.replace('%', '')
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.insurer || !productForm.premium) return;
    
    const formattedProduct = {
      ...productForm,
      premium: `$${productForm.premium}`,
      commission: `${productForm.commission}%`
    };

    if (isEditing && editingId !== null) {
      const updatedProducts = data.products.map(p => 
        p.id === editingId ? { ...p, ...formattedProduct } : p
      );
      updateData('products', updatedProducts);
    } else {
      addItem('products', formattedProduct);
    }
    
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (product: any) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      removeItem('products', product.id);
    }
  };

  const [templates, setTemplates] = useState([
    { id: 1, title: 'Welcome Email', channel: 'Email', icon: 'Mail', subject: 'Welcome to SafeGuard Advisor!', body: `Dear {{customer_name}},

Welcome to SafeGuard Advisor! We are thrilled to have you on board.

Your policy {{policy_number}} is now active. Our team is here to support you every step of the way.

Best regards,
The SafeGuard Team` },
    { id: 2, title: 'Renewal Reminder', channel: 'SMS', icon: 'MessageSquare', subject: 'Policy Renewal Reminder', body: `Hi {{customer_name}}, your SafeGuard policy {{policy_number}} is due for renewal on {{renewal_date}}. Renew now to stay protected. Call us at 1800-XXX-XXXX or visit safeguard-advisor.com.` },
    { id: 3, title: 'Policy Issued', channel: 'WhatsApp', icon: 'MessageSquare', subject: 'Your Policy is Now Active', body: `Hello {{customer_name}} 👋

Great news! Your *{{policy_name}}* policy has been successfully issued.

📋 Policy No: {{policy_number}}
📅 Start Date: {{start_date}}
💰 Premium: {{premium_amount}}

For any queries, reply to this message or call our helpline.` },
    { id: 4, title: 'Claim Status Update', channel: 'Email', icon: 'Mail', subject: 'Your Claim {{claim_number}} Status Update', body: `Dear {{customer_name}},

We are writing to update you on the status of your claim {{claim_number}}.

Current Status: {{claim_status}}
Estimated Resolution: {{resolution_date}}

Our claims team will keep you informed of any further developments.

Warm regards,
SafeGuard Advisor Claims Team` },
  ]);

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<typeof templates[0] | null>(null);

  const handleOpenEditTemplate = (template: typeof templates[0]) => {
    setEditingTemplate({ ...template });
    setIsTemplateModalOpen(true);
  };

  const handleSaveTemplate = () => {
    if (!editingTemplate) return;
    setTemplates(templates.map(t => t.id === editingTemplate.id ? editingTemplate : t));
    setIsTemplateModalOpen(false);
  };

  const productColumns = [
    { header: 'Product Name', accessor: 'name' },
    { header: 'Insurer', accessor: 'insurer' },
    { header: 'Category', accessor: 'category' },
    { header: 'Base Premium', accessor: 'premium' },
    { 
      header: 'Commission', 
      accessor: 'commission',
      render: (val: string) => (
        <span className="flex items-center gap-1 text-teal-600 font-black">
          <Percent className="w-3 h-3" /> {val}
        </span>
      )
    }
  ];

  const insurerColumns = [
    { header: 'Insurer Name', accessor: 'name' },
    { header: 'Partner Since', accessor: 'since' },
    { header: 'Active Policies', accessor: 'policies' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
          {val}
        </span>
      )
    }
  ];

  const [insurers, setInsurers] = useState([
    { id: 1, name: 'ICICI Lombard', since: '2020', policies: 1240, status: 'Active' },
    { id: 2, name: 'TATA AIG', since: '2019', policies: 850, status: 'Active' },
    { id: 3, name: 'Bajaj Allianz', since: '2021', policies: 420, status: 'Active' },
    { id: 4, name: 'Star Health', since: '2018', policies: 1560, status: 'Active' },
    { id: 5, name: 'Niva Bupa', since: '2022', policies: 920, status: 'Active' },
    { id: 6, name: 'LIC', since: '1956', policies: 5400, status: 'Active' },
  ]);

  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isEditingPartner, setIsEditingPartner] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState<number | null>(null);
  const [partnerForm, setPartnerForm] = useState({ name: '', since: '', policies: 0, status: 'Active' });

  const handleOpenAddPartner = () => {
    setIsEditingPartner(false);
    setEditingPartnerId(null);
    setPartnerForm({ name: '', since: '', policies: 0, status: 'Active' });
    setIsPartnerModalOpen(true);
  };

  const handleOpenEditPartner = (partner: any) => {
    setIsEditingPartner(true);
    setEditingPartnerId(partner.id);
    setPartnerForm({ name: partner.name, since: partner.since, policies: partner.policies, status: partner.status });
    setIsPartnerModalOpen(true);
  };

  const handleSavePartner = () => {
    if (!partnerForm.name) return;
    
    if (isEditingPartner && editingPartnerId !== null) {
      setInsurers(insurers.map(p => p.id === editingPartnerId ? { ...p, ...partnerForm } : p));
    } else {
      setInsurers([...insurers, { ...partnerForm, id: Math.max(0, ...insurers.map(i => i.id)) + 1 }]);
    }
    setIsPartnerModalOpen(false);
  };

  const handleDeletePartner = (partner: any) => {
    if (window.confirm(`Are you sure you want to delete ${partner.name}?`)) {
      setInsurers(insurers.filter(p => p.id !== partner.id));
    }
  };

  const [matrices, setMatrices] = useState({
    'Life Insurance': [
      { role: 'Senior Agent', rate: 18 },
      { role: 'Junior Agent', rate: 12 },
      { role: 'Referral Partner', rate: 5 }
    ],
    'Health Insurance': [
      { role: 'Senior Agent', rate: 18 },
      { role: 'Junior Agent', rate: 12 },
      { role: 'Referral Partner', rate: 5 }
    ],
    'Motor Insurance': [
      { role: 'Senior Agent', rate: 18 },
      { role: 'Junior Agent', rate: 12 },
      { role: 'Referral Partner', rate: 5 }
    ],
    'General Insurance': [
      { role: 'Senior Agent', rate: 18 },
      { role: 'Junior Agent', rate: 12 },
      { role: 'Referral Partner', rate: 5 }
    ]
  });

  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);
  const [editingMatrixCat, setEditingMatrixCat] = useState('');
  const [matrixForm, setMatrixForm] = useState<{role: string, rate: number}[]>([]);

  const handleOpenEditMatrix = (cat: string) => {
    setEditingMatrixCat(cat);
    setMatrixForm([...matrices[cat as keyof typeof matrices]]);
    setIsMatrixModalOpen(true);
  };

  const handleSaveMatrix = () => {
    setMatrices({...matrices, [editingMatrixCat]: matrixForm});
    setIsMatrixModalOpen(false);
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Master Configuration" 
        description="Configure insurance products, partner insurers, commission structures, and global system communication templates."
      />

      <div className="flex flex-wrap gap-4 p-2 bg-white border border-slate-100 rounded-3xl w-fit shadow-sm">
        {[
          { id: 'products', label: 'Insurance Products', icon: Shield },
          { id: 'insurers', label: 'Partner Insurers', icon: Landmark },
          { id: 'commission', label: 'Commission Matrix', icon: Percent },
          { id: 'templates', label: 'Comm. Templates', icon: Mail },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-bold transition-all",
              activeTab === tab.id
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'products' && (
          <PlatformTable 
            title="Product Catalogue"
            description="Manage available insurance plans and their base rates"
            columns={productColumns}
            data={data.products}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteProduct}
            actions={
              <button 
                onClick={handleOpenAdd}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" /> Add Product
              </button>
            }
          />
        )}

        {activeTab === 'insurers' && (
          <PlatformTable 
            title="Insurance Partners"
            description="Manage relationships with underwriting companies"
            columns={insurerColumns}
            data={insurers}
            onEdit={handleOpenEditPartner}
            onDelete={handleDeletePartner}
            actions={
              <button 
                onClick={handleOpenAddPartner}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" /> Add Partner
              </button>
            }
          />
        )}

        {activeTab === 'commission' && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
             <div>
                <h3 className="text-xl font-bold text-slate-900">Commission Structure Matrix</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">Define payouts for agents and distributors across product lines.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {Object.keys(matrices).map((cat) => (
                    <div key={cat} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-sm font-black text-slate-900">{cat}</span>
                          <button 
                            onClick={() => handleOpenEditMatrix(cat)}
                            className="text-teal-600 text-[10px] font-black uppercase tracking-widest hover:underline"
                          >
                            Edit Matrix
                          </button>
                       </div>
                       <div className="space-y-3">
                          {matrices[cat as keyof typeof matrices].map((row) => (
                             <div key={row.role} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                                <span className="text-xs font-bold text-slate-600">{row.role}</span>
                                <span className="text-xs font-black text-teal-600">{row.rate}%</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
             </div>
          </div>
        )}

        {activeTab === 'templates' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {templates.map((temp) => (
                 <div key={temp.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-6 group hover:border-teal-200 transition-all">
                    <div className="flex justify-between items-start">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all">
                          {temp.channel === 'Email' ? <Mail className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                       </div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-full">{temp.channel}</span>
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900">{temp.title}</h4>
                       <p className="text-xs text-slate-500 font-medium mt-1">Subject: {temp.subject}</p>
                    </div>
                    <button 
                      onClick={() => handleOpenEditTemplate(temp)}
                      className="mt-2 py-3 bg-slate-50 text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                    >
                      Edit Template Content
                    </button>
                 </div>
              ))}
           </div>
        )}
      </div>

      <PlatformModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title={isEditing ? "Edit Insurance Product" : "Add New Insurance Product"}
        size="md"
        footer={
          <>
            <button 
              onClick={() => setIsProductModalOpen(false)} 
              className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveProduct}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 text-sm"
            >
              {isEditing ? "Save Changes" : "Create Product"}
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Product Name</label>
            <input 
              type="text"
              value={productForm.name}
              onChange={(e) => setProductForm({...productForm, name: e.target.value})}
              placeholder="e.g. Shield Life Protect+"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Insurer Partner</label>
              <select 
                value={productForm.insurer}
                onChange={(e) => setProductForm({...productForm, insurer: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
              >
                <option value="">Select Insurer</option>
                {insurers.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
              <select 
                value={productForm.category}
                onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
              >
                <option value="Life">Life Insurance</option>
                <option value="Health">Health Insurance</option>
                <option value="Motor">Motor Insurance</option>
                <option value="Investment">Investment</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base Premium ($)</label>
              <input 
                type="number"
                value={productForm.premium}
                onChange={(e) => setProductForm({...productForm, premium: e.target.value})}
                placeholder="499"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Commission (%)</label>
              <input 
                type="number"
                value={productForm.commission}
                onChange={(e) => setProductForm({...productForm, commission: e.target.value})}
                placeholder="15"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </PlatformModal>

      <PlatformModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        title={isEditingPartner ? "Edit Insurance Partner" : "Add New Insurance Partner"}
        size="sm"
        footer={
          <>
            <button 
              onClick={() => setIsPartnerModalOpen(false)} 
              className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSavePartner}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 text-sm"
            >
              {isEditingPartner ? "Save Changes" : "Create Partner"}
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Partner Name</label>
            <input 
              type="text"
              value={partnerForm.name}
              onChange={(e) => setPartnerForm({...partnerForm, name: e.target.value})}
              placeholder="e.g. HDFC Ergo"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Partner Since</label>
              <input 
                type="text"
                value={partnerForm.since}
                onChange={(e) => setPartnerForm({...partnerForm, since: e.target.value})}
                placeholder="2024"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</label>
              <select 
                value={partnerForm.status}
                onChange={(e) => setPartnerForm({...partnerForm, status: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </PlatformModal>

      <PlatformModal
        isOpen={isMatrixModalOpen}
        onClose={() => setIsMatrixModalOpen(false)}
        title={`Edit Matrix: ${editingMatrixCat}`}
        size="md"
        footer={
          <>
            <button 
              onClick={() => setIsMatrixModalOpen(false)} 
              className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveMatrix}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 text-sm"
            >
              Save Matrix
            </button>
          </>
        }
      >
        <div className="space-y-6">
          {matrixForm.map((row, i) => (
            <div key={row.role} className="flex items-center gap-6">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{row.role} Rate (%)</label>
                <input 
                  type="number"
                  value={row.rate}
                  onChange={(e) => {
                    const newForm = [...matrixForm];
                    newForm[i].rate = Number(e.target.value);
                    setMatrixForm(newForm);
                  }}
                  className="w-full mt-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </PlatformModal>
      <PlatformModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title={`Edit: ${editingTemplate?.title}`}
        size="lg"
        footer={
          <>
            <button
              onClick={() => setIsTemplateModalOpen(false)}
              className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTemplate}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 text-sm"
            >
              Save Template
            </button>
          </>
        }
      >
        {editingTemplate && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Channel:</span>
              <span className="text-xs font-black text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">{editingTemplate.channel}</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject / Heading</label>
              <input
                type="text"
                value={editingTemplate.subject}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message Body</label>
              <p className="text-[10px] text-slate-400 font-medium">Available variables: {'{{customer_name}}'}, {'{{policy_number}}'}, {'{{renewal_date}}'}, {'{{premium_amount}}'}</p>
              <textarea
                rows={10}
                value={editingTemplate.body}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-sm font-mono resize-none"
              />
            </div>
          </div>
        )}
      </PlatformModal>
    </div>
  );
};

export default MasterSettings;
