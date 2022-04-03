import { useState } from 'react';
import UserContext from './UserContext';

function UserContextProvider({ children }) {
	const setLoggedUser = data => {
		setState(prevState => ({
			...prevState,
			loggedIn: true,
			loggedUser: data,
		}));
	};

	const clearLoggedUser = () => {
		setState(prevState => ({
			...prevState,
			loggedUser: {
				account: '',
				nickname: '',
				profileImage: '',
			},
			loggedIn: false,
		}));
	};

	const initialState = {
		loggedUser: {
			account: '',
			nickname: '',
			profileImage: '',
		},
		loggedIn: false,
		setLoggedUser,
		clearLoggedUser,
	};

	const [state, setState] = useState(initialState);

	return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
export default UserContextProvider;
