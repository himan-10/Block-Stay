import mongoose from 'mongoose';

const platformSettingSchema = mongoose.Schema({
    platformName: {
        type: String,
        default: 'Blockstay'
    },
    adminEmail: {
        type: String,
        default: 'admin@blockstay.com'
    },
    razorpayKey: {
        type: String,
        default: ''
    },
    razorpaySecret: {
        type: String,
        default: ''
    },
    commissionPercentage: {
        type: Number,
        default: 10 // 10%
    },
    emailNotifications: {
        type: Boolean,
        default: true
    },
    smsNotifications: {
        type: Boolean,
        default: false
    },
    themeMode: {
        type: String,
        enum: ['dark', 'light', 'system'],
        default: 'dark'
    }
}, {
    timestamps: true
});

const PlatformSetting = mongoose.model('PlatformSetting', platformSettingSchema);
export default PlatformSetting;
