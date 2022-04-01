/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useMemo, useState } from 'react';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import UserContext from './context/UserContext';
import { getUserAPI } from './api/auth';

export default function App() {
	const [account, setAccount] = useState('');
	const [nickname, setNickname] = useState('');
	const [profileImage, setProfileImage] = useState('');

	// 유저 정보 받아오기
	const getUserInfo = async () => {
		try {
			const userAccount = await window.ethereum.request({
				method: 'eth_accounts',
			});
			// 메타마스크에 로그인이 되어있는 경우
			if (userAccount[0]) {
				const { data } = await getUserAPI(userAccount[0]);
				userContext.setUserInfo(data.address, data.nickname, data.profile_path);
			}
			// 메타마스크 로그인이 되어있지않은 경우
			else {
				clearUserInfo();
			}
		} catch (error) {
			console.dir(error);
		}
	};

	const setUserInfo = (account, nickname, profileImage) => {
		setAccount(account);
		setNickname(nickname);
		setProfileImage(profileImage);
	};
	const clearUserInfo = () => {
		setAccount('');
		setNickname('');
		setProfileImage('');
	};

	useEffect(async () => {
		window.ethereum.on('accountsChanged', async () => {
			getUserInfo();
		});
		getUserInfo();
	}, []);

	const userContext = useMemo(
		() => ({
			account,
			nickname,
			profileImage,
			setUserInfo,
			clearUserInfo,
		}),
		[account]
	);

	return (
		<ThemeConfig>
			<GlobalStyles />
			<UserContext.Provider value={userContext}>
				<Router />
			</UserContext.Provider>
		</ThemeConfig>
	);
}
