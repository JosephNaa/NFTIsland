import styled from '@emotion/styled';
import { Box, Avatar, Typography } from '@mui/material';
import logo from '../../image/logo.png';

function MarketCard() {
	return (
		<Box
			width='380px'
			height='400px'
			border='1px solid black'
			borderRadius='10px'
			overflow='hidden'
		>
			{/* <Box component='img' src={logo} height='100px' /> */}
			<CardImg src={logo} alt='' />
			<CardBody>
				<Box border='3px solid white' borderRadius='50%'>
					<Avatar src={logo} alt='' />
				</Box>
				<Typography variant='subtitle1'>MarketCard</Typography>
			</CardBody>
		</Box>
	);
}

const CardImg = styled.img`
	width: 100%;
	height: 50%;
	object-fit: cover;
`;

const CardBody = styled.div`
	margin-top: -36px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default MarketCard;
