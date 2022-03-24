import { useContext, useState } from 'react';
import {
	Box,
	Avatar,
	Menu,
	MenuItem,
	IconButton,
	Tooltip,
} from '@mui/material';
import {
	Person as PersonIcon,
	Apps as AppsIcon,
	Assignment as AssignmentIcon,
	FavoriteBorder as FavoriteBorderIcon,
	Logout as LogoutIcon,
	AccountBalanceWallet as WalletIcon,
	Add as AddIcon,
} from '@mui/icons-material';
import UserContext from '../../context/UserContext';

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

	const connectAccount = async () => {
		try {
			if (window.ethereum) {
				if (window.ethereum.isConnected()) {
					// 지갑 주소 가져오기
					const userAccounts = await window.ethereum.request({
						method: 'eth_accounts',
					});
					if (userAccounts[0]) {
						userContext.setUserAccounts(userAccounts[0]);
					} else {
						userContext.setUserAccounts('');
					}
				}
				// 지갑 연결 요청
				await window.ethereum.request({
					method: 'eth_requestAccounts',
				});
			} else {
				alert('Install Metamask!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onClickLogin = () => {
		connectAccount();
	};
	const onClickLogout = () => {
		userContext.setUserAccounts('');
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
						{userContext.accounts ? (
							<Avatar sx={{ width: 32, height: 32 }}>
								<PersonIcon />
							</Avatar>
						) : (
							<WalletIcon sx={{ width: 32, height: 32 }} />
						)}
					</IconButton>
				</Tooltip>
			</Box>
			{userContext.accounts ? (
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
					<MenuItem>
						<PersonIcon /> 마이 페이지
					</MenuItem>
					<MenuItem>
						<AppsIcon /> 내 뱃지 컬렉션
					</MenuItem>
					<MenuItem>
						<AssignmentIcon /> 내 게시글/댓글
					</MenuItem>
					<MenuItem>
						<FavoriteBorderIcon /> 내 좋아요
					</MenuItem>
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