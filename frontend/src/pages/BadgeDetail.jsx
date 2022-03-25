import { Avatar, Box, Stack, Container, Typography } from '@mui/material';

import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';

function BadgeDetail() {
	const navigate = useNavigate();

	const onClickBackIcon = () => {
		navigate(-1);
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
						{/* 커뮤니티 이름 */}
						Sad Girls Bar
					</Typography>
					<Typography mb='3%' variant='h5'>
						{/* NFT 이름 */}
						Sad Girl #3245
					</Typography>
					<Typography mb='3%' fontSize='16px'>
						{/* 설명 */}
						Sad Girl #3245 설명 설명 설명
					</Typography>
				</Stack>
			</Container>
		</Page>
	);
}

export default BadgeDetail;
