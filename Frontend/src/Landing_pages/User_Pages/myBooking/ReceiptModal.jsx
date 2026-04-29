import React from 'react';
import { createPortal } from 'react-dom';

const ReceiptModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const calculateDays = (inDate, outDate) => {
    const start = new Date(inDate);
    const end = new Date(outDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = booking.checkIn && booking.checkOut ? calculateDays(booking.checkIn, booking.checkOut) : 1;

  const handlePrint = () => {
    window.print();
  };

  return createPortal(
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          #root {
            display: none !important;
          }
          @page {
            margin: 0.5cm;
          }
        }
      `}} />
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:static print:bg-white print:p-0 print:block">
      
      {/* Click outside to close */}
      <div className="absolute inset-0 print:hidden" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:rounded-none">
        
        {/* Header - Hidden in Print (we make a custom print header below) */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50 print:hidden">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-600">receipt_long</span>
            Booking Receipt
          </h2>
          <div className="flex gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 hover:bg-violet-200 rounded-lg font-medium transition-colors" title="Save as PDF or Print">
              <span className="material-symbols-outlined text-sm">download</span>
              Save / Print
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="p-8 overflow-y-auto print:p-0">
          
          {/* Company & Invoice Info */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-violet-600 mb-1">BlockStay</h1>
              <p className="text-slate-500 text-sm">Premium Stays & Rentals</p>
              <p className="text-slate-500 text-sm mt-4">support@blockstay.com</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Receipt</p>
              <p className="font-mono text-slate-800 font-semibold">{booking._id.substring(0, 10).toUpperCase()}</p>
              <p className="text-sm text-slate-500 mt-2">Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
              <span className={`inline-block mt-4 px-3 py-1 text-xs font-bold uppercase rounded-full border ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                {booking.status}
              </span>
            </div>
          </div>

          {/* Guest & Property Info */}
          <div className="grid grid-cols-2 gap-8 mb-10 pb-10 border-b border-slate-200">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Billed To</h3>
              <p className="font-semibold text-slate-800 text-lg">{booking?.user?.name || "Guest User"}</p>
              <p className="text-slate-500">{booking?.user?.email || "No email provided"}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Property Details</h3>
              <p className="font-semibold text-slate-800 text-lg">{booking?.room?.name || "Premium Room"}</p>
              <p className="text-slate-500 flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                {booking?.room?.location || "Location not specified"}
              </p>
            </div>
          </div>

          {/* Stay Dates */}
          <div className="grid grid-cols-3 gap-4 mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Check-in</p>
              <p className="font-semibold text-slate-800">{new Date(booking.checkIn).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Check-out</p>
              <p className="font-semibold text-slate-800">{new Date(booking.checkOut).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Stay</p>
              <p className="font-semibold text-slate-800">{nights} {nights === 1 ? 'Night' : 'Nights'}</p>
            </div>
          </div>

          {/* Charges Breakdown */}
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Payment Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-slate-600">
              <p>Room Charges ({nights} {nights === 1 ? 'night' : 'nights'})</p>
              <p>₹{booking.totalPrice - 1500}</p>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <p>Platform & Cleaning Fee</p>
              <p>₹1500</p>
            </div>
            {/* Divider */}
            <div className="w-full h-px bg-slate-200 my-2"></div>
            
            <div className="flex justify-between items-center text-xl font-black text-slate-900">
              <p>Total Paid</p>
              <p>₹{booking.totalPrice}</p>
            </div>
            
            {booking.paymentId && (
              <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                <p>Transaction ID</p>
                <p className="font-mono">{booking.paymentId}</p>
              </div>
            )}
          </div>

          <div className="mt-16 text-center text-sm text-slate-500 print:mt-32">
            <p>Thank you for choosing Blockstay.</p>
            <p>We hope you enjoy your stay!</p>
          </div>

        </div>
      </div>
      </div>
    </>,
    document.body
  );
};

export default ReceiptModal;
