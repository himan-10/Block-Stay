import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const ContactUs = () => {
  const [formStatus, setFormStatus] = React.useState('idle');

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    inquiryType: "General Concierge",
    message: ""
  });
  // ✅ handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default page reload on form submit
    setFormStatus('submitting'); // Trigger the loading animation on the button
    
    try {
      // Construct the API endpoint URL (uses environment variable if available)
      const apiUrl = import.meta.env.VITE_API_URL;
      
      // Send the user's name, email, and message to the backend via POST request
      await axios.post(`${apiUrl}/contact`, formData);
      
      // Show the success UI if the email was sent successfully
      setFormStatus('success');
      
      // Reset the form input fields
      setFormData({ name: "", email: "", inquiryType: "General Concierge", message: "" });
    } catch (error) {
      console.error("Error submitting form", error);
      // Reset the form status back to idle so the user can try again on failure
      setFormStatus('idle');
    }
  };
  

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[50vh] flex items-center rounded-b-[3rem] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/contactus_hero.png" 
            alt="Contact Hero" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-surface-container/50 to-transparent" />
        </div>

        <motion.div 
          className="relative z-10 max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            We're Here <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">to Help.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
            Have a question about a booking or need assistance listing your property? Our dedicated support team is available 24/7.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-24 -mt-10 relative z-20">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-surface-container-low/40 backdrop-blur-xl border border-surface-container p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            
            <h2 className="text-3xl font-bold mb-8">Send Inquiry</h2>

            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-2">Message Sent</h3>
                <p className="text-on-surface-variant">Our concierge will contact you within 2 hours.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 px-6 py-2 bg-surface-container hover:bg-surface-container/80 rounded-full transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-on-surface-variant font-medium ml-1">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-surface-container/50 border border-surface-container-low rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-on-surface-variant font-medium ml-1">Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full bg-surface-container/50 border border-surface-container-low rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-on-surface-variant font-medium ml-1">Inquiry Type</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="w-full bg-surface-container/50 border border-surface-container-low rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 appearance-none">
                    <option value="General Concierge">General Concierge</option>
                    <option value="Booking Modification">Booking Modification</option>
                    <option value="Corporate Retreats">Corporate Retreats</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-on-surface-variant font-medium ml-1">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required className="w-full bg-surface-container/50 border border-surface-container-low rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none" rows="5" placeholder="How can we assist you today?" />
                </div>

                <button 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-primary hover:bg-primary/90 text-on-primary py-4 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:scale-100"
                >
                  {formStatus === 'submitting' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Side Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Direct Contact Card */}
            <div className="bg-surface-container-low/40 backdrop-blur-xl border border-surface-container rounded-3xl p-8 hover:border-primary/30 transition-colors duration-300 flex-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <Phone className="text-primary w-6 h-6" /> Direct Connect
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="group/item flex items-start gap-4 cursor-pointer">
                  <div className="p-3 bg-surface-container rounded-full group-hover/item:bg-primary/20 group-hover/item:text-primary transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-on-surface-variant mb-1">Global Support (24/7)</p>
                    <p className="font-medium text-lg">+91 8103498052</p>
                  </div>
                </div>
                
                <div className="group/item flex items-start gap-4 cursor-pointer">
                  <div className="p-3 bg-surface-container rounded-full group-hover/item:bg-primary/20 group-hover/item:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-on-surface-variant mb-1">Customer Assistant</p>
                    <p className="font-medium text-lg">himanshupatle56@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HQ Card */}
            <div className="bg-surface-container-low/40 backdrop-blur-xl border border-surface-container rounded-3xl p-8 hover:border-secondary/30 transition-colors duration-300 flex-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors duration-300" />
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <MapPin className="text-secondary w-6 h-6" /> Headquarters
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-lg">Blockstay Bhopal HQ</p>
                  <p className="text-on-surface-variant leading-relaxed">
                   Bhopal Square<br/>
                   Bhopal<br/>
                   64, Sonagiri Sector C, Bhopal MP
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface-container rounded-lg p-3 w-max cursor-default">
                  <Clock className="w-4 h-4 text-primary" /> Core Hours: 09:00 - 18:00 GMT
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>

        {/* Global Nodes map section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 relative rounded-3xl overflow-hidden border border-surface-container/50 bg-surface-container-low flex flex-col items-center justify-center"
        >
          <div className="relative w-full min-h-[500px] flex items-center justify-center p-8 lg:p-16">
            <img 
              src="/contact_map.png" 
              alt="Global Nodes Map" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-surface-container-low/50 to-background/90" />
            
            <div className="relative z-10 w-full max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Global Nodes</h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto">
                  Our network spans across premier international destinations. Seamless premium service, wherever the night takes you.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { city: "Vidisha", desc: "Service Center & APAC HQ", delay: 0.1 },
                  { city: "Bhopal", desc: "Executive Concierge", delay: 0.2 },
                  { city: "Indore", desc: "Global Booking Exchange", delay: 0.3 }
                ].map((node) => (
                  <motion.div 
                    key={node.city} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: node.delay }}
                    className="bg-surface-container-low/60 backdrop-blur-md border border-surface-container p-6 rounded-2xl hover:bg-surface-container hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(139,92,246,0.5)]" />
                      <h4 className="text-xl font-bold">{node.city}</h4>
                    </div>
                    <p className="text-sm text-on-surface-variant">
                      {node.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default ContactUs;