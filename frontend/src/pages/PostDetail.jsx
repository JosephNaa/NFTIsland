import { useEffect, useState, useContext } from 'react';
import {
	Avatar,
	Box,
	Button,
	Stack,
	Container,
	Typography,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	IconButton,
} from '@mui/material';

import {
	Person as PersonIcon,
	ArrowBack as BackIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	FavoriteBorder as LikeIcon,
	Add as AddIcon,
	Favorite as FullLikeIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Page from '../components/Page';
import Comments from '../layouts/community-detail/Comments';
import {
	deleteBoardAPI,
	getBoardAPI,
	createLikeAPI,
	deleteLikeAPI,
} from '../api/board';
import { createCommentAPI } from '../api/comment';

function PostDetail() {
	// account 정보 가져올 때 userContext.account
	const { loggedUser } = useContext(UserContext);
	const navigate = useNavigate();
	const { communityId, postId } = useParams();

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	// 게시글 상세 정보 API
	const [post, setPost] = useState();
	const [comments, setComments] = useState();
	const [likes, setLikes] = useState();
	const [like, setLike] = useState(false);

	useEffect(() => {
		getBoardAPI(postId).then(res => {
			setPost(res.data);
			setLikes(res.data.likes_count);
			// 댓글 목록
			setComments(res.data.comments);
			if (res.data.likes.includes(loggedUser.account)) {
				setLike(true);
			} else {
				setLike(false);
			}
		});
	}, []);

	// 게시글 삭제 API, id = 게시글id + useraddress
	const handleDeleteClose = () => {
		setOpen(false);
		deleteBoardAPI({
			postId,
			user_address: loggedUser.account,
			communityId,
		}).then(res => {
			navigate(`/community/${communityId}`, { replace: true });
		});
	};

	const onClickBackIcon = () => {
		navigate(`/community/${communityId}`, { replace: true });
	};

	const onClickEditIcon = () => {
		navigate(`/community/postwrite/${communityId}?postId=${postId}`, {
			replace: true,
		});
	};

	const onClickDeleteIcon = () => {
		setOpen(true);
	};

	// 좋아요 API
	const onClickLikeIcon = () => {
		if (like) {
			// 좋아요 삭제API
			deleteLikeAPI({
				board_id: postId,
				user_address: loggedUser.account,
				community_id: communityId,
			}).then(res => {
				setLike(false);
				setLikes(prev => prev - 1);
			});
		} else {
			// 좋아요 등록API
			createLikeAPI({
				board_id: postId,
				user_address: loggedUser.account,
				community_id: communityId,
			}).then(() => {
				setLike(true);
				setLikes(prev => prev + 1);
			});
		}
	};

	// 댓글 생성 API
	const [comment, setComment] = useState('');
	const handleCommentChange = event => {
		setComment(event.target.value);
	};

	const onClickComment = () => {
		if (comment.length > 0) {
			createCommentAPI({
				board_id: postId,
				user_address: loggedUser.account,
				content: comment,
				community_id: communityId,
			}).then(res => {
				setComments(prev => [...prev, res.data]);
			});
			setComment('');
		}
		if (comment.length === 0) {
			alert('댓글을 입력해주세요.');
		}
	};

	const onClickNick = () => {
		navigate(`/user/${post.nick_name}`);
	};
	return (
		<Page>
			<Container>
				<Stack justifyContent='center' direction='row' ml='20%' mr='20%'>
					<Box position='absolute' left='20%'>
						<BackIcon onClick={onClickBackIcon} />
					</Box>
					<Typography variant='h3' textalign='center'>
						게시글 상세
					</Typography>
					{post?.user_address === loggedUser.account && (
						<Stack direction='row' position='absolute' right='20%' spacing={1}>
							<Box>
								<EditIcon onClick={onClickEditIcon} />
							</Box>
							<Box>
								<DeleteIcon onClick={onClickDeleteIcon} />
							</Box>
							<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby='alert-dialog-title'
								aria-describedby='alert-dialog-description'
							>
								<DialogTitle id='alert-dialog-title'>
									<Typography fontSize='14px' textalign='center'>
										<b>게시글 삭제</b>
									</Typography>
								</DialogTitle>
								<DialogContent>
									<DialogContentText
										mlt='10px'
										id='alert-dialog-description'
										variant='h5'
									>
										정말 삭제하시겠습니까?
									</DialogContentText>
									<Stack
										pl='20px'
										pr='20px'
										justifyContent='center'
										mt='10px'
										spacing={1}
									>
										<Button size='small' variant='contained' onClick={handleDeleteClose}>
											Yes
										</Button>
										<Button size='small' variant='outlined' onClick={handleClose}>
											Cancel
										</Button>
									</Stack>
								</DialogContent>
							</Dialog>
						</Stack>
					)}
				</Stack>
			</Container>
			<Box ml='20%' mr='20%' mt='4%' maxWidth='60%'>
				<Stack direction='row'>
					<Avatar sx={{ width: 40, height: 40 }}>
						<img src={post?.user_profile} alt='' />
						{/* 작성자 이미지 */}
					</Avatar>
					<Stack ml='10px' mb='3%'>
						<Typography
							mb='3px'
							fontSize='16px'
							onClick={onClickNick}
							sx={{ cursor: 'pointer' }}
						>
							{post?.nick_name}
						</Typography>
						{/* 게시글 작성일 */}
						<Typography fontSize='12px'>{post?.updated_at.substr(0, 10)}</Typography>
					</Stack>
				</Stack>
				{/* 게시글 제목 */}
				<Typography variant='h4' mb='3%'>
					{post?.title}
				</Typography>
				{/* 게시글 내용 */}
				<Box sx={{ whiteSpace: 'pre-line', width: '100%', wordBreak: 'break-all' }}>
					{post?.content}
				</Box>

				<Stack direction='row' mt='5%' mb='3%'>
					{like ? (
						<IconButton type='submit' onClick={onClickLikeIcon}>
							<FullLikeIcon sx={{ fontSize: '18px', color: 'red' }} />
						</IconButton>
					) : (
						<IconButton type='submit' onClick={onClickLikeIcon}>
							<LikeIcon sx={{ fontSize: '18px' }} />
						</IconButton>
					)}
					{/* <IconButton type='submit' onClick={onClickLikeIcon}>
						<LikeIcon />
					</IconButton> */}
					{/* 좋아요 개수 */}
					<Typography ml='3px' mt='10px' sx={{ fontSize: '13px' }}>
						{likes}개
					</Typography>
				</Stack>
				<hr />
				<Typography mt='4%' mb='2%'>
					<b>comments</b>
				</Typography>
				<Box mt='2%' mb='3%'>
					<Stack direction='row'>
						<TextField
							fullWidth
							id='comment'
							label='댓글 작성'
							multiline
							variant='outlined'
							onChange={handleCommentChange}
							value={comment}
						/>
						<IconButton
							type='submit'
							sx={{ p: '10px', m: '10px' }}
							onClick={onClickComment}
						>
							<AddIcon />
						</IconButton>
					</Stack>
				</Box>
				{comments?.map(comment => (
					<Comments
						key={comment.id}
						commentId={comment.id}
						content={comment.content}
						nickName={comment.nick_name}
						userAddress={comment.user_address}
						updatedAt={comment.updated_at.substr(0, 10)}
						profilePic={comment.user_profile}
						setComments={setComments}
					/>
				))}
			</Box>
		</Page>
	);
}

export default PostDetail;
