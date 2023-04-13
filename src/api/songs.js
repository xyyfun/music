import request from '@/utils/request';

/**
 * @Date         : 2023-03-27 18:54:35
 * @description  : 获取歌曲url
 * @param         {*} id:
 * @return        {*}
 */
export const getSongUrl = id => request({ url: `/song/url?id=${id}`, method: 'get' });

/**
 * @Date         : 2023-03-27 18:55:32
 * @description  : 获取歌曲详情
 * @param         {*} id:
 * @return        {*}
 */
export const getSongDetail = id => request({ url: `/song/detail?ids=${id}`, method: 'get' });

/**
 * @Date         : 2023-03-27 19:02:43
 * @description  : 获取歌曲歌词
 * @param         {*} id:
 * @return        {*}
 */
export const getSongLyric = id => request({ url: `/lyric?id=${id}`, method: 'get' });

/**
 * @Date         : 2023-04-07 23:05:05
 * @description  : 获取歌曲评论
 * @param         {*} id:
 * @return        {*}
 */
export const getSongComment = (id, offset = 1) => {
	return request({
		url: `/comment/music?id=${id}&limit=50&offset=${offset}`,
		method: 'get',
	});
};
