const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['seller', 'coach', 'student'], required: true },
    dob: Date, // for students
    gender: String, // for students
    height: Number, // for students
    program: { type: String, enum: ['weight-loss', 'weight-gain'] }, // for students
});

module.exports = mongoose.model('User', userSchema);
