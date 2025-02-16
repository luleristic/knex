const Joi = require('joi');

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	password2: Joi.string().valid(Joi.ref('password')).required()
}).messages({
	'any.only': 'Passwords must match'
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

const updateMeSchema = Joi.object({
	name: Joi.string().required()
});

module.exports = {
	registerSchema,
	loginSchema,
	updateMeSchema
};
