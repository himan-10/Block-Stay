import React, { useState } from 'react';
import ReceiptModal from './ReceiptModal';

const BookingHeroCard = ({ booking }) => {
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  return (
    <div className="lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 group">
      <div className="grid md:grid-cols-5 h-full">
        <div className="md:col-span-3 relative h-64 md:h-auto overflow-hidden">
          <img src={booking?.room?.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Property" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-[#0b1326]/90 hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] to-transparent md:hidden"></div>
        </div>

        <div className="md:col-span-2 p-8 flex flex-col justify-between relative bg-[#0b1326]/40">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${booking?.status === 'cancelled' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${booking?.status === 'cancelled' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                {booking?.status ? booking.status.toUpperCase() : 'CONFIRMED'}
              </span>
            </div>

            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Booking ID: <span className="text-violet-400">{booking?._id?.slice(-8)}</span></p>

            <h3 className="text-3xl text-white font-extrabold tracking-tight leading-tight mb-2">
              {booking?.room?.name || "The Obsidian Cliff Retreat"}
            </h3>
            <p className="text-slate-400 text-sm flex items-center mb-8">
              <svg className="w-4 h-4 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path></svg>
              {booking?.room?.location || "Vidisha, MP"}
            </p>

            <div className="grid grid-cols-2 gap-4 bg-slate-900/50 rounded-2xl p-4 border border-white/5">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Check-in</p>
                <p className="text-white font-medium">{booking?.checkIn ? new Date(booking.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Check-out</p>
                <p className="text-white font-medium">{booking?.checkOut ? new Date(booking.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'N/A'}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-end justify-between pt-6 border-t border-white/10">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Total Amount</p>
              <p className="text-violet-400 font-extrabold text-3xl">₹{booking?.totalPrice || "0"}</p>
            </div>
            <button 
              onClick={() => setIsReceiptOpen(true)}
              className="bg-white/10 hover:bg-violet-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border border-white/10 hover:border-violet-500 shadow-lg hover:-translate-y-0.5"
            >
              View Receipt
            </button>
          </div>
        </div>
      </div>
      
      <ReceiptModal 
        isOpen={isReceiptOpen} 
        onClose={() => setIsReceiptOpen(false)} 
        booking={booking} 
      />
    </div>
  );
};

export default BookingHeroCard;