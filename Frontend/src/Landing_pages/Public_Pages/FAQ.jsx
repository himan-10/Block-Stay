import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "How do I book a room?",
    answer: "Booking a room is simple. Browse our available listings, select the room that fits your needs, and click 'Book Now'. You'll be guided through a secure checkout process to confirm your stay."
  },
  {
    question: "What is the cancellation policy?",
    answer: "We offer flexible cancellation. You can cancel your booking up to 48 hours before your check-in date for a full refund. Cancellations made within 48 hours may be subject to a one-night cancellation fee."
  },
  {
    question: "Are utilities included in the rent?",
    answer: "Most of our properties include basic utilities such as water, electricity, and high-speed Wi-Fi in the monthly rent. Please check the specific amenities listed on the property details page for full transparency."
  },
  {
    question: "Is there a minimum stay requirement?",
    answer: "We cater to both short-term and long-term stays. While many properties offer nightly rates, some premium accommodations may have a minimum stay requirement of 3 to 7 nights or a monthly lease."
  },
  {
    question: "How do I contact the property owner/manager?",
    answer: "Once your booking is confirmed, you will receive the contact details of your host or property manager. You can also use our in-app messaging system to communicate directly before or during your stay."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-violet-500/30 pt-10">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Help Center</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Questions</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to know about Blockstay. Can't find the answer you're looking for? Feel free to contact our support team.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left outline-none"
              >
                <span className="text-lg font-medium pr-8">{faq.question}</span>
                <motion.div 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-violet-400"
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4 mt-2 mx-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-violet-900/40 to-cyan-900/40 border border-white/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-xl"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto">
            Our support team is always ready to help you with any inquiries you might have regarding your stay or our platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-white text-slate-950 font-semibold rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2">
              Contact Support
            </Link>
            <a href="mailto:support@blockstay.com" className="px-8 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 border border-white/5">
              <Mail className="w-5 h-5" /> Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
