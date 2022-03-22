import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Web3 from 'web3';
import Page from '../components/Page';
import logo from '../image/logo.png';
import logo2 from '../image/logo2.png';

/**
 * [메인 화면]
 */
function Intro() {
	// Web3
	const web3 = new Web3(
		new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL)
	);

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
							<img src={logo2} alt='' width='300px' />
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

						<Stack
							ml='10%'
							mr='10%'
							direction='row'
							alignItems='center'
							justifyContent='space-around'
							spacing={10}
							mb={10}
						>
							<img
								src='http://wiki.hash.kr/images/a/a2/%EB%A9%94%ED%83%80%EB%A7%88%EC%8A%A4%ED%81%AC_%EA%B8%80%EC%9E%90.png'
								alt=''
								height='70px'
								pl='10px'
								pr='10px'
							/>

							<Stack spacing={2} flex='1'>
								<Typography variant='h4'>
									지갑을 연동하고 서비스를 이용하세요!
								</Typography>
								<Typography>
									가상화폐 지갑인 METAMASK를 연동할 수 있어요.
									<br />
									지갑에 충전된 가상화폐를 통해 뱃지를 구매할 수 있으며,
									<br />
									구매한 뱃지 역시 지갑에 저장됩니다.
								</Typography>
								<Box sx={{ width: 1 / 2 }}>
									<Button
										sx={{ boxShadow: 5 }}
										to='/register'
										variant='outlined'
										color='secondary'
										component={RouterLink}
									>
										지갑 연동하러 가기
									</Button>
								</Box>
							</Stack>
						</Stack>

						<Stack
							ml='10%'
							mr='10%'
							direction='row'
							alignItems='center'
							justifyContent='space-around'
							spacing={10}
						>
							<Stack spacing={2}>
								<Typography variant='h4'>커뮤니티에 뱃지를 통해 입장하세요!</Typography>
								<Typography>
									뱃지를 이용하여 원하는 커뮤니티에 입장할 수 있습니다.
									<br />
									뱃지를 발급받거나, 마켓플레이스에서 구매해보세요!
								</Typography>
								<Stack direction='row' spacing={2}>
									<Button
										sx={{ boxShadow: 5 }}
										to='/register'
										variant='outlined'
										color='secondary'
										component={RouterLink}
									>
										커뮤니티 구경하기
									</Button>
									<Button
										sx={{ boxShadow: 5 }}
										to='/register'
										variant='outlined'
										color='secondary'
										component={RouterLink}
									>
										뱃지 마켓으로 가기
									</Button>
								</Stack>
							</Stack>
							<Box sx={{ boxShadow: 5 }}>
								<img
									src='http://wiki.hash.kr/images/a/a2/%EB%A9%94%ED%83%80%EB%A7%88%EC%8A%A4%ED%81%AC_%EA%B8%80%EC%9E%90.png'
									alt=''
									height='70px'
								/>
							</Box>
						</Stack>
					</Box>
				</Stack>
			</Container>
		</Page>
	);
}

export default Intro;
