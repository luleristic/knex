const db = require('../config/connection');

const UserRepository = {
	getUserByField: async (field, value) => {
		return await db('users').where(field, value).first();
	}
};

module.exports = UserRepository;
