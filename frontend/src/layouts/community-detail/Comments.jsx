import { useTheme, styled } from '@mui/material/styles';
import { Box, Avatar, Typography, Stack, Card, Container } from '@mui/material';
import {
	Person as PersonIcon,
	ArrowBack as BackIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	FavoriteBorder as LikeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/logo.png';

function Comments() {
	const theme = useTheme();
	const navigate = useNavigate();

	const onClickEditIcon = () => {
		navigate('/postwrite');
	};

	const onClickDeleteIcon = () => {
		navigate('/community/a');
	};

	return (
		<Container>
			<Stack direction='row' ml='-3%'>
				<PersonIcon sx={{ width: 40, height: 60 }} />
				{/* 작성자 이미지 */}
				<Box flex='1'>
					<Typography mb='3px' fontSize='14px'>
						{/* 작성자 닉네임 */}
						hhhhhdong
					</Typography>
					<Typography mb='3px'>
						{/* 댓글내용 */}
						좋은글입니다!!
					</Typography>
				</Box>
				<Typography mt='15px' fontSize='14px'>
					{/* 댓글 작성일 */}
					2022.03.22
				</Typography>
				<Stack direction='row' ml='30px' mt='15px' spacing={1}>
					<Box>
						<EditIcon sx={{ width: 20, height: 20 }} onClick={onClickEditIcon} />
					</Box>
					<Box>
						<DeleteIcon sx={{ width: 20, height: 20 }} onClick={onClickDeleteIcon} />
					</Box>
				</Stack>
			</Stack>
		</Container>
	);
}

export default Comments;
