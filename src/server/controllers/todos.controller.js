const db = require('../../data/config/connection');

const ApplicationError = require('../utils/express/error');
const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApiResponse = require('../utils/express/response');

const createTodo = async (req, res, next) => {
	try {
		const user = req.user;
		const team = req.team;

		const { title, projectId, status, assignedTo } = req.body;

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
		const team = req.team;

		const { offset, limit, page } = req.pagination;

		const { projectId } = req.query;

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
		const team = req.team;
		const { id } = req.params;

		const { title, status, assingedTo } = req.body;
		const todo = await db('todos').where({ id, team_id: team.id }).first();
		if (!todo) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.TODO_NOT_FOUND);
		}

		const payload = {};

		if (title) payload.title = title;
		if (status) payload.status = status;
		if (assingedTo) {
			const userExists = await db('users').where({ id: assingedTo }).first();
			if (!userExists) {
				throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.USER_NOT_FOUND);
			}
			payload.assinged_to = assingedTo;
		}

		const updatedTodo = await db('todos').where({ id }).update(payload).returning(['id', 'title', 'status', 'assigned_to']);

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, updatedTodo);
	} catch (error) {
		next(error);
	}
};

const deleteTodo = async (req, res, next) => {
	try {
		const team = req.team;

		const { id } = req.params;

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
