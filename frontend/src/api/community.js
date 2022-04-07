import http from './http';

const createCommunityAPI = data =>
	http
		.post('/community', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.catch(err => {
			console.dir(err);
		});

const getCommunityListAPI = (search, page, size, key) => {
	let sortBy;
	switch (key) {
		case 'member':
			sortBy = '/member-sort';
			break;
		case 'board':
			sortBy = '/board-sort';
			break;
		default:
			sortBy = '/';
			break;
	}
	return http
		.get(`/community${sortBy}`, {
			params: {
				page,
				size,
				search,
			},
		})
		.catch(err => {
			console.dir(err);
		});
};

export { createCommunityAPI, getCommunityListAPI };
