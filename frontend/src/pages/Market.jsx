import { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import Page from '../components/Page';
import CommunityCard from '../layouts/market/CommunityCard';
import { getSalesCommunity } from '../api/market';

function Market() {
	const [communityList, setCommunityList] = useState([]);

	useEffect(() => {
		getSalesCommunity().then(({ data }) => {
			setCommunityList(data);
		});
	}, []);

	return (
		<Page>
			<Typography
				variant='h2'
				align='center'
				paddingTop='15px'
				paddingBottom='15px'
			>
				Explore Collections
			</Typography>
			<hr />
			<Container maxWidth='xl' sx={{ pt: '30px' }}>
				<Grid container spacing={6}>
					{communityList.map(item => (
						<Grid
							sx={{ mb: 5 }}
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={item.community_id}
						>
							<CommunityCard
								onClickURL={`/market/community/${item.community_id}`}
								communityName={item.community_name}
								communityDescription={item.community_description}
								communityHost={item.owner_nickname}
								communityLogo={item.community_logo_path}
								hostProfile={item.owner_profile_path}
							/>
						</Grid>
					))}
					{/* <Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3}>
						<CommunityCard />
					</Grid> */}
				</Grid>
			</Container>
		</Page>
	);
}

export default Market;
