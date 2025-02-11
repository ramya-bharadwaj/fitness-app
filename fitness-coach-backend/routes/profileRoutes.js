const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Get the profile (for displaying home page customization)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({ coach: req.userId });

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Create or Update the profile
router.post('/', authMiddleware, async (req, res) => {
    const { wellnessCenterName, tagline } = req.body;

    try {
        // Check if profile exists for the coach
        let profile = await Profile.findOne({ coach: req.userId });

        if (profile) {
            // Update the existing profile
            profile.wellnessCenterName = wellnessCenterName;
            profile.tagline = tagline;
            await profile.save();
        } else {
            // Create a new profile if not exists
            profile = new Profile({
                coach: req.userId,
                wellnessCenterName,
                tagline,
            });
            await profile.save();
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
