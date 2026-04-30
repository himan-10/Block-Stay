import express from 'express';
import { getOwnerRooms, createRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/owner', protect, getOwnerRooms);
router.post('/', protect, createRoom);
router.put('/:id', protect, updateRoom);
router.delete('/:id', protect, deleteRoom);

export default router;
