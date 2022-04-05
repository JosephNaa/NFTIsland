import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import { Container, Box, Stack, Typography, Button, Grid } from '@mui/material';
import Page from '../components/Page';
import logo from '../image/logo.png';
import { getSalesItem } from '../api/market';

function MarketItem() {
	const { communityId } = useParams();
	const theme = useTheme();

	useEffect(() => {
		getSalesItem(communityId).then(({ data }) => {
			console.log(data);
		});
		console.log(communityId);
	}, []);

	const ImgStyle = styled('img')({
		width: '100%',
	});

	const BoxStyle = styled(Box)(({ theme }) => ({
		[theme.breakpoints.down('md')]: {
			maxWidth: '600px',
			margin: '0 auto',
		},
	}));

	const onClickCommunity = e => {
		e.stopPropagation();
		console.log('nickname');
	};

	return (
		<Page>
			<Container>
				<Grid container spacing={6}>
					<Grid item xs={12} md={6}>
						<BoxStyle width='100%'>
							<ImgStyle src={logo} alt='' />
						</BoxStyle>
					</Grid>
					<Grid item xs={12} md={6}>
						<BoxStyle width='100%'>
							{/* 컬랙션 이름 */}
							<Typography
								variant='subtitle1'
								color={theme.palette.info.dark}
								onClick={onClickCommunity}
							>
								Sad Girls Bar
							</Typography>
							{/* NFT 이름 */}
							<Typography variant='h3'>Sad Girls #1235</Typography>
							{/* NFT 발행자 */}
							<Typography variant='body1'>
								Created by <span>GxngYxng</span>
							</Typography>
							{/* NFT 설명 */}
							<Typography variant='h5' paddingTop='20px'>
								Description
							</Typography>
							<Typography variant='body1'>
								Represented by the scales, Libras are naturally balanced individuals.
								Although this can lead to some indecisiveness, it&apos;s also what makes
								you such a fair and diplomatic person. Your friends all know they can
								come to you with any problem and get the most honest response.
							</Typography>
						</BoxStyle>
					</Grid>
				</Grid>
				<Box width='350px' margin='50px auto'>
					<Button variant='outlined' size='large' fullWidth>
						Buy
					</Button>
				</Box>
			</Container>
		</Page>
	);
}

export default MarketItem;
