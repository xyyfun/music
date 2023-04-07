import request from '@/utils/request';

/**
 * @Date         : 2023-04-04 23:18:12
 * @description  : 搜索
 * @param         {*} keywords:关键字
 * @param         {*} limit:返回数量 , 默认为 30
 * @param         {*} type:搜索类型默认为1 1单曲10专辑100歌手1000歌单1002用户1004MV1006歌词1009电台1014视频1018综合
 * @return        {*}
 */
export const search = (keywords, limit, type) => {
	return request({
		url: `/search?keywords=${keywords}&limit=${limit}&type=${type}`,
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
		url: `/search/suggest?keywords=${keyword}`,
		method: 'get',
	});
};
