const request = require('supertest');

const app = require('../../src/server/server.js');
const { BASE_PATH, USERS_PATH } = require('../../src/server/utils/enum/routes.js');

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

	test('Should not register a user with the same email', async () => {
		const response = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.REGISTER}`).send({
			name: 'John Doe',
			email: 'luka2@gmail.com',
			password: '12345678',
			password2: '12345678'
		});

		const response2 = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.REGISTER}`).send({
			name: 'John Doe',
			email: 'luka2@gmail.com',
			password: '12345678',
			password2: '12345678'
		});

		expect(response.statusCode).toBe(201);
		expect(response2.statusCode).toBe(409);
	});

	test('Should login a user', async () => {
		const response = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.LOGIN}`).send({
			email: 'luka@gmail.com',
			password: '12345678'
		});

		expect(response.statusCode).toBe(200);
		expect(response.body.data).toHaveProperty('token');
	});

	test('Should not login a user that doesent exist', async () => {
		const response = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.LOGIN}`).send({
			email: 'lukaaaaa@gmail.com',
			password: '12345dasasdasd678'
		});

		expect(response.statusCode).toBe(404);
	});

	test('Should not login a user with a mistaken password', async () => {
		const response = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.LOGIN}`).send({
			email: 'luka@gmail.com',
			password: '12345dasasdasd678'
		});

		expect(response.statusCode).toBe(401);
	});

	test('Should return a user', async () => {
		const user = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.LOGIN}`).send({
			email: 'luka@gmail.com',
			password: '12345678'
		});

		const token = user.body.data.token;

		const response = await request(app)
			.get(`${BASE_PATH.USERS}${USERS_PATH.ME}`)
			.set('Authorization', 'Bearer ' + token);

		expect(response.statusCode).toBe(200);

		expect(response.body.data).toHaveProperty('id');
		expect(response.body.data).toHaveProperty('name');
		expect(response.body.data).toHaveProperty('email');
	});

	test('Should update a user', async () => {
		const user = await request(app).post(`${BASE_PATH.USERS}${USERS_PATH.LOGIN}`).send({
			email: 'luka@gmail.com',
			password: '12345678'
		});

		const token = user.body.data.token;

		const response = await request(app)
			.patch(`${BASE_PATH.USERS}${USERS_PATH.ME}`)
			.set('Authorization', 'Bearer ' + token)
			.send({
				name: 'John Doe'
			});

		expect(response.statusCode).toBe(200);
	});
});
