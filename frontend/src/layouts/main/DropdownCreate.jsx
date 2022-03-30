import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import UserContext from '../../context/UserContext';

export default function DropDownCreate() {
	const userContext = useContext(UserContext);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onClickClick = event => {
		navigate('/create/community');
	};

	return (
		userContext.account && (
			<>
				<IconButton onClick={handleClick}>
					<AddIcon color='primary' fontSize='large' />
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					onClick={handleClose}
				>
					<MenuItem onClick={onClickClick}>
						<AddIcon /> 커뮤니티 생성
					</MenuItem>
				</Menu>
			</>
		)
	);
}
