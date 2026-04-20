import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    sizeSqMeters: { type: Number, required: true },
    capacity: { type: Number, required: true },
    bedding: { type: String, required: true },
    amenities: [String],
    images: [String],
    location: { type: String, required: true }
}, {
    timestamps: true
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
