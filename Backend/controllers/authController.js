import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, // Required for cross-site cookies
        sameSite: 'none', // Needed since backend and frontend domains differ
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    return token;
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userRole = role && role === 'owner' ? 'owner' : 'user';
        console.log('🔵 Register attempt:', { name, email: email.substring(0,3)+'...', passwordLength: password?.length });

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('❌ User exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role: userRole });
        console.log('✅ User created:', user._id);

        // ✅ Send Welcome Email
        await sendEmail({
            to: user.email,
            subject: "Welcome to Blockstay!",
            text: `Hi ${user.name},\n\nWelcome to Blockstay! We're thrilled to have you on board.\nStart exploring premium properties today.\n\nBest,\nBlockstay Team`
        });

        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo
        });
    } catch (error) {
        console.error('🔴 Register ERROR:', error.message, error.stack);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                photo: user.photo
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
