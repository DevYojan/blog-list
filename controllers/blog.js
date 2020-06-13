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
