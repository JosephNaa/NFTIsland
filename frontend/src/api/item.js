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
		console.dir(err);
	});

const getMyOwnItemByNickname = (
	findBy,
	userNickname,
	onSaleYn,
	page,
	size,
	communityId
) =>
	http
		.get(`/items`, {
			params: {
				find_by: findBy,
				search: userNickname,
				on_sale_yn: onSaleYn,
				page,
				size,
				community_id: communityId,
			},
		})
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

const getHasItem = data =>
	http
		.get(
			`/items/hasItem?address=${data.address}&community_id=${data.community_id}`
		)
		.catch(err => {
			console.dir(err);
		});

const transferItem = (tokenId, fromAddress, toAddress) =>
	http
		.put(`/items/${tokenId}`, {
			tokenId,
			from_address: fromAddress,
			to_address: toAddress,
		})
		.catch(err => {
			console.dir(err);
		});

export {
	getImageURL,
	saveItemInfo,
	getMyOwnItemByNickname,
	getItemInfo,
	getHasItem,
	saveSaleInfo,
	transferItem,
};
