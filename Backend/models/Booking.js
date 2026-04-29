import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Room' 
    },
    checkIn: { 
        type: Date, 
        required: true 
    },
    checkOut: { 
        type: Date, 
        required: true 
    },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending' 
    },
    paymentId: { 
        type: String 
    },
    orderId: {
        type: String
    }
}, {
    timestamps: true
});

// TTL Index: Automatically delete documents 7 days (604800 seconds) after they are updated, 
// BUT only if their status is 'cancelled' or 'pending' (to clean up abandoned payments).
bookingSchema.index(
    { updatedAt: 1 }, 
    { 
        expireAfterSeconds: 604800, 
        partialFilterExpression: { status: { $in: ['cancelled', 'pending'] } } 
    }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
