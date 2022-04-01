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
}

export { createBoardAPI };