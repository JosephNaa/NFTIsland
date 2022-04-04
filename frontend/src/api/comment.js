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


const deleteCommentAPI = data => {
    console.log(data);
    return http
        .delete(
            `/comment/${data.commentId}`,
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


export { createCommentAPI, deleteCommentAPI };
