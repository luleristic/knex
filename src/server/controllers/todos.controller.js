const db = require('../../data/config/connection');

const ApplicationError = require('../utils/express/error');
const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApiResponse = require('../utils/express/response');
const TeamRepository = require('../../data/repositories/team.repository');
const { pushNotification } = require('../services/notification.service');
const { NOTOFICATION_MESSAGES } = require('../utils/enum/notification');

const createTodo = async (req, res, next) => {
	try {
		const user = req.user;

		const { title, projectId, status, assignedTo, teamId } = req.body;

		const team = await TeamRepository.getTeamById(teamId, user.id);
		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.TEAM_NOT_FOUND);
		}

		const project = await db('projects').where({ id: projectId, team_id: team.id }).first();
		if (!project) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.PROJECT_NOT_FOUND);
		}

		const payload = {
			title,
			project_id: projectId,
			created_by: user.id,
			team_id: team.id
		};

		if (status) payload.status = status;
		if (assignedTo) {
			const userExists = await db('users').where({ id: assignedTo }).first();
			if (!userExists) {
				throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.USER_NOT_FOUND);
			}
			payload.assigned_to = assignedTo;
		}

		const todo = await db('todos').insert(payload).returning(['id', 'title', 'status', 'assigned_to']);

		ApiResponse.send(res, HttpStatusCode.CREATED, HttpStatusMessage.CREATED, todo);
	} catch (error) {
		next(error);
	}
};

const getTodos = async (req, res, next) => {
	try {
		const user = req.user;

		const { offset, limit, page } = req.pagination;

		const { projectId, teamId } = req.query;

		const team = await TeamRepository.getTeamById(teamId, user.id);

		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.TEAM_NOT_FOUND);
		}

		const projectExists = await db('projects').where({ id: projectId, team_id: team.id }).first();
		if (!projectExists) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.PROJECT_NOT_FOUND);
		}

		const todos = await db('todos')
			.where({ project_id: projectId })
			.offset(offset)
			.limit(limit)
			.returning(['id', 'title', 'status', 'assinged_to', 'created_at']);

		const total = await db('todos').where({ project_id: projectId }).count('id');

		const payload = {
			limit,
			page,
			todos,
			total: parseInt(total[0].count)
		};

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, payload);
	} catch (error) {
		next(error);
	}
};

const updateTodo = async (req, res, next) => {
	try {
		const user = req.user;

		const { id } = req.params;

		const { title, status, assignedTo, teamId } = req.body;

		const team = await TeamRepository.getTeamById(teamId, user.id);

		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.TEAM_NOT_FOUND);
		}

		const todo = await db('todos').where({ id, team_id: team.id }).first();
		if (!todo) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.TODO_NOT_FOUND);
		}

		const payload = {};

		if (title) payload.title = title;
		if (status) {
			payload.status = status;
			console.log('todo.assignedTo', todo.assigned_to);
			console.log('status', status);
			if (todo.assigned_to) {
				const assignedToUserExists = await db('users').where({ id: todo.assigned_to }).first();
				if (assignedToUserExists) {
					await pushNotification(assignedToUserExists.id, NOTOFICATION_MESSAGES.TASK_STATUS_UPDATED);
				}
			}
		}
		if (assignedTo) {
			const userExists = await db('users').where({ id: assignedTo }).first();
			if (!userExists) {
				throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.USER_NOT_FOUND);
			}
			payload.assigned_to = assignedTo;
			await pushNotification(assignedTo, NOTOFICATION_MESSAGES.TASK_ASSIGNED_TO_YOU);
		}

		const updatedTodo = await db('todos').where({ id }).update(payload).returning(['id', 'title', 'status', 'assigned_to']);

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, updatedTodo);
	} catch (error) {
		next(error);
	}
};

const deleteTodo = async (req, res, next) => {
	try {
		const user = req.user;

		const { id } = req.params;

		const { teamId } = req.query;

		const team = await TeamRepository.getTeamById(teamId, user.id);

		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.TEAM_NOT_FOUND);
		}

		const todo = await db('todos').where({ id, team_id: team.id }).first();
		if (!todo) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.TODO_NOT_FOUND);
		}

		await db('todos').where({ id }).del();

		ApiResponse.send(res, HttpStatusCode.NO_CONTENT, HttpStatusMessage.NO_CONTENT);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createTodo,
	getTodos,
	updateTodo,
	deleteTodo
};
