const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const helper = require('./test_helper');

const User = require('../models/user');
const { usersInDb } = require('./test_helper');

beforeEach(async () => {
	await User.deleteMany({});

	const userObjects = helper.initialUser.map((user) => new User(user));
	const promiseArray = userObjects.map((user) => user.save());

	await Promise.all(promiseArray);
});

describe('creating a new user', () => {
	test('succeeds if username and password are provided and are at least 3 characters long', async () => {
		const usersBefore = await helper.usersInDb();

		const newUser = {
			username: 'programmer',
			name: 'Programmer Regmi',
			password: 'hackerman',
		};

		const response = await api.post('/api/users').send(newUser).expect(201);
		expect(response.body.username).toBe(newUser.username);

		const usersAfter = await helper.usersInDb();

		expect(usersAfter).toHaveLength(usersBefore.length + 1);
	});

	test('fails with proper error message if username is shorter then 3 characters', async () => {
		const usersBefore = await helper.usersInDb();

		const newUser = {
			username: 'pa',
			name: 'Programmer Regmi',
			password: 'hackerman',
		};

		const result = await api.post('/api/users').send(newUser).expect(400);

		expect(result.body.message).toContain(
			'username must be at least 3 characters long'
		);

		const usersAfter = await helper.usersInDb();
		expect(usersAfter).toHaveLength(usersBefore.length);
	});

	test('fails with proper error message if password is shorter then 3 characters', async () => {
		const usersBefore = await helper.usersInDb();

		const newUser = {
			username: 'hackerman',
			name: 'Programmer Regmi',
			password: 'h',
		};

		const result = await api.post('/api/users').send(newUser).expect(400);

		expect(result.body.message).toContain(
			'password must be at least 3 characters long'
		);

		const usersAfter = await helper.usersInDb();
		expect(usersAfter).toHaveLength(usersBefore.length);
	});

	test('fails with proper error message if username is not provided', async () => {
		const usersBefore = await helper.usersInDb();

		const newUser = {
			name: 'Programmer Regmi',
			password: 'hackerman',
		};

		const result = await api.post('/api/users').send(newUser).expect(400);

		expect(result.body.message).toContain('username and password are required');

		const usersAfter = await helper.usersInDb();
		expect(usersAfter).toHaveLength(usersBefore.length);
	});

	test('fails with proper error message if password is not provided', async () => {
		const usersBefore = await helper.usersInDb();

		const newUser = {
			username: 'hackerman',
			name: 'Programmer Regmi',
		};

		const result = await api.post('/api/users').send(newUser).expect(400);

		expect(result.body.message).toContain('username and password are required');

		const usersAfter = await helper.usersInDb();
		expect(usersAfter).toHaveLength(usersBefore.length);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
