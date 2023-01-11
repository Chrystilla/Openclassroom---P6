// Inclusion de Mongoose
const mongoose = require('mongoose');
//Inclusion du package de validation unique de Mongoose
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma pour les users
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required:true},
});

userSchema.plugin(uniqueValidator);

// Création et export du Model User utilisant le schema userSchema
module.export = mongoose.model('User', userSchema);