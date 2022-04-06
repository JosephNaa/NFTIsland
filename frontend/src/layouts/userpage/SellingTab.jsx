import { useState } from 'react';
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

SellingTab.propTypes = {
	userName: PropTypes.string.isRequired,
};

function SellingTab({ userName }) {
	const [category, setCategory] = useState('All');
	const [itemInfo, setItemInfo] = useState({
		BadgeList: [],
		hasMoreItems: true,
	});

	const handleCategoryChange = event => {
		setCategory(event.target.value);
	};

	const loadItems = async page => {
		const { data } = await getMyOwnItemByNickname(
			'nickname',
			userName,
			true,
			page,
			12
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

export default SellingTab;
