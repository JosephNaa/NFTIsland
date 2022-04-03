import http from './http';

const getImageURL = data =>
	http.post('/items/image', data).catch(err => {
		console.dir(err);
	});

const saveNFTInfo = data =>
	http
		.post('/items', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.catch(err => {
			console.dir(err);
		});

export { getImageURL, saveNFTInfo };
