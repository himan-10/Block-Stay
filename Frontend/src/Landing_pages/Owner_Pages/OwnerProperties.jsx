import React, { useState, useEffect, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, MapPin, X, Image as ImageIcon, Loader2, CheckCircle, Search, AlertTriangle, UploadCloud } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isProcessing }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={!isProcessing ? onClose : undefined} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0d1529] border border-white/10 rounded-2xl shadow-2xl p-6 w-full max-w-sm z-10 text-center">
        <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-rose-500" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} disabled={isProcessing} className="flex-1 py-2.5 rounded-xl font-medium bg-white/5 text-slate-300 hover:bg-white/10 transition-colors disabled:opacity-50">Cancel</button>
          <button onClick={onConfirm} disabled={isProcessing} className="flex-1 py-2.5 rounded-xl font-medium bg-rose-500 text-white hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
            {isProcessing && <Loader2 size={16} className="animate-spin" />}
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-[#0d1529]/60 border border-white/5 rounded-2xl overflow-hidden shadow-xl animate-pulse">
    <div className="h-56 bg-white/5"></div>
    <div className="p-6">
      <div className="h-6 bg-white/10 rounded-md w-3/4 mb-4"></div>
      <div className="h-4 bg-white/5 rounded-md w-1/2 mb-6"></div>
      <div className="pt-4 border-t border-white/10 flex justify-between">
        <div className="h-5 bg-white/5 rounded-md w-1/3"></div>
        <div className="h-5 bg-white/5 rounded-full w-16"></div>
      </div>
    </div>
  </div>
);

const PropertyModal = ({ isOpen, onClose, isEditing, initialData, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    pricePerMonth: '',
    sizeSqMeters: '',
    capacity: '',
    bedding: '',
    description: '',
    images: []
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        location: initialData.location || '',
        pricePerMonth: initialData.pricePerMonth || initialData.price || '',
        sizeSqMeters: initialData.sizeSqMeters || '',
        capacity: initialData.capacity || '',
        bedding: initialData.bedding || '',
        description: initialData.description || '',
        images: initialData.images || (initialData.image ? [initialData.image] : [])
      });
    } else {
      setFormData({ name: '', location: '', pricePerMonth: '', sizeSqMeters: '', capacity: '', bedding: '', description: '', images: [] });
    }
    setFormError('');
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFormError("File size exceeds 5MB.");
      return;
    }

    setFormError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, images: [...prev.images, reader.result] }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      setFormError("At least one image is required.");
      return;
    }
    if (Number(formData.pricePerMonth) <= 0) {
      setFormError("Price must be a positive number.");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={!isSubmitting ? onClose : undefined}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[calc(100vh-2rem)] flex flex-col bg-[#0d1529] border border-white/10 rounded-2xl shadow-2xl z-10"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-bold text-white">{isEditing ? 'Edit Property' : 'Add New Property'}</h2>
          <button type="button" onClick={onClose} disabled={isSubmitting} className="text-slate-400 hover:text-white transition-colors disabled:opacity-50">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          <form id="property-form" onSubmit={handleSubmit} className="space-y-6">
            
            {formError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                <AlertTriangle size={16} />
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Property Title *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Sunny Beachfront Villa" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner" />
              </div>
              <div className="space-y-2.5">
                <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Location *</label>
                <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Miami, FL" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2.5">
                <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Price / Month (₹) *</label>
                <input required type="number" min="1" name="pricePerMonth" value={formData.pricePerMonth} onChange={handleChange} placeholder="e.g. 5000" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner font-medium text-emerald-400" />
              </div>
              <div className="space-y-2.5">
                <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Size (sq.m) *</label>
                <input required type="number" min="1" name="sizeSqMeters" value={formData.sizeSqMeters} onChange={handleChange} placeholder="e.g. 120" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner" />
              </div>
              <div className="space-y-2.5">
                <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Capacity (Guests) *</label>
                <input required type="number" min="1" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="e.g. 4" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner" />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Bedding Setup *</label>
              <input required type="text" name="bedding" value={formData.bedding} onChange={handleChange} placeholder="e.g. 2 King Beds, 1 Sofa Bed" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner" />
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Property Images *</label>
              
              <label className="border-2 border-dashed border-cyan-500/40 bg-[#0a0f1d] rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-cyan-500/10 hover:border-cyan-400 transition-all cursor-pointer group shadow-inner">
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isSubmitting} />
                <UploadCloud size={40} className="text-cyan-500 group-hover:scale-110 group-hover:text-cyan-400 transition-transform mb-4 drop-shadow-lg" />
                <p className="text-base font-semibold text-white mb-1 group-hover:text-cyan-100">Click to upload high-quality images</p>
                <p className="text-sm text-slate-500">Supported formats: PNG, JPG (Max 5MB)</p>
              </label>

              {formData.images.length > 0 && (
                <div className="flex gap-4 mt-6 overflow-x-auto pb-4 custom-scrollbar">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] group">
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button type="button" onClick={() => setFormData(p => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))} className="bg-rose-500 text-white p-3 rounded-full hover:bg-rose-600 transition-colors transform scale-75 group-hover:scale-100 shadow-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2.5 pb-4">
              <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Detailed Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Describe your property in detail, including neighborhood highlights and unique amenities..." className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none shadow-inner leading-relaxed"></textarea>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-white/10 flex items-center justify-end gap-4 flex-shrink-0 bg-white/[0.02]">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button type="submit" form="property-form" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isEditing ? 'Save Changes' : 'Publish Property'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function OwnerProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { api, user } = useContext(AuthContext);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/properties/owner');
      setProperties(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch properties.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [properties, searchQuery]);

  const confirmDelete = (property) => {
    setPropertyToDelete(property);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!propertyToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/properties/${propertyToDelete._id}`);
      setProperties(prev => prev.filter(p => p._id !== propertyToDelete._id));
      showToast('Property deleted successfully!');
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast('Failed to delete property.');
    } finally {
      setIsDeleting(false);
      setPropertyToDelete(null);
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    try {
      if (editingProperty) {
        const { data } = await api.put(`/properties/${editingProperty._id}`, formData);
        setProperties(prev => prev.map(p => p._id === data._id ? data : p));
        showToast('Property updated successfully!');
      } else {
        const { data } = await api.post('/properties', formData);
        setProperties(prev => [data, ...prev]);
        showToast('Property published successfully!');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Action failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-8 relative z-10">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }} 
            animate={{ opacity: 1, y: 0, x: '-50%' }} 
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-8 left-1/2 z-50 flex items-center gap-3 bg-[#0d1529]/90 backdrop-blur-xl border border-emerald-500/30 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.2)]"
          >
            <div className="bg-emerald-500/20 text-emerald-400 p-1 rounded-full">
              <CheckCircle size={18} />
            </div>
            <span className="font-medium">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">My Properties</h2>
          <p className="text-slate-400 mt-1">Manage your {properties.length} active listings</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search properties..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-all focus:bg-white/10"
            />
          </div>
          
          <button 
            onClick={() => { setEditingProperty(null); setIsModalOpen(true); }}
            className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            Add Property
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertTriangle size={18} />
          {error}
        </div>
      )}

      {/* Grid Area */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <ImageIcon className="text-cyan-500/50" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No properties found</h3>
          <p className="text-slate-400 max-w-sm mb-8">
            {searchQuery ? `We couldn't find any properties matching "${searchQuery}".` : "You haven't added any properties to your portfolio. Start by adding your first listing to begin earning."}
          </p>
          {!searchQuery && (
            <button onClick={() => { setEditingProperty(null); setIsModalOpen(true); }} className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-colors">
              Add Your First Property
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProperties.map((property) => (
              <motion.div 
                key={property._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -6 }}
                className="group bg-[#0d1529]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-xl flex flex-col"
              >
                <div className="relative h-56 overflow-hidden flex-shrink-0 bg-[#0a0f1d]">
                  <img 
                    src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'} 
                    alt={property.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1529] via-[#0d1529]/20 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 flex gap-2 opacity-100 transition-all duration-300 z-10">
                    <button 
                      onClick={() => { setEditingProperty(property); setIsModalOpen(true); }}
                      className="p-2 bg-white/10 hover:bg-cyan-500 backdrop-blur-md rounded-lg text-white transition-colors shadow-lg"
                      title="Edit Property"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => confirmDelete(property)}
                      className="p-2 bg-white/10 hover:bg-rose-500 backdrop-blur-md rounded-lg text-white transition-colors shadow-lg"
                      title="Delete Property"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{property.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                      <MapPin size={16} className="text-cyan-400" />
                      <span className="text-sm line-clamp-1">{property.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Price / Month</p>
                      <div className="flex items-center gap-1 text-emerald-400 font-bold text-lg">
                        <span>₹{property.pricePerMonth ? property.pricePerMonth.toLocaleString() : '0'}</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-medium">
                      Active
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        <PropertyModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          isEditing={!!editingProperty}
          initialData={editingProperty}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        <ConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          isProcessing={isDeleting}
          title="Delete Property"
          message={`Are you sure you want to delete "${propertyToDelete?.name}"? This action cannot be undone.`}
        />
      </AnimatePresence>
    </div>
  );
}
