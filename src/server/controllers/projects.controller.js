const db = require('../../data/config/connection');
const TeamRepository = require('../../data/repositories/team.repository');

const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApplicationError = require('../utils/express/error');
const ApiResponse = require('../utils/express/response');

const createProject = async (req, res, next) => {
	try {
		const user = req.user;

		const { name, teamId } = req.body;

		const team = await TeamRepository.getTeamById(teamId, user.id);
		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND);
		}

		const project = await db('projects')
			.insert({
				team_id: team.id,
				name
			})
			.returning(['id', 'name']);

		ApiResponse.send(res, HttpStatusCode.CREATED, HttpStatusMessage.CREATED, project);
	} catch (error) {
		next(error);
	}
};

const getProjects = async (req, res, next) => {
	try {
		const user = req.user;
		const { offset, limit, page } = req.pagination;

		const { teamId } = req.query;

		const team = await TeamRepository.getTeamById(teamId, user.id);

		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND);
		}

		console.log('team', team);

		const projects = await db('projects').where({ team_id: team.id }).offset(offset).limit(limit).returning(['id', 'name']);

		const total = await db('projects').where({ team_id: team.id }).count('id');

		const payload = {
			limit,
			page,
			projects,
			total: parseInt(total[0].count)
		};

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, payload);
	} catch (error) {
		next(error);
	}
};

const updateProject = async (req, res, next) => {
	try {
		const user = req.user;

		const { id } = req.params;
		const { name, teamId } = req.body;

		const team = await TeamRepository.getTeamById(teamId, user.id);
		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND);
		}

		const project = await db('projects').where({ id, team_id: team.id }).update({ name }).returning(['id', 'name']);

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, project);
	} catch (error) {
		next(error);
	}
};

const deleteProject = async (req, res, next) => {
	try {
		const user = req.user;

		const { id } = req.params;

		const { teamId } = req.query;

		const team = await TeamRepository.getTeamById(teamId, user.id);
		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND);
		}

		await db('projects').where({ id, team_id: team.id }).del();

		ApiResponse.send(res, HttpStatusCode.NO_CONTENT, HttpStatusMessage.NO_CONTENT);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createProject,
	getProjects,
	updateProject,
	deleteProject
};
