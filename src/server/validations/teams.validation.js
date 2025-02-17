const Joi = require('joi');

const createTeamSchema = Joi.object({
	name: Joi.string().required()
});

const updateTeamSchema = Joi.object({
	name: Joi.string().required()
});

const inviteTeamMemberSchema = Joi.object({
	email: Joi.string().email().required()
});

module.exports = {
	createTeamSchema,
	updateTeamSchema,
	inviteTeamMemberSchema
};
