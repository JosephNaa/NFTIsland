import { createContext } from 'react';

export default createContext({
	account: '',
	nickname: '',
	profileImage: '',
	setLoggedUser: () => {},
	clearLoggedUser: () => {},
});
