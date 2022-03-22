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
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';

function PostWrite() {
	const onClickBackIcon = () => {
		window.location.replace('/communitydetail');
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
						to='/communitydetail'
						component={RouterLink}
					>
						CREATE
					</Button>
				</Stack>
			</Box>
		</Page>
	);
}

export default PostWrite;
