// Inclusion du modèle Sauce
const Sauce = require('../models/Sauce.js');

// Fonction d'affichage de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}))
};

// Fonction d'affichage d'une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
};

// Fonction de création d'une sauce
exports.createSauce = (req, res, next) => {
    delete req.body._id
    const sauce = new Sauce ({
        ...req.body
    })
    sauce.save()
        .then(() => res.status(201).json({message : 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}))
};

// Fonction de modification d'une sauce
exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({_id: req.params._id}, {...req.body, _id: req.params._id})
        .then(() => res.status(200).json({message : 'Objet modifié !'}))
        .catch(error => res.status(400).json({error}))
};

// Fonction de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params._id})
        .then(() => res.status(200).json({message : 'Objet supprimé !'}))
        .catch(error => res.status(400).json({error}))
};

// Fonction de like d'une sauce
exports.likeSauce = (req, res, next) => {
};