import { setUserInfo, getUserInfo } from '@/utils/user';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		// 用户信息
		userInfo: getUserInfo() || {},
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
	},
	actions: {},
	getters: {
		// 用户id
		userId(state) {
			return state.userInfo.userId || undefined;
		},
		// 用户头像
		userAvatarUrl(state) {
			return state.userInfo.avatarUrl || undefined;
		},
		// 用户名字
		userName(state) {
			return state.userInfo.nickname || undefined;
		},
	},
};
