import request from '@/utils/request';

/**
 * @Date         : 2023-04-06 21:34:12
 * @description  : 获取电台详情
 * @param         {*} rid:
 * @return        {*}
 */
export const djDetail = rid => {
	return request({
		url: `/dj/detail?rid=${rid}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-05-23 18:21:23
 * @description  : 获取电台节目列表
 * @param         {*} rid:
 * @param         {*} offset:
 * @return        {*}
 */
export const djList = (rid, offset) => {
	return request({
		url: `/dj/program?rid=${rid}&limit=30&offset=${(offset - 1) * 30}`,
	});
};
