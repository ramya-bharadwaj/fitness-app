const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');

// Add a new student (only for coaches)
exports.addStudent = async (req, res) => {
    const { name, dob, gender, height, program } = req.body;

    try {
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
    } catch (error) {
        res.status(500).json({ message: 'Error adding student', error });
    }
};

// View student profile
exports.viewStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const profile = await StudentProfile.findOne({ userId: student._id });
        res.json({ student, profile });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student profile', error });
    }
};

// Edit student profile
exports.editStudentProfile = async (req, res) => {
    const { weight, bodyFat, visceralFat, bmr, bmi, bodyAge, trunkFat, muscle } = req.body;

    try {
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
    } catch (error) {
        res.status(500).json({ message: 'Error editing student profile', error });
    }
};

// Get student count
exports.getStudentCount = async (req, res) => {
    try {
        const studentCount = await StudentProfile.countDocuments(); // Get total count of students
        res.status(200).json({ studentCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student count', error });
    }
};
