import { Container, Stack, Box, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../layouts/PageHeader';
import Page from '../components/Page';

function CreateCommunity() {
	// 타이핑 헬퍼
	// const typeSchema = Yup.object().shape({
	// 	author: Yup.string().required('커뮤니티이름 입력해주세요.'),
	// 	title: Yup.string().required('커뮤니티 설명을 입력해주세요.'),
	// });

	// const formik = useFormik({
	// 	initialValues: {
	// 		author: '',
	// 		title: '',
	// 		description: '',
	// 	},
	// 	validationSchema: typeSchema,
	// 	onSubmit: value => {
	// 		setAuthor(value.author);
	// 		setTitle(value.title);
	// 		setDescription(value.description);
	// 	},
	// });

	return (
		<Page>
			<Container maxWidth='md'>
				<Header title='커뮤니티 생성' />
			</Container>
		</Page>
	);
}

export default CreateCommunity;
