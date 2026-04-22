import express from 'express';
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom, createRoomReview } from '../controllers/roomController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRooms);
router.get('/:id', getRoomById);

router.post('/', protect, createRoom);
router.put('/:id', protect, updateRoom);
router.delete('/:id', protect, deleteRoom);
router.post('/:id/reviews', protect, createRoomReview);

export default router;
