const db = require('../config/connection');

const CommentRepository = {
	insertComment: async (userId, todoId, text, projectId, teamId) => {
		return await db('comments')
			.insert({ user_id: userId, todo_id: todoId, text, project_id: projectId, team_id: teamId })
			.returning(['id', 'text']);
	},
	getComments: async (todoId, offset, limit) => {
		const query = db('comments').where({ todo_id: todoId }).select('id', 'text', 'created_at');

		if (offset) {
			query.offset(offset);
		}
		if (limit) {
			query.limit(limit);
		}

		return await query;
	}
};

module.exports = CommentRepository;
