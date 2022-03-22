import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Avatar, Stack, Typography, Grid } from '@mui/material';
import Page from '../components/Page';
import logo from '../image/logo.png';
import ItemCard from '../layouts/market/ItemCard';

function MarketCommunity() {
	const communityId = useLocation().pathname.substring(18);
	const theme = useTheme();

	useEffect(() => {
		console.log(communityId);
	}, []);

	const onClickNickname = () => {
		console.log('nickname');
	};

	return (
		<Page>
			<Container>
				<Stack direction='column' alignItems='center' marginTop='50px'>
					<Box border='3px solid white' borderRadius='50%' paddingBottom='7px'>
						<Avatar sx={{ width: 200, height: 200 }} src={logo} alt='' />
					</Box>
					{/* 커뮤니티 이름 */}
					<Typography variant='h2'>Sad Girls Bar</Typography>
					<Stack direction='row'>
						<Typography variant='subtitle3' paddingRight='7px'>
							by
						</Typography>
						<Typography
							variant='subtitle1'
							color={theme.palette.info.dark}
							onClick={onClickNickname}
							sx={{ cursor: 'pointer' }}
						>
							sadGirlsBar
						</Typography>
					</Stack>
					{/* 커뮤니티 아이템 정보 박스 */}
					<Stack
						direction='row'
						border={`1px solid ${theme.palette.grey[400]}`}
						borderRadius='10px'
						maxWidth='600px'
						height='90px'
						width='90%'
						margin='50px 0'
						justifyContent='space-around'
						textAlign='center'
					>
						{/* items */}
						<Box width='100%' borderRight={`1px solid ${theme.palette.grey[400]}`}>
							<Typography variant='h4' margin='15px 0 5px'>
								10.0K
							</Typography>
							<Typography color={theme.palette.grey[600]}>items</Typography>
						</Box>
						{/* owners */}
						<Box width='100%' borderRight={`1px solid ${theme.palette.grey[400]}`}>
							<Typography variant='h4' margin='15px 0 5px'>
								4.7K
							</Typography>
							<Typography color={theme.palette.grey[600]}>owners</Typography>
						</Box>
						{/* volume traded */}
						<Box width='100%'>
							<Typography variant='h4' margin='15px 0 5px'>
								2.1K
							</Typography>
							<Typography color={theme.palette.grey[600]}>volume traded</Typography>
						</Box>
					</Stack>
				</Stack>

				{/* NFT List */}
				<Grid container spacing={6}>
					<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
						<ItemCard />
					</Grid>
					<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
						<ItemCard />
					</Grid>
					<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
						<ItemCard />
					</Grid>
					<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
						<ItemCard />
					</Grid>
					<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
						<ItemCard />
					</Grid>
					<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
						<ItemCard />
					</Grid>
					<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
						<ItemCard />
					</Grid>
					<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
						<ItemCard />
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
}

export default MarketCommunity;
