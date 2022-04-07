import { useContext } from 'react';
import {
	Button,
	Avatar,
	Typography,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	Link,
} from '@mui/material';
import {
	InsertComment as InsertCommentIcon,
	Favorite as LikeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/ko';
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
					subheader={moment.tz(createdDate, 'Asia/Seoul').fromNow('')}
				/>
				<CardContent>
					<Typography noWrap variant='h5' component='div'>
						{postTitle}
					</Typography>
				</CardContent>
				<CardActions>
					<Button color='inherit' startIcon={<InsertCommentIcon />} disabled>
						{commentCount}
					</Button>
					<Button color='inherit' startIcon={<LikeIcon />} disabled>
						{likeCount}
					</Button>
				</CardActions>
			</Card>
		</Link>
	);
}

export default PostCard;
