import { useState } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import CommunityCard from '../market/CommunityCard';
import { getUserCommunityListAPI } from '../../api/user';

CommunityTab.propTypes = {
	userName: PropTypes.string.isRequired,
};

function CommunityTab({ userName }) {
	const [itemInfo, setItemInfo] = useState({
		communityList: [],
		hasMoreItems: true,
	});

	const getUserCommunityList = async page => {
		const { data } = await getUserCommunityListAPI(
			'nickname',
			userName,
			false,
			page,
			12
		);
		return data;
	};

	const loadItems = async page => {
		const data = await getUserCommunityList(page);
		setItemInfo(prev => ({
			...prev,
			communityList: prev.communityList.concat(data),
			hasMoreItems: !!data.length,
		}));
	};

	return (
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
	);
}

export default CommunityTab;
