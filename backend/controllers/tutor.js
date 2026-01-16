const Tutor = require('../models/tutor');
const bcrypt = require('bcrypt');

exports.CreateTutor = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { firstname, lastname, phone, email, password, country, formation, level, experience, presentation, termsAccepted } = req.body;

    if (!firstname || !lastname || !email || !password || !country) {
      return res.status(400).json({ error: 'Certains champs obligatoires sont manquants' });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Avatar
    let avatar = [];
    if (req.file && req.file.path) {
      avatar = [req.file.path];
    }

    // Level
    let levelsArray = [];
    try {
      levelsArray = Array.isArray(level) ? level : JSON.parse(level);
    } catch {
      levelsArray = [];
    }

    const tutor = new Tutor({
      firstname,
      lastname,
      phone,
      email,
      password: hashed,
      country,
      formation,
      level: levelsArray,
      experience,
      presentation,
      termsAccepted: termsAccepted === 'true' || termsAccepted === true,
      avatar
    });

    await tutor.save();

    res.status(201).json({
      message: 'Tuteur créé avec succès',
      tutorId: tutor._id,
    });

  } catch (err) {
    console.error('ERREUR:', err);
    res.status(500).json({ error: err.message });
  }
};
