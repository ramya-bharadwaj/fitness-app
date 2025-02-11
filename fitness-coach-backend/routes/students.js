const express = require('express');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a new student (only for coaches)
router.post('/', authMiddleware, async (req, res) => {
    const { name, dob, gender, height, program } = req.body;

    // Ensure the logged-in user is a coach
    const coach = await User.findById(req.userId);
    if (coach.role === 'student') {
        return res.status(403).json({ error: 'Only coaches can add students' });
    }

    // Create a new student
    const newStudent = new User({
        name,
        dob,
        gender,
        height,
        program,
        role: 'student',
    });
    await newStudent.save();

    // Create an empty student profile
    const newProfile = new StudentProfile({ userId: newStudent._id });
    await newProfile.save();

    res.json({ student: newStudent, profile: newProfile });
});

// View student profile
router.get('/:id', authMiddleware, async (req, res) => {
    const student = await User.findById(req.params.id);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    const profile = await StudentProfile.findOne({ userId: student._id });
    res.json({ student, profile });
});

// Edit student profile
router.put('/:id', authMiddleware, async (req, res) => {
    const { weight, bodyFat, visceralFat, bmr, bmi, bodyAge, trunkFat, muscle } = req.body;

    const student = await User.findById(req.params.id);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    const profile = await StudentProfile.findOneAndUpdate(
        { userId: student._id },
        { weight, bodyFat, visceralFat, bmr, bmi, bodyAge, trunkFat, muscle },
        { new: true }
    );

    res.json({ profile });
});

module.exports = router;
