const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Tutor= require('../models/tutor')
const { sendPasswordResetEmail } = require('../services/emailService');

// 1️⃣ Demande de réinitialisation (Forgot Password)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ message: 'Email requis' });
    }

    // Chercher le tuteur
    const tutor = await Tutor.findOne({ email: email.toLowerCase() });
    
    // ⚠️ Toujours renvoyer le même message (sécurité)
    const standardMessage = 'Si cet email existe, un lien de réinitialisation a été envoyé';
    
    if (!tutor) {
      return res.json({ message: standardMessage });
    }

    // Générer le token JWT (valide 1 heure)
    const resetToken = jwt.sign(
      { 
        userId: tutor._id.toString(),
        email: tutor.email,
        type: 'password-reset'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Sauvegarder le token en base
    tutor.resetPasswordToken = resetToken;
    tutor.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await tutor.save();

    // Envoyer l'email
    await sendPasswordResetEmail(
      tutor.email, 
      resetToken, 
      tutor.firstName || tutor.name || 'Utilisateur'
    );

    console.log(`📧 Email de réinitialisation envoyé à: ${email}`);
    res.json({ message: standardMessage });

  } catch (error) {
    console.error('❌ Erreur forgot-password:', error);
    res.status(500).json({ message: 'Erreur serveur, réessayez plus tard' });
  }
});

// 2️⃣ Vérification du token (GET)
router.get('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Vérifier la signature du token JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Token invalide ou expiré' 
      });
    }

    // Vérifier que le token existe en base et n'est pas expiré
    const tutor = await Tutor.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!tutor) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Token invalide ou expiré' 
      });
    }

    res.json({ 
      valid: true, 
      email: tutor.email 
    });

  } catch (error) {
    console.error('❌ Erreur vérification token:', error);
    res.status(400).json({ 
      valid: false, 
      message: 'Erreur de vérification' 
    });
  }
});

// 3️⃣ Réinitialisation du mot de passe (POST)
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validation du mot de passe
    if (!password || password.length < 8) {
      return res.status(400).json({ 
        message: 'Le mot de passe doit contenir au moins 8 caractères' 
      });
    }

    // Vérifier le token JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }

    // Chercher le tuteur
    const tutor = await Tutor.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!tutor) {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour
    tutor.password = hashedPassword;
    tutor.resetPasswordToken = undefined;
    tutor.resetPasswordExpires = undefined;
    await tutor.save();

    console.log(`✅ Mot de passe réinitialisé pour: ${tutor.email}`);
    
    res.json({ message: 'Mot de passe réinitialisé avec succès' });

  } catch (error) {
    console.error('❌ Erreur reset-password:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;