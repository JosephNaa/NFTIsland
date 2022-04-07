import { useState } from 'react';
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
	CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfiniteScroll from 'react-infinite-scroller';
import Page from '../components/Page';
import CommunityCard from '../layouts/market/CommunityCard';
import { getCommunityListAPI } from '../api/community';

function Community() {
	const [itemInfo, setItemInfo] = useState({
		temp_keyword: '',
		keyword: '',
		communityList: [],
		hasMoreItems: true,
		filterOption: 'newest',
	});

	const handleKeywordChange = e => {
		setItemInfo(prev => ({ ...prev, temp_keyword: e.target.value }));
	};

	const getCommunityList = async (keyword, page, key) => {
		const { data } = await getCommunityListAPI(keyword, page, 12, key);
		return data;
	};

	const loadItems = async page => {
		const data = await getCommunityList(
			itemInfo.keyword,
			page,
			itemInfo.filterOption
		);
		setItemInfo(prev => ({
			...prev,
			communityList: prev.communityList.concat(data),
			hasMoreItems: !!data.length,
		}));
	};

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
								onChange={handleKeywordChange}
							/>
							<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
							<IconButton
								sx={{ p: '10px' }}
								onClick={() => {
									if (itemInfo.keyword === itemInfo.temp_keyword) {
										return;
									}
									setItemInfo(prev => ({
										...prev,
										keyword: prev.temp_keyword,
										communityList: [],
										hasMoreItems: true,
									}));
								}}
							>
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
						<Button
							onClick={() => {
								if (itemInfo.filterOption === 'newest') {
									return;
								}
								setItemInfo(prev => ({
									...prev,
									filterOption: 'newest',
									keyword: prev.temp_keyword,
									communityList: [],
									hasMoreItems: true,
								}));
							}}
						>
							<Typography
								sx={
									itemInfo.filterOption === 'newest'
										? { fontWeight: 'bold' }
										: { fontWeight: 'regular' }
								}
							>
								최신순
							</Typography>
						</Button>
						<Divider sx={{ height: 18 }} orientation='vertical' />
						<Button
							onClick={() => {
								if (itemInfo.filterOption === 'member') {
									return;
								}
								setItemInfo(prev => ({
									...prev,
									filterOption: 'member',
									keyword: prev.temp_keyword,
									communityList: [],
									hasMoreItems: true,
								}));
							}}
						>
							<Typography
								sx={
									itemInfo.filterOption === 'member'
										? { fontWeight: 'bold' }
										: { fontWeight: 'regular' }
								}
							>
								회원 많은순
							</Typography>
						</Button>
						<Divider sx={{ height: 18 }} orientation='vertical' />
						<Button
							onClick={() => {
								if (itemInfo.filterOption === 'board') {
									return;
								}
								setItemInfo(prev => ({
									...prev,
									filterOption: 'board',
									keyword: prev.temp_keyword,
									communityList: [],
									hasMoreItems: true,
								}));
							}}
						>
							<Typography
								sx={
									itemInfo.filterOption === 'board'
										? { fontWeight: 'bold' }
										: { fontWeight: 'regular' }
								}
							>
								게시글 많은순
							</Typography>
						</Button>
					</Stack>

					<InfiniteScroll
						pageStart={0}
						key={`${itemInfo.filterOption}-${itemInfo.keyword}`}
						loadMore={loadItems}
						hasMore={itemInfo.hasMoreItems}
						loader={
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									m: 4,
								}}
								key={0}
							>
								<CircularProgress />
							</Box>
						}
					>
						<Box
							sx={
								!itemInfo.communityList.length && !itemInfo.hasMoreItems
									? { p: 16 }
									: { visibility: 'hidden' }
							}
							display='flex'
							alignItems='center'
							justifyContent='center'
						>
							<Typography sx={{ fontWeight: 'light' }} variant='h3'>
								There are no items
							</Typography>
						</Box>
						<Grid container spacing={4}>
							{itemInfo.communityList.map(item => (
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
					</InfiniteScroll>
				</Stack>
			</Container>
		</Page>
	);
}

export default Community;
