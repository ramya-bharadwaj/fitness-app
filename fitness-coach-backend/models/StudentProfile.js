const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    weight: Number,
    bodyFat: Number,
    visceralFat: Number,
    bmr: Number,
    bmi: Number,
    bodyAge: Number,
    trunkFat: Number,
    muscle: Number,
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
            photos: [String], // Array of image URLs
        },
    ],
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
