import Room from '../models/Room.js';

export const getRooms = async (req, res) => {
    try {
        const { location, guests, page = 1, limit = 10 } = req.query;
        
        let query = {};
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (guests) {
            query.capacity = { $gte: Number(guests) };
        }

        const skip = (Number(page) - 1) * Number(limit);

        const rooms = await Room.find(query)
            .populate('owner', 'name')
            .skip(skip)
            .limit(Number(limit));
            
        const totalRooms = await Room.countDocuments(query);

        res.json({
            rooms,
            currentPage: Number(page),
            totalPages: Math.ceil(totalRooms / Number(limit)),
            totalRooms
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('owner', 'name');
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createRoom = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Owner role required' });
        }
        const roomData = { ...req.body, owner: req.user._id };
        const room = await Room.create(roomData);
        const populatedRoom = await Room.findById(room._id).populate('owner', 'name');
        res.status(201).json(populatedRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateRoom = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Owner role required' });
        }
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        if (room.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('owner', 'name');
        res.json(updatedRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Owner role required' });
        }
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        if (room.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
