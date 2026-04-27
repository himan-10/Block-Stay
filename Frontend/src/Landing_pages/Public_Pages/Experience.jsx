import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ShieldCheck, UserCheck, Heart } from 'lucide-react';

const Experience = () => {
  const features = [
    {
      id: 'search',
      title: 'Seamless Room Search',
      description: 'Our intuitive interface allows you to find the perfect PG, flat, or shared room in seconds. Filter by price, amenities, and room type to narrow down your options effortlessly.',
      icon: <Search className="w-8 h-8 text-primary" />,
      color: 'bg-primary/10'
    },
    {
      id: 'location',
      title: 'Location-Based Discovery',
      description: 'Explore neighborhoods and find accommodations near your university or workplace. Our interactive maps make it easy to understand exactly where you\'ll be living.',
      icon: <MapPin className="w-8 h-8 text-secondary" />,
      color: 'bg-secondary/10'
    },
    {
      id: 'verified',
      title: 'Verified Listings',
      description: 'Say goodbye to fake photos and scams. Every property on Blockstay is physically verified by our team to ensure it meets our strict quality and safety standards.',
      icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
      color: 'bg-green-400/10'
    },
    {
      id: 'connect',
      title: 'Direct Owner Connect',
      description: 'Skip the brokers and hidden fees. We connect you directly with property owners for transparent communication and fast deal closures.',
      icon: <UserCheck className="w-8 h-8 text-orange-400" />,
      color: 'bg-orange-400/10'
    },
    {
      id: 'compare',
      title: 'Save & Compare Rooms',
      description: 'Create your personalized wishlist. Save your favorite properties and compare them side-by-side to make an informed decision on your next home.',
      icon: <Heart className="w-8 h-8 text-rose-400" />,
      color: 'bg-rose-400/10'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-24 h-24 bg-surface-container rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
        >
          <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            explore
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          The Blockstay <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Experience</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-on-surface-variant max-w-2xl leading-relaxed"
        >
          We've completely reimagined how you find your next long-term stay. Discover the features that make our platform the standard for modern living.
        </motion.p>
      </section>

      {/* Features Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              id={feature.id}
              variants={itemVariants}
              className={`bg-surface-container-low border border-surface-container p-8 rounded-3xl hover:border-outline-variant transition-colors group relative overflow-hidden ${index === features.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Background Glow */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 ${feature.color} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 opacity-50`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Experience;
