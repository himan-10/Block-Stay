import React, { useState, useEffect, useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  LayoutDashboard, 
  Home, 
  CalendarCheck, 
  Wallet, 
  User, 
  LogOut, 
  Plus, 
  List, 
  TrendingUp,
  Menu,
  X,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative p-6 rounded-2xl bg-[#0d1529]/60 backdrop-blur-xl border border-white/5 overflow-hidden group"
  >
    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center gap-2 text-sm">
        <TrendingUp size={16} className="text-emerald-400" />
        <span className="text-emerald-400 font-medium">{trend}</span>
        <span className="text-slate-500">vs last month</span>
      </div>
    )}
  </motion.div>
);

const EarningsSection = ({ data }) => {
  const defaultChartData = [
    { name: 'Jan', earnings: 0 },
    { name: 'Feb', earnings: 0 },
    { name: 'Mar', earnings: 0 },
    { name: 'Apr', earnings: 0 },
    { name: 'May', earnings: 0 },
    { name: 'Jun', earnings: 0 },
    { name: 'Jul', earnings: 0 },
  ];
  
  const chartData = data?.monthlyEarnings && data.monthlyEarnings.length > 0 
    ? data.monthlyEarnings 
    : defaultChartData;

  return (
    <div className="col-span-1 lg:col-span-2 bg-[#0d1529]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-6 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-xl font-bold text-white">Earnings Overview</h2>
        <select className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-cyan-500/50">
          <option className="bg-[#0f172a]">This Year</option>
          <option className="bg-[#0f172a]">Last Year</option>
        </select>
      </div>

      <div className="h-72 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
            <Tooltip 
              cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Earnings']}
            />
            <Area 
              type="monotone" 
              dataKey="earnings" 
              stroke="#22d3ee" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorEarnings)" 
              activeDot={{ r: 6, fill: "#0f172a", stroke: "#22d3ee", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const RecentBookings = ({ bookings, navigate }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'cancelled': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="col-span-1 lg:col-span-2 bg-[#0d1529]/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
        <button onClick={() => navigate('/owner/bookings')} className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-sm border-b border-white/5">
              <th className="px-6 py-4 font-medium">Guest</th>
              <th className="px-6 py-4 font-medium">Property</th>
              <th className="px-6 py-4 font-medium">Dates</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookings?.length > 0 ? bookings.map((booking) => (
              <tr 
                key={booking._id || booking.id} 
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                      {booking.user?.charAt(0) || 'G'}
                    </div>
                    <div>
                      <p className="text-white font-medium">{booking.user}</p>
                      <p className="text-slate-500 text-xs">{booking.id || booking._id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">{booking.property}</td>
                <td className="px-6 py-4 text-slate-300">{booking.dates}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                  No recent bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const QuickActions = ({ navigate }) => (
  <div className="col-span-1 bg-[#0d1529]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Quick Actions</h2>
      <p className="text-sm text-slate-400 mb-6">Manage your properties and reservations quickly.</p>
    </div>
    
    <div className="space-y-4">
      <button onClick={() => navigate('/owner/properties')} className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-[1px]">
        <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors z-0"></div>
        <div className="relative z-10 bg-[#0d1529] px-4 py-4 rounded-[11px] group-hover:bg-transparent transition-colors flex items-center justify-center gap-2">
          <Plus size={20} className="text-cyan-400 group-hover:text-white transition-colors" />
          <span className="font-semibold text-cyan-400 group-hover:text-white transition-colors">Manage Properties</span>
        </div>
      </button>
      
      <button onClick={() => navigate('/owner/bookings')} className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all">
        <List size={20} />
        <span>View All Bookings</span>
      </button>
    </div>
  </div>
);

export default function OwnerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user, api, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await api.get('/owner/dashboard');
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    } else {
      // If no user context yet (still loading auth), wait.
      // But if user is definitely null after auth loading, protected route handles it
      setIsLoading(true);
    }
  }, [user, api, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050814] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
        <p className="text-cyan-400 font-medium animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050814] flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
          <X className="text-red-400" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white">Oops! Something went wrong</h2>
        <p className="text-slate-400 max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
        <main className="p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-8 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <p className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-1">Owner Dashboard</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{user?.name?.split(' ')[0] || "Owner"}</span>
              </h2>
            </div>
            <div className="text-sm text-slate-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5 shadow-inner">
              Updated just now
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Properties" 
              value={dashboardData?.totalProperties || 0} 
              icon={Home} 
              trend="+12%"
              colorClass="bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
            />
            <StatCard 
              title="Total Bookings" 
              value={dashboardData?.totalBookings || 0} 
              icon={CalendarCheck} 
              trend="+8%"
              colorClass="bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
            />
            <StatCard 
              title="Active Bookings" 
              value={dashboardData?.activeBookings || 0} 
              icon={LayoutDashboard} 
              trend="+24%"
              colorClass="bg-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.3)]" 
            />
            <StatCard 
              title="Total Earnings" 
              value={`₹${dashboardData?.totalEarnings?.toLocaleString() || 0}`} 
              icon={Wallet} 
              trend="+18%"
              colorClass="bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <EarningsSection data={dashboardData} />
            <QuickActions navigate={navigate} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <RecentBookings bookings={dashboardData?.recentBookings || []} navigate={navigate} />
            <div className="col-span-1 hidden lg:block">
              <div className="h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-purple-300" size={32} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Boost Your Listings</h3>
                <p className="text-sm text-slate-300 mb-6">Learn how to get more bookings and increase your revenue.</p>
                <button className="px-6 py-2 bg-white text-[#0a0f1d] font-bold rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Explore Tips
                </button>
              </div>
            </div>
          </div>

        </main>
  );
}