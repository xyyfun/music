import request from '@/utils/request';

/**
 * @Date         : 2023-05-12 14:28:03
 * @description  : 获取私人信息
 * @param         {*} offset:
 * @return        {*}
 */
export const getPrivateMessage = offset => {
	return request({
		url: `/msg/private?limit=30&offset=${(offset - 1) * 30}`,
	});
};

/**
 * @Date         : 2023-05-25 20:40:47
 * @description  : 获取评论信息
 * @param         {*} uid: 用户id （登录的用户id非评论者id）
 * @param         {*} before:分页参数,取上一页最后一项的 time 获取下一页数据
 * @return        {*}
 */
export const getCommentMessage = (uid, before = '') => {
	return request({
		url: `/msg/comments?uid=${uid}&limit=30&before=${before}`,
	});
};

/**
 * @Date         : 2023-05-25 21:39:32
 * @description  : 获取at我的信息
 * @param         {*} offset:
 * @return        {*}
 */
export const getFormeMessage = offset => {
	return request({
		url: `/msg/forwards?limit=10&offset=${(offset - 1) * 10}`,
	});
};

/**
 * @Date         : 2023-05-25 22:29:49
 * @description  : 获取通知信息
 * @return        {*}
 */
export const getNoticeMessage = () => {
	return request({
		url: `/msg/notices?limit=30`,
	});
};

/**
 * @Date         : 2023-05-24 18:43:54
 * @description  : 获取私信内容
 * @param         {*} uid: 用户 id
 * @param         {*} before:分页参数,取上一页最后一项的 time 获取下一页数据
 * @return        {*}
 */
export const getPrivateContent = (uid, before = '') => {
	return request({
		url: `/msg/private/history?uid=${uid}&limit=30&before=${before}`,
	});
};

/**
 * @Date         : 2023-05-24 23:20:27
 * @description  : 发送私信
 * @param         {*} user_ids:用户id
 * @param         {*} msg: 信息
 * @return        {*}
 */
export const sendPrivate = (user_ids, msg) => {
	return request({
		url: `/send/text?user_ids=${user_ids}&msg=${msg}`,
	});
};
