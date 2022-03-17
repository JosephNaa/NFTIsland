import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../components/Logo';
import Dropdown from './DropdownMenu';

// 헤더 화면 (상단 메뉴바)
function DashboardNavbar() {
	const APPBAR_MOBILE = 64;
	const APPBAR_DESKTOP = 92;

	const RootStyle = styled(AppBar)(({ theme }) => ({
		boxShadow: 'none',
		backdropFilter: 'blur(6px)',
		WebkitBackdropFilter: 'blur(6px)',
		backgroundColor: alpha(theme.palette.background.default, 0.72),
	}));

	const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
		minHeight: APPBAR_MOBILE,
		[theme.breakpoints.up('lg')]: {
			minHeight: APPBAR_DESKTOP,
			padding: theme.spacing(0, 5),
		},
	}));

	return (
		<RootStyle>
			<ToolbarStyle>
				<Box sx={{ px: 2.5, py: 3 }}>
					<RouterLink to='/intro'>
						<Logo />
					</RouterLink>
				</Box>

				<Box sx={{ flexGrow: 0.05 }} />

				<Stack direction='row'>
					<Button
						to='/items'
						size='large'
						sx={{ fontSize: 17 }}
						component={RouterLink}
					>
						구매하기
					</Button>
					<Button
						to='/register'
						size='large'
						sx={{ fontSize: 17 }}
						component={RouterLink}
					>
						등록하기
					</Button>
					<Button
						to='/whosart'
						size='large'
						sx={{ fontSize: 17 }}
						component={RouterLink}
					>
						후즈컬렉션
					</Button>
					<Button
						to='/intro'
						size='large'
						sx={{ fontSize: 17 }}
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
						to='/whosart'
						size='large'
						sx={{ fontSize: 17 }}
						component={RouterLink}
					>
						뱃지마켓
					</Button>
				</Stack>

				<Box sx={{ flexGrow: 1 }} />
				<Dropdown />
			</ToolbarStyle>
		</RootStyle>
	);
}

export default DashboardNavbar;
