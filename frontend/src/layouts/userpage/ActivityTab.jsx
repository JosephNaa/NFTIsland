import { useState, useEffect } from 'react';
import {
	Box,
	Grid,
	Typography,
	FormControl,
	Select,
	MenuItem,
	CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import PostCard from './PostCard';
import {
	getUserActivityListAPI,
	getUserCommunityListAPI,
} from '../../api/user';

ActivityTab.propTypes = {
	userName: PropTypes.string.isRequired,
};

function ActivityTab({ userName }) {
	const [itemInfo, setItemInfo] = useState({
		category: undefined,
		categoryList: [],
		activityList: [],
		hasMoreItems: true,
	});

	const handleCategoryChange = event => {
		setItemInfo(prev => ({
			...prev,
			activityList: [],
			hasMoreItems: true,
			category: event.target.value,
		}));
	};

	const getUserCommunityList = async () => {
		const { data } = await getUserCommunityListAPI(
			'nickname',
			userName,
			false,
			1,
			99
		);
		return data;
	};

	const getUserActivityList = async page => {
		const { data } = await getUserActivityListAPI(
			'nickname',
			userName,
			page,
			12,
			itemInfo.category
		);
		return data;
	};

	useEffect(async () => {
		const data = await getUserCommunityList();
		setItemInfo(prev => ({
			...prev,
			categoryList: prev.categoryList.concat(data),
		}));
	}, []);

	const loadItems = async page => {
		const data = await getUserActivityList(page);
		setItemInfo(prev => ({
			...prev,
			activityList: prev.activityList.concat(data),
			hasMoreItems: !!data.length,
		}));
	};

	return (
		<>
			<Box>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<Select
						value={itemInfo.category}
						onChange={handleCategoryChange}
						displayEmpty
					>
						<MenuItem value={undefined}>All</MenuItem>
						{itemInfo.categoryList.map(item => (
							<MenuItem value={item.id}>{item.name}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<InfiniteScroll
				pageStart={0}
				key={itemInfo.category}
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
						!itemInfo.activityList.length && !itemInfo.hasMoreItems
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
					{itemInfo.activityList.map(item => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
							<PostCard
								onClickURL={`/community/${item.community_id}/${item.id}`}
								postId={item.id}
								communityId={item.community_id}
								communityName={item.community_name}
								postTitle={item.title}
								postContent={item.content}
								userName={item.nick_name}
								commentCount={item.comment_count}
								likeCount={item.likes_count}
								createdDate={item.created_at}
								userProfile={item.user_profile}
							/>
						</Grid>
					))}
				</Grid>
			</InfiniteScroll>
		</>
	);
}

export default ActivityTab;
