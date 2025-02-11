const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a new coach (only for sellers)
router.post('/add-coach', authMiddleware, async (req, res) => {
    const { name, email, password } = req.body;

    // Ensure the logged-in user is a seller
    const seller = await User.findById(req.userId);
    if (seller.role !== 'seller') {
        return res.status(403).json({ error: 'Only sellers can add coaches' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCoach = new User({
        name,
        email,
        password: hashedPassword,
        role: 'coach',
    });
    await newCoach.save();

    res.json({ coach: newCoach });
});

module.exports = router;
