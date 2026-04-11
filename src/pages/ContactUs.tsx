import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export const ContactUs: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have questions about insurance? Our team of experts is here to help you make the right choice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                    <p className="text-slate-500 text-sm">support@safeguard.in</p>
                    <p className="text-slate-500 text-sm">claims@safeguard.in</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                    <p className="text-slate-500 text-sm">1800-SAFE-GUARD</p>
                    <p className="text-slate-500 text-sm">+91 22 1234 5678</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Office</h3>
                    <p className="text-slate-500 text-sm">
                      Level 5, BKC Financial Centre,<br />
                      Bandra East, Mumbai - 400051
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Working Hours</h3>
                    <p className="text-slate-500 text-sm">Mon - Sat: 9 AM to 8 PM</p>
                    <p className="text-slate-500 text-sm italic">Closed on Sundays & Holidays</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-600 p-8 rounded-[2.5rem] text-white">
              <MessageSquare className="w-8 h-8 mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-teal-100 text-sm mb-4">Need instant help? Our AI assistant and support team are online.</p>
              <button className="w-full py-3 bg-white text-teal-600 rounded-2xl font-bold hover:bg-teal-50 transition-colors">
                Start Chatting
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                Send us a Message <Send className="w-6 h-6 text-teal-600" />
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all">
                    <option>General Inquiry</option>
                    <option>Claims Assistance</option>
                    <option>Partnership Interest</option>
                    <option>Report an Issue</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
