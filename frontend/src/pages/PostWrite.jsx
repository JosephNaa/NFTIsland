import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
	Box,
	Button,
	Stack,
	Container,
	Typography,
	TextField,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import UserContext from '../context/UserContext';
import Page from '../components/Page';
import { createBoardAPI, getBoardAPI, editBoardAPI } from '../api/board';

function PostWrite() {
	// account 정보 가져올 때 userContext.account
	const { loggedUser } = useContext(UserContext);
	const navigate = useNavigate();
	const { communityId } = useParams();
	const { search } = useLocation();
	const query = new URLSearchParams(search);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		const postId = query.get('postId');

		if (postId) {
			getBoardAPI(postId).then(({ data }) => {
				setTitle(data.title);
				setContent(data.content);
			});
		}
	}, []);

	// 타이핑 헬퍼
	const typeSchema = Yup.object().shape({
		title: Yup.string().required('제목 입력해주세요.'),
		content: Yup.string().required('내용을 입력해주세요.'),
	});

	const formik = useFormik({
		initialValues: {
			title,
			content,
		},
		enableReinitialize: true,
		validationSchema: typeSchema,
		onSubmit: value => {
			const postId = query.get('postId');
			if (postId) {
				editBoardAPI(postId, {
					community_id: communityId,
					user_address: loggedUser.account,
					title: value.title,
					content: value.content,
				}).then(() => {
					navigate(`/community/${communityId}`);
				});
			} else {
				createBoardAPI({
					community_id: communityId,
					user_address: loggedUser.account,
					title: value.title,
					content: value.content,
				}).then(() => {
					navigate(`/community/${communityId}`);
				});
			}
		},
	});

	const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

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
					<Typography variant='h3' textalign='center'>
						게시글 생성
					</Typography>
				</Stack>
			</Container>
			<Box ml='20%' mr='20%' mt='4%'>
				<FormikProvider value={formik}>
					<Form
						autoComplete='off'
						noValidate
						onSubmit={handleSubmit}
						onReset={handleReset}
					>
						<Stack justifyContent='center'>
							<Box mb='2%'>
								<TextField
									fullWidth
									type='text'
									label='제목'
									{...getFieldProps('title')}
									error={Boolean(touched.title && errors.title)}
									helperText={touched.title && errors.title}
								/>
							</Box>
							<Box mb='2%'>
								<TextField
									fullWidth
									type='text'
									label='내용'
									multiline
									rows={15}
									{...getFieldProps('content')}
									error={Boolean(touched.content && errors.content)}
									helperText={touched.content && errors.content}
								/>
							</Box>

							<Button
								sx={{
									ml: '40%',
									width: '20%',
								}}
								variant='contained'
								type='submit'
							>
								CREATE
							</Button>
						</Stack>
					</Form>
				</FormikProvider>
			</Box>
		</Page>
	);
}

export default PostWrite;
