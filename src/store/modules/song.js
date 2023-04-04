import { getSongUrl, getSongDetail, getSongLyric } from '@/api/songs';
import tidy from '@/utils/tidy';
import { useDateFormat } from '@vueuse/core';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		url: {}, // 播放路径
		detail: {}, // 详细
		picUrl: require('@/assets/images/not-played.png'), // 图片
		lyrics: {}, // 歌词
		playlist: [], // 播放列表
		playOrder: 1, // 播放顺序 1：列表循环 2.顺序播放 3：单曲循环 4：随机
		volume: 50, // 音量
		nowTime: '00:00', // 当前播放时间（分+秒）
		playerTime: 0, // 当前播放器时间（秒）
		totalDuration: 0, // 当前歌曲总时长（秒）
		duration: 0, // 指定播放器到哪秒
		nowProgress: 0, // 当前进度条进度
		currentMusicID: 0, // 当前播放音乐id
		isShowDialog: false, // 是否显示对话框
		isShowLyrics: false, //是否展开歌曲详情页
		isPlay: false, // 是否播放
	},
	mutations: {
		SONGURL(state, val) {
			state.url = val;
		},
		SONGDETAIL(state, val) {
			state.detail = val;
			state.picUrl = val.al.picUrl;
		},
		SONGLYRIC(state, val) {
			state.lyrics = val;
		},
		// 主要的 频繁调用
		NOWTIME(state, val) {
			state.playerTime = val;
			state.nowProgress = (val / state.totalDuration) * 100;
			const time = useDateFormat(val * 1000, 'mm:ss');
			state.nowTime = time.value;
		},
		// 控制音乐是否播放
		ISPLAY(state, val) {
			if (!state.currentMusicID) return;
			state.isPlay = val;
		},
		// 音乐初始化
		initial(state, { bol, time }) {
			state.isPlay = bol;
			state.totalDuration = time;
		},
		// 修改进度
		DURATION(state, val) {
			state.duration = val;
		},
		// 显示还是隐藏歌曲详情
		SHOWLYRICS(state, val) {
			state.isShowLyrics = val;
		},
		// 添加播放列表
		addList(state, val) {
			const playlistLength = state.playlist.length;
			if (val instanceof Array) {
				if (playlistLength) {
					const arr = [];
					state.playlist.forEach(e => {
						val.forEach(event => {
							if (!e.id === event.id) arr.push(event);
						});
					});
					arr.forEach(e => {
						state.playlist.push(e);
					});
				} else {
					val.forEach(e => {
						state.playlist.push(e);
					});
				}
			} else {
				if (playlistLength) {
					let flag = true;
					for (let i = 0; i < playlistLength; i++) {
						if (state.playlist[i].id === val.id) {
							flag = false;
							break;
						}
					}
					if (flag) state.playlist.push(val);
				} else {
					state.playlist.push(val);
				}
			}
		},
		// 删除播放列表
		removeList(state) {
			state.playlist = [];
		},
		// 显示/隐藏对话框
		handlerDialog(state, val) {
			state.isShowDialog = val;
		},
		// 修改当前播放音乐的id
		musicID(state, id) {
			state.currentMusicID = id;
		},
		// 修改播放顺序
		changPlayOrder(state, val) {
			state.playOrder = val;
		},
		// 修改音量
		changVolume(store, val) {
			store.volume = val;
		},
		// 清空数据
		clearData(state) {
			state.url = {};
			state.detail = {};
			state.picUrl = require('@/assets/images/not-played.png');
			state.lyrics = {};
			state.nowProgress = 0;
			state.playerTime = 0;
			state.totalDuration = 0;
			state.duration = 0;
			state.nowTime = '00:00';
			state.currentMusicID = 0;
		},
	},
	actions: {
		// 歌曲url
		songUrl({ commit }, id) {
			getSongUrl(id).then(data => {
				const str = useDateFormat(data.data.data[0].time, 'mm:ss');
				data.data.data[0].time = str.value;
				commit('SONGURL', data.data.data[0]);
			});
		},
		// 歌曲信息
		songDetail({ commit }, id) {
			getSongDetail(id).then(data => {
				const str = useDateFormat(data.data.songs[0].dt, 'mm:ss');
				data.data.songs[0].dt = str.value;
				commit('SONGDETAIL', data.data.songs[0]);
				commit('musicID', data.data.songs[0].id);
				commit('addList', data.data.songs[0]);
			});
		},
		// 歌词
		songLyrics({ commit }, id) {
			getSongLyric(id).then(data => {
				commit('SONGLYRIC', data.data.lrc);
			});
		},
		// 获取三件套
		getMusic({ dispatch }, id) {
			dispatch('songUrl', id);
			dispatch('songDetail', id);
			dispatch('songLyrics', id);
		},
	},
	getters: {
		// 歌名
		songName(state) {
			return state.detail.name || 'QQ音乐 听我想听';
		},
		// 歌手数组
		singer(state) {
			if (!state.detail.ar) return undefined;
			return state.detail.ar;
		},
		// 专辑
		album(state) {
			if (!state.detail.al) return undefined;
			return state.detail.al.name;
		},
		// 歌词
		lyr(state) {
			return tidy(state.lyrics.lyric) || [{ lyrics: 'QQ音乐 听我想听', time: 0 }];
		},
		// 播放地址
		playUrl(state) {
			return state.url.url;
		},
		// 总时长（mm:ss）
		/* totalTime(state) {
			if (!state.url.time) return '00:00';
			const str = useDateFormat(state.url.time, 'mm:ss');
			return str.value.replace(/\"/g, '');
		}, */
	},
};