// Inclusion de Express
const express = require('express');
// Inclusion de Mongoose
const mongoose = require('mongoose');
// Import du router
const userRoutes = require('./routes/user');

// Connection à la BDD mongoDB
mongoose.connect('mongodb+srv://Chrystilla:Piiquante2023@cluster0.ogxhgla.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de l'app Expres
const app = express();

//Bypass de la sécurité CORS (2 serveurs différents)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Interception de toutes les requêtes contenant du json
app.use(express.json());

// Pour la route donnée : utiliser la logique écrite dans userRoutes
app.use('/api/auth', userRoutes);

module.exports = app;