import request from '@/utils/request';

/**
 * @Date         : 2023-03-23 19:09:34
 * @description  : 获取轮播图数据
 * @return        {*}
 */
export const getBanner = () => request({ url: '/banner', method: 'get' });

/**
 * @Date         : 2023-03-23 19:08:03
 * @description  : 获取推荐歌单数据
 * @return        {*}
 */
export const getRecommendPlaylist = () => {
	return request({
		url: '/personalized',
		method: 'get',
	});
};

/**
 * @Date         : 2023-03-23 22:03:43
 * @description  : 获取推荐新歌曲数据
 * @return        {*}
 */
export const getRecommendNewSong = () => request({ url: '/personalized/newsong', method: 'get' });

/**
 * @Date         : 2023-03-24 14:07:32
 * @description  : 获取推荐MV数据
 * @return        {*}
 */
export const getRecommendMV = () => request({ url: '/personalized/mv', method: 'get' });
