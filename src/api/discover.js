import request from '@/utils/request';

/**
 * @Date         : 2023-03-23 19:09:34
 * @description  : 获取轮播图数据
 * @return        {*}
 */
export const getBannerDataList = () => request({ url: '/banner', method: 'get' });

/**
 * @Date         : 2023-03-23 19:08:03
 * @description  : 获取推荐歌单
 * @return        {*}
 */
export const getRecommendPlaylistDataList = () => {
	return request({
		url: '/personalized',
		method: 'get',
	});
};

/**
 * @Date         : 2023-03-23 22:03:43
 * @description  : 获取新歌曲
 * @return        {*}
 */
export const getRecommendNewSong = () => request({ url: '/personalized/newsong', method: 'get' });
