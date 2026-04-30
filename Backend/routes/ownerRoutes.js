import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

const router = express.Router();

router.get('/earnings', protect, authorize('owner'), async (req, res) => {
    try {
        const rooms = await Room.find({ owner: req.user._id }).select('_id name');
        const roomIds = rooms.map(r => r._id);

        const bookings = await Booking.find({ 
            room: { $in: roomIds },
            status: 'confirmed' 
        }).populate('user', 'name').populate('room', 'name').sort('-createdAt');

        const totalEarnings = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

        const monthlyData = {};
        bookings.forEach(b => {
            const month = new Date(b.createdAt).toLocaleString('default', { month: 'short' });
            if (!monthlyData[month]) monthlyData[month] = 0;
            monthlyData[month] += b.totalPrice;
        });

        const monthlyEarnings = Object.keys(monthlyData).map(k => ({ name: k, earnings: monthlyData[k] }));

        res.json({ totalEarnings, monthlyEarnings, transactions: bookings });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/dashboard', protect, authorize('owner'), async (req, res) => {
    try {
        const rooms = await Room.find({ owner: req.user._id }).select('_id name');
        const roomIds = rooms.map(r => r._id);

        const totalProperties = roomIds.length;

        const allBookings = await Booking.find({ room: { $in: roomIds } })
            .populate('user', 'name')
            .populate('room', 'name')
            .sort('-createdAt');

        const totalBookings = allBookings.length;
        const activeBookings = allBookings.filter(b => ['pending', 'approved'].includes(b.status)).length;
        
        let totalEarnings = 0;
        const monthlyData = {};

        const recentBookingsRaw = allBookings.slice(0, 5);
        const recentBookings = recentBookingsRaw.map(b => ({
            _id: b._id,
            user: b.user?.name || 'Unknown',
            property: b.room?.name || 'Deleted',
            dates: `${new Date(b.checkIn).toLocaleDateString()} - ${new Date(b.checkOut).toLocaleDateString()}`,
            status: b.status
        }));

        allBookings.forEach(b => {
            if (b.status === 'confirmed') {
                totalEarnings += b.totalPrice;
                const month = new Date(b.createdAt).toLocaleString('default', { month: 'short' });
                if (!monthlyData[month]) monthlyData[month] = 0;
                monthlyData[month] += b.totalPrice;
            }
        });

        const monthlyEarnings = Object.keys(monthlyData).map(k => ({ name: k, earnings: monthlyData[k] }));

        res.json({
            totalProperties,
            totalBookings,
            activeBookings,
            totalEarnings,
            recentBookings,
            monthlyEarnings
        });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
