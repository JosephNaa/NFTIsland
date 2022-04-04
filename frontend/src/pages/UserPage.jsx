/* eslint-disable camelcase */
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Chip,
	Stack,
	Container,
	Typography,
	Tab,
	Tabs,
	DialogTitle,
	Dialog,
	DialogContent,
	Button,
	TextField,
} from '@mui/material';

import { Edit as EditIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../components/Page';
import { getUserInfoAPI } from '../api/user';
import CommunityTab from '../layouts/userpage/CommunityTab';
import BadgeTab from '../layouts/userpage/BadgeTab';
import ActivityTab from '../layouts/userpage/ActivityTab';
import MasterTab from '../layouts/userpage/MasterTab';
import SellingTab from '../layouts/userpage/SellingTab';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function UserPage() {
	const [value, setValue] = useState(0);
	const [userAddress, setUserAddress] = useState('');
	const [profileUrl, setProfileUrl] = useState('');

	const imageSelect = useRef();
	const [image, setImage] = useState('');
	const [imageName, setImageName] = useState('');

	// 다이얼로그
	const [imgOpen, setImgOpen] = useState(false);
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState('');

	const { userName } = useParams();
	const navigate = useNavigate();

	const getUserInfo = async (findBy, nickname) => {
		try {
			const { data } = await getUserInfoAPI(findBy, nickname);
			setUserAddress(_prev => data.address);
			setProfileUrl(_prev => data.profile_path);
		} catch (error) {
			console.dir(error);
			navigate('/404', { replace: true });
		}
	};

	useEffect(async () => {
		await getUserInfo('nickname', userName);
	}, []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const onClickImgModify = () => {
		setImgOpen(true);
		console.log('이미지 수정버튼 클릭');
	};

	const onClickNameModify = () => {
		setNameOpen(true);
		console.log('닉네임 수정버튼 클릭');
	};

	const handleClose = () => {
		setImgOpen(false);
		setNameOpen(false);
	};

	const handleImgModify = () => {
		// 이미지 변경 PUT API
		setImgOpen(false);
	};

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

	const handleNameChange = event => {
		setName(event.target.value);
	};

	const handleNameModify = () => {
		// 닉네임 변경 PUT API
		console.log(name);
		setNameOpen(false);
	};

	return (
		<Page>
			<Container>
				<Box display='flex' alignItems='center' justifyContent='center' mb='2%'>
					<Stack direction='row'>
						<Avatar src={profileUrl} sx={{ width: 140, height: 140 }} />
						<Box pt='110px'>
							<EditIcon sx={{ width: 15, height: 15 }} onClick={onClickImgModify} />
						</Box>
						<Dialog open={imgOpen} onClose={handleClose}>
							<DialogTitle id='alert-dialog-title'>
								<Typography
									fontSize='14px'
									textalign='center'
									sx={{ fontWeight: 'bold' }}
								>
									프로필 이미지 변경
								</Typography>
							</DialogTitle>
							<DialogContent>
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
										sx={{ width: '100%' }}
										type='text'
										label='업로드 확장자 형식: png, jpeg, jpg, gif'
										value={imageName}
										disabled
										fontSize='10px'
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
								<Stack
									direction='row'
									pl='20px'
									pr='20px'
									justifyContent='center'
									mt='10px'
									spacing={1}
								>
									<Button size='small' variant='contained' onClick={handleImgModify}>
										Modify
									</Button>
									<Button size='small' variant='outlined' onClick={handleClose}>
										Cancel
									</Button>
								</Stack>
							</DialogContent>
						</Dialog>
					</Stack>
				</Box>
				<Box display='flex' alignItems='center' justifyContent='center'>
					<Stack direction='row' spacing={1} mb='10px'>
						<Typography variant='h4'>{userName}</Typography>
						<Box pt='10px'>
							<EditIcon sx={{ width: 15, height: 15 }} onClick={onClickNameModify} />
						</Box>
					</Stack>
					<Dialog open={nameOpen} onClose={handleClose}>
						<DialogTitle id='alert-dialog-title'>
							<Typography fontSize='14px' textalign='center'>
								<b>닉네임 변경</b>
							</Typography>
						</DialogTitle>
						<DialogContent>
							<TextField
								sx={{ width: '100%' }}
								type='text'
								onChange={handleNameChange}
								fontSize='10px'
							/>
							<Stack
								direction='row'
								pl='20px'
								pr='20px'
								justifyContent='center'
								mt='10px'
								spacing={1}
							>
								<Button size='small' variant='contained' onClick={handleNameModify}>
									Modify
								</Button>
								<Button size='small' variant='outlined' onClick={handleClose}>
									Cancel
								</Button>
							</Stack>
						</DialogContent>
					</Dialog>
				</Box>
				<Box display='flex' alignItems='center' justifyContent='center'>
					<Chip label={userAddress} variant='outlined' onClick={() => {}} />
				</Box>
				<Box sx={{ width: '100%' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={value} onChange={handleChange} centered>
							<Tab label='Community' {...a11yProps(0)} style={{ minWidth: '20%' }} />
							<Tab label='Badge' {...a11yProps(1)} style={{ minWidth: '20%' }} />
							<Tab label='Activity' {...a11yProps(2)} style={{ minWidth: '20%' }} />
							<Tab label='Master' {...a11yProps(3)} style={{ minWidth: '20%' }} />
							<Tab label='Selling' {...a11yProps(4)} style={{ minWidth: '20%' }} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<CommunityTab userName={userName} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<BadgeTab />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<ActivityTab />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<MasterTab />
					</TabPanel>
					<TabPanel value={value} index={4}>
						<SellingTab />
					</TabPanel>
				</Box>
			</Container>
		</Page>
	);
}

export default UserPage;
