import { Link as RouterLink, Outlet } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar } from '@mui/material';
import logo from '../image/logo.png';

export default function LogoOnlyLayout() {
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
		<>
			<RootStyle>
				<ToolbarStyle>
					<Box height='100%' padding='10px'>
						<RouterLink to='/'>
							<ImgStyle src={logo} alt='' />
						</RouterLink>
					</Box>
				</ToolbarStyle>
			</RootStyle>
			<Outlet />
		</>
	);
}
