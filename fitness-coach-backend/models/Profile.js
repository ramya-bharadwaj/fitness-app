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
    tagline: {
      type: String,
      default: 'Helping You Achieve Your Fitness Goals!',
    },
    info: {
      type: String,
      default: '', // This will store the rich text content (HTML)
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
