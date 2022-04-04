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
} from '@mui/material';

import {
	Person as PersonIcon,
	ArrowBack as BackIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	FavoriteBorder as LikeIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Page from '../components/Page';
import Comments from '../layouts/community-detail/Comments';
import { deleteBoardAPI, getBoardAPI } from '../api/board';

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
	useEffect(() => {
		getBoardAPI(postId).then(res => {
			setPost(res.data);
		});
	}, []);

	// 게시글 삭제 API, id = 게시글id + useraddress
	const handleDeleteClose = () => {
		setOpen(false);
		deleteBoardAPI({ postId, user_address: loggedUser.address }).then(res => {
			navigate(`/community/${communityId}`);
		});
	};

	const onClickBackIcon = () => {
		navigate(-1);
	};

	const onClickEditIcon = () => {
		navigate('/postwrite');
	};

	const onClickDeleteIcon = () => {
		setOpen(true);
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
				</Stack>
			</Container>
			<Box ml='20%' mr='20%' mt='4%' maxWidth='60%'>
				<Stack direction='row'>
					<Avatar sx={{ width: 40, height: 40 }}>
						<PersonIcon />
						{/* 작성자 이미지 */}
					</Avatar>
					<Stack ml='10px' mb='3%'>
						<Typography mb='3px' fontSize='16px'>
							{post?.nick_name}
						</Typography>
						{/* 게시글 작성일 */}
						<Typography fontSize='12px'>{post?.updated_at}</Typography>
					</Stack>
				</Stack>
				{/* 게시글 제목 */}
				<Typography variant='h4' mb='3%'>
					{post?.title}
				</Typography>
				{/* 게시글 내용 */}
				<Box sx={{ whiteSpace: 'normal', width: '100%', wordBreak: 'break-all' }}>
					{post?.content}
					{/* <Typography mb='7%'>{post?.content}</Typography> */}
				</Box>

				<Stack direction='row' mb='2%'>
					<LikeIcon />
					{/* 좋아요 개수 */}
					<Typography ml='10px'>좋아요{post?.likes_count}개</Typography>
				</Stack>
				<hr />
				<Typography mt='4%' mb='2%'>
					<b>comments</b>
				</Typography>
				<Comments />
				<Comments />
				<Comments />
			</Box>
		</Page>
	);
}

export default PostDetail;
