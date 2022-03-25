import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Stack,
	Container,
	Typography,
	Grid,
	Tabs,
	Tab,
	FormHelperText,
	FormControl,
	Select,
	MenuItem,
} from '@mui/material';

import {
	Person as PersonIcon,
	Search as SearchIcon,
	Add as AddIcon,
	Edit as EditIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import CommunityCard from '../layouts/mypage/CommunityCard';
import ItemCard from '../layouts/mypage/ItemCard';
import PostCard from '../layouts/mypage/PostCard';

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
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
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

function MyPage() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const navigate = useNavigate();

	const onClickImgModify = () => {
		navigate('/mypage');
		console.log('이미지 수정버튼 클릭');
	};

	const onClickNameModify = () => {
		navigate('/mypage');
		console.log('닉네임 수정버튼 클릭');
	};

	const [category, setCategory] = useState('');

	const handleCategoryChange = event => {
		setCategory(event.target.value);
	};

	const [activity, setActivity] = useState('');

	const handleActivityChange = event => {
		setActivity(event.target.value);
	};

	return (
		<Page>
			<Container>
				<Box display='flex' alignItems='center' justifyContent='center' mb='2%'>
					<Stack direction='row'>
						<Avatar sx={{ width: 140, height: 140 }}>
							<img
								alt=''
								src='https://blog.kakaocdn.net/dn/bTEhUV/btqECug9iOs/mxgZUk4MLJVCK3xtcNe6NK/img.jpg'
							/>
							{/* 사용자 이미지 */}
						</Avatar>
						<Box pt='110px'>
							<EditIcon sx={{ width: 15, height: 15 }} onClick={onClickImgModify} />
						</Box>
					</Stack>
				</Box>
				<Box display='flex' alignItems='center' justifyContent='center'>
					<Stack direction='row' spacing={1} mb='10px'>
						<Typography variant='h4'>
							hhhhhhhdong
							{/* 사용자 닉네임 */}
						</Typography>
						<Box pt='10px'>
							<EditIcon sx={{ width: 15, height: 15 }} onClick={onClickNameModify} />
						</Box>
					</Stack>
				</Box>
				<Typography mb='10px' align='center'>
					0x394...3923
					{/* 지갑주소 */}
				</Typography>
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
						<Box maxWidth='xl' sx={{ pt: '30px' }}>
							<Grid container spacing={6}>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<CommunityCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<CommunityCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<CommunityCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<CommunityCard />
								</Grid>
							</Grid>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Box>
							<FormControl sx={{ m: 1, minWidth: 120 }}>
								<Select value={category} onChange={handleCategoryChange} displayEmpty>
									<MenuItem value=''>
										<em>Community</em>
									</MenuItem>
									{/* 가입된 커뮤니티 목록 */}
									<MenuItem value='All'>All</MenuItem>
									<MenuItem value='가입된 커뮤니티1'>가입된 커뮤니티1</MenuItem>
									<MenuItem value='가입된 커뮤니티2'>가입된 커뮤니티2</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box maxWidth='xl' sx={{ pt: '30px' }}>
							<Grid container spacing={6}>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<ItemCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<ItemCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<ItemCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<ItemCard />
								</Grid>
							</Grid>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Box>
							<FormControl sx={{ m: 1, minWidth: 120 }}>
								<Select value={category} onChange={handleCategoryChange} displayEmpty>
									<MenuItem value=''>
										<em>Community</em>
									</MenuItem>
									{/* 가입된 커뮤니티 목록 */}
									<MenuItem value='All'>All</MenuItem>
									<MenuItem value='가입된 커뮤니티1'>가입된 커뮤니티1</MenuItem>
									<MenuItem value='가입된 커뮤니티2'>가입된 커뮤니티2</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box maxWidth='xl' sx={{ pt: '30px' }}>
							<Grid container spacing={6}>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<PostCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<PostCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<PostCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<PostCard />
								</Grid>
							</Grid>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Box maxWidth='xl' sx={{ pt: '30px' }}>
							<Grid container spacing={6}>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<CommunityCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<CommunityCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<CommunityCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<CommunityCard />
								</Grid>
							</Grid>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={4}>
						<Box>
							<FormControl sx={{ m: 1, minWidth: 120 }}>
								<Select value={category} onChange={handleCategoryChange} displayEmpty>
									<MenuItem value=''>
										<em>Community</em>
									</MenuItem>
									{/* 가입된 커뮤니티 목록 */}
									<MenuItem value='All'>All</MenuItem>
									<MenuItem value='가입된 커뮤니티1'>가입된 커뮤니티1</MenuItem>
									<MenuItem value='가입된 커뮤니티2'>가입된 커뮤니티2</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box maxWidth='xl' sx={{ pt: '30px' }}>
							<Grid container spacing={6}>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<ItemCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<ItemCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<ItemCard />
								</Grid>
								<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
									<ItemCard />
								</Grid>
							</Grid>
						</Box>
					</TabPanel>
				</Box>
			</Container>
		</Page>
	);
}

export default MyPage;
