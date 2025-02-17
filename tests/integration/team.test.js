const request = require('supertest');

const app = require('../../src/server/server.js');
const { BASE_PATH, USERS_PATH, TEAMS_PATH } = require('../../src/server/utils/enum/routes.js');

describe('Team', () => {
	test('Should create a new team', async () => {
		const user = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.LOGIN}`).send({
			email: 'luka@gmail.com',
			password: '12345678'
		});

		const token = user.body.data.token;

		const response = await request(app).post(`${BASE_PATH.TEAMS}${TEAMS_PATH.CREATE_TEAM}`).set('Authorization', `Bearer ${token}`).send({
			name: 'Team 1'
		});

		expect(response.statusCode).toBe(201);
	});

	test('Should get all teams', async () => {
		const user = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.LOGIN}`).send({
			email: 'luka@gmail.com',
			password: '12345678'
		});

		const token = user.body.data.token;

		const response = await request(app).get(`${BASE_PATH.TEAMS}${TEAMS_PATH.GET_TEAMS}`).set('Authorization', `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.data[0]).toHaveProperty('name');
		expect(response.body.data[0]).toHaveProperty('id');
		expect(response.body.data[0]).toHaveProperty('users');
	});
});
