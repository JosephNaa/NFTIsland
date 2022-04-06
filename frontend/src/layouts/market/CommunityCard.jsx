import { useTheme } from '@mui/material/styles';
import {
	Box,
	Avatar,
	Typography,
	Stack,
	Card,
	CardMedia,
	Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../image/logo.png';

CommunityCard.propTypes = {
	onClickURL: PropTypes.string.isRequired,
	communityName: PropTypes.string,
	communityDescription: PropTypes.string,
	communityHost: PropTypes.string,
	communityLogo: PropTypes.string,
	hostProfile: PropTypes.string,
};

CommunityCard.defaultProps = {
	communityName: 'Sad Girls Bar',
	communityDescription:
		'The Boring Ape Chronicles by Timpers are a collection of monotonous ape adventure stories starring s...',
	communityHost: 'default user',
	communityLogo: logo,
	hostProfile: '',
};

function CommunityCard({
	onClickURL,
	communityName,
	communityDescription,
	communityHost,
	communityLogo,
	hostProfile,
}) {
	const navigate = useNavigate();
	const theme = useTheme();

	const onClickNickname = e => {
		e.stopPropagation();
		e.preventDefault();
		navigate(`/user/${communityHost}`);
	};
	return (
		<Link
			href={onClickURL}
			underline='none'
			onClick={e => {
				e.preventDefault();
				navigate(onClickURL);
			}}
		>
			<Card
				variant='outlined'
				sx={{
					boxShadow: 0,
					'&:hover': {
						boxShadow: 5,
					},
				}}
			>
				<CardMedia component='img' height='256' image={communityLogo} alt='' />
				<Stack
					direction='column'
					alignItems='center'
					marginTop='-36px'
					padding='10px'
				>
					<Box border='3px solid white' borderRadius='50%' paddingBottom='7px'>
						<Avatar src={hostProfile} />
					</Box>

					{/* 컬랙션 이름 */}
					<Typography variant='h5'>{communityName}</Typography>
					<Stack direction='row' paddingBottom='20px'>
						<Typography variant='subtitle3' paddingRight='7px'>
							by
						</Typography>

						{/* 관리자 아이디 */}
						<Typography
							variant='subtitle1'
							color={theme.palette.info.dark}
							onClick={onClickNickname}
						>
							{communityHost}
						</Typography>
					</Stack>
				</Stack>
			</Card>
		</Link>
	);
}

export default CommunityCard;
