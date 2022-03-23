import {
	Avatar,
	Box,
	Button,
	Stack,
	Container,
	Typography,
	Grid,
	TextField,
	Paper,
	InputBase,
	Divider,
	IconButton,
} from '@mui/material';

import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';

function PostWrite() {
	const navigate = useNavigate();

	const onClickBackIcon = () => {
		navigate(-1);
	};

	const onClickButton = () => {
		navigate(-1);
	};

	return (
		<Page>
			<Container>
				<Stack justifyContent='center' direction='row' ml='20%' mr='20%'>
					<Box position='absolute' left='20%'>
						<BackIcon onClick={onClickBackIcon} />
					</Box>
					<Typography variant='h3' textalign='center'>
						게시글 생성
					</Typography>
				</Stack>
			</Container>
			<Box ml='20%' mr='20%' mt='4%'>
				<Stack justifyContent='center'>
					<Box mb='2%'>
						<TextField fullWidth id='post-title' label='제목' variant='outlined' />
					</Box>
					<Box mb='2%'>
						<TextField
							fullWidth
							sx={{ height: '40%' }}
							id='post-content'
							label='내용'
							multiline
							rows={15}
							variant='outlined'
						/>
					</Box>

					<Button
						sx={{
							ml: '40%',
							width: '20%',
						}}
						variant='contained'
						disableElevation
						onClick={onClickButton}
					>
						CREATE
					</Button>
				</Stack>
			</Box>
		</Page>
	);
}

export default PostWrite;
