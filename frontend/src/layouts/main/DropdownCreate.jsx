import { useContext, useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import UserContext from '../../context/UserContext';

export default function DropDownCreate() {
	const userContext = useContext(UserContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		userContext.accounts && (
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
					<MenuItem>
						<AddIcon /> 커뮤니티 생성
					</MenuItem>
				</Menu>
			</>
		)
	);
}
