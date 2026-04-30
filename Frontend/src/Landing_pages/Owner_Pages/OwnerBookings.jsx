import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Calendar, User, Home, Clock, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function OwnerBookings() {
  const { api } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/bookings/owner-bookings');
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateStatus = async (id, status) => {
    setProcessingId(id);
    try {
      await api.put(`/bookings/${id}/status`, { status });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      showToast(`Booking ${status} successfully!`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update booking', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredBookings = bookings.filter(b => filter === 'All' || b.status.toLowerCase() === filter.toLowerCase());

  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium uppercase tracking-wider">Confirmed (Paid)</span>;
      case 'approved': return <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium uppercase tracking-wider">Approved (Awaiting Payment)</span>;
      case 'cancelled': return <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-medium uppercase tracking-wider">Cancelled</span>;
      default: return <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-medium uppercase tracking-wider">Pending Approval</span>;
    }
  };

  return (
    <div className="p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-8 relative z-10">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }} 
            animate={{ opacity: 1, y: 0, x: '-50%' }} 
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-8 left-1/2 z-50 flex items-center gap-3 backdrop-blur-xl border px-6 py-3.5 rounded-2xl shadow-2xl ${
              toast.type === 'error' ? 'bg-[#0d1529]/90 border-rose-500/30 text-white shadow-[0_10px_40px_rgba(244,63,94,0.2)]' 
              : 'bg-[#0d1529]/90 border-emerald-500/30 text-white shadow-[0_10px_40px_rgba(16,185,129,0.2)]'
            }`}
          >
            {toast.type === 'error' ? <AlertTriangle className="text-rose-400" size={18} /> : <CheckCircle className="text-emerald-400" size={18} />}
            <span className="font-medium">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Booking Requests</h2>
          <p className="text-slate-400 mt-1">Manage all reservations for your properties</p>
        </div>
        
        <div className="flex bg-[#0a0f1d] p-1.5 rounded-xl border border-white/10 overflow-x-auto w-full lg:w-auto">
          {['All', 'Pending', 'Approved', 'Confirmed', 'Cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 lg:flex-none px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                filter === f ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : error ? (
        <div className="bg-rose-500/10 text-rose-400 p-6 rounded-2xl border border-rose-500/20 text-center font-medium">{error}</div>
      ) : filteredBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-white/10 rounded-3xl bg-[#0d1529]/40 backdrop-blur-sm">
          <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6">
            <Calendar className="text-cyan-400" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No bookings found</h3>
          <p className="text-slate-400 max-w-sm">You don't have any {filter !== 'All' ? filter.toLowerCase() : ''} bookings at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence>
            {filteredBookings.map(booking => (
              <motion.div 
                key={booking._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0d1529]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                      <User className="text-cyan-400" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Guest</p>
                      <p className="text-white font-bold text-lg">{booking.user?.name || 'Unknown User'}</p>
                      <p className="text-sm text-slate-400">{booking.user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                      <Home className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Property</p>
                      <p className="text-white font-bold text-lg line-clamp-1">{booking.room?.name || 'Deleted Property'}</p>
                      <p className="text-sm text-emerald-400 font-bold">₹{booking.totalPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                      <Calendar className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Dates & Status</p>
                      <p className="text-white font-medium text-sm mb-2">
                        {new Date(booking.checkIn).toLocaleDateString()} — {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex flex-row md:flex-col items-center gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 min-w-[140px]">
                    <button 
                      onClick={() => updateStatus(booking._id, 'approved')}
                      disabled={processingId === booking._id}
                      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 hover:text-white rounded-xl transition-all disabled:opacity-50 font-bold shadow-lg shadow-emerald-500/5"
                    >
                      <Check size={18} />
                      Accept
                    </button>
                    <button 
                      onClick={() => updateStatus(booking._id, 'cancelled')}
                      disabled={processingId === booking._id}
                      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 border border-rose-500/30 hover:border-rose-500 hover:text-white rounded-xl transition-all disabled:opacity-50 font-bold shadow-lg shadow-rose-500/5"
                    >
                      <X size={18} />
                      Reject
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
