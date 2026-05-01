import express from 'express';
import PlatformSetting from '../models/PlatformSetting.js';

const router = express.Router();

// @desc    Get public platform settings (theme, name, etc)
// @route   GET /api/public/settings
// @access  Public
router.get('/settings', async (req, res) => {
    try {
        const settings = await PlatformSetting.findOne().select('platformName themeMode');
        if (!settings) {
            return res.status(200).json({ platformName: 'Blockstay', themeMode: 'dark' });
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
