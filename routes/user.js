// Import des modules nécessaires
const express = require('express');
const apiLimiter = require('../middleware/api.limiter')
const userValidation = require('../middleware/user.validation')
const userCtrl = require('../controllers/user');

// Création d'un router
const router = express.Router();

router.post('/signup', apiLimiter, userValidation, userCtrl.signup);
router.post('/login', apiLimiter, userCtrl.login);

module.exports = router;