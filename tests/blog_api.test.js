const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper.js');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
	jest.useFakeTimers();	
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlog.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());

	await Promise.all(promiseArray);
});

describe('when there are blog posts initially', () => {
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
});

describe('creating a new blog post', () => {
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

	test('if title and url are missing response is 400', async () => {
		const withoutTitle = {
			author: 'DevYojan',
			url: 'https://yojanregmi.com.np',
		};

		const response = await api
			.post('/api/blogs')
			.send(withoutTitle)
			.expect(400);

		const withoutAuthor = {
			title: 'With Title but without author',
		};

		await api.post('/api/blogs').send(withoutAuthor).expect(400);
	});
});

describe('deleting a blog post', () => {
	test('successfully deletes if id is valid', async () => {
		const postsBeforeDelete = await helper.blogsInDb();
		const postToDelete = postsBeforeDelete[0];

		await api.delete(`/api/blogs/${postToDelete.id}`).expect(204);

		const postsAfterDelete = await helper.blogsInDb();
		expect(postsAfterDelete).toHaveLength(postsBeforeDelete.length - 1);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
