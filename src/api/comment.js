import request from '@/utils/request';

/**
 * @Date         : 2023-04-12 23:21:40
 * @description  : 获取评论
 * @param         {*} type:评论类型，0歌曲，1mv，2歌单，3专辑，4电台节目，5视频，6动态，7电台
 * @param         {*} id: 资源 id
 * @param         {*} pageNo: 当前页
 * @return        {*}
 */
export const getComment = (id, type, pageNo) => {
	return request({
		url: `/comment/new?type=${type}&id=${id}&sortType=1&pageSize=20&pageNo=${pageNo}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-12 23:52:15
 * @description  : 获取楼层评论
 * @param         {*} id:
 * @param         {*} parentCommentId:
 * @param         {*} type:
 * @return        {*}
 */
export const getFloorComment = (id, parentCommentId, type) => {
	return request({
		url: `/comment/floor?parentCommentId=${parentCommentId}&id=${id}&type=${type}`,
		method: 'get',
	});
};
