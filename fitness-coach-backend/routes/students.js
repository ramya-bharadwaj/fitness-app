const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a new student (only for coaches)
router.post('/', authMiddleware, studentController.addStudent);

// View student profile
router.get('/:id', authMiddleware, studentController.viewStudentProfile);

// Edit student profile
router.put('/:id', authMiddleware, studentController.editStudentProfile);

// Get count of students
router.get('/count',authMiddleware, studentController.getStudentCount);

module.exports = router;
