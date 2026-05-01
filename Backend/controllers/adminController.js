import User from '../models/User.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import Report from '../models/Report.js';
import PlatformSetting from '../models/PlatformSetting.js';

// @desc    Get dashboard metrics
// @route   GET /api/admin/metrics
// @access  Private/Admin
export const getAdminMetrics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProperties = await Room.countDocuments();
        
        // Calculate Total Platform Revenue (Assuming admin takes a % or we just show total transaction volume)
        // For simplicity, let's sum up the price of all CONFIRMED bookings
        const bookings = await Booking.find({ status: { $in: ['confirmed', 'completed'] } });
        const totalRevenue = bookings.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0);

        const pendingListings = await Room.countDocuments({ status: 'pending' });

        // Calculate Revenue over the last 6 months
        // Mocking chart data based on simple grouping (can be optimized with MongoDB aggregation)
        const recentBookings = await Booking.find({ 
            status: { $in: ['confirmed', 'completed'] },
            createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 5)) }
        });

        res.status(200).json({
            totalUsers,
            totalProperties,
            totalRevenue,
            pendingListings,
            // You can add more complex aggregation here
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        // Do not return admin users in the general management list
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            // Prevent deletion of admin accounts
            if (user.role === 'admin') {
                return res.status(403).json({ message: 'Cannot delete an admin account' });
            }
            await user.deleteOne();
            res.status(200).json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        
        if (user) {
            // Prevent modifying an existing admin account
            if (user.role === 'admin') {
                return res.status(403).json({ message: 'Cannot modify an admin account' });
            }
            
            user.role = role || user.role;
            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all listings (properties)
// @route   GET /api/admin/listings
// @access  Private/Admin
export const getAllListings = async (req, res) => {
    try {
        const listings = await Room.find({}).populate('owner', 'name email');
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update listing status (approve/reject)
// @route   PUT /api/admin/listings/:id/status
// @access  Private/Admin
export const updateListingStatus = async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        const listing = await Room.findById(req.params.id);
        
        if (listing) {
            listing.status = status;
            await listing.save();
            res.status(200).json(listing);
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a listing completely
// @route   DELETE /api/admin/listings/:id
// @access  Private/Admin
export const deleteListing = async (req, res) => {
    try {
        const deletedListing = await Room.findByIdAndDelete(req.params.id);
        if (deletedListing) {
            res.status(200).json({ message: 'Listing deleted successfully' });
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a listing details
// @route   PUT /api/admin/listings/:id
// @access  Private/Admin
export const updateListing = async (req, res) => {
    try {
        const updatedListing = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('owner', 'name email');
        if (updatedListing) {
            res.status(200).json(updatedListing);
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email photo')
            .populate('room', 'name location pricePerMonth images')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status (cancel/complete)
// @route   PUT /api/admin/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            booking.status = status;
            await booking.save();
            const updatedBooking = await Booking.findById(req.params.id)
                .populate('user', 'name email photo')
                .populate('room', 'name location pricePerMonth images');
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Simulate refunding a booking
// @route   POST /api/admin/bookings/:id/refund
// @access  Private/Admin
export const refundBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            // In a real app, call payment gateway to process refund
            booking.status = 'cancelled';
            booking.paymentId = booking.paymentId ? booking.paymentId + '_refunded' : 'refunded';
            await booking.save();
            const updatedBooking = await Booking.findById(req.params.id)
                .populate('user', 'name email photo')
                .populate('room', 'name location pricePerMonth images');
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reports
// @route   GET /api/admin/reports
// @access  Private/Admin
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate('reporter', 'name email photo')
            .populate('reportedUser', 'name email photo')
            .populate('reportedProperty', 'name location images')
            .sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update report status (resolve/ignore)
// @route   PUT /api/admin/reports/:id/status
// @access  Private/Admin
export const updateReportStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const report = await Report.findById(req.params.id);
        if (report) {
            report.status = status;
            await report.save();
            const updatedReport = await Report.findById(req.params.id)
                .populate('reporter', 'name email photo')
                .populate('reportedUser', 'name email photo')
                .populate('reportedProperty', 'name location images');
            res.status(200).json(updatedReport);
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Ban User
// @route   PUT /api/admin/users/:id/ban
// @access  Private/Admin
export const banUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.role === 'admin') {
                return res.status(403).json({ message: 'Cannot ban an admin account' });
            }
            user.isBanned = true; // Assumes you add isBanned to User schema, or handled virtually
            // Using a workaround: we'll change their role to 'banned' or mark them
            user.role = 'banned'; 
            await user.save();
            res.status(200).json({ message: 'User banned successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Warn User
// @route   POST /api/admin/users/:id/warn
// @access  Private/Admin
export const warnUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            // Simulate sending a warning email/notification
            res.status(200).json({ message: 'Warning notification sent to user' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get platform settings
// @route   GET /api/admin/settings
// @access  Private/Admin
export const getSettings = async (req, res) => {
    try {
        let settings = await PlatformSetting.findOne();
        if (!settings) {
            settings = await PlatformSetting.create({});
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update platform settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
export const updateSettings = async (req, res) => {
    try {
        let settings = await PlatformSetting.findOne();
        if (!settings) {
            settings = new PlatformSetting();
        }

        const { platformName, adminEmail, razorpayKey, razorpaySecret, commissionPercentage, emailNotifications, smsNotifications, themeMode } = req.body;

        if (platformName !== undefined) settings.platformName = platformName;
        if (adminEmail !== undefined) settings.adminEmail = adminEmail;
        if (razorpayKey !== undefined) settings.razorpayKey = razorpayKey;
        if (razorpaySecret !== undefined) settings.razorpaySecret = razorpaySecret;
        if (commissionPercentage !== undefined) settings.commissionPercentage = commissionPercentage;
        if (emailNotifications !== undefined) settings.emailNotifications = emailNotifications;
        if (smsNotifications !== undefined) settings.smsNotifications = smsNotifications;
        if (themeMode !== undefined) settings.themeMode = themeMode;

        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Financial Data
// @route   GET /api/admin/financials
// @access  Private/Admin
export const getFinancials = async (req, res) => {
    try {
        const bookings = await Booking.find({ status: { $in: ['confirmed', 'completed'] } })
            .populate('room', 'name location')
            .populate('user', 'name');
            
        let settings = await PlatformSetting.findOne();
        const commissionRate = settings ? settings.commissionPercentage / 100 : 0.10;

        let totalRevenue = 0;
        let totalServiceFees = 0;
        let activePayouts = 0;
        
        const payoutsList = bookings.map(b => {
            const amount = b.totalAmount || 0;
            const fee = amount * commissionRate;
            
            totalRevenue += amount;
            totalServiceFees += fee;
            if (b.status === 'confirmed') activePayouts++;

            return {
                id: b._id,
                name: b.room ? b.room.name : 'Deleted Property',
                region: b.room ? b.room.location : 'Unknown',
                amount: amount,
                fee: fee,
                status: b.status === 'completed' ? 'Cleared' : 'Pending',
                date: b.createdAt
            };
        }).sort((a, b) => new Date(b.date) - new Date(a.date));

        // Let's create some dummy occupancy trends and regional data for the charts
        const revenueByRegion = {
            labels: ['Goa', 'Mumbai', 'Kerala', 'Delhi', 'Others'],
            data: [35, 25, 20, 10, 10]
        };
        
        const occupancyTrends = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [45, 52, 38, 65, 78, 84]
        };

        res.status(200).json({
            stats: {
                totalRevenue,
                serviceFees: totalServiceFees,
                occupancyRate: "84.2%", // Dummy for now
                activePayouts
            },
            payouts: payoutsList,
            revenueByRegion,
            occupancyTrends
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
