const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dob: Date,
    age: Number,
    gender: String,
    height: Number,
    description: String,
    programme: {
        type: String,
        enum: ['WEIGHT_LOSS', 'WEIGHT_GAIN'],
        default: 'WEIGHT_LOSS',
    },
    membership: {
        type: String,
        enum: ['GOLD', 'GOLD_PLUS'],
        default: 'GOLD',
    },
    type: {
        type: String,
        enum: ['ONLINE', 'OFFLINE'],
        default: 'OFFLINE',
    },
    idealValues: {
        weight: Number,
        bodyFat: Number,
        visceralFat: Number,
        bmr: Number,
        bmi: Number,
        bodyAge: Number,
        trunkFat: Number,
        muscle: Number,
    },
    profileHistory: [
        {
            date: { type: Date, default: Date.now },
            weight: Number,
            bodyFat: Number,
            visceralFat: Number,
            bmr: Number,
            bmi: Number,
            bodyAge: Number,
            trunkFat: Number,
            muscle: Number,
            description: String,
            photos: [String], // Array of image URLs
        },
    ],
    attendance: [
        {
            date: { type: Date, default: Date.now },
            status: {
                type: String,
                enum: ['PRESENT', 'ABSENT', 'EXCUSED'],
                default: 'PRESENT',
            },
        },
    ],
    payments: [
        {
            paymentDate: { type: Date },
            amount: { type: Number, required: true }, // Amount of payment
            paymentType: {
                type: String,
                enum: ['FEES', 'PRODUCT_PURCHASE'], // Type of payment
                required: true,
            },
            paymentPhotos: [String], // Array of payment photo URLs (e.g., receipts, invoices)
            description: { type: String, default: '' }, // Optional description (e.g., "January Fees")
        },
    ],
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
