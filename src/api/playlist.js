import request from '@/utils/request';

/**
 * @Date         : 2023-03-27 23:32:00
 * @description  : 获取歌单详情
 * @param         {*} id:
 * @return        {*}
 */
export const getPlaylistDetail = id => {
	return request({
		url: `/playlist/detail?id=${id}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-04 22:15:47
 * @description  : 获取歌单评论
 * @param         {*} id:
 * @param         {*} offset:
 * @return        {*}
 */
export const getPlaylistComment = (id, offset) => {
	return request({
		url: `/comment/playlist?id=${id}&offset=${offset}`,
		method: 'get',
	});
};
