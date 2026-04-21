import Room from '../models/Room.js';

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({}).populate('owner', 'name');
        res.json(rooms);
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
