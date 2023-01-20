const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1heure
	max: 10, // Limite chaque IP à 5 requêtes par `window` (ici, par heure) 
	standardHeaders: true, // Retourne le rate limite dans le header `RateLimit-*`
	legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
})

module.exports = apiLimiter;