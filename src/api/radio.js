import request from '@/utils/request';

/**
 * @Date         : 2023-04-06 21:34:12
 * @description  : 获取电台节目详情
 * @param         {*} id:
 * @return        {*}
 */
export const djDetail = id => {
	return request({
		url: `/dj/program/detail?id=${id}`,
		method: 'get',
	});
};
