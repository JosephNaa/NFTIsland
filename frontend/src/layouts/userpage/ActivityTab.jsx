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
import { getUserActivityListAPI } from '../../api/user';

ActivityTab.propTypes = {
	userName: PropTypes.string.isRequired,
};

function ActivityTab({ userName }) {
	const [category, setCategory] = useState('All');
	const [itemInfo, setItemInfo] = useState({
		activityList: [],
		hasMoreItems: true,
	});

	const handleCategoryChange = event => {
		setCategory(event.target.value);
	};

	const getUserActivityList = async page => {
		const { data } = await getUserActivityListAPI('nickname', userName, page, 12);
		return data;
	};

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
					<Select value={category} onChange={handleCategoryChange} displayEmpty>
						{/* 가입된 커뮤니티 목록 */}
						<MenuItem value='All'>All</MenuItem>
						<MenuItem value='가입된 커뮤니티1'>가입된 커뮤니티1</MenuItem>
						<MenuItem value='가입된 커뮤니티2'>가입된 커뮤니티2</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<InfiniteScroll
				pageStart={0}
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
							/>
						</Grid>
					))}
				</Grid>
			</InfiniteScroll>
		</>
	);
}

export default ActivityTab;
