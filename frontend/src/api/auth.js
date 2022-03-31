import http from './http';

const getUserAPI = address =>
	http
		.post('/users/address', {
			address,
		})
		.catch(err => {
			console.dir(err);
		});

export { getUserAPI };
