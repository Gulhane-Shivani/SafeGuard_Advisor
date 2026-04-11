import React from 'react';
import { FileCheck, AlertCircle, Scale, ShieldCheck } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-sm font-bold mb-6 border border-teal-100">
            <FileCheck className="w-4 h-4" />
            Terms & Conditions
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Please read these terms carefully before using the SafeGuard AI platform.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              By accessing or using SafeGuard Advisor, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Use License</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on SafeGuard Advisor's website for personal, non-commercial transitory viewing only.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4 lowercase">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose;</li>
              <li>Attempt to decompile or reverse engineer any software;</li>
              <li>Remove any copyright or other proprietary notations.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Disclaimer</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              The materials on SafeGuard Advisor's website are provided on an 'as is' basis. SafeGuard Advisor makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-100">
            <p className="text-slate-500 text-sm text-center">
              SafeGuard Advisor reserves the right to revise these terms at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
