import { Stack, Box, Typography } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function PageHeader({ title, ...other }) {
	const navigate = useNavigate();
	const onClickBackIcon = () => {
		navigate(-1);
	};
	return (
		<Stack justifyContent='center' direction='row' position='relative' {...other}>
			<Box position='absolute' left='0' top='12px' sx={{ cursor: 'pointer' }}>
				<BackIcon onClick={onClickBackIcon} />
			</Box>
			<Typography variant='h3' textalign='center'>
				{title}
			</Typography>
		</Stack>
	);
}

export default PageHeader;
