const Blog = require('../models/blog');

const initialBlog = [
	{
		title: 'Final Refactor',
		author: 'DevYojan',
		url: 'https://yojanregmi.com.np',
		likes: 0,
	},
	{
		title: 'Forst Refactor',
		author: 'DevYojan',
		url: 'https://yojanregmi.com.np',
		likes: 0,
	},
	{
		title: 'Second Refactor',
		author: 'DevYojan',
		url: 'https://yojanregmi.com.np',
		likes: 0,
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlog, blogsInDb };
