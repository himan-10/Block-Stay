import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// 🔥 ADD THESE IMPORTS
import admin from '../config/firebaseAdmin.js';
import User from '../models/User.js';
import { generateToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);

// 🔐 GOOGLE LOGIN ROUTE (ADD THIS)
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;

    // ✅ verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    const { name, email, picture } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        photo: picture,
        role: 'pending'
      });
    } else if (picture && user.photo !== picture) {
      user.photo = picture;
      await user.save();
    }

    // 🔑 generate JWT and set cookie
    const jwtToken = generateToken(res, user._id);

    res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo,
      token: jwtToken
    });

  } catch (err) {
    console.error("Google login backend error:", err);
    res.status(401).json({ message: err.message || 'Google login failed' });
  }
});

// 📝 SET ROLE ROUTE (For pending Google users)
router.post('/set-role', protect, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'owner'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to set role' });
  }
});

export default router;