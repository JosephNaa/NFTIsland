import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Stack,
	Container,
	Typography,
	TextField,
} from '@mui/material';
import axios from 'axios';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import UserContext from '../context/UserContext';
import Page from '../components/Page';
import { createBoardAPI } from '../api/board';

function PostWrite() {
	// account 정보 가져올 때 userContext.account
	const userContext = useContext(UserContext);
	const navigate = useNavigate();

	const onClickBackIcon = () => {
		navigate(-1);
	};

	// const [account, setAccount] = useState('');
	// const [communityId, setCommunityId] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleTitleChange = event => {
		setTitle(event.target.value);
	};

	const handleContentChange = event => {
		setContent(event.target.value);
	};

	// useraccount, commnunityId 일단 임의의 값
	const userAddress = '0x39410F7d3cA6f9f880DDbcd5337416D0Ec343923';
	const communityId = 6;

	const onClickCreate = () => {
		if (title.length > 0 && content.length > 0) {
			createBoardAPI({
				community_id: communityId,
				user_address: userAddress,
				title,
				content,
			}).then(res => {
				console.log('CreatePost: ', res);
				navigate(-1);
			});
		}
		if (title.length === 0) {
			alert('제목을 입력해주세요.');
		} else if (content.length === 0) {
			alert('내용을 입력해주세요.');
		}
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
						<TextField
							fullWidth
							id='post-title'
							label='제목'
							variant='outlined'
							onChange={handleTitleChange}
						/>
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
							onChange={handleContentChange}
						/>
					</Box>

					<Button
						sx={{
							ml: '40%',
							width: '20%',
						}}
						variant='contained'
						disableElevation
						onClick={onClickCreate}
					>
						CREATE
					</Button>
				</Stack>
			</Box>
		</Page>
	);
}

export default PostWrite;
