import { Box, Grid } from '@mui/material';
import CommunityCard from '../market/CommunityCard';

function CommunityTab() {
	return (
		<Box maxWidth='xl' sx={{ pt: '30px' }}>
			<Grid container spacing={6}>
				<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
					<CommunityCard />
				</Grid>
				<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
					<CommunityCard />
				</Grid>
				<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
					<CommunityCard />
				</Grid>
				<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
					<CommunityCard />
				</Grid>
			</Grid>
		</Box>
	);
}

export default CommunityTab;
