import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	TextField,
	Button,
	Typography,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

UserNickName.propTypes = {
	userName: PropTypes.string,
};

function UserNickName({ userName }) {
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState('');

	const handleClose = () => {
		setNameOpen(false);
	};

	const onClickNameModify = () => {
		setNameOpen(true);
		console.log('닉네임 수정버튼 클릭');
	};

	const handleNameChange = event => {
		setName(event.target.value);
	};

	const handleNameModify = () => {
		// 닉네임 변경 PUT API
		setNameOpen(false);
		// console.log(name);
	};

	return (
		<>
			<Stack direction='row' spacing={1} mb='10px'>
				<Typography variant='h4'>{userName}</Typography>
				<Box pt='10px'>
					<EditIcon sx={{ width: 15, height: 15 }} onClick={onClickNameModify} />
				</Box>
			</Stack>
			<Dialog open={nameOpen} onClose={handleClose}>
				<DialogTitle id='alert-dialog-title'>
					<Typography fontSize='14px' textalign='center'>
						<b>닉네임 변경</b>
					</Typography>
				</DialogTitle>
				<DialogContent>
					<TextField
						sx={{ width: '100%' }}
						type='text'
						onChange={handleNameChange}
						fontSize='10px'
					/>
					<Stack
						direction='row'
						pl='20px'
						pr='20px'
						justifyContent='center'
						mt='10px'
						spacing={1}
					>
						<Button size='small' variant='contained' onClick={handleNameModify}>
							Modify
						</Button>
						<Button size='small' variant='outlined' onClick={handleClose}>
							Cancel
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default UserNickName;
