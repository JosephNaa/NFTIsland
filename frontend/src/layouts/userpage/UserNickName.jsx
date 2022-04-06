import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	TextField,
	Button,
	IconButton,
	Typography,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import UserContext from '../../context/UserContext';
import { setUserNickNameAPI } from '../../api/user';

UserNickName.propTypes = {
	address: PropTypes.string,
	userName: PropTypes.string,
};

function UserNickName({ address, userName }) {
	const userContext = useContext(UserContext);
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState('');

	const handleClose = () => {
		setNameOpen(false);
	};

	const onClickNameModify = () => {
		setNameOpen(true);
	};

	const handleNameChange = event => {
		setName(event.target.value);
	};

	const setUserNickName = async () => {
		try {
			await setUserNickNameAPI(address, name);
			window.location.replace(`/user/${name}`);
		} catch (error) {
			alert('이미 존재하는 닉네임 입니다.');
			console.dir(error);
		}
	};

	const handleNameModify = async () => {
		await setUserNickName();
		setNameOpen(false);
	};

	return (
		<>
			<Stack direction='row' spacing={1} mb='10px'>
				<Typography variant='h4'>{userName}</Typography>
				{userContext.loggedUser.account === address && (
					<IconButton onClick={onClickNameModify}>
						<EditIcon sx={{ width: 15, height: 15 }} />
					</IconButton>
				)}
			</Stack>
			<Dialog open={nameOpen} onClose={handleClose}>
				<DialogTitle>닉네임 변경</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						type='text'
						fullWidth
						variant='standard'
						defaultValue={userName}
						onChange={handleNameChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button size='small' variant='contained' onClick={handleNameModify}>
						Modify
					</Button>
					<Button size='small' variant='outlined' onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default UserNickName;
