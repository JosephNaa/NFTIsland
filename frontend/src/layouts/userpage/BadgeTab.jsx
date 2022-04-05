import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, FormControl, Select, MenuItem } from '@mui/material';
import ItemCard from './ItemCard';
import { getMyOwnItemByNickname } from '../../api/item';

BadgeTab.propTypes = {
	userName: PropTypes.string.isRequired,
};

function BadgeTab({ userName }) {
	const [category, setCategory] = useState('');
	const [badges, setBadges] = useState([]);
	const handleCategoryChange = event => {
		setCategory(event.target.value);
	};

	useEffect(() => {
		getMyOwnItemByNickname(userName).then(({ data }) => {
			setBadges(data);
		});
	}, []);

	return (
		<>
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
					{badges.map(item => (
						<Grid
							sx={{ mb: 5 }}
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={item.token_id}
						>
							<ItemCard
								tokenId={item.token_id}
								communityName={item.community_name}
								itemName={item.item_title}
								itemURL={item.item_url}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
}

export default BadgeTab;
