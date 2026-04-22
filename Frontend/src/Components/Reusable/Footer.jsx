import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Branding */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 uppercase hover:opacity-80 transition-opacity">
            Blockstay
          </Link>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Curated accommodations for students and working professionals. Experience a seamless integration of comfort, affordability, and convenience tailored for long-term stays.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-slate-100 font-semibold tracking-wider uppercase text-sm">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link to="/rooms" className="text-slate-400 text-sm hover:text-violet-400 hover:pl-2 transition-all duration-300">Find Rooms & PGs</Link></li>
            <li><Link to="/about" className="text-slate-400 text-sm hover:text-violet-400 hover:pl-2 transition-all duration-300">About Us</Link></li>
            <li><Link to="/contact" className="text-slate-400 text-sm hover:text-violet-400 hover:pl-2 transition-all duration-300">Contact Support</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h4 className="text-slate-100 font-semibold tracking-wider uppercase text-sm">Support</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-slate-400 text-sm hover:text-violet-400 hover:pl-2 transition-all duration-300">FAQ</a></li>
            <li><a href="#" className="text-slate-400 text-sm hover:text-violet-400 hover:pl-2 transition-all duration-300">Privacy Policy</a></li>
            <li><a href="#" className="text-slate-400 text-sm hover:text-violet-400 hover:pl-2 transition-all duration-300">Terms of Service</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>© 2026 BlockStay. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-300 transition-colors">Instagram</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Twitter</a>
          <a href="#" className="hover:text-slate-300 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;