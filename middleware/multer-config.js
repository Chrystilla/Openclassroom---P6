// Import du package multer pour gérer les fichiers entrants
const multer = require('multer');

// Defini les extensions autorisées en upload
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration de multer
const storage = multer.diskStorage({
    // Indique où enregistrer les fichiers entrants
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    // Indique comment nommer les fichiers entrants
    filename: (req, file, callback) => {
        // Génere le nom de fichier
        const name = file.originalname.split(' ').join('_');
        // Génére l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        // Crée le nom de fichier entier (avec date et extension)
        callback(null, name + Date.now() + '.' + extension);
    }
    });

module.exports = multer({storage: storage}).single('image');


