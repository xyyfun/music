import request from '@/utils/request';

/**
 * @Date         : 2023-04-03 09:33:50
 * @description  : 获得歌手信息
 * @param         {*} id:
 * @return        {*}
 */
export const getSingerDetail = id => {
	return request({
		url: `/artist/detail?id=${id}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-23 21:07:02
 * @description  : 获取歌手热门50首歌曲
 * @param         {*} id:
 * @return        {*}
 */
export const getSingerHotSong = id => {
	return request({
		url: `/artist/top/song?id=${id}`,
	});
};

/**
 * @Date         : 2023-04-12 19:10:16
 * @description  : 获取歌手所有歌曲
 * @param         {*} id:
 * @param         {*} offset:
 * @return        {*}
 */
export const getSingerAllSongs = (id, offset) => {
	return request({
		url: `/artist/songs?id=${id}&limit=50&offset=${(offset - 1) * 50}`,
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
export const getSingerAlbum = (id, offset) => {
	return request({
		url: `/artist/album?id=${id}&limit=30&offset=${(offset - 1) * 30}`,
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
export const getSingerMV = (id, offset) => {
	return request({
		url: `/artist/mv?id=${id}&limit=30&offset=${(offset - 1) * 30}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-03-26 14:12:13
 * @description  : 歌手过滤
 * @param         {Number} type: 1：男歌手 2：女歌手 3：乐队组合
 * @param         {Number} area: 0：其他 7：华语 8：日本 16：韩国 96：欧美
 * @param         {String} initial: 首字母索引
 * @param         {Number} offset: 多少数据
 * @return        {*}
 */
export const getSinger = ({ type, area, initial, offset }) => {
	return request({
		url: `/artist/list?type=${type}&area=${area}&initial=${initial}&limit=60&offset=${
			(offset - 1) * 60
		}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-03-25 16:52:18
 * @description  : 获取歌手榜
 * @return        {*}
 */
export const getArtist = () => request({ url: '/toplist/artist', method: 'get' });
