import { useEffect, useState, useContext } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Avatar, Typography, Stack, Card, Container } from '@mui/material';
import {
	Person as PersonIcon,
	ArrowBack as BackIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	FavoriteBorder as LikeIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../../context/UserContext';
import { deleteCommentAPI } from '../../api/comment';

Comments.propTypes = {
	commentId: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	nickName: PropTypes.string.isRequired,
	userAddress: PropTypes.string,
	updatedAt: PropTypes.string.isRequired,
};

function Comments({ commentId, content, nickName, userAddress, updatedAt }) {
	const theme = useTheme();
	const navigate = useNavigate();
	const { loggedUser } = useContext(UserContext);
	const { communityId, postId } = useParams();

	// const test = 'test';
	const onClickDeleteIcon = () => {
		// 댓글 삭제 API
		deleteCommentAPI({
			commentId,
			// user_address: test,
			user_address: loggedUser.address,
		}).then(res => {
			navigate(`/community/${communityId}/${postId}`, { replace: true });
		});
	};

	return (
		<Container>
			<Stack direction='row' ml='-3%'>
				<PersonIcon sx={{ width: 40, height: 60 }} />
				{/* 작성자 이미지 */}
				<Box flex='1'>
					<Typography mb='3px' fontSize='14px'>
						{/* 작성자 닉네임 */}
						{nickName}
					</Typography>
					<Typography mb='3px'>
						{/* 댓글내용 */}
						{content}
					</Typography>
				</Box>
				<Typography mt='15px' fontSize='14px'>
					{/* 댓글 작성일 */}
					{updatedAt}
				</Typography>
				<Stack direction='row' ml='30px' mt='15px' spacing={1}>
					<Box>
						<DeleteIcon sx={{ width: 20, height: 20 }} onClick={onClickDeleteIcon} />
					</Box>
				</Stack>
			</Stack>
		</Container>
	);
}

export default Comments;
