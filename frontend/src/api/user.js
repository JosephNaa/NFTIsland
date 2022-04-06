import http from './http';

const getUserInfoAPI = (findBy, search) =>
	http
		.get('/users/info', {
			params: {
				find_by: findBy,
				search,
			},
		})
		.catch(err => {
			console.dir(err);
		});

const getUserCommunityListAPI = (findBy, search, onSaleYn, page, size) =>
	http
		.get('/mypage/community', {
			params: {
				find_by: findBy,
				search,
				on_sale_yn: onSaleYn,
				page,
				size,
			},
		})
		.catch(err => {
			console.dir(err);
		});

const getUserActivityListAPI = (findBy, search, page, size, communityId) =>
	http.get('/mypage/activity', {
		params: {
			find_by: findBy,
			search,
			page,
			size,
			community_id: communityId,
		},
	});

const getUserMasterListAPI = (findBy, search, page, size) =>
	http
		.get('/mypage/community/master', {
			params: {
				find_by: findBy,
				search,
				page,
				size,
			},
		})
		.catch(err => {
			console.dir(err);
		});

const setUserNickNameAPI = (address, nickName) =>
	http.put(`/mypage/usernickname/${address}`, {
		nickname: nickName,
	});

const setUserProfileImageAPI = (address, data) =>
	http.put(`/mypage/multipart/${address}`, data);

export {
	getUserInfoAPI,
	getUserCommunityListAPI,
	getUserActivityListAPI,
	getUserMasterListAPI,
	setUserNickNameAPI,
	setUserProfileImageAPI,
};
