const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
        // Récupération du token & split pour ne garder que la chaîne de caractère
        const token = req.headers.authorization.split(' ')[1];
        // Décodage du token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Récupération de la propriété userId du Token
        const userId = decodedToken.userId;
        // Ajout de l'ID utilisateur à l’objet Request afin que nos différentes routes puissent l’exploiter
         req.auth = {
           userId: userId
        };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};