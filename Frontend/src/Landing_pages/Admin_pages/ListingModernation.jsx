import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Search, Filter, Eye, Trash2, CheckCircle, XCircle, X, Pencil, Save } from "lucide-react";
import AdminLayout from "./admin/AdminLayout";

export default function ListingModeration() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";
  
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialStatus);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedListing, setSelectedListing] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    const currentStatus = searchParams.get("status");
    if (currentStatus && currentStatus !== filter) {
      setFilter(currentStatus);
    }
  }, [searchParams]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', newFilter);
    }
    setSearchParams(searchParams);
  };

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/listings`, { withCredentials: true });
      setListings(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch listings", error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/admin/listings/${id}/status`, { status: newStatus }, { withCredentials: true });
      setListings((prev) => 
        prev.map((listing) => listing._id === id ? { ...listing, status: newStatus } : listing)
      );
      if (selectedListing && selectedListing._id === id) {
        setSelectedListing({ ...selectedListing, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update listing status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this listing?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/listings/${id}`, { withCredentials: true });
      setListings((prev) => prev.filter((listing) => listing._id !== id));
      if (selectedListing && selectedListing._id === id) {
        setSelectedListing(null);
      }
    } catch (error) {
      console.error("Failed to delete listing", error);
      alert("Failed to delete listing");
    }
  };

  const handleEditClick = (listing) => {
    setEditFormData({
      name: listing.name || '',
      location: listing.location || '',
      type: listing.type || '',
      pricePerMonth: listing.pricePerMonth || '',
      description: listing.description || '',
    });
    setSelectedListing(listing);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/admin/listings/${selectedListing._id}`, editFormData, { withCredentials: true });
      setListings((prev) => prev.map((l) => (l._id === selectedListing._id ? res.data : l)));
      setSelectedListing(res.data);
      setIsEditing(false);
      alert("Property updated successfully!");
    } catch (error) {
      console.error("Failed to update property", error);
      alert("Failed to update property details");
    }
  };

  // Filter & Sort Logic
  let filteredListings = listings.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!l.name?.toLowerCase().includes(query) && !l.location?.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  filteredListings = filteredListings.sort((a, b) => {
    if (sortBy === "price_asc") return a.pricePerMonth - b.pricePerMonth;
    if (sortBy === "price_desc") return b.pricePerMonth - a.pricePerMonth;
    return new Date(b.createdAt) - new Date(a.createdAt); // latest
  });

  const pendingCount = listings.filter(l => l.status === "pending").length;

  return (
    <AdminLayout>
      <main className="pt-24 px-4 md:px-8 pb-16 max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Listing Management
              </h1>
              <p className="text-slate-400 mt-2 text-sm max-w-xl">
                Review and moderate property submissions to maintain platform quality.
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 font-medium text-sm shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              {pendingCount} Pending Reviews
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 bg-[#13151a] p-4 rounded-2xl border border-white/5 shadow-xl">
            {/* Search */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search properties or locations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0b0c10] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center bg-[#0b0c10] border border-white/10 rounded-xl p-1">
                {['all', 'pending', 'approved', 'rejected'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => handleFilterChange(tab)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                      filter === tab 
                        ? 'bg-purple-600/20 text-purple-400 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#0b0c10] border border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-300 focus:outline-none focus:border-purple-500/50 transition-all cursor-pointer"
                >
                  <option value="latest">Latest First</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="price_asc">Price: Low to High</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Data Grid / Table */}
          {loading ? (
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-24 w-full bg-white/5 animate-pulse rounded-2xl border border-white/5"></div>
              ))}
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Search className="text-slate-500" size={24} />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No listings found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="bg-[#13151a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-xs uppercase tracking-widest text-slate-400 border-b border-white/5">
                      <th className="px-6 py-5 font-semibold">Property</th>
                      <th className="px-6 py-5 font-semibold">Location</th>
                      <th className="px-6 py-5 font-semibold">Owner</th>
                      <th className="px-6 py-5 font-semibold">Price/Mo</th>
                      <th className="px-6 py-5 font-semibold">Status</th>
                      <th className="px-6 py-5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredListings.map((listing) => (
                      <tr key={listing._id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0 relative">
                              <img src={listing.images?.[0] || "https://via.placeholder.com/150"} alt={listing.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div>
                              <p className="font-bold text-white text-sm line-clamp-1">{listing.name}</p>
                              <p className="text-xs text-slate-500 mt-1">{listing.type || 'Property'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-300 line-clamp-1">{listing.location}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-300">{listing.owner?.name || 'Unknown'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-purple-400">₹{listing.pricePerMonth?.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            listing.status === 'pending' || !listing.status ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                            listing.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                            'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}>
                            {listing.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setSelectedListing(listing); setIsEditing(false); }} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="View Details">
                              <Eye size={18} />
                            </button>
                            <button onClick={() => handleEditClick(listing)} className="p-2 text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="Edit">
                              <Pencil size={18} />
                            </button>
                            {(listing.status === 'pending' || !listing.status || listing.status === 'rejected') && (
                              <button onClick={() => handleUpdateStatus(listing._id, 'approved')} className="p-2 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all" title="Approve">
                                <CheckCircle size={18} />
                              </button>
                            )}
                            {(listing.status === 'pending' || !listing.status || listing.status === 'approved') && (
                              <button onClick={() => handleUpdateStatus(listing._id, 'rejected')} className="p-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all" title="Reject">
                                <XCircle size={18} />
                              </button>
                            )}
                            <button onClick={() => handleDelete(listing._id)} className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                              <Trash2 size={18} />
                            </button>
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

      {/* View/Edit Details Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedListing(null)}></div>
          
          <div className="relative bg-[#13151a] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-gradient-to-b from-[#13151a] to-transparent pointer-events-none">
              <button onClick={() => setSelectedListing(null)} className="p-2 bg-black/50 hover:bg-white/10 text-white rounded-full backdrop-blur-md transition-all pointer-events-auto">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 pt-0">
              {/* Header Toggle */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{isEditing ? "Edit Property" : "Property Details"}</h2>
                {!isEditing && (
                  <button onClick={() => handleEditClick(selectedListing)} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-bold hover:bg-blue-500/20 transition-all">
                    <Pencil size={16} /> Edit Details
                  </button>
                )}
              </div>

              {isEditing ? (
                /* EDIT FORM */
                <form onSubmit={handleEditSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Property Name</label>
                      <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} required className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Location</label>
                      <input type="text" name="location" value={editFormData.location} onChange={handleEditChange} required className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Property Type</label>
                      <input type="text" name="type" value={editFormData.type} onChange={handleEditChange} className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Price Per Month (₹)</label>
                      <input type="number" name="pricePerMonth" value={editFormData.pricePerMonth} onChange={handleEditChange} required className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Description</label>
                      <textarea name="description" value={editFormData.description} onChange={handleEditChange} rows="5" className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none"></textarea>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:bg-white/5 transition-all">Cancel</button>
                    <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all">
                      <Save size={18} /> Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                /* VIEW DETAILS */
                <>
                  <div className="flex gap-4 overflow-x-auto snap-x pb-4 -mx-8 px-8 no-scrollbar">
                    {selectedListing.images?.length > 0 ? (
                      selectedListing.images.map((img, i) => (
                        <img key={i} src={img} className="w-80 h-60 object-cover rounded-2xl shrink-0 snap-center shadow-lg border border-white/5" alt={`Property ${i}`} />
                      ))
                    ) : (
                      <div className="w-80 h-60 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500">No Images</div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedListing.name}</h2>
                        <p className="text-slate-400 flex items-center gap-2">
                          {selectedListing.location} • {selectedListing.type}
                        </p>
                      </div>
                      
                      <div className="bg-white/5 p-6 rounded-2xl">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Description</h3>
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedListing.description}</p>
                      </div>

                      {selectedListing.amenities?.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Amenities</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedListing.amenities.map((a, i) => (
                              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300">{a}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.05)]">
                        <p className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">Monthly Rent</p>
                        <p className="text-4xl font-black text-white">₹{selectedListing.pricePerMonth?.toLocaleString()}</p>
                      </div>

                      <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Owner Info</h3>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                            {selectedListing.owner?.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{selectedListing.owner?.name || 'Unknown'}</p>
                            <p className="text-xs text-slate-400 mt-0.5">Submitted on {new Date(selectedListing.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4">
                        {(selectedListing.status === 'pending' || !selectedListing.status || selectedListing.status === 'rejected') && (
                          <button onClick={() => { handleUpdateStatus(selectedListing._id, 'approved'); setSelectedListing(null); }} className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-500/20">
                            <CheckCircle size={18} /> Approve Listing
                          </button>
                        )}
                        {(selectedListing.status === 'pending' || !selectedListing.status || selectedListing.status === 'approved') && (
                          <button onClick={() => { handleUpdateStatus(selectedListing._id, 'rejected'); setSelectedListing(null); }} className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 py-3 rounded-xl font-bold transition-colors">
                            <XCircle size={18} /> Reject Listing
                          </button>
                        )}
                        
                        <button onClick={() => handleDelete(selectedListing._id)} className="w-full flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 py-3 rounded-xl font-bold transition-colors mt-2">
                          <Trash2 size={18} /> Permanently Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}