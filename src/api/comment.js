import request from '@/utils/request';

/**
 * @Date         : 2023-04-12 23:21:40
 * @description  : 获取评论
 * @param         {*} type:评论类型，0歌曲，1mv，2歌单，3专辑，4电台节目，5视频，6动态，7电台
 * @param         {*} id: 资源 id
 * @param         {*} pageNo: 当前页
 * @param         {*} sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * @return        {*}
 */
export const getComment = (id, type, pageNo) => {
	return request({
		url: `/comment/new?id=${id}&type=${type}&sortType=1&pageSize=20&pageNo=${pageNo}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-22 15:16:17
 * @description  : 获取热门评论
 * @param         {*} id:
 * @param         {*} type::评论类型，0歌曲，1mv，2歌单，3专辑，4电台节目，5视频，6动态，7电台
 * @param         {*} offset: 分页
 * @return        {*}
 */
export const getHotComment = (id, type, offset) => {
	return request({
		url: `/comment/hot?id=${id}&type=${type}&limit=20&offset=${offset}`,
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

/**
 * @Date         : 2023-04-23 16:15:33
 * @description  : 获取歌曲评论
 * @param         {*} id:
 * @param         {*} offset:
 * @return        {*}
 */
export const getSongComment = (id, offset) => {
	return request({
		url: `/comment/music?id=${id}&limit=20&offset=${(offset - 1) * 20}`,
	});
};

/**
 * @Date         : 2023-04-23 16:40:14
 * @description  : 获取歌单评论
 * @param         {*} id:
 * @param         {*} offset:
 * @return        {*}
 */
export const getPlaylistComment = (id, offset) => {
	return request({
		url: `/comment/playlist?id=${id}&limit=20&offset=${(offset - 1) * 20}`,
	});
};

/**
 * @Date         : 2023-04-23 17:14:35
 * @description  : 获取专辑评论
 * @param         {*} id:
 * @param         {*} offset:
 * @return        {*}
 */
export const getAlbumComment = (id, offset) => {
	return request({
		url: `/comment/album?id=${id}&limit=20&offset=${(offset - 1) * 20}`,
	});
};

/**
 * @Date         : 2023-04-23 18:34:36
 * @description  : 获取视频评论
 * @param         {*} id:
 * @param         {*} offset:
 * @return        {*}
 */
export const getVideoComment = (id, offset) => {
	return request({
		url: `/comment/video?id=${id}&limit=20&offset=${(offset - 1) * 20}`,
	});
};

/**
 * @Date         : 2023-04-23 18:41:12
 * @description  : 获取mv评论
 * @param         {*} id:
 * @param         {*} offset:
 * @return        {*}
 */
export const getMvComment = (id, offset) => {
	return request({
		url: `/comment/mv?id=${id}&limit=20&offset=${(offset - 1) * 20}`,
	});
};

/**
 * @Date         : 2023-05-06 10:44:20
 * @description  : 给评论点赞
 * @param         {*} id:资源id
 * @param         {*} cid:评论id
 * @param         {*} t:是否点赞 1 为点赞 ,0 为取消点赞
 * @param         {*} type:评论类型，0歌曲，1mv，2歌单，3专辑，4电台节目，5视频，6动态，7电台
 * @return        {*}
 */
export const commentLike = ({ id, cid, t, type }) => {
	return request({ url: `/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}` });
};
