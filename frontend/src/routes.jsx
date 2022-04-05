import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from './layouts/main';
import NotFound from './pages/Page404';
import Market from './pages/Market';
import Intro from './pages/Intro';
import MarketCommunity from './pages/MarketCommunity';
import MarketItem from './pages/MarketItem';
import Community from './pages/Community';
import CommunityDetail from './pages/CommunityDetail';
import PostWrite from './pages/PostWrite';
import PostDetail from './pages/PostDetail';
import CreateCommunity from './pages/CreateCommunity';
import CreateItem from './pages/CreateItem';
import UserPage from './pages/UserPage';
import BadgeDetail from './pages/BadgeDetail';
import BadgeRegistration from './pages/BadgeRegistration';

// 화면 라우팅 테이블
export default function Router() {
	return useRoutes([
		{
			path: '/',
			element: <MainLayout />,
			children: [{ path: '', element: <Intro /> }],
		},
		{
			path: '/create',
			element: <MainLayout />,
			children: [
				{ path: 'community', element: <CreateCommunity /> },
				{ path: 'item/:communityId', element: <CreateItem /> },
				{ path: '', element: <Navigate to='/404' replace /> },
			],
		},
		{
			path: '/market',
			element: <MainLayout />,
			children: [
				{ path: '', element: <Market /> },
				{ path: 'community/:communityId', element: <MarketCommunity /> },
				{ path: 'item/:saleCA', element: <MarketItem /> },
			],
		},
		{
			path: '/community',
			element: <MainLayout />,
			children: [
				{ path: '', element: <Community /> },
				{ path: ':communityId', element: <CommunityDetail /> },
				{ path: 'postwrite/:communityId', element: <PostWrite /> },
				{ path: ':communityId/:postId', element: <PostDetail /> },
			],
		},
		{
			path: '/user',
			element: <MainLayout />,
			children: [
				{ path: ':userName', element: <UserPage /> },
				{ path: '', element: <Navigate to='/404' replace /> },
			],
		},
		{
			path: '/item',
			element: <MainLayout />,
			children: [{ path: ':itemId', element: <BadgeDetail /> }],
		},
		{
			path: '/badgeregistration',
			element: <MainLayout />,
			children: [{ path: '', element: <BadgeRegistration /> }],
		},
		{
			path: '/404',
			element: <NotFound />,
		},
		{ path: '*', element: <Navigate to='/404' replace /> },
	]);
}
