import React, { useState } from 'react';
import { MessageSquare, PhoneCall, FileText, ChevronRight, ChevronDown, Mail, MapPin } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { useCustomer } from '../../store/CustomerContext';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { cn } from '../../utils/helpers';
import { LiveChatModal } from '../../components/LiveChatModal';

const FAQS = [
  { q: 'How do I renew my policy?', a: 'Go to My Policies → click "Renew Now" on the policy, or visit Payments & Renewals section.' },
  { q: 'What documents are needed for a claim?', a: 'Hospital bills, discharge summary, policy copy, and a filled claim form. Upload them in the Claims section.' },
  { q: 'Can I change my nominee online?', a: 'Yes. Go to Profile → Nominee Details → click "Update" to raise a nominee change request.' },
  { q: 'How to download my policy certificate?', a: 'Visit Document Vault → select your policy → click "Policy Certificate" to download.' },
  { q: 'What is auto-debit / ECS?', a: 'It is an automated premium deduction from your bank account on the due date. Manage it in Payments.' },
  { q: 'How long does a claim take to settle?', a: 'Cashless claims are settled within 6 hours. Reimbursement claims take 7–15 working days.' },
];

const CustomerSupport: React.FC = () => {
  const { data, loading, error, addSupportTicket } = useCustomer();
  const ticketFormRef = React.useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (loading || !data) return <LoadingSpinner />;

  const handleLiveChat = () => {
    setIsChatOpen(true);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876500000', '_blank');
  };

  const scrollToTicket = () => {
    ticketFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicket = {
      id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
      subject: ticketSubject,
      status: 'Open',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    addSupportTicket(newTicket);
    setTicketSubmitted(true);
    setTimeout(() => setTicketSubmitted(false), 4000);
    setTicketSubject('');
    setTicketDesc('');
  };

  return (
    <CustomerLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
          <p className="text-slate-500 text-sm mt-1">We're here to help you 24/7.</p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: 'Live Chat',     desc: 'Chat with an expert instantly',    icon: MessageSquare, color: 'bg-teal-50 text-teal-600',  action: 'Start Chat'      },
            { title: 'WhatsApp',      desc: 'Message us on +91 98765 00000',    icon: PhoneCall,     color: 'bg-green-50 text-green-600', action: 'Open WhatsApp'   },
            { title: 'Raise Ticket',  desc: 'Submit a support ticket',          icon: FileText,      color: 'bg-blue-50 text-blue-600',   action: 'New Ticket'      },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item.action === 'Start Chat') handleLiveChat();
                if (item.action === 'Open WhatsApp') handleWhatsApp();
                if (item.action === 'New Ticket') scrollToTicket();
              }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all text-center group"
            >
              <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
              <p className="text-sm text-slate-500 mt-1 mb-5">{item.desc}</p>
              <span className="inline-block px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">
                {item.action}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="text-sm font-semibold text-slate-800 pr-4">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronDown className="w-4 h-4 text-teal-600 shrink-0" />
                      : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 bg-teal-50/50">
                      <p className="text-sm text-slate-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Raise Ticket + Contact */}
          <div className="space-y-6" ref={ticketFormRef}>
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Raise a Support Ticket</h3>
              {ticketSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-7 h-7" />
                  </div>
                  <p className="font-bold text-slate-900">Ticket Submitted!</p>
                  <p className="text-sm text-slate-500 mt-1">We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleTicket} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Subject</label>
                    <input
                      type="text"
                      value={ticketSubject}
                      onChange={e => setTicketSubject(e.target.value)}
                      required
                      placeholder="e.g. Claim not processed"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</label>
                    <textarea
                      value={ticketDesc}
                      onChange={e => setTicketDesc(e.target.value)}
                      required
                      rows={4}
                      placeholder="Describe your issue in detail..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
                  >
                    Submit Ticket
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="font-bold mb-5">Contact Us</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <PhoneCall className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>1800-123-4567 (Toll Free, 24×7)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>support@safeguardadvisor.com</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>SafeGuard Towers, 5th Floor, HSR Layout, Bangalore – 560102</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-400">Branch hours: Mon–Sat, 9 AM – 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket History */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Ticket History</h2>
            <p className="text-sm text-slate-500 mt-1">View and track the status of your previous support requests.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(data.supportTickets || []).map((ticket: any) => (
                  <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">{ticket.id}</td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-600">{ticket.subject}</td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        ticket.status === 'Resolved' ? "bg-emerald-50 text-emerald-600" :
                        ticket.status === 'Open' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                      )}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500">{ticket.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <LiveChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </CustomerLayout>
  );
};

export default CustomerSupport;
