import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import { Container, Box, Stack, Typography, Button, Grid } from '@mui/material';
import Page from '../components/Page';
import { getItemSaleInfo } from '../api/market';

function MarketItem() {
	const { saleCA } = useParams();
	const theme = useTheme();
	const [saleInfo, setSaleInfo] = useState({});

	useEffect(() => {
		getItemSaleInfo(saleCA).then(({ data }) => {
			setSaleInfo({
				communityId: data.community_id,
				communityName: data.community_name,
				imageUrl: data.item_url,
				name: data.item_name,
				description: data.item_description,
				ownerNickname: data.owner_nickname,
				ownerAddress: data.owner_address,
				createAt: data.sale_created_at,
			});
		});
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
							<ImgStyle src={saleInfo.imageUrl} alt='' />
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
								{saleInfo.communityName}
							</Typography>
							{/* NFT 이름 */}
							<Typography variant='h3'>{saleInfo.name}</Typography>
							{/* NFT 발행자 */}
							<Typography variant='body1'>
								Created by <span>{saleInfo.ownerNickname}</span>
							</Typography>
							{/* NFT 설명 */}
							<Typography variant='h5' paddingTop='20px'>
								Description
							</Typography>
							<Typography variant='body1'>{saleInfo.description}</Typography>
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
