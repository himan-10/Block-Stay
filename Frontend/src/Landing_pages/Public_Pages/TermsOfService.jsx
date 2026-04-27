import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  const lastUpdated = "April 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: (
        <p>
          By accessing and using Blockstay ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update or modify these terms at any time without prior notice, and your continued use of the Platform constitutes acceptance of those changes.
        </p>
      )
    },
    {
      title: "2. User Accounts and Responsibilities",
      content: (
        <>
          <p className="mb-4">To access certain features of Blockstay, you must register for an account. You agree to:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Provide accurate, current, and complete information during registration.</li>
            <li>Maintain the security and confidentiality of your password and account.</li>
            <li>Take full responsibility for all activities that occur under your account.</li>
            <li>Notify us immediately of any unauthorized use of your account or security breach.</li>
          </ul>
        </>
      )
    },
    {
      title: "3. Booking and Payments",
      content: (
        <>
          <p className="mb-4">When making a reservation through Blockstay, you agree to the following:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>You are legally capable of entering into binding contracts.</li>
            <li>All payment information provided is accurate and you are authorized to use the payment method.</li>
            <li>You agree to pay all charges associated with your booking, including rent, service fees, and applicable taxes.</li>
            <li>Cancellations and refunds are subject to the specific policy outlined at the time of booking.</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Property Owner Guidelines",
      content: (
        <p>
          Property owners listing accommodations on Blockstay must ensure that all property details, pricing, and availability are accurate and up-to-date. Owners are responsible for maintaining safe and habitable premises and complying with all local laws, zoning regulations, and tax requirements. Blockstay reserves the right to remove any listing that violates our quality standards or terms.
        </p>
      )
    },
    {
      title: "5. Prohibited Conduct",
      content: (
        <>
          <p className="mb-4">Users of the Platform agree NOT to:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Use the Platform for any illegal or unauthorized purpose.</li>
            <li>Submit false, misleading, or fraudulent information.</li>
            <li>Harass, abuse, or harm other users, property owners, or Blockstay staff.</li>
            <li>Interfere with or disrupt the operation of the Platform or the servers hosting it.</li>
            <li>Attempt to bypass or manipulate the payment system or fees.</li>
          </ul>
        </>
      )
    },
    {
      title: "6. Limitation of Liability",
      content: (
        <p>
          Blockstay acts as a marketplace connecting guests and property owners. We do not own, manage, or control the properties listed. To the fullest extent permitted by law, Blockstay shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the Platform, the properties, or interactions with other users.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 pt-10">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Service</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Last updated: <span className="text-slate-200">{lastUpdated}</span>
          </p>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert prose-slate max-w-none space-y-12 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="text-slate-300 leading-relaxed text-lg">
            Welcome to Blockstay. Please read these Terms of Service carefully before using our website and services. These terms govern your use of the Blockstay platform and establish the legal relationship between you and Blockstay.
          </div>

          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-100 border-b border-white/10 pb-4">{section.title}</h2>
              <div className="text-slate-300 leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}

          <div className="mt-12 pt-8 border-t border-white/10 text-slate-400 bg-cyan-900/10 p-6 rounded-2xl border border-cyan-500/20">
            <h3 className="text-xl font-bold text-slate-100 mb-2">Legal Inquiries</h3>
            <p>
              For any legal inquiries or questions regarding these Terms of Service, please contact our legal department at 
              <a href="mailto:legal@blockstay.com" className="text-cyan-400 hover:text-cyan-300 ml-1 transition-colors">legal@blockstay.com</a>.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default TermsOfService;
