const express=require('express')
const router= express.Router()
const Ctrl=require('../controllers/tutor')
const upload = require('../config/cloudinary');

router.post(
  '/signup',
  upload.single('avatar'), // TOUJOURS AVANT le controller
  Ctrl.CreateTutor
);

router.post('/login',Ctrl.ConnectTutor)

//enregistrement


module.exports=router