/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useContext } from 'react';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import UserContext from './context/UserContext';
import { getUserAPI } from './api/auth';

export default function App() {
	const userContext = useContext(UserContext);

	// 유저 정보 받아오기
	const getUserInfo = async () => {
		try {
			const userAccount = await window.ethereum.request({
				method: 'eth_accounts',
			});
			// 메타마스크에 로그인이 되어있는 경우
			if (userAccount[0]) {
				const { data } = await getUserAPI(userAccount[0]);
				userContext.setLoggedUser({
					account: data.address,
					nickname: data.nickname,
					profileImage: data.profile_path,
				});
			}
			// 메타마스크 로그인이 되어있지않은 경우
			else {
				userContext.clearLoggedUser();
			}
		} catch (error) {
			console.dir(error);
		}
	};

	useEffect(async () => {
		window.ethereum.on('accountsChanged', async () => {
			getUserInfo();
		});
		getUserInfo();
	}, []);

	return (
		<ThemeConfig>
			<GlobalStyles />
			<Router />
		</ThemeConfig>
	);
}
