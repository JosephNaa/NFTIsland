import { useContext, useState } from 'react';
import {
	Box,
	Avatar,
	Menu,
	MenuItem,
	IconButton,
	Tooltip,
	Link,
} from '@mui/material';
import {
	Person as PersonIcon,
	Logout as LogoutIcon,
	AccountBalanceWallet as WalletIcon,
	Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { getUserAPI } from '../../api/auth';

export default function DropDownMenu() {
	const userContext = useContext(UserContext);
	// 로그인 여부
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigate = useNavigate();

	const connectAccount = async () => {
		try {
			if (window.ethereum) {
				const userAccount = await window.ethereum.request({
					method: 'eth_accounts',
				});
				// 메타마스크에 로그인이 되어있는 경우
				if (userAccount[0]) {
					const { data } = await getUserAPI(userAccount[0]);
					userContext.setLoggedUser({
						account: data.account,
						nickname: data.nickname,
						profileImage: data.profile_path,
					});
				}
				// 메타마스크 로그인을 해야하는 경우
				else {
					// 지갑 연결 요청
					await window.ethereum.request({
						method: 'eth_requestAccounts',
					});
				}
			} else {
				alert('Install Metamask! https://metamask.io/download/');
			}
		} catch (error) {
			console.dir(error);
		}
	};

	const onClickLogin = () => {
		connectAccount();
	};
	const onClickLogout = () => {
		userContext.clearLoggedUser();
	};

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title=''>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					>
						{userContext.loggedIn ? (
							<Avatar
								src={userContext.loggedUser.profileImage}
								sx={{ width: 32, height: 32 }}
							/>
						) : (
							<WalletIcon sx={{ width: 32, height: 32 }} />
						)}
					</IconButton>
				</Tooltip>
			</Box>
			{userContext.loggedIn ? (
				<Menu
					anchorEl={anchorEl}
					id='My-menu'
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
					<Link
						href={`/user/${userContext.loggedUser.nickname}`}
						underline='none'
						color='inherit'
						onClick={e => {
							e.preventDefault();
							navigate(`/user/${userContext.loggedUser.nickname}`);
						}}
					>
						<MenuItem>
							<PersonIcon />
							마이 페이지
						</MenuItem>
					</Link>
					<MenuItem onClick={onClickLogout}>
						<LogoutIcon /> 로그아웃
					</MenuItem>
				</Menu>
			) : (
				<Menu
					anchorEl={anchorEl}
					id='Login'
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
					<MenuItem onClick={onClickLogin}>
						<AddIcon /> 지갑 연결하기
					</MenuItem>
				</Menu>
			)}
		</>
	);
}
