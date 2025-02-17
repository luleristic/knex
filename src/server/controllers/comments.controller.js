const db = require('../../data/config/connection');

const ApplicationError = require('../utils/express/error');
const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApiResponse = require('../utils/express/response');
const TeamRepository = require('../../data/repositories/team.repository');
const CommentRepository = require('../../data/repositories/comment.repository');

const createComment = async (req, res, next) => {
	try {
		const user = req.user;

		const { todoId, text } = req.body;

		const todo = await db('todos').where({ id: todoId }).first();

		const team = TeamRepository.getTeamById(todo.team_id, user.id);

		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND);
		}

		const comment = await CommentRepository.insertComment(user.id, todoId, text, todo.project_id, todo.team_id);

		ApiResponse.send(res, HttpStatusCode.CREATED, HttpStatusMessage.CREATED, comment);
	} catch (error) {
		next(error);
	}
};

const getComments = async (req, res, next) => {
	try {
		const user = req.user;

		const { offset, limit, page } = req.pagination;
		const { todoId } = req.query;

		console.log('todoooId', todoId);

		const todo = await db('todos')
			.where({ id: parseInt(todoId) })
			.first();

		const team = TeamRepository.getTeamById(todo.team_id, user.id);

		if (!team) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND);
		}

		const comments = await CommentRepository.getComments(parseInt(todoId), offset, limit);

		const total = await db('comments')
			.where({ todo_id: parseInt(todoId) })
			.count('id');

		const payload = {
			limit,
			page,
			comments,
			total: parseInt(total[0].count)
		};

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, payload);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createComment,
	getComments
};
