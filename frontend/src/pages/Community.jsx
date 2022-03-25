import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Container,
	Divider,
	Grid,
	IconButton,
	InputBase,
	Link,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Page from '../components/Page';
import CommunityCard from '../layouts/market/CommunityCard';

function Community() {
	return (
		<Page title='Community' maxWidth='100%' minHeight='100%' display='flex'>
			<Container>
				<Stack spacing={2}>
					<Stack direction='row'>
						<Box sx={{ flexGrow: 1 }} />
						<Paper
							variant='outlined'
							sx={{
								p: '2px 4px',
								display: 'flex',
								alignItems: 'center',
								flexGrow: 2,
							}}
						>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder='커뮤니티 이름을 입력하세요.'
							/>
							<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
							<IconButton type='submit' sx={{ p: '10px' }}>
								<SearchIcon />
							</IconButton>
						</Paper>
						<Box sx={{ flexGrow: 1 }} />
					</Stack>
					<Stack
						sx={{ justifyContent: 'center', alignItems: 'center' }}
						direction='row'
						spacing={1}
					>
						<Link href='#1'>가나다순</Link>
						<Divider sx={{ height: 18 }} orientation='vertical' />
						<Link href='#2'>최신순</Link>
						<Divider sx={{ height: 18 }} orientation='vertical' />
						<Link href='#3'>회원 많은순</Link>
						<Divider sx={{ height: 18 }} orientation='vertical' />
						<Link href='#4'>게시글 많은순</Link>
					</Stack>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CommunityCard onClickURL='/community/a' />
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CommunityCard onClickURL='/community/a' />
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CommunityCard onClickURL='/community/a' />
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CommunityCard onClickURL='/community/a' />
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CommunityCard onClickURL='/community/a' />
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CommunityCard onClickURL='/community/a' />
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CommunityCard onClickURL='/community/a' />
						</Grid>
					</Grid>
				</Stack>
			</Container>
		</Page>
	);
}

export default Community;
