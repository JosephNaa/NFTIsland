/* eslint-disable consistent-return */
import { useState, useRef, useContext } from 'react';
import {
	Container,
	Stack,
	Typography,
	TextField,
	Divider,
	Button,
	Switch,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Header from '../layouts/PageHeader';
import Page from '../components/Page';
import UserContext from '../context/UserContext';
import { createCommunityAPI } from '../api/community';

function CreateCommunity() {
	const userContext = useContext(UserContext);
	const imageSelect = useRef();
	const navigate = useNavigate();
	const [image, setImage] = useState('');
	const [imageName, setImageName] = useState('');
	// const [communityName, setCommunityName] = useState('');
	// const [description, setDescription] = useState('');
	const [payable, setPayable] = useState(true);

	// 타이핑 헬퍼
	const typeSchema = Yup.object().shape({
		communityName: Yup.string().required('커뮤니티이름 입력해주세요.'),
		description: Yup.string().required('커뮤니티 설명을 입력해주세요.'),
	});

	const formik = useFormik({
		initialValues: {
			communityName: '',
			description: '',
		},
		validationSchema: typeSchema,
		onSubmit: value => {
			// 이미지없으면 submit 막기
			if (!imageName) {
				return alert('이미지를 올려주세요.');
			}
			// 여기서 백엔드호출해서 커뮤니티 만들기
			const formData = new FormData();

			formData.append('file', image);
			formData.append('host_address', userContext.loggedUser.account);
			formData.append('name', value.communityName);
			formData.append('description', value.description);
			formData.append('payable', payable);

			createCommunityAPI(formData).then(res => {
				if (res.status !== 200) return;
				navigate(`/community/${res.data.id}`);
			});
		},
	});

	const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

	// 찾기 버튼 클릭 핸들링
	const handleImageClick = () => {
		imageSelect.current.click();
	};

	// 이미지 업로드 핸들링
	const handleImage = value => {
		setImage(value);
		if (value !== '') setImageName(value.name);
		else setImageName('');
	};

	// payable switch button
	const onChangePayable = e => {
		setPayable(e.target.checked);
	};

	return (
		<Page>
			<Container maxWidth='md'>
				<Header title='커뮤니티 생성' sx={{ marginBottom: '30px' }} />
				<FormikProvider value={formik}>
					<Form
						autoComplete='off'
						noValidate
						onSubmit={handleSubmit}
						onReset={handleReset}
					>
						<Stack spacing={3}>
							<Stack direction='row' alignItems='center'>
								<input
									type='file'
									accept='image/png, image/jpeg, image/jpg, image/gif'
									ref={imageSelect}
									onChange={e =>
										e.target.files.length !== 0
											? handleImage(e.target.files[0])
											: handleImage('')
									}
									style={{ display: 'none' }}
								/>
								<TextField
									sx={{ width: '85%' }}
									type='text'
									label='커뮤니티 로고 (업로드 확장자 형식: png, jpeg, jpg, gif)'
									value={imageName}
									disabled
								/>
								<Button
									sx={{
										ml: 3,
										fontSize: 16,
										height: '56px',
										width: '15%',
										padding: '8px 0',
									}}
									variant='contained'
									size='large'
									onClick={handleImageClick}
								>
									Upload
								</Button>
							</Stack>
							<TextField
								type='text'
								label='이름'
								{...getFieldProps('communityName')}
								error={Boolean(touched.communityName && errors.communityName)}
								helperText={touched.communityName && errors.communityName}
							/>
							<TextField
								type='text'
								label='설명'
								multiline
								rows={5}
								{...getFieldProps('description')}
								error={Boolean(touched.description && errors.description)}
								helperText={touched.description && errors.description}
							/>
							<Stack direction='row' alignItems='center'>
								<Typography variant='body1'>Payable</Typography>
								<Switch defaultChecked onChange={onChangePayable} />
							</Stack>

							<Divider sx={{ mt: 5 }} />
							<Stack alignItems='center'>
								<Button
									sx={{ width: '40%', fontSize: 18 }}
									size='large'
									type='submit'
									variant='contained'
								>
									Create
								</Button>
							</Stack>
						</Stack>
					</Form>
				</FormikProvider>
			</Container>
		</Page>
	);
}

export default CreateCommunity;
