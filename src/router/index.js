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
				path: '/hall',
				component: () => import('@/views/Hall'),
			},
			{
				path: '/video',
				component: () => import('@/views/Video'),
			},
			{
				path: '/radar',
				component: () => import('@/views/Radar'),
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
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
