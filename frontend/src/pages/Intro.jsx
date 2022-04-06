import { useContext, useEffect } from 'react';
import { Box, Button, Container, Stack, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import logo from '../image/logo.png';
import metamask from '../image/metamask.png';
import UserContext from '../context/UserContext';
import { getUserAPI } from '../api/auth';

function Intro() {
	const navigate = useNavigate();

	const BoxStyle = styled(Box)(({ theme }) => ({
		[theme.breakpoints.down('md')]: {
			maxWidth: '600px',
			margin: '0 auto',
		},
	}));
	const userContext = useContext(UserContext);

	const connectAccount = async () => {
		try {
			if (window.ethereum) {
				const userAccount = await window.ethereum.request({
					method: 'eth_accounts',
				});
				// 메타마스크에 로그인이 되어있는 경우
				if (userAccount[0]) {
					const { data } = await getUserAPI(userAccount[0]);
					userContext.setLoggedUser({
						account: data.account,
						nickname: data.nickname,
						profileImage: data.profile_path,
					});
				}
				// 메타마스크 로그인을 해야하는 경우
				else {
					// 지갑 연결 요청
					await window.ethereum.request({
						method: 'eth_requestAccounts',
					});
				}
			} else {
				alert('Install Metamask!');
			}
		} catch (error) {
			console.dir(error);
		}
	};

	const onClickLogin = () => {
		connectAccount();
	};

	// useEffect(() => {
	// 	if (userContext.loggedIn) {
	// 		navigate('/community', { replace: true });
	// 	}
	// }, []);

	return (
		<Page
			title='NFT Island'
			maxWidth='100%'
			minHeight='100%'
			alignItems='center'
			display='flex'
		>
			<Container>
				<Stack justifyContent='center'>
					<Box ml='10%' mr='10%'>
						<Box ml='35%' mr='35%'>
							<img src={logo} alt='' width='300px' />
						</Box>
						<Typography fontSize={20} sx={{ pb: 10 }} align='center'>
							NFT Island에 오신 것을 환영합니다!
							<br />
							우리는 NFT를 이용한 커뮤니티들을 제공하고 있습니다.
							<br />
							<b>뱃지</b>를 구매해보세요!
							<br />
							NFT로 된 특별한 회원권인 <b>뱃지</b>를 통해 각 <b>커뮤니티</b>에 입장이
							가능합니다.
							<br />
							아무나 이용할 수 없는 양질의 정보들을 맘껏 누려보세요!
						</Typography>

						<Grid container>
							<Grid item xs={12} md={6}>
								<BoxStyle width='100%' pl='30px'>
									<img src={metamask} alt='' width='90%' pl='10px' pr='10px' />
								</BoxStyle>
							</Grid>
							<Grid item xs={12} md={6}>
								<BoxStyle width='100%' mb='5%'>
									<Typography variant='h4' mb='10px'>
										지갑을 연동하고 서비스를 이용하세요!
									</Typography>
									<Typography mb='10px'>
										가상화폐 지갑인 METAMASK를 연동할 수 있어요.
										<br />
										지갑에 충전된 가상화폐를 통해 뱃지를 구매할 수 있으며,
										<br />
										구매한 뱃지 역시 지갑에 저장됩니다.
									</Typography>
									<Box sx={{ width: 1 / 2 }}>
										<Button
											sx={{ boxShadow: 5 }}
											variant='outlined'
											color='secondary'
											onClick={onClickLogin}
										>
											지갑 연동하러 가기
										</Button>
									</Box>
								</BoxStyle>
							</Grid>
						</Grid>

						<Grid container spacing={6} mt='2%'>
							<Grid item xs={12} md={6}>
								<BoxStyle width='100%' pl='30px'>
									<Typography variant='h4' mb='10px'>
										커뮤니티에 뱃지를 통해 입장하세요!
									</Typography>
									<Typography mb='10px'>
										뱃지를 이용하여 원하는 커뮤니티에 입장할 수 있습니다.
										<br />
										뱃지를 발급받거나, 마켓플레이스에서 구매해보세요!
									</Typography>
									<Stack direction='row' spacing={2}>
										<Button
											sx={{ boxShadow: 5 }}
											to='/community'
											variant='outlined'
											color='secondary'
											component={RouterLink}
										>
											커뮤니티 구경하기
										</Button>
										<Button
											sx={{ boxShadow: 5 }}
											to='/market'
											variant='outlined'
											color='secondary'
											component={RouterLink}
										>
											뱃지 마켓으로 가기
										</Button>
									</Stack>
								</BoxStyle>
							</Grid>
							<Grid item xs={12} md={6}>
								<BoxStyle width='100%'>
									<img src={metamask} alt='' width='90%' pl='10px' pr='10px' />
								</BoxStyle>
							</Grid>
						</Grid>
					</Box>
					<Box mt='200px' height='700px'>
						<iframe
							width='100%'
							height='100%'
							src='https://www.youtube.com/embed/G9mTqJI1oLQ'
							title='YouTube video player'
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
						/>
					</Box>
				</Stack>
			</Container>
		</Page>
	);
}

export default Intro;
