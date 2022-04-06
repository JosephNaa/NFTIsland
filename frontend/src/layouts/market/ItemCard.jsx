import { Box, Avatar, Typography, Stack, Card } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function ItemCard({ saleCA, communityName, itemName, price, imageUrl }) {
	const navigate = useNavigate();
	const theme = useTheme();

	const onClickCard = () => {
		navigate(`/market/item/${saleCA}`);
	};

	const ImgStyle = styled('img')({
		width: '100%',
		// height: '80%',
		objectFit: 'cover',
	});

	return (
		<Card
			sx={{
				cursor: 'pointer',
				transition: 'transform .2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.01)',
				},
			}}
			onClick={onClickCard}
		>
			{/* NFT 이미지 */}
			<ImgStyle src={imageUrl} alt='' />
			<Stack
				direction='row'
				justifyContent='space-between'
				margin='15px 15px 30px'
			>
				<Box>
					{/* 커뮤니티 이름 */}
					<Typography variant='body2' color={theme.palette.grey[500]}>
						{communityName}
					</Typography>
					{/* NFT 이름 */}
					<Typography variant='subtitle1'>{itemName}</Typography>
				</Box>
				<Box textAlign='right'>
					{/* 가격 */}
					<Typography variant='body2' color={theme.palette.grey[500]}>
						Price (eth)
					</Typography>
					<Typography variant='subtitle2'>{price * 10 ** -18}</Typography>
					{/* 남은 거래 일? */}
				</Box>
			</Stack>
		</Card>
	);
}

export default ItemCard;
