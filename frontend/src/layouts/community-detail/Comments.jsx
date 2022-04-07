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
	profilePic: PropTypes.string.isRequired,
};

function Comments({
	commentId,
	content,
	nickName,
	userAddress,
	updatedAt,
	profilePic,
	setComments,
}) {
	const theme = useTheme();
	const navigate = useNavigate();
	const { loggedUser } = useContext(UserContext);
	const { communityId, postId } = useParams();

	// const test = 'test';
	const onClickDeleteIcon = () => {
		// 댓글 삭제 API
		deleteCommentAPI({
			commentId,
			communityId,
			user_address: loggedUser.account,
		}).then(res => {
			setComments(prev => prev.filter(v => v.id !== commentId));
		});
	};

	return (
		<Box>
			<Stack direction='row' pt='5px' pb='5px' mr='30px' spacing={1}>
				<Avatar sx={{ width: 30, height: 30 }}>
					<img src={profilePic} alt='' />
					{/* 작성자 이미지 */}
				</Avatar>
				<Box flex='1'>
					<Typography fontSize='11px'>
						{/* 작성자 닉네임 */}
						{nickName}
					</Typography>
					<Typography fontSize='13px'>
						{/* 댓글내용 */}
						{content}
					</Typography>
				</Box>
				<Typography pt='2px' fontSize='11px'>
					{/* 댓글 작성일 */}
					{updatedAt}
				</Typography>
				{userAddress === loggedUser.account && (
					<Stack direction='row' ml='30px' mt='15px' spacing={1}>
						<Box>
							<DeleteIcon sx={{ width: 20, height: 20 }} onClick={onClickDeleteIcon} />
						</Box>
					</Stack>
				)}
			</Stack>
		</Box>
	);
}

export default Comments;
