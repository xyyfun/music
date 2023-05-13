import { getPlaylistDetail } from '@/api/playlist';
import { getAlbumData } from '@/api/album';
import { like } from '@/api/user';
import { getUserLike, setUserLike } from '@/utils/user';
import { useDateFormat } from '@vueuse/core';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		songLists: [], // 歌单/专辑列表
		playlistDetail: {}, // 歌单/专辑详情
		subscribed: false, // 是否收藏该歌单/专辑
	},
	mutations: {
		// 歌曲列表
		lists(state, lists) {
			const userLikeSongs = new Set(getUserLike());
			lists.forEach((e, i) => {
				const str = useDateFormat(e.dt, 'mm:ss');
				e.dt = str.value.replace(/\"/g, '');
				// 判断该音乐是否为用户喜欢
				if (userLikeSongs.has(e.id)) {
					e.isLike = true;
				} else {
					e.isLike = false;
				}
				state.songLists.push(e);
			});
		},
		// 歌单详情处理
		playlistDetail(state, val) {
			const {
				description,
				creator: { nickname, avatarUrl, userId },
				name,
				coverImgUrl: picUrl,
				updateTime,
				subscribedCount,
				shareCount,
			} = val;
			state.playlistDetail = {
				description,
				nickname,
				avatarUrl,
				userId,
				name,
				picUrl,
				updateTime,
				subscribedCount,
				shareCount,
			};
			state.subscribed = val.subscribed;
		},
		// 专辑详情处理
		albumDetail(state, val) {
			const { description, artists, name, picUrl, publishTime } = val;
			state.playlistDetail = { description, artists, name, picUrl, publishTime };
			state.subscribed = val.info.liked;
		},
		// 修改是否收藏歌单/专辑
		changCollect(state, val) {
			state.subscribed = val;
		},
		// 添加喜欢的歌曲id
		addUserLikeID(state, id) {
			const result = getUserLike();
			for (let i = 0; i < state.songLists.length; i++) {
				if (id === state.songLists[i].id) {
					state.songLists[i].isLike = true;
					break;
				}
			}
			setUserLike([id, ...result]);
		},
		// 移除喜欢的歌曲id
		removeUserLikeID(state, id) {
			const result = getUserLike();
			for (let i = 0; i < state.songLists.length; i++) {
				if (id === state.songLists[i].id) {
					state.songLists[i].isLike = false;
					break;
				}
			}
			for (let i = 0; i < result.length; i++) {
				if (id === result[i]) {
					result.splice(i, 1);
					break;
				}
			}
			setUserLike(result);
		},
		// 移除数据
		clearData(state) {
			state.songLists = [];
			state.playlistDetail = {};
		},
	},
	actions: {
		// 歌单详情
		getPlaylistDetail({ commit }, id) {
			getPlaylistDetail(id).then(data => {
				commit('lists', data.data.playlist.tracks);
				commit('playlistDetail', data.data.playlist);
			});
		},
		// 专辑详情
		getAlbumDetail({ commit }, id) {
			getAlbumData(id).then(data => {
				commit('lists', data.data.songs);
				commit('albumDetail', data.data.album);
			});
		},
		// 修改用户喜欢
		changUserLike({ commit }, { id, boolean }) {
			return new Promise((resolve, reject) => {
				like(id, boolean).then(
					() => {
						if (boolean) {
							commit('addUserLikeID', id);
						} else {
							commit('removeUserLikeID', id);
						}
						resolve('success');
					},
					error => {
						reject(error.response);
					}
				);
			});
		},
	},
};
