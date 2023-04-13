import request from '@/utils/request';

/**
 * @Date         : 2023-04-03 09:33:50
 * @description  : 获得歌手部分信息和热门歌曲
 * @param         {*} id:
 * @return        {*}
 */
export const getSingerData = id => {
	return request({
		url: `/artists/desc?id=${id}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-12 19:10:16
 * @description  : 获取歌手所有歌曲
 * @param         {*} id:
 * @param         {*} offset:
 * @return        {*}
 */
export const getSingerAllSongs = (id, limit) => {
	return request({
		url: `/artist/songs?id=${id}&limit=${limit}&offset=1`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-03 14:57:52
 * @description  : 获取歌手专辑
 * @param         {*} id:
 * @param         {*} num:获取数
 * @return        {*}
 */
export const getSingerAlbum = (id, num) => {
	return request({
		url: `/artist/album?id=${id}&limit=${num}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-03 20:26:19
 * @description  : 获取歌手mv
 * @param         {*} id:
 * @param         {*} limit:请求数量
 * @return        {*}
 */
export const getSingerMV = (id, num) => {
	return request({
		url: `/artist/mv?id=${id}&limit=${num}`,
		method: 'get',
	});
};
