import http from './http';

const createBoardAPI = data => {
	console.log(data);
	return http
		.post('/board', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.catch(err => {
			console.dir(err);
		});
};

const getBoardsAPI = communityId =>
	http.get(`/community/${communityId}`).catch(err => {
		console.dir(err);
	});

const deleteBoardAPI = data => {
	console.log(data);
	return http
		.delete(
			`/board/${data.postId}`,
			{ data: { user_address: data.user_address } },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.catch(err => {
			console.dir(err);
		});
};

const getBoardAPI = boardId =>
	http.get(`/board/${boardId}`).catch(err => {
		console.dir(err);
	});

export { createBoardAPI, getBoardsAPI, deleteBoardAPI, getBoardAPI };
