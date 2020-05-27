const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	let sum = 0;

	for (blog of blogs) {
		sum += blog.likes;
		debugger;
	}

	return sum;
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return {};
	}

	const blogWithMaxLikes = blogs.reduce((prev, current) => {
		return prev.likes > current.likes ? prev : current;
	});

	return blogWithMaxLikes;
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return {};
	}

	let blogAuthors = {};

	for (blog of blogs) {
		if (!blogAuthors.hasOwnProperty(blog.author)) {
			blogAuthors[blog.author] = 1;

			continue;
		}

		blogAuthors[blog.author] += 1;
	}

	let authorWithMaxBlogs = {
		author: '',
		blogs: 0,
	};

	for (let [author, noOfBlogs] of Object.entries(blogAuthors)) {
		if (noOfBlogs > authorWithMaxBlogs.blogs) {
			authorWithMaxBlogs.author = author;
			authorWithMaxBlogs.blogs = noOfBlogs;
		}
	}

	return authorWithMaxBlogs;
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return {};
	}

	let blogAuthors = {};

	for (blog of blogs) {
		if (!blogAuthors.hasOwnProperty(blog.author)) {
			blogAuthors[blog.author] = blog.likes;
			continue;
		}

		blogAuthors[blog.author] += blog.likes;
	}

	let authorWithMaxLikes = {
		author: '',
		likes: 0,
	};

	for (let [author, noOfLikes] of Object.entries(blogAuthors)) {
		if (noOfLikes > authorWithMaxLikes.likes) {
			authorWithMaxLikes.author = author;
			authorWithMaxLikes.likes = noOfLikes;
		}
	}

	return authorWithMaxLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
