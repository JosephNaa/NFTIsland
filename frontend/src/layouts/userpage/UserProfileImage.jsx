import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	TextField,
	Button,
	Typography,
	Stack,
	Avatar,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

UserProfileImage.propTypes = {
	profileUrl: PropTypes.string,
};

function UserProfileImage({ profileUrl }) {
	const [image, setImage] = useState('');
	const [imageName, setImageName] = useState('');
	const [imgOpen, setImgOpen] = useState(false);
	const imageSelect = useRef();

	// 이미지 업로드 핸들링
	const handleImage = value => {
		setImage(value);
		if (value !== '') setImageName(value.name);
		else setImageName('');
	};

	const handleImgModify = () => {
		// 이미지 변경 PUT API
		setImgOpen(false);
	};

	// 찾기 버튼 클릭 핸들링
	const handleImageClick = () => {
		imageSelect.current.click();
	};

	const handleClose = () => {
		setImgOpen(false);
		// setNameOpen(false);
	};

	const onClickImgModify = () => {
		setImgOpen(true);
		// console.log('이미지 수정버튼 클릭');
	};

	return (
		<Stack direction='row'>
			<Avatar src={profileUrl} sx={{ width: 140, height: 140 }} />
			<Box pt='110px'>
				<EditIcon sx={{ width: 15, height: 15 }} onClick={onClickImgModify} />
			</Box>
			<Dialog open={imgOpen} onClose={handleClose}>
				<DialogTitle id='alert-dialog-title'>
					<Typography fontSize='14px' textalign='center' sx={{ fontWeight: 'bold' }}>
						프로필 이미지 변경
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Stack direction='row' alignItems='center'>
						<input
							type='file'
							accept='image/png, image/jpeg, image/jpg, image/gif'
							ref={imageSelect}
							onChange={e =>
								e.target.files.length !== 0
									? handleImage(e.target.files[0])
									: handleImage('')
							}
							style={{ display: 'none' }}
						/>
						<TextField
							sx={{ width: '100%' }}
							type='text'
							label='업로드 확장자 형식: png, jpeg, jpg, gif'
							value={imageName}
							disabled
							fontSize='10px'
						/>
						<Button
							sx={{
								ml: 3,
								fontSize: 16,
								height: '56px',
								width: '15%',
								padding: '8px 0',
							}}
							variant='contained'
							size='large'
							onClick={handleImageClick}
						>
							Upload
						</Button>
					</Stack>
					<Stack
						direction='row'
						pl='20px'
						pr='20px'
						justifyContent='center'
						mt='10px'
						spacing={1}
					>
						<Button size='small' variant='contained' onClick={handleImgModify}>
							Modify
						</Button>
						<Button size='small' variant='outlined' onClick={handleClose}>
							Cancel
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
		</Stack>
	);
}

export default UserProfileImage;
