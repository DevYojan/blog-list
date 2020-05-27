const listHelper = require('../utils/list_helper');

describe('dummy', () => {
	test('returns 1', () => {
		const blogs = [];
		expect(listHelper.dummy(blogs)).toBe(1);
	});
});

describe('total Likes', () => {
	test('of empty list is 0', () => {
		const blogs = [];

		expect(listHelper.totalLikes(blogs)).toBe(0);
	});

	test('when list has only one blog equals the like of that', () => {
		const blogs = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url:
					'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0,
			},
		];

		expect(listHelper.totalLikes(blogs)).toBe(5);
	});

	test('of a bigger list is calculated right', () => {
		const blogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0,
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url:
					'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0,
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0,
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url:
					'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0,
			},
			{
				_id: '5a422ba71b54a676234d17fb',
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url:
					'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
				likes: 0,
				__v: 0,
			},
			{
				_id: '5a422bc61b54a676234d17fc',
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
				__v: 0,
			},
		];

		expect(listHelper.totalLikes(blogs)).toBe(36);
	});
});

describe('favorite Blog', () => {
	test('returns a empty object if the blog array is empty', () => {
		const blogs = [];
		expect(listHelper.favoriteBlog(blogs)).toEqual({});
	});

	test('is a single blog if a single blog is passed', () => {
		const blogs = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url:
					'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0,
			},
		];
		const result = listHelper.favoriteBlog(blogs);

		expect(result).toEqual(blogs[0]);
	});

	test('returns a blog with highest likes if passed many blogs.', () => {
		const blogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0,
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url:
					'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0,
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0,
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0,
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url:
					'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0,
			},
			{
				_id: '5a422ba71b54a676234d17fb',
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url:
					'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
				likes: 0,
				__v: 0,
			},
			{
				_id: '5a422bc61b54a676234d17fc',
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
				__v: 0,
			},
		];

		const result = listHelper.favoriteBlog(blogs);

		expect(result).toEqual(blogs[2]);
	});
});

describe('Author with highest number of blogs', () => {
	test('is empty object if blog array is empty', () => {
		const blogs = [];
		expect(listHelper.mostBlogs(blogs)).toEqual({});
	});

	test('if there is only a single blog a single author with a number 1', () => {
		const blogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0,
			},
		];

		const result = listHelper.mostBlogs(blogs);
		expect(result).toEqual({
			author: 'Michael Chan',
			blogs: 1,
		});
	});

	test('gives correct result if many blogs are passed', () => {
		const blogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0,
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url:
					'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0,
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0,
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url:
					'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0,
			},
			{
				_id: '5a422ba71b54a676234d17fb',
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url:
					'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
				likes: 0,
				__v: 0,
			},
			{
				_id: '5a422bc61b54a676234d17fc',
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
				__v: 0,
			},
		];

		expect(listHelper.mostBlogs(blogs)).toEqual({
			author: 'Robert C. Martin',
			blogs: 3,
		});
	});
});
