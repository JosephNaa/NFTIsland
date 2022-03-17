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
	useEffect(async () => {
		window.ethereum.on('accountsChanged', async () => {
			getAccounts();
		});
		getAccounts();
	}, []);

	return (
		<ThemeConfig>
			<GlobalStyles />
			<UserContext.Provider value={accounts}>
				<Router />
			</UserContext.Provider>
		</ThemeConfig>
	);
}
