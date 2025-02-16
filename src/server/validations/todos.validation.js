const Joi = require('joi');
const { TODO_STATUS } = require('../utils/enum/todo');

const createTodoSchema = Joi.object({
	title: Joi.string().required(),
	status: Joi.string()
		.valid(...Object.values(TODO_STATUS))
		.optional(),
	projectId: Joi.number().required(),
	assignedTo: Joi.number().optional()
});

const updateTodoSchema = Joi.object({
	title: Joi.string().optional(),
	status: Joi.string()
		.valid(...Object.values(TODO_STATUS))
		.optional(),
	assignedTo: Joi.number().optional()
});

const getTodosSchema = Joi.object({
	projectId: Joi.number().required(),
	page: Joi.number().optional(),
	limit: Joi.number().optional()
});

module.exports = {
	createTodoSchema,
	updateTodoSchema,
	getTodosSchema
};
