import Header from "./checkout/Header";
import PaymentForm from "./checkout/PaymentForm";
import BillingForm from "./checkout/BillingForm";
import OrderSummary from "./checkout/OrderSummary";
import TrustBadges from "./checkout/TrustBadges";
import Footer from "./checkout/Footer";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_MockStripePublishableKey');

export default function Checkout() {
  const location = useLocation();
  // Safe fallbacks to prevent breaking if accessed directly without routing state
  const { room, dates, price } = location.state || { 
      room: null, 
      dates: { checkIn: new Date().toISOString(), checkOut: new Date(Date.now() + 86400000).toISOString() }, 
      price: { total: 5000, nightly: 3400, taxes: 284, fees: 150 } 
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-12">
            <Elements stripe={stripePromise}>
              <PaymentForm room={room} dates={dates} price={price} />
            </Elements>
            <BillingForm />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <OrderSummary room={room} dates={dates} price={price} />
            <TrustBadges />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}