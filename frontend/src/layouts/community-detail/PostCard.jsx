import { useTheme, styled } from '@mui/material/styles';
import { Box, Avatar, Typography, Stack, Card } from '@mui/material';
import {
	Person as PersonIcon,
	InsertComment as InsertCommentIcon,
	FavoriteBorder as LikeIcon,
} from '@mui/icons-material';
import logo from '../../image/logo.png';

function PostCard() {
	const theme = useTheme();
	const ImgStyle = styled('img')({
		width: '100%',
		height: '50%',
		objectFit: 'cover',
	});

	const onClickCard = () => {
		console.log('card');
	};

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
				<Typography variant='h5' mb='10px' textAlign='center'>
					제목 제목 제목 제목
				</Typography>
				<Box height='200px'>
					{/* 게시글 내용 */}
					<Typography mb='10px' textAlign='center'>
						내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기
					</Typography>
					{/* 게시글 작성일 */}
					<Typography mb='10px' fontSize='10px' textAlign='right'>
						2022.03.21
					</Typography>
				</Box>
				<Stack direction='row'>
					<Box width='60%'>
						<Stack direction='row'>
							<Avatar sx={{ width: 25, height: 25 }}>
								<PersonIcon />
								{/* 작성자 이미지 */}
							</Avatar>
							{/* 작성자 이미지
							<PersonIcon sx={{ width: 30, height: 30 }} /> */}
							<Typography ml='5px' mb='10px' fontSize='14px' pt='5px'>
								{/* 작성자 닉네임 */}
								hhhhhdong
							</Typography>
						</Stack>
					</Box>
					<Box width='40%'>
						<Stack direction='row' justifyContent='right' pt='5px' spacing={1}>
							<InsertCommentIcon sx={{ width: 18, height: 18 }} />
							<Typography ml='5px' mb='10px' fontSize='10px'>
								{/* 댓글 개수 */}3
							</Typography>
							<LikeIcon sx={{ width: 18, height: 18 }} />
							<Typography ml='5px' mb='10px' fontSize='10px'>
								{/* 좋아요 개수 */}3
							</Typography>
						</Stack>
					</Box>
				</Stack>
			</Stack>
		</Card>
	);
}

export default PostCard;
