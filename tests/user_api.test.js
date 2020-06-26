const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const helper = require('./test_helper');

const User = require('../models/user');

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

	//TODO fails if username is shorter then 3 characters
	//TODO fails if password is shorter then 3 characters
	//TODO fails if username is not provided
	//TODO fails if password is not provided
});

afterAll(() => {
	mongoose.connection.close();
});
