import http from './http';

const getSalesCommunity = () =>
	http.get('/sales/community').catch(err => {
		console.dir(err);
	});

const getSalesItem = communityId =>
	http.get(`/sales/community/${communityId}`).catch(err => {
		console.dir(err);
	});

const getItemSaleInfo = saleCA =>
	http.get(`/sales/info/${saleCA}`).catch(err => {
		console.dir(err);
	});

const buyItem = data =>
	http
		.put(`/sales/info/${data.saleCA}`, { buyer_address: data.address })
		.catch(err => {
			console.dir(err);
		});

const getMintItemsCnt = communityId =>
	http.get(`/sales/community/${communityId}/count/items`).catch(err => {
		console.dir(err);
	});

const getOwnedItemCnt = communityId =>
	http.get(`/sales/community/${communityId}/count/owners`).catch(err => {
		console.dir(err);
	});

const getTotalTraded = communityId =>
	http.get(`/sales/community/${communityId}/count/traded`).catch(err => {
		console.dir(err);
	});

const getSaleCA = tokenId =>
	http.get(`/sales/item/${tokenId}`).catch(err => {
		console.dir(err);
	});

const cancelSale = (saleCA, address) =>
	http.post(`/sales/info/${saleCA}`, { sellerAddress: address }).catch(err => {
		console.dir(err);
	});

export {
	getSalesCommunity,
	getSalesItem,
	getItemSaleInfo,
	buyItem,
	getMintItemsCnt,
	getOwnedItemCnt,
	getTotalTraded,
	getSaleCA,
	cancelSale,
};
