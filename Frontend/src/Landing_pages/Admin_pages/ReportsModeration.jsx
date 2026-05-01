import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Eye, AlertTriangle, ShieldAlert, CheckCircle, XCircle, Trash2, ShieldBan, BellRing, X, Activity } from "lucide-react";
import Sidebar from "./admin/Sidebar";
import Topbar from "./admin/Topbar";

export default function ReportsModeration() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, resolved, ignored, property, user
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // latest, severity, status
  const [selectedReport, setSelectedReport] = useState(null);

  // Stats
  const [actionsTaken, setActionsTaken] = useState(0);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/reports", { withCredentials: true });
      setReports(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch reports", error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/reports/${id}/status`, { status: newStatus }, { withCredentials: true });
      setReports((prev) => prev.map((r) => (r._id === id ? res.data : r)));
      if (selectedReport && selectedReport._id === id) setSelectedReport(res.data);
      setActionsTaken(prev => prev + 1);
    } catch (error) {
      console.error("Failed to update report status", error);
      alert("Failed to update status");
    }
  };

  const handleDeleteProperty = async (propertyId, reportId) => {
    if (!window.confirm("Are you sure you want to permanently delete this property?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/listings/${propertyId}`, { withCredentials: true });
      // Also resolve the report
      handleUpdateStatus(reportId, 'Resolved');
      alert("Property deleted successfully.");
    } catch (error) {
      console.error("Failed to delete property", error);
      alert("Failed to delete property");
    }
  };

  const handleBanUser = async (userId, reportId) => {
    if (!window.confirm("Are you sure you want to ban this user?")) return;
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/ban`, {}, { withCredentials: true });
      // Also resolve the report
      handleUpdateStatus(reportId, 'Resolved');
      alert("User banned successfully.");
    } catch (error) {
      console.error("Failed to ban user", error);
      alert(error.response?.data?.message || "Failed to ban user");
    }
  };

  const handleWarnUser = async (userId, reportId) => {
    if (!window.confirm("Send a warning notification to this user?")) return;
    try {
      await axios.post(`http://localhost:5000/api/admin/users/${userId}/warn`, {}, { withCredentials: true });
      handleUpdateStatus(reportId, 'Resolved');
      alert("Warning sent successfully.");
    } catch (error) {
      console.error("Failed to send warning", error);
      alert("Failed to send warning");
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Medium': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Low':
      default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Ignored': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      case 'Pending':
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  // Filters
  let filteredReports = reports.filter((r) => {
    if (filter === "pending" && r.status !== "Pending") return false;
    if (filter === "resolved" && r.status !== "Resolved") return false;
    if (filter === "ignored" && r.status !== "Ignored") return false;
    if (filter === "property" && r.type !== "Property Report") return false;
    if (filter === "user" && r.type !== "User Report") return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!r.reportedUser?.name?.toLowerCase().includes(query) && 
          !r.reportedProperty?.name?.toLowerCase().includes(query) &&
          !r.reason.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  });

  // Sort
  const severityScore = { 'High': 3, 'Medium': 2, 'Low': 1 };
  filteredReports = filteredReports.sort((a, b) => {
    if (sortBy === "severity") return severityScore[b.severity] - severityScore[a.severity];
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const totalReports = reports.length;
  const pendingCount = reports.filter(r => r.status === 'Pending').length;
  const highSeverityCount = reports.filter(r => r.severity === 'High' && r.status === 'Pending').length;

  return (
    <div className="bg-[#0b0c10] min-h-screen text-slate-200 flex font-sans selection:bg-purple-500/30">
      <Sidebar />
      
      <div className="flex-1 ml-64 relative">
        <Topbar />

        <main className="pt-24 px-8 pb-16 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Reports & Moderation
            </h1>
            <p className="text-slate-400 mt-2 text-sm max-w-xl">
              Monitor community flags, resolve disputes, and maintain platform integrity.
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#13151a] border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldAlert size={80} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Reports</p>
              <h3 className="text-3xl font-black text-white">{totalReports}</h3>
            </div>
            <div className="bg-[#13151a] border border-amber-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(245,158,11,0.05)] relative overflow-hidden">
              <p className="text-amber-500/80 text-xs font-bold uppercase tracking-wider mb-2">Pending</p>
              <h3 className="text-3xl font-black text-amber-400">{pendingCount}</h3>
            </div>
            <div className="bg-gradient-to-br from-red-900/30 to-[#13151a] border border-red-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(239,68,68,0.05)] relative overflow-hidden">
              <p className="text-red-400/80 text-xs font-bold uppercase tracking-wider mb-2">High Severity (Pending)</p>
              <h3 className="text-3xl font-black text-red-400">{highSeverityCount}</h3>
            </div>
            <div className="bg-[#13151a] border border-purple-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(168,85,247,0.05)] relative overflow-hidden">
              <p className="text-purple-400/80 text-xs font-bold uppercase tracking-wider mb-2">Actions Taken Today</p>
              <h3 className="text-3xl font-black text-purple-400 flex items-center gap-2">
                {actionsTaken} <Activity size={24} className="opacity-50" />
              </h3>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 bg-[#13151a] p-4 rounded-2xl border border-white/5 shadow-xl">
            {/* Search */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search user, property, or reason..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* Tabs */}
              <div className="flex items-center bg-[#0b0c10] border border-white/10 rounded-xl p-1 overflow-x-auto no-scrollbar">
                {['all', 'pending', 'resolved', 'ignored', 'property', 'user'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
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
                  <option value="severity">Severity: High to Low</option>
                  <option value="status">Status</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Data Table */}
          {loading ? (
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-20 w-full bg-white/5 animate-pulse rounded-2xl border border-white/5"></div>
              ))}
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <ShieldAlert className="text-slate-500" size={24} />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No reports found</h3>
              <p className="text-slate-500 text-sm">Everything looks clean. No moderation needed.</p>
            </div>
          ) : (
            <div className="bg-[#13151a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-white/5 text-xs uppercase tracking-widest text-slate-400 border-b border-white/5">
                      <th className="px-6 py-5 font-semibold">Target</th>
                      <th className="px-6 py-5 font-semibold">Reason</th>
                      <th className="px-6 py-5 font-semibold">Reported By</th>
                      <th className="px-6 py-5 font-semibold">Severity</th>
                      <th className="px-6 py-5 font-semibold">Status</th>
                      <th className="px-6 py-5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredReports.map((report) => (
                      <tr key={report._id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {report.type === 'Property Report' ? (
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                                <img src={report.reportedProperty?.images?.[0] || 'https://via.placeholder.com/150'} alt="Property" className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-slate-800 shrink-0 flex items-center justify-center font-bold text-white overflow-hidden">
                                {report.reportedUser?.photo ? (
                                  <img src={report.reportedUser.photo} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                  report.reportedUser?.name?.charAt(0) || 'U'
                                )}
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-white text-sm">
                                {report.type === 'Property Report' 
                                  ? (report.reportedProperty?.name || 'Deleted Property') 
                                  : (report.reportedUser?.name || 'Deleted User')}
                              </p>
                              <p className="text-xs text-slate-500">{report.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-200">{report.reason}</p>
                          <p className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">{report.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-300">{report.reporter?.name || 'Unknown'}</p>
                          <p className="text-[10px] text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getSeverityColor(report.severity)}`}>
                            {report.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setSelectedReport(report)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="View Details">
                              <Eye size={18} />
                            </button>
                            
                            {report.status === 'Pending' && (
                              <>
                                <button onClick={() => handleUpdateStatus(report._id, 'Resolved')} className="p-2 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all" title="Mark Resolved">
                                  <CheckCircle size={18} />
                                </button>
                                <button onClick={() => handleUpdateStatus(report._id, 'Ignored')} className="p-2 text-slate-500 hover:text-slate-400 hover:bg-slate-500/10 rounded-lg transition-all" title="Ignore Report">
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedReport(null)}></div>
          
          <div className="relative bg-[#13151a] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-gradient-to-b from-[#13151a] to-transparent pointer-events-none">
              <button onClick={() => setSelectedReport(null)} className="p-2 bg-black/50 hover:bg-white/10 text-white rounded-full backdrop-blur-md transition-all pointer-events-auto">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 pt-0">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedReport.severity === 'High' ? 'bg-red-500/20 text-red-500' :
                  selectedReport.severity === 'Medium' ? 'bg-orange-500/20 text-orange-500' :
                  'bg-yellow-500/20 text-yellow-500'
                }`}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedReport.reason}</h2>
                  <p className="text-slate-400 text-sm">Reported on {new Date(selectedReport.createdAt).toLocaleString()}</p>
                </div>
                <div className="ml-auto">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(selectedReport.status)}`}>
                    {selectedReport.status}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Detailed Description</h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Target Information</h3>
                  {selectedReport.type === 'Property Report' ? (
                    <div>
                      <p className="text-white font-medium mb-1">{selectedReport.reportedProperty?.name || 'Deleted Property'}</p>
                      <p className="text-sm text-slate-400">{selectedReport.reportedProperty?.location}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white font-medium mb-1">{selectedReport.reportedUser?.name || 'Deleted User'}</p>
                      <p className="text-sm text-slate-400">{selectedReport.reportedUser?.email}</p>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Reported By</h3>
                  <p className="text-white font-medium mb-1">{selectedReport.reporter?.name || 'Unknown'}</p>
                  <p className="text-sm text-slate-400">{selectedReport.reporter?.email}</p>
                </div>
              </div>

              {/* Action Area */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Moderation Actions</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedReport.type === 'Property Report' && selectedReport.reportedProperty && (
                    <button 
                      onClick={() => { handleDeleteProperty(selectedReport.reportedProperty._id, selectedReport._id); setSelectedReport(null); }} 
                      className="flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 py-3 rounded-xl font-bold transition-colors"
                    >
                      <Trash2 size={18} /> Remove Listing
                    </button>
                  )}
                  
                  {selectedReport.type === 'User Report' && selectedReport.reportedUser && (
                    <button 
                      onClick={() => { handleBanUser(selectedReport.reportedUser._id, selectedReport._id); setSelectedReport(null); }} 
                      className="flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 py-3 rounded-xl font-bold transition-colors"
                    >
                      <ShieldBan size={18} /> Ban User
                    </button>
                  )}

                  {selectedReport.reportedUser && (
                    <button 
                      onClick={() => { handleWarnUser(selectedReport.reportedUser._id, selectedReport._id); setSelectedReport(null); }} 
                      className="flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/20 py-3 rounded-xl font-bold transition-colors"
                    >
                      <BellRing size={18} /> Send Warning
                    </button>
                  )}

                  {selectedReport.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => { handleUpdateStatus(selectedReport._id, 'Resolved'); setSelectedReport(null); }} 
                        className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-500/20"
                      >
                        <CheckCircle size={18} /> Mark as Resolved
                      </button>
                      <button 
                        onClick={() => { handleUpdateStatus(selectedReport._id, 'Ignored'); setSelectedReport(null); }} 
                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 py-3 rounded-xl font-bold transition-colors"
                      >
                        <XCircle size={18} /> Ignore Report
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
