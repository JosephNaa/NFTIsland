import { Container, Typography } from '@mui/material';
import Page from '../components/Page';
import MarketCard from '../layouts/market/MarketCard';

function Market() {
	return (
		<Page>
			<Typography variant='h2' align='center'>
				Explore Collections
			</Typography>
			<hr />
			<Container maxWidth='xl'>
				<div>Market</div>
				<MarketCard />
				<MarketCard />
			</Container>
		</Page>
	);
}

export default Market;
