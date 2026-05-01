import express from 'express';
import { 
    getAdminMetrics, 
    getAllUsers, 
    deleteUser, 
    updateUserRole, 
    getAllListings, 
    updateListingStatus,
    updateListing,
    deleteListing,
    getAllBookings,
    updateBookingStatus,
    refundBooking,
    getAllReports,
    updateReportStatus,
    banUser,
    warnUser,
    getSettings,
    updateSettings,
    getFinancials
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply middleware to all admin routes
router.use(protect);
router.use(authorize(['admin']));

router.get('/metrics', getAdminMetrics);
router.get('/users', getAllUsers);
router.route('/users/:id')
    .delete(deleteUser)
    .put(updateUserRole); // using PUT for role update here

// User Moderation
router.put('/users/:id/ban', banUser);
router.post('/users/:id/warn', warnUser);

router.get('/listings', getAllListings);
router.put('/listings/:id/status', updateListingStatus);
router.put('/listings/:id', updateListing);
router.delete('/listings/:id', deleteListing);

// Booking Management
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.post('/bookings/:id/refund', refundBooking);

// Reports Management
router.get('/reports', getAllReports);
router.put('/reports/:id/status', updateReportStatus);

// Settings Management
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Financials Management
router.get('/financials', getFinancials);

export default router;
