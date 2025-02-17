const Joi = require('joi');

const createCommentsSchema = Joi.object({
	text: Joi.string().required(),
	todoId: Joi.number().required()
});

const getCommentsSchema = Joi.object({
	todoId: Joi.number().required()
});

module.exports = {
	createCommentsSchema,
	getCommentsSchema
};
