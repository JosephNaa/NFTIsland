import {
	Box,
	Stack,
	Container,
	Typography,
	TextField,
	Button,
} from '@mui/material';

import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';

function BadgeRegistration() {
	const navigate = useNavigate();

	const onClickBackIcon = () => {
		navigate(-1);
	};

	const onClickButton = () => {
		navigate('/market');
	};

	return (
		<Page>
			<Container>
				<Stack justifyContent='center' direction='row' ml='20%' mr='20%'>
					<Box position='absolute' left='20%'>
						<BackIcon onClick={onClickBackIcon} />
					</Box>
					<Box>
						<img
							alt=''
							src='https://blog.kakaocdn.net/dn/bTEhUV/btqECug9iOs/mxgZUk4MLJVCK3xtcNe6NK/img.jpg'
						/>
						{/* 뱃지 이미지 */}
					</Box>
				</Stack>
				<Stack ml='20%' mr='20%'>
					<Typography mt='5%' mb='3%' variant='h4'>
						가격
					</Typography>
					<TextField
						id='outlined-number'
						type='number'
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Button
						sx={{
							ml: '40%',
							width: '20%',
							mt: '3%',
						}}
						variant='contained'
						disableElevation
						onClick={onClickButton}
					>
						상품 판매하기
					</Button>
				</Stack>
			</Container>
		</Page>
	);
}

export default BadgeRegistration;
