const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(process.env.MONGODB_URI, {
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

app.listen(process.env.PORT, () => {
	console.log('App started at port 3000');
});
