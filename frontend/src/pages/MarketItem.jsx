import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import {
	Container,
	Box,
	CircularProgress,
	Typography,
	Button,
	Grid,
	Stack,
} from '@mui/material';
import Page from '../components/Page';
import { getItemSaleInfo, buyItem, cancelSale } from '../api/market';
import { createSaleContract } from '../web3Config';
import UserContext from '../context/UserContext';

function MarketItem() {
	const theme = useTheme();
	const { saleCA } = useParams();
	const navigate = useNavigate();
	const userContext = useContext(UserContext);
	const saleContract = createSaleContract(saleCA);

	const [saleInfo, setSaleInfo] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getItemSaleInfo(saleCA).then(({ data }) => {
			saleContract.methods
				.getSaleInfo()
				.call()
				.then(res => {
					setSaleInfo({
						communityId: data.community_id,
						communityName: data.community_name,
						imageUrl: data.item_url,
						name: data.item_name,
						description: data.item_description,
						ownerNickname: data.owner_nickname,
						ownerAddress: data.owner_address,
						createAt: data.sale_created_at,
						price: res[0],
					});
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
		navigate(`/community/${saleInfo.communityId}`);
	};
	const onClickNickname = e => {
		e.stopPropagation();
		navigate(`/user/${saleInfo.ownerNickname}`);
	};

	const onClickStop = async () => {
		setLoading(true);
		try {
			await saleContract.methods
				.cancelSale()
				.send({ from: userContext.loggedUser.account });

			const res = await cancelSale(saleCA, userContext.loggedUser.account);
			if (res.status === 204) {
				navigate(`/user/${userContext.loggedUser.nickname}`);
			}
		} catch (error) {
			console.dir(error);
		}
		setLoading(false);
	};

	const onClickBuy = async () => {
		setLoading(true);
		try {
			await saleContract.methods
				.purchase()
				.send({ from: userContext.loggedUser.account, value: saleInfo.price });

			const res = await buyItem({
				saleCA,
				address: userContext.loggedUser.account,
				value: saleInfo.price,
			});
			if (res.status === 200) {
				// 해당 커뮤니티로 이동
				navigate(`/community/${saleInfo.communityId}`);
			}
		} catch (error) {
			console.dir(error);
		}
		setLoading(false);
	};

	return (
		<Page>
			{loading && (
				<Box
					sx={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						zIndex: 999,
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						<Stack alignItems='center'>
							<CircularProgress />
							<Box mt='10px'>잠시만 기다려 주세요...</Box>
						</Stack>
					</Box>
				</Box>
			)}
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
								onClick={onClickCommunity}
								sx={{ cursor: 'pointer' }}
							>
								{saleInfo.communityName}
							</Typography>
							{/* NFT 이름 */}
							<Typography variant='h3'>{saleInfo.name}</Typography>
							{/* NFT 발행자 */}
							<Stack direction='row'>
								<Typography variant='body1' mr='5px' fontSize='14px'>
									Created by
								</Typography>
								<Typography
									onClick={onClickNickname}
									fontSize='14px'
									color={theme.palette.info.dark}
									sx={{ cursor: 'pointer' }}
								>
									{saleInfo.ownerNickname}
								</Typography>
							</Stack>
							{/* NFT 설명 */}
							<Typography variant='h5' paddingTop='20px'>
								Description
							</Typography>
							<Typography variant='body1'>{saleInfo.description}</Typography>
							<Typography variant='h5' paddingTop='20px'>
								Price (eth)
							</Typography>
							<Typography variant='body1'>{saleInfo.price * 10 ** -18}</Typography>
						</BoxStyle>
					</Grid>
				</Grid>
				<Box width='350px' margin='50px auto'>
					{saleInfo.ownerAddress === userContext.loggedUser.account ? (
						<Button
							onClick={onClickStop}
							variant='outlined'
							size='large'
							color='error'
							fullWidth
						>
							판매 중지
						</Button>
					) : (
						<Button onClick={onClickBuy} variant='outlined' size='large' fullWidth>
							구매하기
						</Button>
					)}
				</Box>
			</Container>
		</Page>
	);
}

export default MarketItem;
