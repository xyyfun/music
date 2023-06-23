import { setUserLike, setUserInfo, getUserInfo } from '@/utils/user';
import { getUserStatus, getUserLike, getUserDetail, getUserVIPinfo } from '@/api/user';
export default {
	// 开启命名空间
	namespaced: true,
	state: {
		// 用户信息
		userInfo: getUserInfo() || {},
		// 用户歌曲喜欢列表（歌单）
		usersongLike: null,
		// 用户VIP信息
		userVIPinfo: {},
		// 0：等待状态返回 1：未登录 2：登录成功
		status: 0,
		// 是否显示登录面板
		isShowLoginPanel: false,
	},
	mutations: {
		// 修改用户状态
		changUserStatus(state, val) {
			state.status = val;
		},
		// 存储用户信息
		setInfo(state, val) {
			state.userInfo = val;
		},
		// 存储用户喜欢列表
		changUsreSongLike(state, val) {
			state.usersongLike = val;
		},
		// 存储用户vip数据
		setUserVIPinfo(state, val) {
			let obj = {};
			const { associator, redplus } = val;
			const presentTime = Date.now();
			if (associator['expireTime'] > presentTime) {
				if (redplus['expireTime'] > presentTime) {
					// svip用户
					obj = { ...redplus, isMember: true };
				} else {
					// 普通会员用户
					obj = { ...associator, isMember: true };
				}
			} else {
				// 过期会员用户或无会员用户
				obj = { ...associator, isMember: false };
			}
			state.userVIPinfo = obj;
		},
		// 修改登录面板状态
		changPanelStatus(state, val) {
			state.isShowLoginPanel = val;
		},
		// 删除用户信息
		removeInfo(state) {
			state.userInfo = {};
			state.usersongLike = null;
			state.userVIPinfo = {};
			state.status = 0;
			state.isShowLoginPanel = false;
		},
	},
	actions: {
		// 用户登录状态
		userStatus({ commit }) {
			return new Promise((resolv, reject) => {
				getUserStatus().then(result => {
					if (result.data.data.profile) {
						const userId = result.data.data.profile.userId;
						commit('changUserStatus', 2);
						resolv(userId);
					} else {
						commit('changUserStatus', 1);
						reject();
					}
				});
			});
		},
		// 获取用户信息
		userInfo({ commit }, id) {
			return new Promise((resolv, reject) => {
				getUserDetail(id).then(
					data => {
						setUserInfo(data.data.profile); // 持久化存储
						commit('setInfo', data.data.profile); // 存储至vuex
						resolv();
					},
					() => {
						reject();
					}
				);
			});
		},
		// 获取用户喜欢（歌曲id数组集合）
		userLike({}, id) {
			getUserLike(id).then(data => {
				setUserLike(data.data.ids);
			});
		},
		// 获取用户vip信息
		userVIPinfo({ commit }) {
			getUserVIPinfo().then(result => {
				const { associator, redplus } = result.data.data;
				commit('setUserVIPinfo', { associator, redplus });
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
			return state.userInfo.avatarUrl || require('@/assets/images/singer_300.png');
		},
		// 用户名字
		userName(state) {
			return state.userInfo.nickname || undefined;
		},
	},
};
