const db = require('../config/connection');

const TodoRepository = {
	getTodoById: async todoId => {
		const todo = await db('todos').where('id', todoId).first();

		return todo;
	}
};
