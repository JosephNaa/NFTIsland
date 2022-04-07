import { useContext } from 'react';
import {
	Box,
	Button,
	Avatar,
	Typography,
	Stack,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	IconButton,
	Link,
} from '@mui/material';
import {
	Person as PersonIcon,
	InsertComment as InsertCommentIcon,
	FavoriteBorder as LikeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getHasItem } from '../../api/item';
import UserContext from '../../context/UserContext';

PostCard.propTypes = {
	onClickURL: PropTypes.string.isRequired,
	postId: PropTypes.number.isRequired,
	communityId: PropTypes.number.isRequired,
	communityName: PropTypes.string,
	postTitle: PropTypes.string,
	postContent: PropTypes.string,
	userName: PropTypes.string,
	commentCount: PropTypes.number,
	likeCount: PropTypes.number,
	createdDate: PropTypes.string,
	userProfile: PropTypes.string,
};

function PostCard({
	onClickURL,
	postId,
	communityId,
	communityName,
	postTitle,
	postContent,
	userName,
	commentCount,
	likeCount,
	createdDate,
	userProfile,
}) {
	const userContext = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<Link
			href={onClickURL}
			underline='none'
			onClick={async e => {
				e.preventDefault();
				try {
					const { data } = await getHasItem({
						address: userContext.loggedUser.account,
						community_id: communityId,
					});
					console.log(data);
					if (data) {
						navigate(onClickURL);
					} else {
						alert('게시글 조회 권한이 없습니다.');
					}
				} catch (error) {
					console.dir(error);
				}
			}}
		>
			<Card
				variant='outlined'
				sx={{
					boxShadow: 0,
					'&:hover': {
						boxShadow: 5,
					},
				}}
			>
				<CardHeader
					avatar={<Avatar src={userProfile} />}
					title={userName}
					subheader={moment(createdDate, 'YYYYMMDD').fromNow('')}
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						{postTitle}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{postContent}
					</Typography>
				</CardContent>
				<CardActions>
					<Button color='inherit' startIcon={<InsertCommentIcon />}>
						{commentCount}
					</Button>
					<Button color='inherit' startIcon={<LikeIcon />}>
						{likeCount}
					</Button>
				</CardActions>
			</Card>
		</Link>
	);
}

export default PostCard;
