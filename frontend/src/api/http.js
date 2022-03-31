import axios from 'axios';

const BASE_URL = 'https://j6d107.p.ssafy.io/api/v1';

const instance = axios.create({
	baseURL: BASE_URL,
});

export default instance;
