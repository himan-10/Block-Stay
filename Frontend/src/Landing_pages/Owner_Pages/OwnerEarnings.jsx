import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function OwnerEarnings() {
  const { api } = useContext(AuthContext);
  const [data, setData] = useState({ totalEarnings: 0, monthlyEarnings: [], transactions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await api.get('/owner/earnings');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  return (
    <div className="p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-8 relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Earnings Overview</h2>
          <p className="text-slate-400 mt-1">Track your financial performance and payouts</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <Wallet className="text-cyan-400 mb-4" size={32} />
              <p className="text-cyan-100/70 font-semibold uppercase tracking-wider text-sm mb-2">Total Earnings</p>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">₹{data.totalEarnings.toLocaleString()}</h3>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0d1529]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
              <TrendingUp className="text-emerald-400 mb-4" size={32} />
              <p className="text-slate-400 font-semibold uppercase tracking-wider text-sm mb-2">Confirmed Bookings</p>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">{data.transactions.length}</h3>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0d1529]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
              <ArrowUpRight className="text-purple-400 mb-4" size={32} />
              <p className="text-slate-400 font-semibold uppercase tracking-wider text-sm mb-2">Avg. Per Booking</p>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                ₹{data.transactions.length > 0 ? Math.round(data.totalEarnings / data.transactions.length).toLocaleString() : 0}
              </h3>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-[#0d1529]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Revenue Breakdown</h3>
              <div className="h-80 w-full">
                {data.monthlyEarnings.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.monthlyEarnings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} tickMargin={10} />
                      <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                      <Tooltip 
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ backgroundColor: '#0a0f1d', border: '1px solid #ffffff10', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="earnings" fill="#06b6d4" radius={[6, 6, 0, 0]} maxBarSize={60} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                    <p>Not enough data to display chart</p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-[#0d1529]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col h-[400px]">
              <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                {data.transactions.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-slate-500 text-center">No transactions yet.</p>
                  </div>
                ) : (
                  data.transactions.map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#0a0f1d] rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm line-clamp-1">{t.room?.name || 'Property'}</p>
                          <p className="text-xs text-slate-400 font-medium">{new Date(t.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-extrabold text-base">+₹{t.totalPrice.toLocaleString()}</p>
                        <p className="text-xs text-slate-500 font-medium uppercase">{t.user?.name?.split(' ')[0]}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
