import { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import Page from '../components/Page';
import CommunityCard from '../layouts/market/CommunityCard';
import { getSalesCommunity } from '../api/market';

function Market() {
	const [communityList, setCommunityList] = useState([]);

	useEffect(() => {
		getSalesCommunity().then(({ data }) => {
			console.log(data);
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
						<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3} key={item.id}>
							<CommunityCard
								onClickURL={`/market/community/${item.id}`}
								communityName={item.name}
								communityDescription={item.description}
								communityHost={item.host_nick_name}
								communityLogo={item.logo_path}
								hostProfile={item.host_profile}
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
