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
	const blogWithMaxLikes = blogs.reduce((prev, current) => {
		return prev.likes > current.likes ? prev : current;
	});

	return blogWithMaxLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog };
