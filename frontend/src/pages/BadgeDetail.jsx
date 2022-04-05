import { useEffect, useState, useContext } from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	TextField,
	Box,
	Stack,
	Container,
	Typography,
	Button,
	CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import Page from '../components/Page';
import { getItemInfo, saveSaleInfo } from '../api/item';
import { saleFactoryContract, nftCA } from '../web3Config';
import UserContext from '../context/UserContext';

function BadgeDetail() {
	const { itemId } = useParams();
	const navigate = useNavigate();
	const userContext = useContext(UserContext);

	const [itemInfo, setItemInfo] = useState({});
	const [open, setOpen] = useState(false);
	const [price, setPrice] = useState();
	const [loading, setLoading] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onClickBackIcon = () => {
		navigate(-1);
	};

	const onChangePrice = e => {
		setPrice(e.target.value);
	};

	useEffect(() => {
		getItemInfo(itemId).then(({ data }) => {
			setItemInfo({
				communityId: data.community_id,
				communityName: data.community_name,
				itemDec: data.item_description,
				itemName: data.item_title,
				itemURL: data.item_url,
				ownerAdderss: data.owner_address,
			});
		});
	}, []);

	const onClickSale = async () => {
		setOpen(false);
		try {
			// 판매하기
			setLoading(true);
			// SC 판매 등록하기
			const saleInfo = await saleFactoryContract.methods
				.createSale(itemId, price, nftCA)
				.send({ from: userContext.loggedUser.address });

			// 백엔드에 판매정보 등록하기
			const res = await saveSaleInfo({
				tokenId: itemId,
				sellerAddress: userContext.loggedUser.address,
				saleContractAddress:
					saleInfo.events.CreatedSaleAddress.returnValues.saleAddress,
			});
			if (res.status === 200) {
				// 판매 상세 페이지로 이동시키기
				navigate(
					`/market/item/${saleInfo.events.CreatedSaleAddress.returnValues.saleAddress}`
				);
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
							<Box mt='10px'>NFT 판매 등록중...</Box>
						</Stack>
					</Box>
				</Box>
			)}
			<Container>
				<Stack justifyContent='center' direction='row' ml='20%' mr='20%'>
					<Box position='absolute' left='20%'>
						<BackIcon onClick={onClickBackIcon} />
					</Box>
					<Box>
						<img alt='' src={itemInfo.itemURL} />
						{/* 뱃지 이미지 */}
					</Box>
				</Stack>
				<Stack ml='20%' mr='20%'>
					<Typography mt='5%' mb='3%' variant='h4'>
						{/* 커뮤니티 이름 */}
						{itemInfo.communityName}
					</Typography>
					<Typography mb='3%' variant='h5'>
						{/* NFT 이름 */}
						{itemInfo.itemName}
					</Typography>
					<Typography mb='3%' fontSize='16px'>
						{/* 설명 */}
						{itemInfo.itemDec}
					</Typography>
					<Box textAlign='center' mt='40px'>
						<Button
							onClick={handleClickOpen}
							sx={{ width: '50%' }}
							variant='contained'
						>
							판매하기
						</Button>
					</Box>
				</Stack>
			</Container>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>판매하기</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='가격을 입력해 주세요.'
						type='Number'
						fullWidth
						variant='standard'
						value={price}
						onChange={onChangePrice}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClickSale}>판매</Button>
					<Button onClick={handleClose}>취소</Button>
				</DialogActions>
			</Dialog>
		</Page>
	);
}

export default BadgeDetail;
