import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Grid,
	Typography,
	FormControl,
	Select,
	MenuItem,
	CircularProgress,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import ItemCard from './ItemCard';
import { getMyOwnItemByNickname } from '../../api/item';
import { getUserCommunityListAPI } from '../../api/user';

BadgeTab.propTypes = {
	userName: PropTypes.string.isRequired,
};

function BadgeTab({ userName }) {
	const [itemInfo, setItemInfo] = useState({
		category: undefined,
		categoryList: [],
		BadgeList: [],
		hasMoreItems: true,
	});

	const handleCategoryChange = event => {
		setItemInfo(prev => ({
			...prev,
			BadgeList: [],
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

	useEffect(async () => {
		const data = await getUserCommunityList();
		setItemInfo(prev => ({
			...prev,
			categoryList: prev.categoryList.concat(data),
		}));
	}, []);

	const loadItems = async page => {
		const { data } = await getMyOwnItemByNickname(
			'nickname',
			userName,
			false,
			page,
			12,
			itemInfo.category
		);
		setItemInfo(prev => ({
			...prev,
			BadgeList: prev.BadgeList.concat(data),
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
						!itemInfo.BadgeList.length && !itemInfo.hasMoreItems
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
					{itemInfo.BadgeList.map(item => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={item.token_id}>
							<ItemCard
								tokenId={item.token_id}
								communityName={item.community_name}
								itemName={item.item_title}
								itemURL={item.item_url}
							/>
						</Grid>
					))}
				</Grid>
			</InfiniteScroll>
		</>
	);
}

export default BadgeTab;
