const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
	return res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (req, res) => {
	if (!req.body.likes) {
		req.body.likes = 0;
	}

	if (!req.body.title || !req.body.url) {
		return res.status(400).end();
	}

	const users = await User.find({});

	const blog = new Blog({
		user: users[0]._id,
		title: req.body.title,
		url: req.body.url,
		author: req.body.author,
		likes: req.body.likes,
	});
	const savedBlog = await blog.save();
	users[0].blogs = users[0].blogs.concat(savedBlog._id);
	await users[0].save();

	return res.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body;

	const blog = {
		likes: req.body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
		new: true,
	});

	res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
