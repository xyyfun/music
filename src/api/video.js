import request from '@/utils/request';

/**
 * @Date         : 2023-03-27 17:39:57
 * @description  : 获取视频标签
 * @return        {*}
 */
export const getVideoTagList = () => request({ url: `/video/group/list`, method: 'get' });

/**
 * @Date         : 2023-04-09 19:58:01
 * @description  : 获取视频
 * @return        {*}
 */
export const getVideo = id => {
	return request({ url: `/video/group?id=${id}&offset=10`, method: 'get' });
};
