import { useState, useRef } from 'react';
import {
	Container,
	Stack,
	Box,
	Typography,
	TextField,
	Divider,
	Button,
	Switch,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../layouts/PageHeader';
import Page from '../components/Page';

function CreateItem() {
	const imageSelect = useRef();
	const [imgae, setImage] = useState('');
	const [imageName, setImageName] = useState('');
	const [itemName, setItemName] = useState('');
	const [description, setDescription] = useState('');
	const [supply, setSupply] = useState(1);
	const [community, setCommunity] = useState('');

	const handleChangeSelect = event => {
		setCommunity(event.target.value);
	};

	// 타이핑 헬퍼
	const typeSchema = Yup.object().shape({
		itemName: Yup.string().required('NFT 이름 입력해주세요.'),
		description: Yup.string().required('NFT 설명을 입력해주세요.'),
		supply: Yup.number()
			.required('NFT 갯수를 입력해주세요.')
			.positive('0보다 커야합니다.')
			.integer(),
	});

	const formik = useFormik({
		initialValues: {
			itemName: '',
			description: '',
			supply: 1,
		},
		validationSchema: typeSchema,
		onSubmit: value => {
			setItemName(value.itemName);
			setDescription(value.description);
			setSupply(value.supply);
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
				<Header title='NFT 발행' sx={{ marginBottom: '30px' }} />
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
									label='NFT (업로드 확장자 형식: png, jpeg, jpg, gif)'
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
								{...getFieldProps('itemName')}
								error={Boolean(touched.itemName && errors.itemName)}
								helperText={touched.itemName && errors.itemName}
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
							<FormControl>
								<InputLabel id='demo-simple-select-label'>커뮤니티</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={community}
									label='Community'
									onChange={handleChangeSelect}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
							<Box maxWidth='150px'>
								<TextField
									type='number'
									label='갯수'
									{...getFieldProps('supply')}
									error={Boolean(touched.supply && errors.supply)}
									helperText={touched.supply && errors.supply}
								/>
							</Box>

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

export default CreateItem;
