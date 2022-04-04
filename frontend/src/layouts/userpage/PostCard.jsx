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
}) {
	const navigate = useNavigate();

	const onClickCard = () => {
		navigate(onClickURL);
	};

	return (
		<Link
			href={onClickURL}
			underline='none'
			onClick={e => {
				e.preventDefault();
				navigate(onClickURL);
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
				onClick={onClickCard}
			>
				<CardHeader
					avatar={<Avatar aria-label='recipe'>R</Avatar>}
					title={userName}
					subheader={createdDate}
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
