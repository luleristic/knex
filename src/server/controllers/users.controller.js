const db = require('../../data/config/connection');
const bcrypt = require('bcrypt');

const { HttpStatusCode, HttpStatusMessage } = require('../utils/enum/express');
const ApplicationError = require('../utils/express/error');
const ApiResponse = require('../utils/express/response');

const { generateToken } = require('../services/auth.service');

const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		const userExists = await db('users').where({ email }).first();

		if (userExists) {
			throw new ApplicationError(HttpStatusCode.CONFLICT, HttpStatusMessage.CONFLICT);
		}

		await db.transaction(async trx => {
			const team = await trx('teams')
				.insert({ name: `${name}'s Team` })
				.returning('id');
			const teamId = team[0].id;

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			const user = await trx('users')
				.insert({
					team_id: teamId,
					name,
					email,
					password: hashedPassword
				})
				.returning('name email');

			ApiResponse.send(res, HttpStatusCode.CREATED, HttpStatusMessage.CREATED, user);
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const userExists = await db('users').where({ email }).first();

		if (!userExists) {
			throw new ApplicationError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.USER_NOT_FOUND);
		}

		const isMatch = await bcrypt.compare(password, userExists.password);

		if (!isMatch) {
			throw new ApplicationError(HttpStatusCode.UNAUTHORIZED, HttpStatusMessage.UNAUTHORIZED);
		}

		// Generate token
		const token = generateToken(userExists.id);

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, { token });
	} catch (error) {
		next(error);
	}
};

const getMe = async (req, res, next) => {
	try {
		const user = req.user;

		const payload = {
			id: user.id,
			name: user.name,
			email: user.email
		};

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK, payload);
	} catch (error) {
		next(error);
	}
};

const updateMe = async (req, res, next) => {
	try {
		const user = req.user;
		const { name } = req.body;

		await db('users').where({ id: user.id }).update({ name });

		ApiResponse.send(res, HttpStatusCode.OK, HttpStatusMessage.OK);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	register,
	login,
	getMe,
	updateMe
};
