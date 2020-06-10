const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({});
	res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (req, res) => {
	if (!req.body.likes) {
		req.body.likes = 0;
	}
	const blog = new Blog(req.body);
	const result = await blog.save();

	res.status(201).json(result.toJSON());
});

module.exports = blogsRouter;
