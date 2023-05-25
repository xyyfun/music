import { createRouter, createWebHashHistory } from 'vue-router';
import { getUserInfo } from '@/utils/user';

const routes = [
	{
		path: '/',
		component: () => import('@/views/Layout'),
		children: [
			{
				path: '/',
				component: () => import('@/views/Discover'),
			},
			{
				path: '/music',
				redirect: '/music/picked',
				component: () => import('@/views/Music'),
				children: [
					{
						path: 'picked',
						component: () => import('@/views/Music/MusicPicked'),
					},
					{
						path: 'radio',
						component: () => import('@/views/Music/MusicRadio'),
					},
					{
						path: 'ranking',
						component: () => import('@/views/Music/MusicRanking'),
					},
					{
						path: 'singer',
						component: () => import('@/views/Music/MusicSinger'),
					},
					{
						path: 'playlist',
						component: () => import('@/views/Music/MusicPlaylist'),
					},
					{
						path: 'album',
						component: () => import('@/views/Music/MusicAlbum'),
					},
				],
			},
			{
				name: 'video',
				path: '/video',
				component: () => import('@/views/Video'),
			},
			{
				name: 'player',
				path: '/player',
				component: () => import('@/views/Player'),
			},
			{
				path: '/radio',
				component: () => import('@/views/Radio'),
			},
			{
				path: '/like',
				component: () => import('@/views/Like'),
			},
			{
				path: '/local',
				component: () => import('@/views/Local'),
			},
			{
				path: '/recently',
				component: () => import('@/views/Recently'),
			},
			{
				path: '/audition',
				component: () => import('@/views/Audition'),
			},
			{
				name: 'playlist',
				path: '/playlist/:id',
				component: () => import('@/views/Playlist'),
			},
			{
				name: 'singer',
				path: '/singer/:id',
				component: () => import('@/views/Singer'),
			},
			{
				name: 'album',
				path: '/album/:id',
				component: () => import('@/views/Album'),
			},
			{
				path: '/search/:keyword',
				component: () => import('@/views/Search'),
			},
			{
				path: '/radioplaylist/:id',
				component: () => import('@/views/Radio/RadioPlaylist'),
			},
			{
				name: 'comment',
				path: '/comment',
				component: () => import('@/views/Comment'),
			},
			{
				path: '/user',
				redirect: '/user/home',
				component: () => import('@/views/User'),
				children: [
					{
						path: 'home',
						component: () => import('@/views/User/UserHome'),
					},
				],
			},
			{
				path: '/message',
				component: () => import('@/views/Message'),
				redirect: '/message/private',
				children: [
					{
						name: 'private',
						path: 'private',
						component: () => import('@/views/Message/MessagePrivate'),
					},
					{
						path: 'comment',
						component: () => import('@/views/Message/MessageComment'),
					},
					{
						path: 'at',
						component: () => import('@/views/Message/MessageAt'),
					},
					{
						path: 'system',
						component: () => import('@/views/Message/MessageSystem'),
					},
				],
			},
		],
	},
	{
		path: '/login',
		component: () => import('@/views/Login'),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return { top: 0 };
	},
});

router.beforeEach((to, from, next) => next());

export default router;
