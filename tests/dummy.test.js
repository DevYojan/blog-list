const listHelper = require('../utils/list_helper');

describe('dummy', () => {
	test('returns 1', () => {
		const blogs = [];
		expect(listHelper.dummy(blogs)).toBe(1);
	});
});
