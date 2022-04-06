import { Box, Typography, Stack, Card, Link } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function ItemCard({ tokenId, itemURL, itemName, communityName, saleCA = '' }) {
	const navigate = useNavigate();
	const theme = useTheme();
	const ImgStyle = styled('img')({
		width: '100%',
		objectFit: 'cover',
	});

	return (
		<Link
			href={saleCA ? `/market/item/${saleCA}` : `/item/${tokenId}`}
			underline='none'
			onClick={e => {
				e.preventDefault();
				navigate(saleCA ? `/market/item/${saleCA}` : `/item/${tokenId}`);
			}}
		>
			<Card
				variant='outlined'
				sx={{
					boxShadow: 0,
					'&:hover': {
						boxShadow: 5,
					},
				}}
			>
				{/* NFT 이미지 */}
				<ImgStyle src={itemURL} alt='' />
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
				</Stack>
			</Card>
		</Link>
	);
}

export default ItemCard;
