import { useTheme, styled } from '@mui/material/styles';
import { Box, Avatar, Typography, Stack, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/logo.png';

function MarketCard() {
	const navigate = useNavigate();
	const theme = useTheme();
	const ImgStyle = styled('img')({
		width: '100%',
		// height: '50%',
		objectFit: 'cover',
	});

	const onClickCard = () => {
		navigate('/market/community/sadgirl');
	};
	const onClickNickname = e => {
		e.stopPropagation();
	};
	return (
		<Card
			// width='430px'
			// height='400px'
			// border={`1px solid ${theme.palette.grey[300]}`}
			// borderradius='10px'
			// overflow='hidden'
			sx={{
				cursor: 'pointer',
				transition: 'transform .2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.01)',
				},
			}}
			onClick={onClickCard}
		>
			<ImgStyle src={logo} alt='' />
			<Stack
				direction='column'
				alignItems='center'
				marginTop='-36px'
				padding='10px'
			>
				<Box border='3px solid white' borderRadius='50%' paddingBottom='7px'>
					<Avatar src={logo} alt='' />
				</Box>
				{/* 컬랙션 이름 */}
				<Typography variant='h5'>Sad Girls Bar</Typography>
				<Stack direction='row' paddingBottom='20px'>
					<Typography variant='subtitle3' paddingRight='7px'>
						by
					</Typography>
					{/* 관리자 아이디 */}
					<Typography
						variant='subtitle1'
						color={theme.palette.info.dark}
						sx={{
							transition: 'all .2s ease-in-out',
							'&:hover': {
								// transform: 'scale(1.01)',
								fontSize: '17px',
							},
						}}
						onClick={onClickNickname}
					>
						sadGirlsBar
					</Typography>
				</Stack>
				{/* 컬렉션 설명 */}
				<Typography variant='subtitle2' padding='0 20px' textAlign='center'>
					The Boring Ape Chronicles by Timpers are a collection of monotonous ape
					adventure stories starring s...
				</Typography>
			</Stack>
		</Card>
	);
}

export default MarketCard;
