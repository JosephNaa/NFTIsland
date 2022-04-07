import { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	TextField,
	Button,
	IconButton,
	Typography,
	Stack,
	Avatar,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import UserContext from '../../context/UserContext';
import { setUserProfileImageAPI } from '../../api/user';

UserProfileImage.propTypes = {
	address: PropTypes.string,
	profileUrl: PropTypes.string,
};

function UserProfileImage({ address, profileUrl }) {
	const userContext = useContext(UserContext);
	const [image, setImage] = useState('');
	const [imgOpen, setImgOpen] = useState(false);
	// const [imageName, setImageName] = useState('');
	// const imageSelect = useRef();

	const handleImage = value => {
		setImage(value);
		// if (value !== '') setImageName(value.name);
		// else setImageName('');
	};

	const handleImgModify = async () => {
		try {
			const formData = new FormData();
			formData.append('profile_path', image);
			await setUserProfileImageAPI(address, formData);
			window.location.reload();
		} catch (error) {
			console.dir(error);
		}

		setImgOpen(false);
	};

	// const handleImageClick = () => {
	// 	imageSelect.current.click();
	// };

	const handleClose = () => {
		setImgOpen(false);
	};

	const onClickImgModify = () => {
		setImgOpen(true);
	};

	return (
		<Stack direction='row'>
			<Avatar src={profileUrl} sx={{ width: 140, height: 140 }} />
			{userContext.loggedUser.account === address && (
				<Box pt='110px'>
					<IconButton onClick={onClickImgModify}>
						<EditIcon sx={{ width: 15, height: 15 }} />
					</IconButton>
				</Box>
			)}
			<Dialog open={imgOpen} onClose={handleClose}>
				<DialogTitle>프로필 이미지 변경</DialogTitle>
				<DialogContent>
					<input
						type='file'
						accept='image/*'
						onChange={e =>
							e.target.files.length !== 0
								? handleImage(e.target.files[0])
								: handleImage('')
						}
					/>
					{/* <input
						type='file'
						accept='image/*'
						ref={imageSelect}
						onChange={e =>
							e.target.files.length !== 0
								? handleImage(e.target.files[0])
								: handleImage('')
						}
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
					</Button> */}
				</DialogContent>
				<DialogActions>
					<Button size='small' variant='contained' onClick={handleImgModify}>
						Modify
					</Button>
					<Button size='small' variant='outlined' onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
}

export default UserProfileImage;
