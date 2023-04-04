import request from '@/utils/request';

/**
 * @Date         : 2023-03-27 17:39:57
 * @description  : 获取视频标签
 * @return        {*}
 */
export const getVideoTagList = () => request({ url: `/video/group/list`, method: 'get' });
