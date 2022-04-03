import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Link } from '@mui/material';
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

	return (
		userContext.loggedIn && (
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
					<Link
						href='/create/community'
						underline='none'
						color='inherit'
						onClick={e => {
							e.preventDefault();
							navigate(`/create/community`);
						}}
					>
						<MenuItem>
							<AddIcon /> 커뮤니티 생성
						</MenuItem>
					</Link>
				</Menu>
			</>
		)
	);
}
