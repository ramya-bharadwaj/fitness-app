const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    wellnessCenterName: {
      type: String,
      required: true,
      default: 'Your Wellness Center',
    },
    // Add more customizable fields as needed (e.g., tagline, about, logo, etc.)
    tagline: {
      type: String,
      default: 'Helping You Achieve Your Fitness Goals!',
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
