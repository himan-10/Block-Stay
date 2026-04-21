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
        default: 'confirmed' 
    },
    paymentIntentId: { 
        type: String 
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
