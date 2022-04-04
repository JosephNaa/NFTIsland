import { useState } from 'react';
import { Box, Grid, FormControl, Select, MenuItem } from '@mui/material';
import ItemCard from './ItemCard';

function SellingTab() {
	const [category, setCategory] = useState('');
	const handleCategoryChange = event => {
		setCategory(event.target.value);
	};

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
		</>
	);
}

export default SellingTab;
