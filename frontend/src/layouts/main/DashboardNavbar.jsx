import { useContext } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import logo from '../../image/logo.png';
import DropdownMenu from './DropdownMenu';
import DropdownCreate from './DropdownCreate';

// 헤더 화면 (상단 메뉴바)
function DashboardNavbar() {
	const userContext = useContext(UserContext);
	const APPBAR_MOBILE = 36;
	const APPBAR_DESKTOP = 64;

	const RootStyle = styled(AppBar)(({ theme }) => ({
		boxShadow: theme.customShadows.z16,
		backdropFilter: 'blur(6px)',
		WebkitBackdropFilter: 'blur(6px)',
		backgroundColor: alpha(theme.palette.background.default, 0.72),
	}));

	const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
		height: APPBAR_MOBILE,
		[theme.breakpoints.up('lg')]: {
			height: APPBAR_DESKTOP,
			padding: theme.spacing(0, 10),
		},
		justifyContent: 'space-between',
	}));

	const ImgStyle = styled('img')({
		width: '100%',
		height: '100%',
	});

	return (
		<RootStyle>
			<ToolbarStyle>
				<Box height='100%' padding='10px'>
					<RouterLink to='/'>
						<ImgStyle src={logo} alt='' />
					</RouterLink>
				</Box>
				<Stack direction='row'>
					<Button
						to='/'
						size='large'
						sx={{
							fontSize: 17,
							// display: userContext.loggedIn ? 'none' : 'block',
						}}
						component={RouterLink}
					>
						소개
					</Button>
					<Button
						to='/community'
						size='large'
						sx={{ fontSize: 17 }}
						component={RouterLink}
					>
						커뮤니티
					</Button>
					<Button
						to='/market'
						size='large'
						sx={{ fontSize: 17 }}
						component={RouterLink}
					>
						마켓
					</Button>
					<DropdownCreate />
					<DropdownMenu />
				</Stack>
			</ToolbarStyle>
		</RootStyle>
	);
}

export default DashboardNavbar;
