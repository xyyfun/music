import request from '@/utils/request';

/**
 * @Date         : 2023-03-24 15:59:47
 * @description  : 推荐节目
 * @return        {*}
 */
export const getRecommendProgram = () => request({ url: '/program/recommend', method: 'get' });

/**
 * @Date         : 2023-03-24 16:02:22
 * @description  : 独家放送
 * @return        {*}
 */
export const getExclusiveBroadcast = () => {
	return request({
		url: '/personalized/privatecontent',
		method: 'get',
	});
};

/**
 * @Date         : 2023-03-24 15:59:47
 * @description  : 推荐电台
 * @return        {*}
 */
export const getRecommendRadar = () => request({ url: '/personalized/djprogram', method: 'get' });

/**
 * @Date         : 2023-03-25 13:57:24
 * @description  : 获取所有榜单
 * @return        {*}
 */
export const getAllList = () => request({ url: '/toplist/detail', method: 'get' });

/**
 * @Date         : 2023-03-26 23:39:32
 * @description  : 获取电台banner
 * @return        {*}
 */
export const getRadioBanner = () => request({ url: '/dj/banner', method: 'get' });

/**
 * @Date         : 2023-03-27 08:59:10
 * @description  : 获取热门电台
 * @return        {*}
 */
export const getRadioHot = () => request({ url: '/dj/hot?limit=10', method: 'get' });

/**
 * @Date         : 2023-03-27 09:09:55
 * @description  : 24小时节目榜
 * @return        {*}
 */
export const getRadioProgram = () =>
	request({ url: '/dj/program/toplist/hours?limit=10', method: 'get' });

/**
 * @Date         : 2023-03-27 14:05:53
 * @description  : 获取最热主播
 * @return        {*}
 */
export const getRadioAnchor = () => request({ url: '/dj/toplist/popular?limit=30', method: 'get' });

/**
 * @Date         : 2023-04-09 15:44:21
 * @description  : 获取电台个性推荐
 * @return        {*}
 */
export const getRadioPersonality = () =>
	request({ url: '/dj/personalize/recommend', method: 'get' });
