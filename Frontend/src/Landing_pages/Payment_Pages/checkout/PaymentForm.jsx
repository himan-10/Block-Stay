import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function PaymentForm({ room, dates, price }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const { api } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !api) return;

    try {
      // Create Payment Intent (stripe naturally takes cents)
      const amountInCents = (price?.total || 5000) * 100;
      const { data } = await api.post('/payment/create-intent', { amount: amountInCents });
      
      const payload = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (payload.error) {
        setError(payload.error.message);
        setProcessing(false);
      } else {
        // Once stripe success fires, log the booking into our database
        const paymentIntentId = payload.paymentIntent.id;
        
        await api.post('/bookings', {
          roomId: room?._id,
          checkIn: dates?.checkIn,
          checkOut: dates?.checkOut,
          totalPrice: price?.total || 5000,
          paymentIntentId
        });

        setError(null);
        setProcessing(false);
        setSucceeded(true);
        navigate('/user/bookings');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Payment or Booking sync failed");
      setProcessing(false);
    }
  };
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-secondary">
          lock
        </span>
        <h1 className="text-3xl font-bold">Secure Checkout</h1>
      </div>

      {/* Express Pay */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-white text-black py-4 rounded-xl">
          Apple Pay
        </button>
        <button className="bg-blue-500 text-white py-4 rounded-xl">
          Google Pay
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 border-t"></div>
        <span className="text-xs uppercase text-gray-400">
          or pay with card
        </span>
        <div className="flex-1 border-t"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          placeholder="Cardholder Name"
          className="w-full p-4 rounded-xl bg-slate-800 outline-none text-white"
        />

        <div className="w-full p-4 rounded-xl bg-slate-800">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#9ca3af',
                },
              },
              invalid: {
                color: '#ef4444',
              },
            },
          }} />
        </div>
        
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {succeeded && <div className="text-green-500 text-sm mt-2">Payment successful!</div>}

        <button 
          disabled={processing || succeeded}
          className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all disabled:opacity-50"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </section>
  );
}