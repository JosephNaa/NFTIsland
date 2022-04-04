import { createContext } from 'react';

export default createContext({
	loggedUser: {
		account: '',
		nickname: '',
		profileImage: '',
	},
	loggedIn: false,
	setLoggedUser: () => {},
	clearLoggedUser: () => {},
});
