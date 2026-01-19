const Tutor = require('../models/tutor');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')
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

exports.ConnectTutor= (req,res) => {
  
  Tutor.findOne({email:req.body.email})
  .then((tutor) =>{
    if (tutor===null) {
      return res.status(401).json({message:"Utilisateur introuvable"})
    }
  
      bcrypt.compare(req.body.password,tutor.password)
    .then((valid)=> {
      if (!valid){
        return res.status(401).json({message:"Impossible"})
      }
      else{
        return res.status(200).json({
          id:tutor._id,
          email:tutor.email,
          token:jwt.sign(
            {id:tutor._id},
            process.env.JWT_SECRET,
            {expiresIn:"24h"}
          )
        })
      }
    })
     .catch(err => res.status(500).json({ message: 'Erreur serveur', error: err.message }))
  })
   .catch(err => res.status(500).json({ message: 'Erreur serveur', error: err.message }))
}
