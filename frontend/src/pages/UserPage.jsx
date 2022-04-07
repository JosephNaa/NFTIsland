import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Container, Tab, Tabs, Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Page from '../components/Page';
import { getUserInfoAPI } from '../api/user';
import CommunityTab from '../layouts/userpage/CommunityTab';
import BadgeTab from '../layouts/userpage/BadgeTab';
import ActivityTab from '../layouts/userpage/ActivityTab';
import MasterTab from '../layouts/userpage/MasterTab';
import SellingTab from '../layouts/userpage/SellingTab';
import UserProfileImage from '../layouts/userpage/UserProfileImage';
import UserNickName from '../layouts/userpage/UserNickName';

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
	const { userName } = useParams();
	const [userInfo, setUserInfo] = useState({ userName, currentTab: 0 });
	const [copied, setCopied] = useState('Copy');
	const navigate = useNavigate();

	const getUserInfo = async (findBy, nickname) => {
		try {
			const { data } = await getUserInfoAPI(findBy, nickname);
			setUserInfo(prev => ({
				...prev,
				userAddress: data.address,
				profileUrl: data.profile_path,
			}));
		} catch (error) {
			// console.dir(error);
			navigate('/404', { replace: true });
		}
	};

	useEffect(async () => {
		await getUserInfo('nickname', userName);
	}, []);

	const handleChange = (event, newValue) => {
		setUserInfo(prev => ({
			...prev,
			currentTab: newValue,
		}));
	};

	const copyClipboard = async text => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied('Copied!');
			setTimeout(() => {
				setCopied('Copy');
			}, 1500);
		} catch (error) {
			console.dir(error);
		}
	};

	return (
		<Page>
			<Container>
				<Box display='flex' alignItems='center' justifyContent='center' mb='2%'>
					<UserProfileImage
						address={userInfo.userAddress}
						profileUrl={userInfo.profileUrl}
					/>
				</Box>
				<Box display='flex' alignItems='center' justifyContent='center'>
					<UserNickName
						address={userInfo.userAddress}
						userName={userInfo.userName}
					/>
				</Box>
				<Box display='flex' alignItems='center' justifyContent='center'>
					<Tooltip title={copied} placement='top' arrow>
						<Chip
							icon={
								<Icon
									icon='fa-brands:ethereum'
									style={{ fontSize: '16px', marginLeft: '10px' }}
								/>
							}
							label={`${userInfo.userAddress?.slice(
								0,
								6
							)}...${userInfo.userAddress?.slice(-4)}`}
							variant='outlined'
							onClick={() => copyClipboard(userInfo.userAddress)}
						/>
					</Tooltip>
				</Box>
				<Box sx={{ width: '100%' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={userInfo.currentTab} onChange={handleChange} centered>
							<Tab label='Community' {...a11yProps(0)} style={{ minWidth: '20%' }} />
							<Tab label='Badge' {...a11yProps(1)} style={{ minWidth: '20%' }} />
							<Tab label='Activity' {...a11yProps(2)} style={{ minWidth: '20%' }} />
							<Tab label='Master' {...a11yProps(3)} style={{ minWidth: '20%' }} />
							<Tab label='Selling' {...a11yProps(4)} style={{ minWidth: '20%' }} />
						</Tabs>
					</Box>
					<TabPanel value={userInfo.currentTab} index={0}>
						<CommunityTab userName={userInfo.userName} />
					</TabPanel>
					<TabPanel value={userInfo.currentTab} index={1}>
						<BadgeTab userName={userInfo.userName} />
					</TabPanel>
					<TabPanel value={userInfo.currentTab} index={2}>
						<ActivityTab userName={userInfo.userName} />
					</TabPanel>
					<TabPanel value={userInfo.currentTab} index={3}>
						<MasterTab userName={userInfo.userName} />
					</TabPanel>
					<TabPanel value={userInfo.currentTab} index={4}>
						<SellingTab userName={userInfo.userName} />
					</TabPanel>
				</Box>
			</Container>
		</Page>
	);
}

export default UserPage;
