const db = require('../../data/config/connection');
const bcrypt = require('bcrypt');

const ApplicationError = require('../utils/express/error');
const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApiResponse = require('../utils/express/response');

const getTeam = async (req, res, next) => {
	try {
		const team = req.team;

		const payload = {
			name: team.name
		};

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, payload);
	} catch (error) {
		next(error);
	}
};

const getTeamMembers = async (req, res, next) => {
	try {
		const team = req.team;
		const { offset, limit, page } = req.pagination;

		const users = await db('users').where({ team_id: team.id }).offset(offset).limit(limit).returning('id name email');

		const total = await db('users').where({ team_id: team.id }).count('id');

		const payload = {
			limit,
			page,
			users,
			total: parseInt(total[0].count)
		};

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, payload);
	} catch (error) {
		next(error);
	}
};

const inviteTeamMember = async (req, res, next) => {
	try {
		const team = req.team;
		const { email, name, password } = req.body;

		const userExists = await db('users').where({ email }).first();
		if (userExists) {
			throw new ApplicationError(HttpStatusCode.CONFLICT, HttpStatusMessage.USER_EXISTS);
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await db('users')
			.insert({
				team_id: team.id,
				name,
				email,
				password: hashedPassword
			})
			.returning(['id', 'name', 'email']);

		console.log(user);

		ApiResponse.send(res, HttpStatusCode.CREATED, HttpStatusMessage.CREATED, user);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getTeam,
	getTeamMembers,
	inviteTeamMember
};
