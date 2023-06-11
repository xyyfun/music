import request from '@/utils/request';

/**
 * @Date         : 2023-03-27 17:39:57
 * @description  : 获取视频标签
 * @return        {*}
 */
export const getVideoTagList = () => request({ url: `/video/group/list`, method: 'get' });

export const getVideoCategoryList = () => request({ url: `/video/category/list`, method: 'get' });

/**
 * @Date         : 2023-04-20 15:53:58
 * @description  : 获取全部视频列表
 * @return        {*}
 */
export const getVideoAll = offset => {
	return request({ url: `/video/timeline/all?offset=${(offset - 1) * 20}`, method: 'get' });
};

/**
 * @Date         : 2023-04-09 19:58:01
 * @description  : 获取视频
 * @return        {*}
 */
export const getVideo = (id, offset) => {
	return request({ url: `/video/group?id=${id}&offset=${(offset - 1) * 20}`, method: 'get' });
};

/**
 * @Date         : 2023-04-20 20:16:02
 * @description  : 获取最新MV
 * @param         {*} area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为内地
 * @param         {*} limit: 取出数量 , 默认为 30
 * @return        {*}
 */
export const getNewMv = (area = '内地', limit) =>
	request({ url: `/mv/first?area=${area}&limit=${limit}` });

/**
 * @Date         : 2023-04-20 21:33:02
 * @description  : 获取网易出品
 * @return        {*}
 */
export const getOfficialMv = () => request({ url: '/mv/exclusive/rcmd?limit=15' });

/**
 * @Date         : 2023-04-20 21:53:55
 * @description  : mv排行榜
 * @param         {*} area:地区,可选值为内地,港台,欧美,日本,韩国,不填则为内地
 * @return        {*}
 */
export const getMvRanking = (area = '内地') => request({ url: `/top/mv?area=${area}&limit=10` });

/**
 * @Date         : 2023-04-21 10:41:25
 * @description  : 获取视频播放链接
 * @param         {*} id:
 * @return        {*}
 */
export const getVideoUrl = id => request({ url: `/video/url?id=${id}` });

/**
 * @Date         : 2023-04-21 15:18:40
 * @description  : 获取视频详情
 * @param         {*} id:
 * @return        {*}
 */
export const getVideoDetail = id => request({ url: `/video/detail?id=${id}` });

/**
 * @Date         : 2023-04-21 23:28:22
 * @description  : 获取相关视频
 * @param         {*} id:
 * @return        {*}
 */
export const getRelatedVideo = id => request({ url: `/related/allvideo?id=${id}` });

/**
 * @Date         : 2023-04-21 20:25:45
 * @description  : mv播放地址
 * @param         {*} id:
 * @param         {*} r:
 * @return        {*}
 */
export const getMvUrl = (id, r = '') => request({ url: `/mv/url?id=${id}&r=${r}` });

/**
 * @Date         : 2023-04-21 20:24:15
 * @description  : mv详情
 * @param         {*} id:
 * @return        {*}
 */
export const getMvDetail = id => request({ url: `/mv/detail?mvid=${id}` });

/**
 * @Date         : 2023-04-21 23:29:28
 * @description  : 获取相似mv
 * @param         {*} mvid:
 * @return        {*}
 */
export const getRelatedMv = mvid => request({ url: `/simi/mv?mvid=${mvid}` });

/**
 * @Date         : 2023-05-05 16:10:59
 * @description  : 收藏/取消收藏视频
 * @param         {*} id:
 * @param         {*} t:1 为收藏,其他为取消收藏
 * @return        {*}
 */
export const videoCollect = (id, t) =>
	request({ url: `/video/sub?id=${id}&t=${t}&timestamp=${Date.now()}` });

/**
 * @Date         : 2023-05-05 17:57:05
 * @description  : 收藏/取消收藏mv
 * @param         {*} id:
 * @param         {*} t:
 * @return        {*}
 */
export const mvCollect = (id, t) =>
	request({ url: `/mv/sub?mvid=${id}&t=${t}&timestamp=${Date.now()}` });

/**
 * @Date         : 2023-05-05 20:26:33
 * @description  : 获取用户收藏的视频
 * @return        {*}
 */
export const getUserCollectMv = () => request({ url: `/mv/sublist?timestamp=${Date.now()}` });
