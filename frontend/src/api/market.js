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

export { getSalesCommunity, getSalesItem, getItemSaleInfo };
