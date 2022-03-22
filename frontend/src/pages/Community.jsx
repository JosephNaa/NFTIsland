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
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Page from '../components/Page';

function Community() {
	return (
		<Page title='Community' maxWidth='100%' minHeight='100%' display='flex'>
			<Container>
				<Stack spacing={2}>
					<Box>
						<Typography variant='h3'>나의 컬렉션</Typography>
						<Divider sx={{ mb: 3 }} />
						<Stack direction='row' spacing={2}>
							<Card>
								<CardMedia component='img' image='https://picsum.photos/96/96' alt='' />
							</Card>
							<Card>
								<CardMedia component='img' image='https://picsum.photos/96/96' alt='' />
							</Card>
							<Card>
								<CardMedia component='img' image='https://picsum.photos/96/96' alt='' />
							</Card>
							<Card>
								<CardMedia component='img' image='https://picsum.photos/96/96' alt='' />
							</Card>
						</Stack>
					</Box>
					<Box>
						<Typography variant='h3'>커뮤니티 랭킹</Typography>
						<Divider sx={{ mb: 3 }} />
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Card>
									<CardContent>
										<Typography>암호화폐</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={6}>
								<Card>
									<CardContent>
										<Typography>IT 교육</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={6}>
								<Card>
									<CardContent>
										<Typography>IT 커뮤니티</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={6}>
								<Card>
									<CardContent>
										<Typography>기업</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Box>
					<Box>
						<Typography variant='h3'>커뮤니티 검색</Typography>
						<Divider sx={{ mb: 3 }} />
						<Stack spacing={2}>
							<Paper
								variant='outlined'
								sx={{
									p: '2px 4px',
									display: 'flex',
									alignItems: 'center',
									width: '100%',
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
							<Stack direction='row' spacing={1}>
								<Chip label='IT 커뮤니티' variant='outlined' />
								<Chip label='암호화폐' variant='outlined' />
							</Stack>
							<Stack spacing={2}>
								<Card>
									<CardContent>
										<Typography>암호화폐</Typography>
									</CardContent>
								</Card>
								<Card>
									<CardContent>
										<Typography>IT 커뮤니티</Typography>
									</CardContent>
								</Card>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Container>
		</Page>
	);
}

export default Community;
