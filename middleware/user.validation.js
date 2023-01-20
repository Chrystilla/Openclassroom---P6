const joi = require('joi');

/* Set-up des règles :
** Joi.string(): S'assure que les champs sont des string
** Joi.email(): S'assure que l'email contient une adresse mail valide
** Joi.trim(): S'assure que la string ne contient pas d'espace avant et après
** Joi.min(): Spécifie un nombre min de chaîne de charactère
** Joi.required(): S'assure que cette propriété est bien définie*/
const rules = joi.object({
	email: joi.string().email().trim(true).required(),
	password: joi.string().min(6).trim(true).required(),
});


const userValidation = async (req, res, next) => {
    // User à valider
	const userToValidate = {
		email: req.body.email,
		password: req.body.password,
	};
    // On applique les rules au user à valider
	const { error } = rules.validate(userToValidate);
	if (error) {
		res.status(406).json({ message: `Error in User Data : ${error.message}` });
	} else {
		next();
	}
};

module.exports = userValidation;