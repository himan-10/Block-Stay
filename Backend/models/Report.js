import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
    reporter: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    reportedUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    reportedProperty: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room' 
    },
    type: { 
        type: String, 
        required: true, 
        enum: ['Property Report', 'User Report'] 
    },
    reason: { 
        type: String, 
        required: true,
        enum: ['Fake Listing', 'Scam', 'Abuse', 'Other']
    },
    description: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Resolved', 'Ignored'],
        default: 'Pending' 
    },
    severity: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Low'
    }
}, {
    timestamps: true
});

// Auto-assign severity based on reason before saving
reportSchema.pre('save', function(next) {
    if (['Scam'].includes(this.reason)) {
        this.severity = 'High';
    } else if (['Fake Listing'].includes(this.reason)) {
        this.severity = 'Medium';
    } else {
        this.severity = 'Low';
    }
    next();
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
