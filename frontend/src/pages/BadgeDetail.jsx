/* eslint-disable consistent-return */
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
import { getItemInfo, saveSaleInfo, transferItem } from '../api/item';
import { saleFactoryContract, nftCA, nftContract } from '../web3Config';
import UserContext from '../context/UserContext';

function BadgeDetail() {
	const { itemId } = useParams();
	const navigate = useNavigate();
	const userContext = useContext(UserContext);

	const [itemInfo, setItemInfo] = useState({});
	const [openSell, setSellOpen] = useState(false);
	const [openTransfer, setTransferOpen] = useState(false);
	const [price, setPrice] = useState('');
	const [address, setAddress] = useState();
	const [loading, setLoading] = useState(false);

	const handleClickSellOpen = () => {
		setSellOpen(true);
	};

	const handleSellClose = () => {
		setSellOpen(false);
	};

	const handleClickTransferOpen = () => {
		setTransferOpen(true);
	};

	const handleTransferClose = () => {
		setTransferOpen(false);
	};

	const onClickBackIcon = () => {
		navigate(-1);
	};

	const onChangePrice = e => {
		setPrice(e.target.value);
	};
	const onChangeAddress = e => {
		setAddress(e.target.value);
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
				onSale: data.on_sale_yn,
				payable: data.payable,
			});
		});
	}, []);

	const onClickSale = async () => {
		if (price < 0.0001) return alert('0.0001ETH 보다 커야합니다.');
		setSellOpen(false);
		try {
			// 판매하기
			setLoading(true);
			// SC 판매 등록하기
			const saleInfo = await saleFactoryContract.methods
				.createSale(itemId, String(price * 10 ** 18), nftCA)
				.send({ from: userContext.loggedUser.account });

			// 백엔드에 판매정보 등록하기
			const res = await saveSaleInfo({
				tokenId: itemId,
				sellerAddress: userContext.loggedUser.account,
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

	const onClickTransfer = async () => {
		setTransferOpen(false);
		try {
			setLoading(true);
			await nftContract.methods
				.safeTransferFrom(itemInfo.ownerAdderss, address, itemId)
				.send({ from: userContext.loggedUser.account });
			const res = await transferItem(
				itemId,
				userContext.loggedUser.account,
				address
			);
			if (res.status === 200) {
				// 판매 상세 페이지로 이동시키기
				navigate(-1);
			}
		} catch (error) {
			console.dir(error);
		}
		setLoading(false);
	};

	const onClickCommunity = () => {
		navigate(`/community/${itemInfo.communityId}/`);
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
					<Typography
						mt='5%'
						mb='3%'
						variant='h4'
						onClick={onClickCommunity}
						sx={{ cursor: 'pointer' }}
					>
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
					{userContext.loggedUser.account === itemInfo.ownerAdderss &&
						!itemInfo.onSale && (
							<>
								<Stack
									direction='row'
									justifyContent='space-evenly'
									textAlign='center'
									mt='40px'
								>
									<Button
										onClick={handleClickTransferOpen}
										sx={{ width: '40%' }}
										variant='contained'
										color='secondary'
									>
										전송하기
									</Button>
									{itemInfo.payable && (
										<Button
											onClick={handleClickSellOpen}
											sx={{ width: '40%' }}
											variant='contained'
										>
											판매하기
										</Button>
									)}
								</Stack>
								<Dialog open={openSell} onClose={handleSellClose}>
									<DialogTitle>판매하기</DialogTitle>
									<DialogContent>
										<TextField
											autoFocus
											margin='dense'
											id='name'
											label='가격을 입력해 주세요. (eth)'
											type='Number'
											fullWidth
											variant='standard'
											value={price}
											onChange={onChangePrice}
										/>
									</DialogContent>
									<DialogActions>
										<Button onClick={onClickSale}>판매</Button>
										<Button onClick={handleSellClose}>취소</Button>
									</DialogActions>
								</Dialog>
								<Dialog open={openTransfer} onClose={handleTransferClose}>
									<DialogTitle>전송하기</DialogTitle>
									<DialogContent>
										<TextField
											autoFocus
											margin='dense'
											id='address'
											label='보내실 지갑 주소를 입력해 주세요.'
											type='text'
											fullWidth
											variant='standard'
											value={address}
											onChange={onChangeAddress}
										/>
									</DialogContent>
									<DialogActions>
										<Button onClick={onClickTransfer}>전송</Button>
										<Button onClick={handleTransferClose}>취소</Button>
									</DialogActions>
								</Dialog>
							</>
						)}
				</Stack>
			</Container>
		</Page>
	);
}

export default BadgeDetail;
