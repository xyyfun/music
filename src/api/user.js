import request from '@/utils/request';

/**
 * @Date         : 2023-05-12 16:36:55
 * @description  : 获取登录状态
 * @return        {*}
 */
export const getUserStatus = () => request({ url: `/login/status` });

/**
 * @Date         : 2023-04-11 21:13:46
 * @description  : 获取用户详情
 * @param         {*} uid:
 * @return        {*}
 */
export const getUserDetail = uid => {
	return request({
		url: `/user/detail?uid=${uid}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-12 17:27:59
 * @description  : 获取用户账号信息
 * @return        {*}
 */
export const getUserAccountInfo = () => {
	return request({
		url: `/user/account`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-12 17:39:22
 * @description  : 获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度
 * @return        {*}
 */
export const getUserLevel = () => {
	return request({
		url: '/user/level',
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-12 18:57:26
 * @description  : 获取用户喜欢列表(数组歌曲id)
 * @param         {*} uid:
 * @return        {*}
 */
export const getUserLike = uid => {
	return request({
		url: `/likelist?uid=${uid}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-13 15:53:28
 * @description  : 喜欢音乐
 * @param         {*} id:
 * @param         {*} bol: 是否喜欢
 * @return        {*}
 */
export const like = (id, bol) => {
	return request({
		url: `/like?id=${id}&like=${bol}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-12 18:31:18
 * @description  : 获取用户播放记录-歌曲
 * @param         {*} uid:
 * @return        {*}
 */
export const getUserRecordSong = () => request({ url: `/record/recent/song` });

/**
 * @Date         : 2023-05-05 14:18:41
 * @description  : 获取用户播放记录-视频
 * @return        {*}
 */
export const getUserRecordVideo = () => request({ url: '/record/recent/video' });

/**
 * @Date         : 2023-04-12 22:10:58
 * @description  : 获取用户歌单
 * @param         {*} uid:
 * @return        {*}
 */
export const getUserPlaylist = uid => {
	return request({
		url: `/user/playlist?uid=${uid}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-05-25 18:39:39
 * @description  : 关注用户
 * @param         {*} id: 用户id
 * @param         {*} t:1为关注,其他为取消关注
 * @return        {*}
 */
export const followUser = (id, t) => {
	return request({ url: `/follow?id=${id}&t=${t}` });
};
