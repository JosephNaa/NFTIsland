import { useState, useRef } from 'react';
import {
	Container,
	Stack,
	Box,
	Typography,
	TextField,
	Divider,
	Button,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../layouts/PageHeader';
import Page from '../components/Page';

function CreateCommunity() {
	const imageSelect = useRef();
	const [imgae, setImage] = useState('');
	const [imageName, setImageName] = useState('');
	const [communityName, setCommunityName] = useState('');
	const [description, setDescription] = useState('');

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
			setCommunityName(value.communityName);
			setDescription(value.description);
			// 여기서 백엔드호출해서 커뮤니티 만들기

			// onClick={
			// 	Object.keys(touched).length &&
			// 	!Object.keys(errors).length &&
			// 	item.length !== 0
			// 		? toggleApprove
			// 		: null
			// }
		},
	});

	const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

	// 찾기 버튼 클릭 핸들링
	const handleImageClick = () => {
		imageSelect.current.click();
	};

	// 이미지 업로드 핸들링
	const handleImage = value => {
		console.log(value);
		// S3에 이미지 보내고 URL받아오기
		setImage(value);

		if (value !== '') setImageName(value.name);
		else setImageName('');
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
									label='아이템 (업로드 확장자 형식: png, jpeg, jpg, gif)'
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
								inputProps={{ maxLength: 20 }}
								type='text'
								label='이름'
								{...getFieldProps('communityName')}
								error={Boolean(touched.communityName && errors.communityName)}
								helperText={touched.communityName && errors.communityName}
							/>
							<TextField
								inputProps={{ maxLength: 20 }}
								type='text'
								label='설명'
								{...getFieldProps('description')}
								error={Boolean(touched.description && errors.description)}
								helperText={touched.description && errors.description}
							/>

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
