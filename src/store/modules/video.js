import { getVideoUrl, getVideoDetail, getMvUrl, getMvDetail } from '@/api/video';
import { useDateFormat } from '@vueuse/core';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		videoUrl: '', // 视频url
		detail: {}, // 详情
		creator: [], // 创作者
		isPlay: false, // 视频是否可以播放
		totalDuration: 0, // 视频总秒数
		totalTime: '00:00', // 视频播放时间（分+秒）
		nowTime: '00:00', // 当前视频播放时间（分+秒）
		nowProgress: 0, // 当前进度条进度
		duration: 0, // 指定播放器到哪秒
	},
	mutations: {
		VIDEOURL(state, val) {
			state.videoUrl = val;
		},
		VIDEODETAIL(state, val) {
			state.detail = val;
		},
		videoCreator(state, val) {
			const { avatarUrl: img1v1Url, nickname: name, userId: id } = val;
			state.creator = [{ img1v1Url, name, id }];
		},
		mvCreator(state, val) {
			state.creator = val;
		},
		ISPLAY(state, val) {
			state.isPlay = val;
		},
		NOWTIME(state, val) {
			// state.playerTime = val;
			// 进度位置=当前播放事件秒/总时间秒*100
			state.nowProgress = val / state.totalDuration;
			const time = useDateFormat(val * 1000, 'mm:ss');
			state.nowTime = time.value;
		},
		// 视频初始化
		initial(state, { bol, time }) {
			state.isPlay = bol;
			state.totalDuration = time;
			const str = useDateFormat(time * 1000, 'mm:ss');
			state.totalTime = str.value;
		},
		// 修改进度
		DURATION(state, val) {
			state.duration = val;
		},
		// 清空数据
		clearData(state) {
			state.videoUrl = '';
			state.detail = {};
			state.creator = [];
			state.nowProgress = 0;
			state.totalDuration = 0;
			state.duration = 0;
			state.nowTime = '00:00';
			state.totalTime = '00:00';
		},
	},
	actions: {
		// 视频URL
		videoUrl({ commit }, id) {
			getVideoUrl(id).then(data => {
				commit('VIDEOURL', data.data.urls[0].url);
			});
		},
		// 视频详情
		videoDetail({ commit }, id) {
			getVideoDetail(id).then(data => {
				data.data.data.publishTime = useDateFormat(data.data.data.publishTime, 'YYYY-MM-DD');
				commit('VIDEODETAIL', data.data.data);
				commit('videoCreator', data.data.data.creator);
			});
		},
		// mvUrl
		mvUrl({ commit }, { id, r }) {
			getMvUrl(id, r).then(data => {
				commit('VIDEOURL', data.data.data.url);
			});
		},
		// mv详情
		mvDetail({ commit }, id) {
			getMvDetail(id).then(data => {
				data.data.data.description = data.data.data.desc;
				delete data.data.data.desc;
				commit('VIDEODETAIL', data.data.data);
				commit('mvCreator', data.data.data.artists);
			});
		},
	},
	getters: {
		// 视频标签
		videoGroup(state) {
			return state.detail.videoGroup || [];
		},
	},
};
