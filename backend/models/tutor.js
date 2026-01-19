const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  phone: String,
  avatar: [String],
  formation: String,
  experience: String,
  level: [String],
  presentation: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  termsAccepted: { type: Boolean, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Tutor', tutorSchema);
