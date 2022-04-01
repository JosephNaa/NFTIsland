import { createContext } from 'react';

export default createContext({
	account: '',
	nickname: '',
	profileImage: '',
	setAccount: () => {},
	setNickname: () => {},
	setProfileImage: () => {},
});
