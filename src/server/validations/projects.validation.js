const Joi = require('joi');

const createProjectSchema = Joi.object({
	name: Joi.string().required(),
	teamId: Joi.number().required()
});

const updateProjectSchema = Joi.object({
	name: Joi.string().required(),
	teamId: Joi.number().required()
});

module.exports = {
	createProjectSchema,
	updateProjectSchema
};
