import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-sm font-bold mb-6 border border-teal-100">
            <Shield className="w-4 h-4" />
            Last Updated: April 2024
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Your privacy is our top priority. Learn how we handle your data with transparency and care.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Information We Collect</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              We collect information to provide better services to all our users. This includes:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Personal details (name, email, phone number) for account creation.</li>
              <li>Financial information related to insurance planning.</li>
              <li>Usage data to improve our AI recommendations.</li>
              <li>Communication history via our support channels.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">How We Use Information</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use the collected information for various purposes:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>To provide, maintain, and improve our services.</li>
              <li>To personalize your experience and provide tailored insurance advice.</li>
              <li>To notify you about changes to our services.</li>
              <li>To provide customer support and handle claims assistance.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Data Security</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information. Your data is encrypted and stored in secure servers compliant with industry standards. We do not sell your personal data to third parties.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-100">
            <p className="text-slate-500 text-sm text-center">
              If you have any questions about this Privacy Policy, please contact us at privacy@safeguard.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
