import { useState, useRef, useEffect, useContext } from 'react';
import {
	Container,
	Stack,
	Box,
	TextField,
	Divider,
	Button,
	CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../layouts/PageHeader';
import Page from '../components/Page';
import { getImageURL, saveItemInfo } from '../api/item';
import { getBoardsAPI } from '../api/board';
import UserContext from '../context/UserContext';
import { nftContract } from '../web3Config';

function CreateItem() {
	const imageSelect = useRef();
	const navigate = useNavigate();
	const params = useParams();
	const userContext = useContext(UserContext);

	const [image, setImage] = useState('');
	const [imageName, setImageName] = useState('');
	// const [itemName, setItemName] = useState('');
	// const [description, setDescription] = useState('');
	// const [supply, setSupply] = useState(1);
	// const [community, setCommunity] = useState('');
	const [communityName, setCommunityName] = useState('');
	const [payable, setPayable] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getBoardsAPI(params.communityId).then(({ data }) => {
			setPayable(data.payable);
			setCommunityName(data.name);
		});
	}, []);

	// const handleChangeSelect = event => {
	// 	setCommunity(event.target.value);
	// };

	// 타이핑 헬퍼
	const typeSchema = Yup.object().shape({
		itemName: Yup.string().required('NFT 이름 입력해주세요.'),
		description: Yup.string().required('NFT 설명을 입력해주세요.'),
		supply: Yup.number()
			.required('NFT 갯수를 입력해주세요.')
			.positive('0보다 커야합니다.')
			.lessThan(10)
			.integer(),
	});

	const formik = useFormik({
		initialValues: {
			itemName: '',
			description: '',
			supply: 1,
		},
		validationSchema: typeSchema,
		onSubmit: async value => {
			const formData = new FormData();
			formData.append('file', image);
			setLoading(true);
			try {
				// S3이미지 URL 받아오기
				const res = await getImageURL(formData);
				// SC로 NFT 발행하기
				const { events } = await nftContract.methods
					.create(userContext.loggedUser.account, res.data, payable, value.supply)
					.send({ from: userContext.loggedUser.account });
				// 백엔드에 토큰정보 저장하기
				await saveItemInfo({
					token_ids: events.CreatedTokenIds.returnValues.tokenIdArray,
					owner_address: userContext.loggedUser.account,
					community_id: params.communityId,
					item_description: value.description,
					// 스마트컨트랙트에서 받아오기
					item_title: value.itemName,
					item_url: res.data,
				});
				navigate(`/user/${userContext.loggedUser.nickname}`);
			} catch (error) {
				console.dir(error);
			}
			setLoading(false);
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

	return (
		<Page>
			{loading && (
				<Box
					sx={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						zIndex: 999,
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						<Stack alignItems='center'>
							<CircularProgress />
							<Box mt='10px'>NFT 발행중...</Box>
						</Stack>
					</Box>
				</Box>
			)}
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
							{/* <FormControl>
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
							</FormControl> */}
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
