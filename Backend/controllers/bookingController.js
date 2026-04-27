import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createBooking = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut, totalPrice, paymentIntentId } = req.body;
        
        if (!roomId || !checkIn || !checkOut || !totalPrice) {
            return res.status(400).json({ message: 'All booking fields are required.' });
        }
        
        const booking = await Booking.create({
            user: req.user._id,
            room: roomId,
            checkIn,
            checkOut,
            totalPrice,
            paymentIntentId,
            status: 'confirmed'
        });
        
        const populatedBooking = await Booking.findById(booking._id).populate('room');
        
        // ✅ Send Booking Confirmation Email
        await sendEmail({
            to: req.user.email,
            subject: "Booking Confirmed - Blockstay",
            text: `Hi ${req.user.name},\n\nYour booking for ${populatedBooking.room.name} has been confirmed!\n\nCheck-in: ${new Date(checkIn).toLocaleDateString()}\nCheck-out: ${new Date(checkOut).toLocaleDateString()}\nTotal Price: $${totalPrice}\n\nThank you for choosing Blockstay.`
        });

        res.status(201).json(populatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('room')
            .sort('-createdAt');
            
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Not authorized as owner.' });
        }
        
        // Find all rooms owned by the currently authenticated owner
        const rooms = await Room.find({ owner: req.user._id }).select('_id');
        const roomIds = rooms.map(r => r._id);
        
        // Find bookings associated with any of those rooms
        const bookings = await Booking.find({ room: { $in: roomIds } })
            .populate('user', 'name email')
            .populate('room', 'name location')
            .sort('-checkIn');
            
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        // Only the user who created it (or owner) can cancel it
        if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Not authorized to cancel this booking.' });
        }

        booking.status = 'cancelled';
        await booking.save();

        // ✅ Send Cancellation Email
        await sendEmail({
            to: req.user.email,
            subject: "Booking Cancelled - Blockstay",
            text: `Hi ${req.user.name},\n\nYour booking has been successfully cancelled.\n\nIf you have any questions, please contact our support team.`
        });
        
        res.status(200).json({ message: 'Booking cancelled.', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
