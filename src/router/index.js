import { createRouter, createWebHashHistory } from 'vue-router';

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
				path: '/video',
				component: () => import('@/views/Video'),
			},
			{
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
				path: '/playlist/:id',
				component: () => import('@/views/Playlist'),
			},
			{
				path: '/singer/:id',
				component: () => import('@/views/Singer'),
			},
			{
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
				path: '/comment',
				component: () => import('@/views/Comment'),
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

export default router;
