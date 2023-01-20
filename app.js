// Import des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Initialisation de l'API
const app = express();

// Import des routers
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce')

// Connection à la BDD mongoDB
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Interception de toutes les requêtes contenant du json
app.use(express.json());
// Rend la route image statique
app.use('/images', express.static(path.join(__dirname, 'images')));

//Bypass de la sécurité CORS (2 serveurs différents)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Pour la route donnée : utiliser la logique écrite dans userRoutes et sauceRoutes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;