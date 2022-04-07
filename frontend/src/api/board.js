import http from './http';

const createBoardAPI = data =>
	http
		.post('/board', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.catch(err => {
			console.dir(err);
		});

const getBoardsAPI = (communityId, search = '') =>
	http.get(`/community/${communityId}?search=${search}`).catch(err => {
		console.dir(err);
	});

const editBoardAPI = (postId, data) =>
	http.put(`/board/${postId}`, data).catch(err => {
		if (err.response.status === 409) {
			alert('권한이 없습니다.');
		}
		console.dir(err);
	});

const deleteBoardAPI = data =>
	http
		.delete(
			`/board/${data.postId}`,
			{
				data: { user_address: data.user_address, community_id: data.communityId },
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.catch(err => {
			if (err.response.status === 409) {
				alert('권한이 없습니다.');
			}
			console.dir(err.response);
		});

const getBoardAPI = boardId =>
	http.get(`/board/${boardId}`).catch(err => {
		console.dir(err);
	});

const createLikeAPI = data =>
	http
		.post('/likes', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.catch(err => {
			if (err.response.status === 409) {
				alert('권한이 없습니다.');
			}
			console.dir(err);
		});

const deleteLikeAPI = data =>
	http
		.delete(
			'/likes',
			{
				data: {
					board_id: data.board_id,
					user_address: data.user_address,
					community_id: data.community_id,
				},
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.catch(err => {
			if (err.response.status === 409) {
				alert('권한이 없습니다.');
			}
			console.dir(err);
		});

export {
	createBoardAPI,
	getBoardsAPI,
	deleteBoardAPI,
	getBoardAPI,
	editBoardAPI,
	createLikeAPI,
	deleteLikeAPI,
};
