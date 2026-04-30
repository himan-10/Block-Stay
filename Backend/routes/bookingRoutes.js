import express from 'express';
import { 
    createBooking, 
    getMyBookings, 
    getOwnerBookings, 
    cancelBooking,
    checkAvailability,
    updateBookingStatus
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/check-availability', checkAvailability);
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/owner-bookings', protect, getOwnerBookings);
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/status', protect, updateBookingStatus);

export default router;
