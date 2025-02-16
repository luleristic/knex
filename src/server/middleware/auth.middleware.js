const jwt = require('jsonwebtoken');
const db = require('../../data/config/connection');

const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApplicationError = require('../utils/express/error');

const JWT_SECRET = process.env.JWT_SECRET;

const authorize = async (req, _res, next) => {
	try {
		let token = '';

		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1];

			const decoded = jwt.verify(token, JWT_SECRET);

			const { id } = decoded;

			const user = await db('users').where({ id }).first();
			if (!user) {
				throw new ApplicationError(HttpStatusCode.UNAUTHORIZED, HttpStatusMessage.INVALID_TOKEN);
			}

			const team = await db('teams').where({ id: user.team_id }).first();
			if (!team) {
				throw new ApplicationError(HttpStatusCode.UNAUTHORIZED, HttpStatusMessage.INVALID_TOKEN);
			}

			req.user = user;
			req.team = team;

			next();
		}

		if (!token) {
			throw new ApplicationError(HttpStatusCode.UNAUTHORIZED, HttpStatusMessage.INVALID_TOKEN);
		}
	} catch (error) {
		next(error);
	}
};

module.exports = authorize;
