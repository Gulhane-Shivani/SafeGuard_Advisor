import React from 'react';
import { FileText, Download } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { useCustomer } from '../../store/CustomerContext';

const CustomerDocumentVault: React.FC = () => {
  const { data, loading, error } = useCustomer();

  if (loading || !data) return null;

  return (
    <CustomerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Document Vault</h1>
            <p className="text-slate-500 text-sm mt-1">All your policy documents in one secure place.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
            <Download className="w-4 h-4" /> Download All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.policies.map(policy => (
            <div key={policy.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">{policy.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{policy.provider}</p>
                </div>
              </div>

              <span className={`inline-block mb-4 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                policy.status === 'Active'       ? 'bg-teal-50 text-teal-600' :
                policy.status === 'Renewal Due'  ? 'bg-orange-50 text-orange-600' :
                                                   'bg-slate-100 text-slate-500'
              }`}>
                {policy.status}
              </span>

              <div className="space-y-2">
                {['Policy Certificate', 'Premium Receipt', 'ID Card', 'Tax Statement'].map(doc => (
                  <button
                    key={doc}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border border-transparent transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                      <span className="text-xs font-medium text-slate-700 group-hover:text-teal-700">{doc}</span>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDocumentVault;
