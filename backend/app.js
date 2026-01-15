const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 🔍 DEBUG - Vérifie le JWT_SECRET au démarrage
console.log(' JWT_SECRET chargé:', process.env.JWT_SECRET ? ' OUI' : ' NON');
if (process.env.JWT_SECRET) {
  console.log(' Longueur:', process.env.JWT_SECRET.length, 'caractères');
}

const app = express();

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Connexion à MongoDB réussie !"))
  .catch((err) => console.error(" Connexion à MongoDB échouée !", err));

// CORS
app.use(cors({
  origin: [
      'http://localhost:5173',
    'https://speakmate-seven.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    jwtConfigured: !!process.env.JWT_SECRET 
  });
});

// Routes
module.exports = app;