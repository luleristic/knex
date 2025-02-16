const Joi = require('joi');

const createProjectSchema = Joi.object({
	name: Joi.string().required()
});

const updateProjectSchema = Joi.object({
	name: Joi.string().required()
});

module.exports = {
	createProjectSchema,
	updateProjectSchema
};
