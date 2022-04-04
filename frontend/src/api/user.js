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

const getUserCommunityListAPI = (findBy, search, onSaleYn, page, size) =>
	http
		.get('/mypage/community', {
			params: {
				find_by: findBy,
				search,
				on_sale_yn: onSaleYn,
				page,
				size,
			},
		})
		.catch(err => {
			console.dir(err);
		});

export { getUserInfoAPI, getUserCommunityListAPI };
