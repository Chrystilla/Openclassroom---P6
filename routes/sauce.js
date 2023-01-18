// Import d'Express
const express = require('express');
// Import du middleware d'authentification
const auth = require('../middleware/auth')
// Import du middleware multer
const multer = require('../middleware/multer-config')
// Import du fichier controller
const sauceCtrl = require('../controllers/sauce.js');

// Création d'un router
const router = express.Router();

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
