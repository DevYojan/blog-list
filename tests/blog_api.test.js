const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper.js');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlog.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());

	await Promise.all(promiseArray);
});

test('correct amount of blog posts are returned', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);

	expect(response.body).toHaveLength(helper.initialBlog.length);
});

afterAll(() => {
	mongoose.connection.close();
});
