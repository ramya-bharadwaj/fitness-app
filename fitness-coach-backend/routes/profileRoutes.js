const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get the profile (for displaying home page customization)
router.get('/', authMiddleware, profileController.getProfile);

// Create or Update the profile
router.post('/', authMiddleware, profileController.createOrUpdateProfile);

module.exports = router;
