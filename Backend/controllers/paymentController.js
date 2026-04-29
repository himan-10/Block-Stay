import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../models/Booking.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createRazorpayOrder = async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const { amount, bookingId } = req.body;
        
        const options = {
            amount: amount * 100, // amount in paise
            currency: 'INR',
            receipt: `receipt_order_${bookingId}`
        };

        const order = await razorpay.orders.create(options);
        
        // Save orderId to booking
        if(bookingId) {
            await Booking.findByIdAndUpdate(bookingId, { orderId: order.id });
        }

        res.status(200).json({ order });
    } catch (error) {
        console.error("Razorpay Error:", error);
        const errorMsg = error.error?.description || error.message || JSON.stringify(error);
        res.status(500).json({ message: errorMsg });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Payment verified
            const booking = await Booking.findById(bookingId).populate('room').populate('user');
            
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found.' });
            }

            booking.status = 'confirmed';
            booking.paymentId = razorpay_payment_id;
            await booking.save();

            // Send Booking Confirmation Email
            await sendEmail({
                to: booking.user.email,
                subject: "Booking Confirmed - Blockstay",
                text: `Hi ${booking.user.name},\n\nYour booking for ${booking.room.name} has been confirmed!\n\nCheck-in: ${new Date(booking.checkIn).toLocaleDateString()}\nCheck-out: ${new Date(booking.checkOut).toLocaleDateString()}\nTotal Price: ₹${booking.totalPrice}\n\nThank you for choosing Blockstay.`
            });

            res.status(200).json({ message: 'Payment verified successfully', booking });
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
