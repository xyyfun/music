import { getPlaylistDetail, getPlaylistComment } from '@/api/playlist';
import { like } from '@/api/user';
import { getUserLike, setUserLike } from '@/utils/user';
import { useDateFormat } from '@vueuse/core';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		songLists: [], // 歌单列表
		playlistDetail: {}, // 歌单详情
		comments: {}, // 歌单评论
	},
	mutations: {
		lists(state, lists) {
			const userLikeSongs = getUserLike();
			lists.forEach(e => {
				const str = useDateFormat(e.dt, 'mm:ss');
				e.dt = str.value.replace(/\"/g, '');
				const result = userLikeSongs.some(item => item === e.id);
				if (result) {
					e.isLike = true;
				} else {
					e.isLike = false;
				}
			});
			state.songLists = lists;
		},
		detail(state, val) {
			const {
				description,
				creator: { nickname, avatarUrl },
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
				name,
				picUrl,
				updateTime,
				subscribedCount,
				shareCount,
			};
		},
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
	},
	actions: {
		// 歌单详情
		getPlaylistDetail({ commit }, id) {
			getPlaylistDetail(id).then(data => {
				commit('lists', data.data.playlist.tracks);
				commit('detail', data.data.playlist);
			});
		},
		// 歌单评论
		getComment({ commit }, id) {},
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
	getters: {},
};
