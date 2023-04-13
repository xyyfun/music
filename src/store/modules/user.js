import { setUserInfo, getUserInfo } from '@/utils/userInfo';
import { like } from '@/api/user';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		// 用户信息
		userInfo: getUserInfo() || {},
		// 用户喜欢列表
		userLikeList: [],
	},
	mutations: {
		// 存储用户信息
		setInfo(state, val) {
			state.userInfo = val;
		},
		// 删除用户信息
		removeInfo(state) {
			state.userInfo = {};
		},
		// 添加用户喜欢音乐的id
		addUserLikeID(state, val) {
			if (val instanceof Array) {
				val.forEach(e => {
					state.userLikeList.push(e);
				});
			} else {
				state.userLikeList.push(val);
			}
		},
		// 移除喜欢的音乐id
		removeUserLikeID(state, val) {
			for (let i = 0; i < state.userLikeList.length; i++) {
				if (val === state.userLikeList[i]) {
					state.userLikeList.splice(i, 1);
					break;
				}
			}
		},
	},
	actions: {
		// 将歌曲添加至用户喜欢
		userLike({ commit }, { id, bol }) {
			return new Promise(resolve => {
				like(id, bol).then(() => {
					if (bol) {
						commit('addUserLikeID', id);
					} else {
						commit('removeUserLikeID', id);
					}
					resolve('success');
				});
			});
		},
	},
	getters: {
		// 用户id
		userId(state) {
			return state.userInfo.userId || undefined;
		},
		// 用户头像
		userAvatarUrl(state) {
			return state.userInfo.avatarUrl;
		},
		// 用户名字
		userName(state) {
			return state.userInfo.nickname;
		},
	},
};
