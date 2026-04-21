import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-slate-900 sticky top-0 z-50">
      
      <Link to="/" className="text-xl font-bold hover:text-cyan-400 transition-colors">BlockStay</Link>

      <input
        placeholder="Search..."
        className="bg-slate-800 px-4 py-1 rounded-full text-sm"
      />

    </div>
  );
}