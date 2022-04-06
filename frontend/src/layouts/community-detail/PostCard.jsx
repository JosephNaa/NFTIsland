import { useEffect, useState, useContext } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Avatar, Typography, Stack, Card } from '@mui/material';
import {
	Person as PersonIcon,
	InsertComment as InsertCommentIcon,
	FavoriteBorder as LikeIcon,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { getHasItem } from '../../api/item';

PostCard.propTypes = {
	boardId: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	commentCnt: PropTypes.number.isRequired,
	likeCnt: PropTypes.number.isRequired,
	createAt: PropTypes.string.isRequired,
	profilePic: PropTypes.string.isRequired,
};

function PostCard({
	boardId,
	title,
	content,
	author,
	commentCnt,
	likeCnt,
	createAt,
	profilePic,
}) {
	const navigate = useNavigate();
	const { communityId } = useParams();
	const theme = useTheme();

	const onClickCard = () => {
		if (has === true) {
			navigate(`/community/${communityId}/${boardId}`);
		}
		if (has === false) {
			alert('게시글 조회 권한이 없습니다.');
		}
	};

	// hasItem API address, community_id
	const { loggedUser } = useContext(UserContext);
	const [has, setHas] = useState();

	useEffect(() => {
		getHasItem({ address: loggedUser.account, community_id: communityId }).then(
			res => {
				setHas(res.data);
			}
		);
	}, []);

	return (
		<Card
			width='330px'
			height='330px'
			border={`1px solid ${theme.palette.grey[300]}`}
			borderradius='10px'
			overflow='hidden'
			sx={{
				cursor: 'pointer',
				transition: 'transform .2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.01)',
				},
			}}
			boxshadow={theme.customShadows.z8}
			onClick={onClickCard}
		>
			<Stack direction='column' padding='20px  20px 5px 20px '>
				{/* 게시글 제목 */}
				<Typography
					width='100%'
					variant='h5'
					mb='10px'
					textAlign='center'
					overflow='hidden'
					textOverflow='ellipsis'
					whiteSpace='nowrap'
				>
					{title}
				</Typography>
				<Box height='200px'>
					{/* 게시글 내용 */}
					<Typography
						height='190px'
						mb='10px'
						textAlign='center'
						overflow='hidden'
						sx={{ wordBreak: 'break-all' }}
					>
						{content}
					</Typography>
					{/* 게시글 작성일 */}
					{/* <Typography mb='10px' fontSize='10px' textAlign='right'>
						{createAt}
					</Typography> */}
				</Box>
				<Stack direction='row'>
					<Box width='60%'>
						<Stack direction='row'>
							<Avatar sx={{ width: 25, height: 25 }}>
								{/* 작성자 이미지 */}
								<img src={profilePic} alt='' />
							</Avatar>
							<Typography
								ml='5px'
								mb='10px'
								fontSize='14px'
								pt='5px'
								overflow='hidden'
								textOverflow='ellipsis'
							>
								{/* 작성자 닉네임 */}
								{author}
							</Typography>
						</Stack>
					</Box>
					<Box width='40%'>
						<Stack direction='row' justifyContent='right' pt='5px' spacing={1}>
							<InsertCommentIcon sx={{ width: 18, height: 18 }} />
							<Typography ml='5px' mb='10px' fontSize='10px'>
								{/* 댓글 개수 */}
								{commentCnt}
							</Typography>
							<LikeIcon sx={{ width: 18, height: 18 }} />
							<Typography ml='5px' mb='10px' fontSize='10px'>
								{/* 좋아요 개수 */}
								{likeCnt}
							</Typography>
						</Stack>
					</Box>
				</Stack>
			</Stack>
		</Card>
	);
}

export default PostCard;
