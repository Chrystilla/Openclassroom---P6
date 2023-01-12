// Inclusion du modèle Sauce
const Sauce = require('../models/Sauce.js');
const fs = require('fs');

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
    // Requête envoyé en format string => à mettre en format objet
    const sauceObject = JSON.parse(req.body.sauce);
    // Suppression de l'ID de l'objet car généré par notre BDD
    delete sauceObject._id
    // Suppression du userID de l'objet
    delete sauceObject._userId
    // Création du nouvel objet sous le Modèle Sauce
    const sauce = new Sauce ({
        ...sauceObject,
        // Utilisation du userID venant du token d'authentification
        userId: req.auth.userId,
        // Génère l'URL de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
        .then(() => res.status(201).json({message : 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}))
};

// Fonction de modification d'une sauce
exports.modifySauce = (req, res, next) => {
    // Recherche d'un champs file
    const sauceObject = req.file ? {
        // Si champs file : parser la string et générer l'URL de l'image
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body }; // sinon récupérer l'objet directement dans le corps de la requête

    // Suppression du userID de l'objet
    delete sauceObject._userId
    // Recherche de l'objet dans la BDD
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        // vérifier que l'objet appartient bien au user de la requête 
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({ message : 'Non-autorisé'});
        } else {
            Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Objet modifié!'}))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
};

// Fonction de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    // Recherche de l'objet dans la BDD
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            // Vérifier que l'objet appartient bien au user de la requête 
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non-autorisé'});
            } else {
                // Récupérer le nom de l'image
                const filename = sauce.imageUrl.split('/images/')[1];
                // Suppression de l'image mentionnée
                fs.unlink(`images/${filename}`, () => {
                    // Suppression de l'objet dans la BDD
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({error}))
};

// Fonction de like d'une sauce
exports.likeSauce = (req, res, next) => {
};