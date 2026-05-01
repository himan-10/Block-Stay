import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Eye, XCircle, CheckCircle, RefreshCcw, X, AlertTriangle, CalendarCheck } from "lucide-react";
import Sidebar from "./admin/Sidebar";
import Topbar from "./admin/Topbar";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, active, completed, cancelled, failed
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // latest, price_desc, status
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/bookings", { withCredentials: true });
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) return;
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/bookings/${id}/status`, { status: newStatus }, { withCredentials: true });
      setBookings((prev) => prev.map((b) => (b._id === id ? res.data : b)));
      if (selectedBooking && selectedBooking._id === id) setSelectedBooking(res.data);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    }
  };

  const handleRefund = async (id) => {
    if (!window.confirm("Are you sure you want to refund this booking? This action cannot be undone.")) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/admin/bookings/${id}/refund`, {}, { withCredentials: true });
      setBookings((prev) => prev.map((b) => (b._id === id ? res.data : b)));
      if (selectedBooking && selectedBooking._id === id) setSelectedBooking(res.data);
    } catch (error) {
      console.error("Failed to refund booking", error);
      alert("Failed to refund booking");
    }
  };

  // Logic to determine payment status
  const getPaymentStatus = (booking) => {
    if (booking.status === 'cancelled' && booking.paymentId && booking.paymentId.includes('refunded')) return 'Refunded';
    if (booking.status === 'cancelled') return 'Failed';
    if (booking.paymentId) return 'Paid';
    return 'Pending';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'cancelled': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'pending':
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  const getPaymentColor = (paymentStatus) => {
    switch(paymentStatus) {
      case 'Paid': return 'text-emerald-400';
      case 'Refunded': return 'text-purple-400';
      case 'Failed': return 'text-rose-400';
      case 'Pending':
      default: return 'text-amber-400';
    }
  };

  let filteredBookings = bookings.filter((b) => {
    const paymentStatus = getPaymentStatus(b);
    if (filter === "active" && !['confirmed', 'pending', 'approved'].includes(b.status)) return false;
    if (filter === "completed" && b.status !== 'completed') return false;
    if (filter === "cancelled" && b.status !== 'cancelled') return false;
    if (filter === "failed" && paymentStatus !== 'Failed') return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const userName = b.user?.name?.toLowerCase() || "";
      const roomName = b.room?.name?.toLowerCase() || "";
      if (!userName.includes(query) && !roomName.includes(query)) return false;
    }
    return true;
  });

  filteredBookings = filteredBookings.sort((a, b) => {
    if (sortBy === "price_desc") return (b.totalPrice || 0) - (a.totalPrice || 0);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const totalRevenue = bookings.filter(b => ['confirmed', 'completed'].includes(b.status)).reduce((acc, b) => acc + (b.totalPrice || 0), 0);
  const activeBookingsCount = bookings.filter(b => ['confirmed', 'pending', 'approved'].includes(b.status)).length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  
  // Fraud detection check: multiple cancellations
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;
  const showFraudAlert = cancelledCount > (bookings.length * 0.3) && bookings.length > 10;

  return (
    <div className="bg-[#0b0c10] min-h-screen text-slate-200 flex font-sans selection:bg-purple-500/30">
      <Sidebar />
      
      <div className="flex-1 ml-64 relative">
        <Topbar />

        <main className="pt-24 px-8 pb-16 max-w-7xl mx-auto">
          
          {/* Header & Dashboard Summary */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Bookings Management
            </h1>
            <p className="text-slate-400 mt-2 text-sm max-w-xl">
              Monitor reservations, process refunds, and track all incoming platform transactions.
            </p>
          </div>

          {showFraudAlert && (
            <div className="mb-8 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center gap-4 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
              <AlertTriangle size={24} className="shrink-0 animate-pulse" />
              <div>
                <h4 className="font-bold">High Cancellation Rate Detected</h4>
                <p className="text-sm opacity-80">Over 30% of total bookings have been cancelled. Please review recent transactions for potential fraud or platform issues.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#13151a] border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CalendarCheck size={80} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Bookings</p>
              <h3 className="text-3xl font-black text-white">{bookings.length}</h3>
            </div>
            <div className="bg-[#13151a] border border-emerald-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(16,185,129,0.05)] relative overflow-hidden group">
              <p className="text-emerald-500/80 text-xs font-bold uppercase tracking-wider mb-2">Active</p>
              <h3 className="text-3xl font-black text-emerald-400">{activeBookingsCount}</h3>
            </div>
            <div className="bg-[#13151a] border border-blue-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(59,130,246,0.05)] relative overflow-hidden group">
              <p className="text-blue-500/80 text-xs font-bold uppercase tracking-wider mb-2">Completed</p>
              <h3 className="text-3xl font-black text-blue-400">{completedCount}</h3>
            </div>
            <div className="bg-gradient-to-br from-purple-900/40 to-[#13151a] border border-purple-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(168,85,247,0.1)] relative overflow-hidden">
              <p className="text-purple-400/80 text-xs font-bold uppercase tracking-wider mb-2">Net Revenue</p>
              <h3 className="text-3xl font-black text-purple-400">₹{totalRevenue.toLocaleString()}</h3>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 bg-[#13151a] p-4 rounded-2xl border border-white/5 shadow-xl">
            {/* Search */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search user or property..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* Tabs */}
              <div className="flex items-center bg-[#0b0c10] border border-white/10 rounded-xl p-1 overflow-x-auto no-scrollbar">
                {['all', 'active', 'completed', 'cancelled', 'failed'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                      filter === tab 
                        ? 'bg-purple-600/20 text-purple-400 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#0b0c10] border border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-300 focus:outline-none focus:border-purple-500/50 transition-all cursor-pointer"
                >
                  <option value="latest">Latest First</option>
                  <option value="price_desc">Amount: High to Low</option>
                  <option value="status">Status</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Data Grid / Table */}
          {loading ? (
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-20 w-full bg-white/5 animate-pulse rounded-2xl border border-white/5"></div>
              ))}
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Search className="text-slate-500" size={24} />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No bookings found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="bg-[#13151a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-white/5 text-xs uppercase tracking-widest text-slate-400 border-b border-white/5">
                      <th className="px-6 py-5 font-semibold">User</th>
                      <th className="px-6 py-5 font-semibold">Property</th>
                      <th className="px-6 py-5 font-semibold">Dates</th>
                      <th className="px-6 py-5 font-semibold">Amount</th>
                      <th className="px-6 py-5 font-semibold">Booking Status</th>
                      <th className="px-6 py-5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBookings.map((booking) => {
                      const paymentStatus = getPaymentStatus(booking);
                      return (
                        <tr key={booking._id} className={`hover:bg-white/[0.02] transition-colors group ${booking.totalPrice > 50000 ? 'bg-amber-500/[0.02]' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-800 shrink-0 overflow-hidden">
                                {booking.user?.photo ? (
                                  <img src={booking.user.photo} alt={booking.user.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-purple-500/20 text-purple-400 font-bold">{booking.user?.name?.charAt(0)}</div>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-white text-sm">{booking.user?.name || 'Unknown User'}</p>
                                <p className="text-xs text-slate-500">{booking.user?.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-slate-200 line-clamp-1">{booking.room?.name || 'Deleted Property'}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{booking.room?.location}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-300">{new Date(booking.checkIn).toLocaleDateString()}</p>
                            <p className="text-xs text-slate-500">to {new Date(booking.checkOut).toLocaleDateString()}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className={`text-sm font-bold ${booking.totalPrice > 50000 ? 'text-amber-400' : 'text-slate-200'}`}>₹{booking.totalPrice?.toLocaleString()}</p>
                            <p className={`text-[10px] font-bold uppercase tracking-wider ${getPaymentColor(paymentStatus)}`}>{paymentStatus}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                              <button onClick={() => setSelectedBooking(booking)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="View Details">
                                <Eye size={18} />
                              </button>
                              
                              {['pending', 'confirmed'].includes(booking.status) && (
                                <button onClick={() => handleUpdateStatus(booking._id, 'completed')} className="p-2 text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="Mark Completed">
                                  <CheckCircle size={18} />
                                </button>
                              )}

                              {['pending', 'confirmed'].includes(booking.status) && (
                                <button onClick={() => handleUpdateStatus(booking._id, 'cancelled')} className="p-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all" title="Cancel Booking">
                                  <XCircle size={18} />
                                </button>
                              )}

                              {paymentStatus === 'Paid' && booking.status === 'cancelled' && (
                                <button onClick={() => handleRefund(booking._id)} className="p-2 text-purple-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all" title="Refund Payment">
                                  <RefreshCcw size={18} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* View Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}></div>
          
          <div className="relative bg-[#13151a] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-gradient-to-b from-[#13151a] to-transparent pointer-events-none">
              <button onClick={() => setSelectedBooking(null)} className="p-2 bg-black/50 hover:bg-white/10 text-white rounded-full backdrop-blur-md transition-all pointer-events-auto">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 pt-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl">
                  {selectedBooking.user?.name?.charAt(0) || '?'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedBooking.user?.name || 'Unknown User'}</h2>
                  <p className="text-slate-400">{selectedBooking.user?.email}</p>
                </div>
                <div className="ml-auto">
                   <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Property Info</h3>
                  <p className="text-white font-medium">{selectedBooking.room?.name || 'Deleted Property'}</p>
                  <p className="text-sm text-slate-400 mt-1">{selectedBooking.room?.location}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Dates</h3>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-slate-400 mb-1">Check-in</p>
                      <p className="text-white font-medium">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div className="text-slate-600">→</div>
                    <div className="text-right">
                      <p className="text-slate-400 mb-1">Check-out</p>
                      <p className="text-white font-medium">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/5 p-6 rounded-2xl border border-purple-500/10 mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-4">Payment & Transaction</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Total Amount</p>
                    <p className="text-3xl font-black text-white">₹{selectedBooking.totalPrice?.toLocaleString()}</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-500 mb-1">Transaction ID</p>
                    <p className="text-sm font-mono text-slate-300 break-all">{selectedBooking.paymentId || 'N/A'}</p>
                    <p className={`text-xs font-bold uppercase mt-2 ${getPaymentColor(getPaymentStatus(selectedBooking))}`}>Status: {getPaymentStatus(selectedBooking)}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {['pending', 'confirmed'].includes(selectedBooking.status) && (
                  <>
                    <button onClick={() => { handleUpdateStatus(selectedBooking._id, 'completed'); setSelectedBooking(null); }} className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20">
                      <CheckCircle size={18} /> Mark Completed
                    </button>
                    <button onClick={() => { handleUpdateStatus(selectedBooking._id, 'cancelled'); setSelectedBooking(null); }} className="flex-1 flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 py-3 rounded-xl font-bold transition-colors">
                      <XCircle size={18} /> Cancel Booking
                    </button>
                  </>
                )}
                {getPaymentStatus(selectedBooking) === 'Paid' && selectedBooking.status === 'cancelled' && (
                  <button onClick={() => { handleRefund(selectedBooking._id); setSelectedBooking(null); }} className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-purple-500/20">
                    <RefreshCcw size={18} /> Process Refund
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
