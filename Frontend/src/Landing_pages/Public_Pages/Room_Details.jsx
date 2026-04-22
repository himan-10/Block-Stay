import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [durationMonths, setDurationMonths] = useState(0);

  // Review state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://block-stay.onrender.com/api';
        const { data } = await axios.get(`${apiUrl}/rooms/${id}`);
        setRoom(data);
      } catch (err) {
        setError('Failed to fetch room details.');
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (checkIn && checkOut && room) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diffTime = Math.abs(outDate - inDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        // Approximate months (assuming 30 days per month)
        let months = diffDays / 30;
        setDurationMonths(months.toFixed(1));
        // Price per month * months + some basic fees
        setTotalPrice(Math.round(room.pricePerMonth * months));
      } else {
        setDurationMonths(0);
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut, room]);

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewMessage('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://block-stay.onrender.com/api';
      const token = localStorage.getItem('token');
      if (!token) {
        setReviewMessage('Please login to write a review.');
        setReviewLoading(false);
        return;
      }

      await axios.post(
        `${apiUrl}/rooms/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setReviewMessage('Review added successfully!');
      setComment('');
      setRating(5);
      
      // Refresh room data to show new review
      const { data } = await axios.get(`${apiUrl}/rooms/${id}`);
      setRoom(data);
    } catch (err) {
      setReviewMessage(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-on-background">Loading room details...</div>;
  }

  if (error || !room) {
    return <div className="min-h-screen pt-32 text-center text-red-400">{error || 'Room not found'}</div>;
  }

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container/30">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0..1,0');

          .material-symbols-outlined {
              font-family: 'Material Symbols Outlined';
              font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          }
        `}
      </style>

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-violet-900/10 flex justify-between items-center px-8 py-4 max-w-full font-['Manrope'] tracking-tight">
        <Link to="/" className="text-xl font-bold tracking-tighter text-slate-100 hover:text-cyan-400 transition-colors">Blockstay</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/rooms" className="text-violet-400 border-b-2 border-violet-500 pb-1">Rooms</Link>
          <Link to="/about" className="text-slate-400 hover:text-slate-100 transition-colors">About</Link>
          <Link to="/contact" className="text-slate-400 hover:text-slate-100 transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-400 hover:text-slate-100 transition-colors font-medium text-sm">Login</Link>
          <Link to="/signup" className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl font-bold hover:scale-95 transition-all duration-200 shadow-lg shadow-primary-container/20">Sign Up</Link>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <span className="font-label tracking-[0.2em] text-cyan-400 text-xs uppercase mb-2 block">{room.type}</span>
              <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface leading-tight">{room.name}</h1>
              <div className="flex items-center gap-4 mt-4 text-on-surface-variant">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-semibold">{room.rating ? room.rating.toFixed(1) : 'New'}</span>
                  <span className="text-muted opacity-60">({room.numReviews} reviews)</span>
                </div>
                <span className="opacity-30">•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span>{room.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </div>
        </header>

        {/* Gallery */}
        <section className="h-[400px] md:h-[500px] mb-12 overflow-hidden rounded-2xl relative group">
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={room.images[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200"} 
            alt={room.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* Description Section */}
            <section>
              <div className="flex flex-wrap items-center gap-8 mb-8 py-6 border-y border-outline-variant/20">
                <div className="text-center">
                  <span className="block font-headline text-2xl font-bold text-on-surface">{room.sizeSqMeters}</span>
                  <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Sq Meters</span>
                </div>
                <div className="text-center">
                  <span className="block font-headline text-2xl font-bold text-on-surface">{room.capacity}</span>
                  <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Guests Max</span>
                </div>
                <div className="text-center">
                  <span className="block font-headline text-lg font-bold text-on-surface">{room.bedding}</span>
                  <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Bed Type</span>
                </div>
              </div>
              <h2 className="font-headline text-2xl font-bold mb-4">About this space</h2>
              <p className="text-on-surface-variant leading-relaxed text-md mb-6">
                {room.description}
              </p>
            </section>

            {/* Amenities Grid */}
            <section>
              <h3 className="font-headline text-xl font-bold mb-6">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, index) => {
                  let icon = 'check_circle';
                  if(amenity.toLowerCase().includes('wifi')) icon = 'wifi';
                  if(amenity.toLowerCase().includes('ac')) icon = 'ac_unit';
                  if(amenity.toLowerCase().includes('water')) icon = 'water_drop';
                  if(amenity.toLowerCase().includes('meal')) icon = 'restaurant';
                  if(amenity.toLowerCase().includes('desk')) icon = 'desk';
                  if(amenity.toLowerCase().includes('washing')) icon = 'local_laundry_service';
                  
                  return (
                    <div key={index} className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary">{icon}</span>
                      <span className="font-medium text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="pt-8 border-t border-outline-variant/20">
              <h3 className="font-headline text-2xl font-bold mb-8">Student & Professional Reviews</h3>
              
              {/* Review Form */}
              <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 mb-8">
                <h4 className="font-bold mb-4">Write a Review</h4>
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star}
                          onClick={() => setRating(star)}
                          className={`material-symbols-outlined cursor-pointer text-2xl ${star <= rating ? 'text-yellow-400' : 'text-slate-600'}`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Your Feedback</label>
                    <textarea 
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant rounded-lg p-3 text-sm focus:border-primary outline-none min-h-[100px]"
                      placeholder="Share your experience staying here..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={reviewLoading}
                    className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold text-sm hover:bg-inverse-primary transition-colors disabled:opacity-50"
                  >
                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                  </button>
                  {reviewMessage && <p className="text-sm mt-2 text-cyan-400">{reviewMessage}</p>}
                </form>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {room.reviews && room.reviews.length > 0 ? (
                  room.reviews.map((rev) => (
                    <div key={rev._id} className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-on-surface">{rev.name}</h4>
                          <span className="text-xs text-on-surface-variant block">{new Date(rev.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="ml-auto flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm italic">No reviews yet. Be the first to share your experience!</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Widget */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 p-6 rounded-2xl bg-surface-container-highest/80 backdrop-blur-xl border border-outline-variant/20 shadow-2xl">
              <div className="flex justify-between items-baseline mb-6">
                <div>
                  <span className="text-3xl font-headline font-extrabold text-on-surface">₹{room.pricePerMonth.toLocaleString()}</span>
                  <span className="text-on-surface-variant text-sm"> / month</span>
                </div>
              </div>
              
              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div className="bg-surface-container-low rounded-xl border border-outline-variant/20 overflow-hidden">
                  <div className="p-3 border-b border-outline-variant/20 flex flex-col">
                    <label className="font-label text-[10px] tracking-[0.1em] text-on-surface-variant uppercase mb-1">Check In</label>
                    <input 
                      type="date" 
                      className="bg-transparent border-none outline-none text-sm [color-scheme:dark]"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div className="p-3 flex flex-col">
                    <label className="font-label text-[10px] tracking-[0.1em] text-on-surface-variant uppercase mb-1">Check Out</label>
                    <input 
                      type="date" 
                      className="bg-transparent border-none outline-none text-sm [color-scheme:dark]"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              {durationMonths > 0 ? (
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>₹{room.pricePerMonth.toLocaleString()} x {durationMonths} months</span>
                    <span className="text-slate-100">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Maintenance & Platform Fee</span>
                    <span className="text-slate-100">₹1,500</span>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20 flex justify-between">
                    <span className="font-bold text-slate-100">Total</span>
                    <span className="font-headline font-bold text-xl text-primary">₹{(totalPrice + 1500).toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-400 mb-6 text-center italic">
                  Select valid Check-in and Check-out dates to see total price.
                </div>
              )}

              <button className="w-full py-4 bg-primary text-on-primary font-headline font-bold rounded-xl hover:bg-inverse-primary hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-primary/20 mb-3">
                Request to Book
              </button>
              <p className="text-center text-xs text-slate-500 mb-4">
                You won't be charged yet.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-8 lg:px-24 border-t border-slate-900 font-['Inter'] mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} Blockstay. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Student & Professional Housing <span className="material-symbols-outlined text-cyan-400 text-sm">apartment</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RoomDetails;