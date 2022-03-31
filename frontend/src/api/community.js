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

export { createCommunityAPI };
