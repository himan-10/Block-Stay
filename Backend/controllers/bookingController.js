import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { sendEmail } from '../utils/sendEmail.js';

export const checkAvailability = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut } = req.body;

        if (!roomId || !checkIn || !checkOut) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkOutDate <= checkInDate) {
            return res.status(400).json({ message: 'Check-out date must be after check-in date.' });
        }

        const overlappingBookings = await Booking.find({
            room: roomId,
            status: 'confirmed', // Only confirmed bookings block availability
            $and: [
                { checkIn: { $lt: checkOutDate } },
                { checkOut: { $gt: checkInDate } }
            ]
        });

        if (overlappingBookings.length > 0) {
            return res.status(200).json({ available: false });
        }

        return res.status(200).json({ available: true });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBooking = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut, totalPrice } = req.body;
        
        if (!roomId || !checkIn || !checkOut || !totalPrice) {
            return res.status(400).json({ message: 'All booking fields are required.' });
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // Double check availability to prevent race conditions
        const overlappingBookings = await Booking.find({
            room: roomId,
            status: 'confirmed',
            $and: [
                { checkIn: { $lt: checkOutDate } },
                { checkOut: { $gt: checkInDate } }
            ]
        });

        if (overlappingBookings.length > 0) {
            return res.status(400).json({ message: 'Room is no longer available for these dates.' });
        }
        
        const booking = await Booking.create({
            user: req.user._id,
            room: roomId,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            totalPrice,
            status: 'pending' // Requires payment to be confirmed
        });
        
        const populatedBooking = await Booking.findById(booking._id).populate('room');

        res.status(201).json(populatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ 
            user: req.user._id,
            status: { $ne: 'pending' } // Hide abandoned pending bookings
        })
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
