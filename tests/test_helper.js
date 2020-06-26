const Blog = require('../models/blog');
const User = require('../models/user');

const initialUser = [
	{
		username: 'yojan',
		name: 'Yojan Regmi',
		password: 'password',
	},
	{
		username: 'nabin',
		name: 'Nabin Bhattarai',
		password: '123',
	},
	{
		username: 'roshan',
		name: 'Roshan rijan',
		password: '343',
	},
];

const initialBlog = [
	{
		title: 'Final Refactor',
		author: 'DevYojan',
		url: 'https://yojanregmi.com.np',
		likes: 0,
	},
	{
		title: 'Forst Refactor',
		author: 'DevYojan',
		url: 'https://yojanregmi.com.np',
		likes: 0,
	},
	{
		title: 'Second Refactor',
		author: 'DevYojan',
		url: 'https://yojanregmi.com.np',
		likes: 0,
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = { initialBlog, initialUser, blogsInDb, usersInDb };
