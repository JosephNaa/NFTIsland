/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useState, useEffect } from 'react';
import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Page from '../components/Page';
import CommunityCard from '../layouts/market/CommunityCard';
import { getCommunityListAPI } from '../api/community';

function Community() {
	const [communityList, setCommunityList] = useState([]);
	const [filterOption, setFilterOption] = useState('newest');

	const getCommunityList = async key => {
		const { data } = await getCommunityListAPI(1, 10, key);
		setCommunityList(_prev => data);
		setFilterOption(_prev => key);
	};

	useEffect(() => {
		getCommunityList('newest');
	}, []);

	return (
		<Page title='Community' maxWidth='100%' minHeight='100%' display='flex'>
			<Container>
				<Stack spacing={2}>
					<Stack direction='row'>
						<Box sx={{ flexGrow: 1 }} />
						<Paper
							variant='outlined'
							sx={{
								p: '2px 4px',
								display: 'flex',
								alignItems: 'center',
								flexGrow: 2,
							}}
						>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder='커뮤니티 이름을 입력하세요.'
							/>
							<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
							<IconButton type='submit' sx={{ p: '10px' }}>
								<SearchIcon />
							</IconButton>
						</Paper>
						<Box sx={{ flexGrow: 1 }} />
					</Stack>
					<Stack
						sx={{ justifyContent: 'center', alignItems: 'center' }}
						direction='row'
						spacing={1}
					>
						<Button onClick={() => getCommunityList('newest')}>
							<Typography
								sx={
									filterOption === 'newest'
										? { fontWeight: 'bold' }
										: { fontWeight: 'regular' }
								}
							>
								최신순
							</Typography>
						</Button>
						<Divider sx={{ height: 18 }} orientation='vertical' />
						<Button onClick={() => getCommunityList('member')}>
							<Typography
								sx={
									filterOption === 'member'
										? { fontWeight: 'bold' }
										: { fontWeight: 'regular' }
								}
							>
								회원 많은순
							</Typography>
						</Button>
						<Divider sx={{ height: 18 }} orientation='vertical' />
						<Button onClick={() => getCommunityList('board')}>
							<Typography
								sx={
									filterOption === 'board'
										? { fontWeight: 'bold' }
										: { fontWeight: 'regular' }
								}
							>
								게시글 많은순
							</Typography>
						</Button>
					</Stack>
					<Grid container spacing={4}>
						{communityList.map(item => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
								<CommunityCard
									onClickURL={`/community/${item.id}`}
									communityName={item.name}
									communityDescription={item.description}
									communityHost={item.host_nick_name}
									communityLogo={item.logo_path}
									hostProfile={item.host_profile}
								/>
							</Grid>
						))}
					</Grid>
				</Stack>
			</Container>
		</Page>
	);
}

export default Community;
