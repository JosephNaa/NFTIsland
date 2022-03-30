/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useMemo, useState } from 'react';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import UserContext from './context/UserContext';

export default function App() {
	const [account, setAccount] = useState('');

	const getAccount = async () => {
		const userAccount = await window.ethereum.request({
			method: 'eth_accounts',
		});
		if (userAccount[0]) {
			setAccount(userAccount[0]);
		} else {
			setAccount('');
		}
	};

	const setUserAccount = account => {
		setAccount(account);
	};

	useEffect(async () => {
		window.ethereum.on('accountsChanged', async () => {
			getAccount();
		});
		getAccount();
	}, []);

	const userContext = useMemo(() => ({ account, setUserAccount }), [account]);

	return (
		<ThemeConfig>
			<GlobalStyles />
			<UserContext.Provider value={userContext}>
				<Router />
			</UserContext.Provider>
		</ThemeConfig>
	);
}
