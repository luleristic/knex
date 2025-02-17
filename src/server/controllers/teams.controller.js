const db = require('../../data/config/connection');

const ApplicationError = require('../utils/express/error');
const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApiResponse = require('../utils/express/response');
const TeamRepository = require('../../data/repositories/team.repository');
const UserRepository = require('../../data/repositories/user.repository');

const createTeam = async (req, res, next) => {
	try {
		const user = req.user;

		const { name } = req.body;

		await db.transaction(async trx => {
			const team = await trx('teams').insert({ name }).returning('id');

			const teamId = team[0].id;

			await trx('users_teams').insert({
				user_id: user.id,
				team_id: teamId
			});

			ApiResponse.send(res, HttpStatusCode.CREATED, HttpStatusMessage.CREATED);
		});
	} catch (error) {
		next(error);
	}
};

const getTeams = async (req, res, next) => {
	try {
		const user = req.user;

		const teams = await TeamRepository.getUserTeams(user.id);

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, teams);
	} catch (error) {
		next(error);
	}
};

const updateTeam = async (req, res, next) => {
	try {
		const user = req.user;

		const { teamId } = req.params;

		const { name } = req.body;

		const team = await TeamRepository.getTeamById(teamId, user.id);

		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND);
		}

		await db('teams').where({ id: team.id }).update({ name });

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK);
	} catch (error) {
		next(error);
	}
};

const getTeamMembers = async (req, res, next) => {
	try {
		const user = req.user;

		const { offset, limit, page } = req.pagination;

		const { teamId } = req.params;

		const team = await TeamRepository.getTeamById(teamId, user.id);

		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND);
		}

		const users = await TeamRepository.getTeamMembers(team.id, offset, limit);

		const total = await db('users_teams').where({ team_id: team.id }).count('user_id');

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
		const user = req.user;
		const { teamId } = req.params;
		const { email } = req.body;

		const team = await TeamRepository.getTeamById(teamId, user.id);

		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.TEAM_NOT_FOUND);
		}

		const member = await UserRepository.getUserByField('email', email);

		if (!member) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.USER_NOT_FOUND);
		}

		await db('users_teams').insert({
			user_id: member.id,
			team_id: team.id
		});

		ApiResponse.send(res, HttpStatusCode.CREATED, HttpStatusMessage.CREATED);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createTeam,
	getTeams,
	updateTeam,
	getTeamMembers,
	inviteTeamMember
};
