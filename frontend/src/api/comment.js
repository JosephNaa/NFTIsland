import http from './http';

const createCommentAPI = data =>
	http
		.post('/comment', data, {
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

const deleteCommentAPI = data =>
	http
		.delete(
			`/comment/${data.commentId}`,
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
			console.dir(err);
		});

export { createCommentAPI, deleteCommentAPI };
