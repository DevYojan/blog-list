const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper.js');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
	jest.useFakeTimers();
	await Blog.deleteMany({});
	await User.deleteMany({});

	const newUser = {
		username: 'admin',
		password: 'admin',
	};

	const newUser1 = {
		username: 'user',
		password: 'user',
	};

	const savedUser = await api.post('/api/users').send(newUser).expect(201);
	await api.post('/api/users').send(newUser1).expect(201);

	const blogObjects = helper.initialBlog.map((blog) => {
		blog.user = savedUser.body.id;
		return new Blog(blog);
	});

	const promiseArray = blogObjects.map((blog) => {
		return blog.save();
	});

	await Promise.all(promiseArray);
	// const blogs = await Blog.find({});
	// console.log(blogs);
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
	test('fails with status code 401 if token is not provided', async () => {
		const newBlog = {
			title: 'without token',
			author: 'tester',
			url: 'https://aasdf/',
			likes: 0,
		};

		const initialBlogs = await helper.blogsInDb();

		await api.post('/api/blogs').send(newBlog).expect(401);

		const blogsAfterPost = await helper.blogsInDb();

		expect(blogsAfterPost).toHaveLength(initialBlogs.length);
	});

	test('making a post request with authorized token creates a new blog post', async () => {
		const newBlog = {
			title: 'Created By Post',
			author: 'DevYojan',
			url: 'https://yojanregmi.com.np',
			likes: 0,
		};

		const loginResponse = await api
			.post('/api/login')
			.send({ username: 'admin', password: 'admin' });

		const userToken = loginResponse.body.token;

		await api
			.post('/api/blogs')
			.set('authorization', `Bearer ${userToken}`)
			.send(newBlog)
			.expect(201);

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

		const loginResponse = await api
			.post('/api/login')
			.send({ username: 'admin', password: 'admin' });

		const userToken = loginResponse.body.token;

		const response = await api
			.post('/api/blogs')
			.set('authorization', `Bearer ${userToken}`)
			.send(testBlog)
			.expect(201);
		expect(response.body.likes).toBe(0);
	});

	test('if title and url are missing response is 400', async () => {
		const withoutTitle = {
			author: 'DevYojan',
			url: 'https://yojanregmi.com.np',
		};

		const loginResponse = await api
			.post('/api/login')
			.send({ username: 'admin', password: 'admin' });

		const userToken = loginResponse.body.token;

		const response = await api
			.post('/api/blogs')
			.set('authorization', `Bearer ${userToken}`)
			.send(withoutTitle)
			.expect(400);

		const withoutAuthor = {
			title: 'With Title but without author',
		};

		await api
			.post('/api/blogs')
			.set('authorization', `Bearer ${userToken}`)
			.send(withoutAuthor)
			.expect(400);
	});
});

describe('deleting a blog post', () => {
	test('fails if user is not the creator of the blog', async () => {
		const postsBeforeDelete = await helper.blogsInDb();
		const postToDelete = postsBeforeDelete[0];

		const loginResponse = await api
			.post('/api/login')
			.send({ username: 'user', password: 'user' });

		const token = loginResponse.body.token;

		await api
			.delete(`/api/blogs/${postToDelete.id}`)
			.set('authorization', `Bearer ${token}`)
			.expect(501);

		const postsAfterDelete = await helper.blogsInDb();
		expect(postsAfterDelete).toHaveLength(postsBeforeDelete.length);
	});

	//TODO succeeds when the user is the creator of the blog post
	test('succeeds when user is the creator of the blog', async () => {
		const postsBeforeDelete = await helper.blogsInDb();
		const postToDelete = postsBeforeDelete[0];

		const loginResponse = await api
			.post('/api/login')
			.send({ username: 'admin', password: 'admin' });

		const token = loginResponse.body.token;

		await api
			.delete(`/api/blogs/${postToDelete.id}`)
			.set('authorization', `Bearer ${token}`)
			.expect(204);

		const postsAfterDelete = await helper.blogsInDb();
		expect(postsAfterDelete).toHaveLength(postsBeforeDelete.length - 1);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
