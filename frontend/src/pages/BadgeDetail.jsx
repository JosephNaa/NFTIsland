import { useEffect, useState } from 'react';
import { Avatar, Box, Stack, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import Page from '../components/Page';
import { getItemInfo } from '../api/item';

function BadgeDetail() {
	const { itemId } = useParams();
	const navigate = useNavigate();

	const [itemInfo, setItemInfo] = useState({});

	const onClickBackIcon = () => {
		navigate(-1);
	};

	useEffect(() => {
		getItemInfo(itemId).then(({ data }) => {
			setItemInfo({
				communityId: data.community_id,
				communityName: data.community_name,
				itemDec: data.item_description,
				itemName: data.item_title,
				itemURL: data.item_url,
				ownerAdderss: data.owner_address,
			});
		});
	}, []);

	return (
		<Page>
			<Container>
				<Stack justifyContent='center' direction='row' ml='20%' mr='20%'>
					<Box position='absolute' left='20%'>
						<BackIcon onClick={onClickBackIcon} />
					</Box>
					<Box>
						<img alt='' src={itemInfo.itemURL} />
						{/* 뱃지 이미지 */}
					</Box>
				</Stack>
				<Stack ml='20%' mr='20%'>
					<Typography mt='5%' mb='3%' variant='h4'>
						{/* 커뮤니티 이름 */}
						{itemInfo.communityName}
					</Typography>
					<Typography mb='3%' variant='h5'>
						{/* NFT 이름 */}
						{itemInfo.itemName}
					</Typography>
					<Typography mb='3%' fontSize='16px'>
						{/* 설명 */}
						{itemInfo.itemDec}
					</Typography>
				</Stack>
			</Container>
		</Page>
	);
}

export default BadgeDetail;
