import { useEffect, useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import {
	Avatar,
	Box,
	Button,
	Stack,
	Container,
	Typography,
	Grid,
	Paper,
	InputBase,
	Divider,
	IconButton,
} from '@mui/material';
import {
	Person as PersonIcon,
	Search as SearchIcon,
	Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../components/Page';
import PostCard from '../layouts/community-detail/PostCard';
import UserContext from '../context/UserContext';
import { getBoardsAPI } from '../api/board';
import { getHasItem } from '../api/item';
import PageHeder from '../layouts/PageHeader';

function CommunityDetail() {
	const theme = useTheme();
	const navigate = useNavigate();
	const params = useParams();
	const [search, setSearch] = useState('');
	const [prevSearch, setPrevSearch] = useState('');
	const [boards, setBoards] = useState();
	const [communityInfo, setCommunityInfo] = useState({
		hostAddress: '',
		hostNickname: '',
		hostProfile: '',
		communityDes: '',
		communityName: '',
		communityLogo: '',
	});
	const { loggedUser } = useContext(UserContext);
	const [has, setHas] = useState();
	// nft 발행 버튼 master 인 지 확인
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		getBoardsAPI(params.communityId).then(({ data }) => {
			setBoards(data.boards);
			setCommunityInfo({
				hostAddress: data.host_address,
				hostNickname: data.host_nick_name,
				hostProfile: '',
				communityDes: data.description,
				communityName: data.name,
				communityLogo: data.logo_path,
				payable: data.payable,
			});
			if (data.host_address === loggedUser.account) {
				setVisible(true);
			}
		});
		getHasItem({
			address: loggedUser.account,
			community_id: params.communityId,
		}).then(res => {
			setHas(res.data);
		});
	}, []);

	const onClickButton = () => {
		if (has === true) {
			navigate(`/community/postwrite/${params.communityId}`);
		}
		if (has === false) {
			alert('게시글 작성 권한이 없습니다.');
		}
	};

	const onClickNick = () => {
		navigate(`/user/${communityInfo.hostNickname}`);
	};

	const onClickNFTBtn = () => {
		navigate(`/create/item/${params.communityId}`);
	};

	const onClickMarket = () => {
		navigate(`/market/community/${params.communityId}`);
	};

	const onChangeSearch = e => {
		setSearch(e.target.value);
	};

	const onClickSearch = () => {
		if (search === prevSearch) return;
		setPrevSearch(search);
		getBoardsAPI(params.communityId, search).then(({ data }) => {
			setBoards(data.boards);
		});
	};

	return (
		<Page>
			<Container>
				<PageHeder title='커뮤니티 상세' />
				<Box ml='10%' mr='10%' mt='3%' mb='3%'>
					<Stack direction='row' justifyContent='space-between'>
						<Stack direction='column' alignItems='center' width='30%'>
							{/* 커뮤니티 이미지 */}
							<Box
								sx={{
									borderRadius: '15px',
									overflow: 'hidden',
									boxShadow: '10',
								}}
							>
								<img
									src={communityInfo.communityLogo}
									alt=''
									style={{ height: '300px', width: '400px', objectFit: 'scale-down' }}
								/>
							</Box>
						</Stack>
						<Stack direction='column' width='60%'>
							{/* 커뮤니티 이름 */}
							<Typography variant='h2'>
								<b>{communityInfo.communityName}</b>
							</Typography>
							<Stack direction='row'>
								<Typography fontSize='12px'>Owned by</Typography>
								<Typography
									ml='3px'
									fontSize='12px'
									color={theme.palette.info.dark}
									onClick={onClickNick}
									sx={{ cursor: 'pointer' }}
								>
									{/* 커뮤니티장 닉네임 */}
									{communityInfo.hostNickname}
								</Typography>
							</Stack>
							{/* 커뮤니티 설명 */}
							<Box
								sx={{
									mt: '5px',
									whiteSpace: 'normal',
									width: '100%',
									wordBreak: 'break-all',
									height: '70%',
								}}
							>
								<Typography mt='2%'>{communityInfo.communityDes}</Typography>
							</Box>
							{visible && (
								<Button
									sx={{
										mt: '2%',
										width: '100px',
										fontSize: '12px',
										alignContent: 'center',
									}}
									size='small'
									variant='contained'
									disableElevation
									onClick={onClickNFTBtn}
								>
									NFT 발행
								</Button>
							)}
							{communityInfo?.payable && (
								<Button
									sx={{
										mt: '2%',
										width: '100px',
										fontSize: '12px',
										alignContent: 'center',
									}}
									size='small'
									variant='contained'
									disableElevation
									onClick={onClickMarket}
								>
									Market
								</Button>
							)}
						</Stack>
					</Stack>
				</Box>
				<Box mt='5%' mb='3%'>
					<Stack direction='row'>
						<Paper
							component='form'
							variant='outlined'
							sx={{
								mr: '2%',
								p: '2px 4px',
								display: 'flex',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder=''
								inputProps={{ 'aria-label': 'search google maps' }}
								value={search}
								onChange={onChangeSearch}
							/>
							<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
							<IconButton
								type='button'
								onClick={onClickSearch}
								sx={{ p: '10px' }}
								aria-label='search'
							>
								<SearchIcon />
							</IconButton>
						</Paper>
						<Button
							sx={{ width: '30%' }}
							variant='contained'
							disableElevation
							endIcon={<AddIcon />}
							onClick={onClickButton}
						>
							게시글 생성
						</Button>
					</Stack>
				</Box>
				<Box maxWidth='xl' sx={{ pt: '30px' }}>
					<Grid container spacing={6}>
						{boards?.map(board => (
							<Grid sx={{ mb: 5 }} item xs={12} sm={6} md={4} lg={3} key={board.id}>
								<PostCard
									boardId={board.id}
									title={board.title}
									content={board.content}
									author={board.nick_name}
									commentCnt={board.comment_count}
									likeCnt={board.likes_count}
									createAt={board.created_at.substr(0, 10)}
									profilePic={board.user_profile}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		</Page>
	);
}

export default CommunityDetail;
