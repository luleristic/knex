const request = require('supertest');

const app = require('../../src/server/server.js');
const { BASE_PATH, USERS_PATH } = require('../../src/server/utils/enum/routes');

describe('User Authentication', () => {
	test('Should register a new user', async () => {
		const response = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.REGISTER}`).send({
			name: 'John Doe',
			email: 'luka@gmail.com',
			password: '12345678',
			password2: '12345678'
		});

		expect(response.statusCode).toBe(201);
		expect(response.body.data[0]).toHaveProperty('name');
		expect(response.body.data[0]).toHaveProperty('email');
	});
});
