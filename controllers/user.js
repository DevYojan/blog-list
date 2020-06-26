const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
	const users = await User.find({});

	return response.json(users.map((user) => user));
});

userRouter.post('/', async (request, response) => {
	const body = request.body;

	const checkUser = User.findOne({ username: body.username }, async function (
		err,
		user
	) {
		if (user) {
			return response.json({ message: 'username already taken' });
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(body.password, saltRounds);

		const newUser = new User({
			username: body.username,
			name: body.name,
			password: passwordHash,
		});

		const savedUser = await newUser.save();

		return response.json(savedUser);
	});
});

module.exports = userRouter;
