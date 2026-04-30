import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import ReceiptModal from './ReceiptModal';

const BookingCard = ({ booking, setBookings }) => {
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const { api } = useContext(AuthContext);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      
      const { data: orderData } = await api.post('/payment/create-order', {
        amount: booking.totalPrice,
        bookingId: booking._id
      });

      const res = await loadRazorpayScript();
      if (!res) {
        alert("Failed to load payment gateway.");
        setPaymentLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_SjQ3Yb6nReapA6',
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Blockstay",
        description: `Booking for ${booking?.room?.name}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            await api.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking._id
            });
            
            // Update booking status in UI
            setBookings(prev => prev.map(b => b._id === booking._id ? { ...b, status: 'confirmed' } : b));
          } catch (error) {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Blockstay User",
          email: "user@blockstay.com"
        },
        theme: {
          color: "#7c3aed"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert("Error initializing payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      await api.put(`/bookings/${booking._id}/cancel`);
      setBookings(prev => prev.map(b => b._id === booking._id ? { ...b, status: 'cancelled' } : b));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-300 group">
      <div className="relative h-48 mb-5 overflow-hidden rounded-xl">
        <img src={booking?.room?.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Room" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border backdrop-blur-md shadow-lg uppercase tracking-wider ${
            booking?.status === 'cancelled' ? 'bg-red-500/30 border-red-500/50 text-white' : 
            booking?.status === 'approved' ? 'bg-amber-500/30 border-amber-500/50 text-white' : 
            booking?.status === 'pending' ? 'bg-slate-500/30 border-slate-500/50 text-white' : 
            'bg-emerald-500/30 border-emerald-500/50 text-white'
          }`}>
            {booking?.status || 'Confirmed'}
          </span>
          <p className="text-white font-extrabold text-lg drop-shadow-md">₹{booking?.totalPrice}</p>
        </div>
      </div>

      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 block">ID: {booking._id.slice(-8)}</p>
        <h4 className="text-lg font-bold text-white mb-1 truncate group-hover:text-violet-300 transition-colors">{booking?.room?.name || "Premium Room"}</h4>
        <p className="text-slate-400 text-sm flex items-center mb-4">
          <svg className="w-3.5 h-3.5 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path></svg>
          {booking?.room?.location || "Location not specified"}
        </p>

        <div className="flex gap-3">
          <button 
            onClick={() => setIsReceiptOpen(true)}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm font-medium py-2 rounded-lg border border-white/10 transition-colors"
          >
            Receipt
          </button>
          {booking?.status === 'approved' ? (
            <button onClick={handlePayment} disabled={paymentLoading} className="flex-1 bg-amber-500 hover:bg-amber-400 text-[#0a0f1d] border border-amber-500 text-sm font-bold py-2 rounded-lg transition-colors">
              {paymentLoading ? 'Processing...' : 'Pay Now'}
            </button>
          ) : booking?.status !== 'cancelled' && booking?.status !== 'confirmed' ? (
            <button onClick={handleCancel} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-medium py-2 rounded-lg transition-colors">
              Cancel
            </button>
          ) : null}
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

export default BookingCard;