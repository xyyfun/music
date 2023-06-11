import request from '@/utils/request';

/**
 * @Date         : 2023-04-04 23:18:12
 * @description  : 搜索
 * @param         {*} keywords:关键字
 * @param         {*} type:搜索类型默认为1 1单曲10专辑100歌手1000歌单1002用户1004MV1006歌词1009电台1014视频1018综合
 * @return        {*}
 */
export const search = (keywords, type, offset) => {
	return request({
		url: `/cloudsearch?keywords=${keywords}&limit=50&type=${type}&offset=${
			(offset - 1) * 50
		}&timestamp=${Date.now()}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-04 23:20:03
 * @description  : 默认关键字
 * @return        {*}
 */
export const defaultKeyword = () => {
	return request({
		url: '/search/default',
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-06 18:06:39
 * @description  : 获取热搜列表
 * @return        {*}
 */
export const searchHot = () => {
	return request({
		url: '/search/hot/detail',
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-05 20:34:11
 * @description  : 搜索建议
 * @param         {*} keyword:
 * @return        {*}
 */
export const searchSuggest = keyword => {
	return request({
		url: `/search/suggest?keywords=${keyword}&timestamp=${Date.now()}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-05-07 21:50:41
 * @description  : 搜索多重匹配
 * @param         {*} keywords:
 * @return        {*}
 */
export const searchMultiMatch = keywords => {
	return request({
		url: `/search/multimatch?keywords=${keywords}&timestamp=${Date.now()}`,
	});
};
