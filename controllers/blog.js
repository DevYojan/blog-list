const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({});
	return res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (req, res) => {
	if (!req.body.likes) {
		req.body.likes = 0;
	}

	if (!req.body.title || !req.body.url) {
		return res.status(400).end();
	}

	const blog = new Blog(req.body);
	const result = await blog.save();

	return res.status(201).json(result.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

module.exports = blogsRouter;
