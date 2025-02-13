const Profile = require('../models/Profile');

// Get the profile (for displaying home page customization)
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ coach: req.userId });

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create or Update the profile
exports.createOrUpdateProfile = async (req, res) => {
    const { wellnessCenterName, tagline, info } = req.body;

    try {
        // Check if profile exists for the coach
        let profile = await Profile.findOne({ coach: req.userId });

        if (profile) {
            // Update the existing profile
            profile.wellnessCenterName = wellnessCenterName;
            profile.tagline = tagline;
            profile.info = info;
            await profile.save();
        } else {
            // Create a new profile if not exists
            profile = new Profile({
                coach: req.userId,
                wellnessCenterName,
                tagline,
                info
            });
            await profile.save();
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
