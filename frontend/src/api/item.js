import http from './http';

const getImageURL = data =>
	http.post('/items/image', data).catch(err => {
		console.dir(err);
	});

const saveItemInfo = data =>
	http
		.post('/items', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.catch(err => {
			console.dir(err);
		});

const getItemInfo = itemId =>
	http.get(`/items/${itemId}`).catch(err => {
		console.log(err);
	});

const getMyOwnItemByNickname = (userNickname, page = 1, size = 30) =>
	http
		.get(
			`items?find_by=nickname&search=${userNickname}&on_sale_yn=false&page=${page}&size=${size}`
		)
		.catch(err => {
			console.dir(err);
		});

const saveSaleInfo = data =>
	http
		.post('/sales', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.catch(err => {
			console.dir(err);
		});

export {
	getImageURL,
	saveItemInfo,
	getMyOwnItemByNickname,
	getItemInfo,
	saveSaleInfo,
};
