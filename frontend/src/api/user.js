import http from './http';

const getUserInfoAPI = (findBy, search) =>
	http
		.get('/users/info', {
			params: {
				find_by: findBy,
				search,
			},
		})
		.catch(err => {
			console.dir(err);
		});

export { getUserInfoAPI };
