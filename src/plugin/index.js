import VueLazyload from 'vue-lazyload';

export default {
	install(app) {
		// 配置项
		app.use(VueLazyload, {
			preLoad: 1.3,
			error: require('../assets/images/singer_300.png'),
			loading: require('../assets/images/song_300.png'),
			attempt: 1,
		});
	},
};
