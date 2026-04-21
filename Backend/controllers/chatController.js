import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
    try {
        const { sender, roomId, text } = req.body;

        const message = await Message.create({
            sender,
            roomId,
            text
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { roomId } = req.params;

        const messages = await Message.find({ roomId }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};