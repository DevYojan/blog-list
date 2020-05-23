const config = require('./utils/config');
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');

mongoose.connect(config.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (req, res) => {
	Blog.find({}).then((blogs) => res.json(blogs));
});

app.post('/api/blogs', (req, res) => {
	const blog = new Blog(req.body);

	blog.save().then((result) => res.status(201).json(result));
});

module.exports = app;