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

test('unique identifier property of the blog posts is id', async () => {
	const response = await api.get('/api/blogs');

	response.body.map((blog) => {
		expect(blog.id).toBeDefined();
	});
});

test('making a post request creates a new blog post', async () => {
	const newBlog = {
		title: 'Created By Post',
		author: 'DevYojan',
		url: 'https://yojanregmi.com.np',
		likes: 0,
	};

	await api.post('/api/blogs').send(newBlog).expect(201);

	const blogsInDb = await helper.blogsInDb();
	expect(blogsInDb).toHaveLength(helper.initialBlog.length + 1);

	const contents = blogsInDb.map((blog) => blog.title);
	expect(contents).toContain(newBlog.title);
});

test('if like property is missing it is defaulted to 0', async () => {
	const testBlog = {
		title: 'Created By Test Post',
		author: 'DevYojan',
		url: 'https://yojanregmi.com.np',
	};

	const response = await api.post('/api/blogs').send(testBlog).expect(201);
	expect(response.body.likes).toBe(0);
});

afterAll(() => {
	mongoose.connection.close();
});
