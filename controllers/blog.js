const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { response, request } = require('express');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (req, res) => {
  console.log(req.token);
  if (req.token === null || req.token === '') {
    return res.status(401).json({ error: 'token must be provided' });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET);
  } catch (err) {
    return res.status(401).json({ err: 'token malformed' });
  }

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  if (!req.body.likes) {
    req.body.likes = 0;
  }

  if (!req.body.title || !req.body.url) {
    return res.status(400).end();
  }

  const user = await User.findById(decodedToken.id);
  console.log(user);

  const blog = new Blog({
    user: user,
    title: req.body.title,
    url: req.body.url,
    author: req.body.author,
    likes: 0,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return res.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
  if (req.token === null) {
    return res.status(401).json({ err: 'Token must be provided' });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET);
  } catch (err) {
    return res.status(401).json({ err: 'malformed token or token missing' });
  }

  const blog = await Blog.findById(req.params.id);

  if (blog === null) {
    return res.json({ err: 'The blog you are trying to delete doesnt exist' });
  }

  if (!(decodedToken.id.toString() === blog.user.toString())) {
    return res.status(501).json({ err: 'unauthorized access' });
  }

  await blog.remove();

  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  let blog = await Blog.findById(req.params.id);

  if (blog === null) {
    return res.json({ err: 'The blog you are trying to like doesnt exist' });
  }

  blog = {
    likes: blog.likes + 1,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });

  res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
