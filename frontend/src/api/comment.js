import http from './http';

const createCommentAPI = data => {
	console.log(data);
	return http
		.post('/comment', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.catch(err => {
			console.dir(err);
		});
};

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
			console.dir(err);
		});

export { createCommentAPI, deleteCommentAPI };
