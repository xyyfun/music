import request from '@/utils/request';

/**
 * @Date         : 2023-04-03 21:27:06
 * @description  : 获取专辑详情
 * @param         {*} id:
 * @return        {*}
 */
export const getAlbumData = id => {
	return request({
		url: `/album?id=${id}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-04 18:44:57
 * @description  : 获取专辑评论
 * @param         {*} id:
 * @param         {*} limit:数量
 * @return        {*}
 */
export const getAlbumComment = (id, limit) => {
	return request({
		url: `/comment/album?id=${id}&limit=${limit}`,
		method: 'get',
	});
};
