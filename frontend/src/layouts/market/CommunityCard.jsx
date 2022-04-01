import { useTheme } from '@mui/material/styles';
import { Box, Avatar, Typography, Stack, Card, CardMedia } from '@mui/material';
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

	const onClickCard = () => {
		navigate(onClickURL);
	};
	const onClickNickname = e => {
		e.stopPropagation();
	};
	return (
		<Card
			sx={{
				cursor: 'pointer',
				transition: 'transform .2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.01)',
				},
			}}
			onClick={onClickCard}
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
						sx={{
							transition: 'all .2s ease-in-out',
							'&:hover': {
								// transform: 'scale(1.01)',
								fontSize: '17px',
							},
						}}
						onClick={onClickNickname}
					>
						{communityHost}
					</Typography>
				</Stack>

				{/* 컬렉션 설명 */}
				<Typography variant='subtitle2' padding='0 20px' textAlign='center'>
					{communityDescription}
				</Typography>
			</Stack>
		</Card>
	);
}

export default CommunityCard;
