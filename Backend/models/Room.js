import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const roomSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: '1BHK' },
    pricePerMonth: { type: Number, required: true },
    sizeSqMeters: { type: Number, required: true },
    capacity: { type: Number, required: true },
    bedding: { type: String, required: true },
    amenities: [String],
    images: [String],
    location: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, {
    timestamps: true
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
