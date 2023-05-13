import request from '@/utils/request';

/**
 * @Date         : 2023-03-26 20:21:56
 * @description  : 获取新碟上架
 * @return        {*}
 */
export const getNewAlbum = () => request({ url: '/album/newest', method: 'get' });

/**
 * @Date         : 2023-03-26 20:03:10
 * @description  : 获取新碟上架列表
 * @return        {*}
 */
export const getTopAlbum = (area, offset) =>
	request({ url: `/album/new?area=${area}&limit=50&offset=${(offset - 1) * 50}`, method: 'get' });

/**
 * @Date         : 2023-04-03 21:27:06
 * @description  : 获取专辑详情
 * @param         {*} id:
 * @return        {*}
 */

export const getAlbumData = id => {
	return request({
		url: `/album?id=${id}`,
	});
};

/**
 * @Date         : 2023-05-05 17:13:47
 * @description  : 收藏/取消收藏专辑
 * @param         {*} id:
 * @param         {*} t:
 * @return        {*}
 */
export const albumSubscribe = (id, t) => request({ url: `/album/sub?t=${t}&id=${id}` });

/**
 * @Date         : 2023-05-05 17:30:43
 * @description  : 获取用户收藏的专辑列表
 * @return        {*}
 */
export const getUserCollectAlbum = () => request({ url: '/album/sublist' });
