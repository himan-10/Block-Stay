import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const lastUpdated = "April 2026";

  const sections = [
    {
      title: "1. Information We Collect",
      content: (
        <>
          <p className="mb-4">When you use Blockstay, we collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li><strong>Personal Information:</strong> Name, email address, phone number, and payment details when you create an account or book a stay.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our platform, including IP address, browser type, pages visited, and booking history.</li>
            <li><strong>Communication Data:</strong> Messages you send to property owners or our support team through the platform.</li>
          </ul>
        </>
      )
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <>
          <p className="mb-4">We use the collected information for various purposes, including:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Facilitating bookings and managing reservations.</li>
            <li>Processing payments securely through our third-party payment providers.</li>
            <li>Improving our platform, user interface, and customer service.</li>
            <li>Sending important updates, security alerts, and promotional offers (if you opt-in).</li>
            <li>Ensuring compliance with our terms and preventing fraudulent activities.</li>
          </ul>
        </>
      )
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: (
        <>
          <p className="mb-4">We respect your privacy and do not sell your personal information. We may share information with:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li><strong>Property Owners:</strong> Essential details required to facilitate your stay.</li>
            <li><strong>Service Providers:</strong> Third-party vendors who assist us with payment processing, analytics, and marketing.</li>
            <li><strong>Legal Authorities:</strong> When required by law to comply with legal processes or protect the rights and safety of Blockstay and our users.</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Data Security",
      content: (
        <p>
          We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      )
    },
    {
      title: "5. Your Privacy Rights",
      content: (
        <p>
          Depending on your location, you may have the right to access, update, or delete your personal information. You can manage your account settings directly within the platform or contact our support team for assistance with exercising your rights.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-violet-500/30 pt-10">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[150px]"></div>
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
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Policy</span>
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
            At Blockstay, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform. By accessing or using Blockstay, you consent to the practices described in this policy.
          </div>

          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-100 border-b border-white/10 pb-4">{section.title}</h2>
              <div className="text-slate-300 leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}

          <div className="mt-12 pt-8 border-t border-white/10 text-slate-400 bg-violet-900/10 p-6 rounded-2xl border border-violet-500/20">
            <h3 className="text-xl font-bold text-slate-100 mb-2">Contact Us Regarding Privacy</h3>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer at 
              <a href="mailto:privacy@blockstay.com" className="text-violet-400 hover:text-violet-300 ml-1 transition-colors">privacy@blockstay.com</a>.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
