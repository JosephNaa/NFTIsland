/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useMemo, useState } from 'react';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import UserContext from './context/UserContext';

export default function App() {
	const [accounts, setAccounts] = useState('');

	const getAccounts = async () => {
		const userAccounts = await window.ethereum.request({
			method: 'eth_accounts',
		});
		if (userAccounts[0]) {
			setAccounts(userAccounts[0]);
		} else {
			setAccounts('');
		}
	};

	const setUserAccounts = accounts => {
		setAccounts(accounts);
	};

	useEffect(async () => {
		window.ethereum.on('accountsChanged', async () => {
			getAccounts();
		});
		getAccounts();
	}, []);

	const userContext = useMemo(() => ({ accounts, setUserAccounts }), [accounts]);

	return (
		<ThemeConfig>
			<GlobalStyles />
			<UserContext.Provider value={userContext}>
				<Router />
			</UserContext.Provider>
		</ThemeConfig>
	);
}
