import {
	Avatar,
	Box,
	Button,
	Stack,
	Container,
	Typography,
	Grid,
	TextField,
	Paper,
	InputBase,
	Divider,
	IconButton,
} from '@mui/material';

import {
	Person as PersonIcon,
	ArrowBack as BackIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	FavoriteBorder as LikeIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
import Comments from '../layouts/community-detail/Comments';

function PostDetail() {
	const onClickBackIcon = () => {
		window.location.replace('/communitydetail');
	};

	const onClickEditIcon = () => {
		window.location.replace('/postwrite');
	};

	const onClickDeleteIcon = () => {
		window.location.replace('/communitydetail');
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
					</Stack>
				</Stack>
			</Container>
			<Box ml='20%' mr='20%' mt='4%'>
				<Stack direction='row'>
					<Avatar sx={{ width: 40, height: 40 }}>
						<PersonIcon />
						{/* 작성자 이미지 */}
					</Avatar>
					<Stack ml='10px' mb='3%'>
						<Typography mb='3px' fontSize='16px'>
							{/* 작성자 닉네임 */}
							hhhhhdong
						</Typography>
						{/* 게시글 작성일 */}
						<Typography fontSize='12px'>2022.03.21</Typography>
					</Stack>
				</Stack>
				{/* 게시글 제목 */}
				<Typography variant='h4' mb='3%'>
					리액트 정보 공유 합니다~~~~~~~~
				</Typography>
				{/* 게시글 내용 */}
				<Typography mb='7%'>
					선언형 React는 상호작용이 많은 UI를 만들 때 생기는 어려움을 줄여줍니다.
					애플리케이션의 각 상태에 대한 간단한 뷰만 설계하세요. 그럼 React는 데이터가
					변경됨에 따라 적절한 컴포넌트만 효율적으로 갱신하고 렌더링합니다. 선언형
					뷰는 코드를 예측 가능하고 디버그하기 쉽게 만들어 줍니다. 컴포넌트 기반
					스스로 상태를 관리하는 캡슐화된 컴포넌트를 만드세요. 그리고 이를 조합해
					복잡한 UI를 만들어보세요. 컴포넌트 로직은 템플릿이 아닌 JavaScript로
					작성됩니다. 따라서 다양한 형식의 데이터를 앱 안에서 손쉽게 전달할 수 있고,
					DOM과는 별개로 상태를 관리할 수 있습니다. 한 번 배워서 어디서나 사용하기
					기술 스택의 나머지 부분에는 관여하지 않기 때문에, 기존 코드를 다시 작성하지
					않고도 React의 새로운 기능을 이용해 개발할 수 있습니다. React는 Node
					서버에서 렌더링을 할 수도 있고, React Native를 이용하면 모바일 앱도 만들 수
					있습니다.
				</Typography>
				<Stack direction='row' mb='2%'>
					<LikeIcon />
					{/* 좋아요 개수 */}
					<Typography ml='10px'>좋아요 3개</Typography>
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
