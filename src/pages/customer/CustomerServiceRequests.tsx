import React, { useState } from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { useCustomer } from '../../store/CustomerContext';
import { cn } from '../../utils/helpers';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const REQUEST_TYPES = [
  'Address Change', 'Nominee Change', 'Duplicate ID Card',
  'Bank Account Update', 'Policy Copy', 'Other',
];

import { ServiceRequestModal } from '../../components/ServiceRequestModal';
import { ServiceRequestDetailModal } from '../../components/ServiceRequestDetailModal';

const CustomerServiceRequests: React.FC = () => {
  const { data, loading, error, addServiceRequest } = useCustomer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [viewingRequest, setViewingRequest] = useState<any>(null);

  if (loading || !data) return <LoadingSpinner />;

  const handleNewRequest = (type?: string) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (requestData: any) => {
    addServiceRequest(requestData);
    // Success notification could go here
  };

  const handleViewRequest = (req: any) => {
    setViewingRequest(req);
  };

  return (
    <CustomerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Service Requests</h1>
            <p className="text-slate-500 text-sm mt-1">Raise and track service requests easily.</p>
          </div>
          <button 
            onClick={() => handleNewRequest()}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
          >
            <Plus className="w-4 h-4" /> New Request
          </button>
        </div>

        {/* Quick request types */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-5">Raise a Request</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {REQUEST_TYPES.map(type => (
              <button 
                key={type} 
                onClick={() => handleNewRequest(type)}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50 transition-all text-left group"
              >
                <span className="text-sm font-medium text-slate-700 group-hover:text-teal-700">{type}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Existing requests */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">My Requests</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Request ID', 'Type', 'Description', 'Date', 'Status', ''].map(h => (
                    <th key={h} className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.serviceRequests.map(req => (
                  <tr key={req.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-900">{req.id}</td>
                    <td className="px-6 py-5 text-sm text-slate-700 font-medium">{req.type}</td>
                    <td className="px-6 py-5 text-sm text-slate-500">{req.description}</td>
                    <td className="px-6 py-5 text-sm text-slate-500 whitespace-nowrap">{req.date}</td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        'text-[10px] px-3 py-1 rounded-full font-bold whitespace-nowrap',
                        req.status === 'Completed'   ? 'bg-teal-100 text-teal-700' :
                        req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                       'bg-orange-100 text-orange-700'
                      )}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button 
                        onClick={() => handleViewRequest(req)}
                        className="text-slate-400 hover:text-teal-600 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialType={selectedType}
      />
      <ServiceRequestDetailModal
        isOpen={!!viewingRequest}
        onClose={() => setViewingRequest(null)}
        request={viewingRequest}
      />
    </CustomerLayout>
  );
};

export default CustomerServiceRequests;
